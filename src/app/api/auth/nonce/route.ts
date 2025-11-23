import { NextResponse } from 'next/server'
import { randomBytes } from 'crypto'
import { storeNonce } from '~/lib/nonce-store'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { publicKey } = body

    if (!publicKey) {
      return NextResponse.json({ error: 'Missing publicKey' }, { status: 400 })
    }

    // Generate an alphanumeric nonce (SIWS requirement: at least 8 alphanumeric characters)
    const nonce = randomBytes(16).toString('hex') // 32 character hex string (alphanumeric)
    
    // Store nonce with timestamp
    storeNonce(publicKey, nonce)

    console.log('🎲 Generated nonce for wallet:', publicKey.slice(0, 8))

    return NextResponse.json({ nonce })
  } catch (error) {
    console.error('Nonce generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate nonce' },
      { status: 500 }
    )
  }
}

