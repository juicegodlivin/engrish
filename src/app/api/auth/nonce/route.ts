import { NextResponse } from 'next/server'
import { randomBytes } from 'crypto'

// In-memory nonce storage (in production, use Redis or database)
const nonceStore = new Map<string, { nonce: string; timestamp: number }>()

// Clean up old nonces (older than 5 minutes)
function cleanupOldNonces() {
  const fiveMinutesAgo = Date.now() - 5 * 60 * 1000
  for (const [key, value] of nonceStore.entries()) {
    if (value.timestamp < fiveMinutesAgo) {
      nonceStore.delete(key)
    }
  }
}

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
    nonceStore.set(publicKey, {
      nonce,
      timestamp: Date.now(),
    })

    // Cleanup old nonces
    cleanupOldNonces()

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

// Export the nonce store for verification
export function getNonce(publicKey: string): string | null {
  const stored = nonceStore.get(publicKey)
  if (!stored) return null
  
  // Check if nonce is still valid (less than 5 minutes old)
  const fiveMinutesAgo = Date.now() - 5 * 60 * 1000
  if (stored.timestamp < fiveMinutesAgo) {
    nonceStore.delete(publicKey)
    return null
  }
  
  return stored.nonce
}

// Remove nonce after verification
export function consumeNonce(publicKey: string): void {
  nonceStore.delete(publicKey)
}

