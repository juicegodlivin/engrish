/**
 * Nonce store for wallet authentication
 * In production, use Redis or database instead of in-memory storage
 */

// In-memory nonce storage
const nonceStore = new Map<string, { nonce: string; timestamp: number }>()

// Clean up old nonces (older than 5 minutes)
export function cleanupOldNonces() {
  const fiveMinutesAgo = Date.now() - 5 * 60 * 1000
  for (const [key, value] of nonceStore.entries()) {
    if (value.timestamp < fiveMinutesAgo) {
      nonceStore.delete(key)
    }
  }
}

// Store a new nonce
export function storeNonce(publicKey: string, nonce: string): void {
  nonceStore.set(publicKey, {
    nonce,
    timestamp: Date.now(),
  })
  cleanupOldNonces()
}

// Get a nonce if it exists and is valid
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

