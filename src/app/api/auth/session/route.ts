import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { getUserByWalletAddress } from '~/server/db/client'
import type { Database } from '~/types/database'

type User = Database['public']['Tables']['users']['Row']

const JWT_SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || 'fallback-secret-key-change-in-production')

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('auth-token')?.value
    const allCookies = req.cookies.getAll()

    console.log('🔍 Session check - has token:', !!token)
    console.log('🍪 All cookies:', allCookies.map(c => c.name))

    if (!token) {
      console.log('❌ No auth-token cookie found')
      return NextResponse.json({ user: null })
    }

    // Verify JWT
    const { payload } = await jwtVerify(token, JWT_SECRET)
    console.log('✅ JWT valid for wallet:', payload.walletAddress)

    // Get fresh user data from Supabase
    const userData = await getUserByWalletAddress(payload.walletAddress as string)

    if (!userData) {
      console.log('❌ User not found in database')
      return NextResponse.json({ user: null })
    }

    const user: User = userData as User
    // @ts-ignore Supabase type inference limitation
    console.log('✅ Session valid for user:', user.id)

    return NextResponse.json({
      user: {
        // @ts-ignore Supabase type inference limitation
        id: user.id,
        // @ts-ignore Supabase type inference limitation
        walletAddress: user.wallet_address,
        // @ts-ignore Supabase type inference limitation
        name: user.name,
        // @ts-ignore Supabase type inference limitation
        email: user.email,
        // @ts-ignore Supabase type inference limitation
        image: user.avatar,
      },
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    })
  } catch (error) {
    console.error('❌ Session check error:', error)
    return NextResponse.json({ user: null })
  }
}

