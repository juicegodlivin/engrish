import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { getUserByWalletAddress } from '~/server/db/client'

const JWT_SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || 'fallback-secret-key-change-in-production')

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('auth-token')?.value

    console.log('🔍 Session check - has token:', !!token)

    if (!token) {
      console.log('❌ No auth-token cookie found')
      return NextResponse.json({ user: null })
    }

    // Verify JWT
    const { payload } = await jwtVerify(token, JWT_SECRET)
    console.log('✅ JWT valid for wallet:', payload.walletAddress)

    // Get fresh user data from Supabase
    const user = await getUserByWalletAddress(payload.walletAddress as string)

    if (!user) {
      console.log('❌ User not found in database')
      return NextResponse.json({ user: null })
    }

    console.log('✅ Session valid for user:', user.id)

    return NextResponse.json({
      user: {
        id: user.id,
        walletAddress: user.wallet_address,
        name: user.name,
        email: user.email,
        image: user.avatar,
      },
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    })
  } catch (error) {
    console.error('❌ Session check error:', error)
    return NextResponse.json({ user: null })
  }
}

