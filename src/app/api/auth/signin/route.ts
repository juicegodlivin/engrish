import { NextRequest, NextResponse } from 'next/server'
import { PublicKey } from '@solana/web3.js'
import nacl from 'tweetnacl'
import bs58 from 'bs58'
import { getUserByWalletAddress, upsertUser } from '~/server/db/client'
import { SignJWT } from 'jose'
import type { Database } from '~/types/database'

type User = Database['public']['Tables']['users']['Row']

const JWT_SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || 'fallback-secret-key-change-in-production')

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { publicKey, signature, message } = body

    console.log('🔐 Sign in request for wallet:', publicKey?.slice(0, 8))

    if (!publicKey || !signature || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Verify signature using Solana's method
    try {
      console.log('🔍 Verifying signature...')
      console.log('📝 Message:', message)
      
      const messageBytes = new TextEncoder().encode(message)
      const signatureBytes = bs58.decode(signature)
      const pubKey = new PublicKey(publicKey)

      console.log('🔢 Message bytes:', messageBytes.length)
      console.log('🔢 Signature bytes:', signatureBytes.length)

      // Use nacl.sign.detached.verify (this is what Phantom uses)
      const isValid = nacl.sign.detached.verify(
        messageBytes,
        signatureBytes,
        pubKey.toBytes()
      )

      if (!isValid) {
        console.error('❌ Signature verification FAILED')
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }

      console.log('✅ Signature verified!')
    } catch (error) {
      console.error('❌ Verification error:', error)
      return NextResponse.json({ error: 'Signature verification failed' }, { status: 401 })
    }

    // Get or create user in Supabase
    let userData = await getUserByWalletAddress(publicKey)
    
    if (!userData) {
      console.log('User not found, creating new user...')
      userData = await upsertUser(publicKey, {
        name: `User ${publicKey.slice(0, 4)}`,
      })
      if (!userData) {
        throw new Error('Failed to create user')
      }
      console.log('User created:', userData.id)
    } else {
      console.log('User found:', userData.id)
    }

    const user: User = userData

    // Create JWT
    const token = await new SignJWT({
      userId: user.id,
      walletAddress: user.wallet_address,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('30d')
      .sign(JWT_SECRET)

    // Set HTTP-only cookie
    const response = NextResponse.json({
      ok: true,
      user: {
        id: user.id,
        walletAddress: user.wallet_address,
        name: user.name,
        email: user.email,
        image: user.avatar,
      },
    })

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    })

    console.log('Authentication complete! Cookie set.')

    return response
  } catch (error) {
    console.error('Auth signin error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Authentication failed' },
      { status: 500 }
    )
  }
}

