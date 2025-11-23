'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState, useRef } from 'react'
import bs58 from 'bs58'

/**
 * Custom hook for authentication with Solana wallet
 */
export function useAuth() {
  const { publicKey, signMessage, connected, disconnect } = useWallet()
  const [user, setUser] = useState<any>(null)
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [loading, setLoading] = useState(true)
  const hasAttemptedRef = useRef(false)

  const authenticated = !!user

  // Check session on mount ONCE
  useEffect(() => {
    let isMounted = true
    
    console.log('🔍 Checking existing session...')
    fetch('/api/auth/session', {
      credentials: 'include', // Ensure cookies are sent
    })
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return // Prevent double-setting in StrictMode
        
        if (data.user) {
          console.log('✅ Found existing session:', data.user.walletAddress)
          setUser(data.user)
          hasAttemptedRef.current = true // Mark as authenticated to prevent auto-auth
        } else {
          console.log('❌ No existing session found')
        }
      })
      .catch((err) => {
        if (!isMounted) return
        console.error('Session check error:', err)
      })
      .finally(() => {
        if (!isMounted) return
        console.log('✅ Session check complete')
        setLoading(false)
      })
    
    return () => {
      isMounted = false
    }
  }, [])

  /**
   * Sign in with Solana wallet
   */
  const signInWithWallet = async () => {
    if (!publicKey || !signMessage) {
      console.error('❌ No publicKey or signMessage')
      return
    }

    if (isAuthenticating) {
      console.log('⏳ Already authenticating')
      return
    }

    try {
      setIsAuthenticating(true)
      console.log('🚀 Starting authentication...')
      console.log('📍 Wallet:', publicKey.toBase58())

      // SIMPLE message that Phantom won't truncate
      const timestamp = Date.now()
      const message = `${window.location.host} wants you to sign in.\n\nWallet: ${publicKey.toBase58()}\nTimestamp: ${timestamp}`
      const messageBytes = new TextEncoder().encode(message)

      console.log('📝 Message to sign:', message)
      console.log('📏 Message length:', message.length)
      console.log('🔐 CALLING signMessage() NOW...')
      
      // THIS TRIGGERS PHANTOM POPUP
      const signatureBytes = await signMessage(messageBytes)
      
      console.log('✅ Got signature!')
      console.log('🔢 Signature bytes length:', signatureBytes.length)

      // Send to server
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          publicKey: publicKey.toBase58(),
          signature: bs58.encode(signatureBytes),
          message,
        }),
      })

      if (!response.ok) {
        throw new Error('Auth failed')
      }

      const data = await response.json()
      console.log('✅ USER CREATED:', data.user)
      
      // Check if cookie was set
      const cookieCheck = await fetch('/api/auth/session', { credentials: 'include' })
      const sessionData = await cookieCheck.json()
      console.log('🍪 Immediate session check after sign-in:', sessionData)
      
      setUser(data.user)

    } catch (error) {
      console.error('❌ Error:', error)
      hasAttemptedRef.current = false
    } finally {
      setIsAuthenticating(false)
    }
  }

  /**
   * Auto-authenticate when wallet connects (ONLY if no session exists)
   */
  useEffect(() => {
    // Wait for session check to complete first
    if (loading) {
      return
    }

    // If already authenticated, never trigger
    if (authenticated) {
      return
    }

    // Wallet not connected or not ready
    if (!connected || !publicKey || !signMessage) {
      return
    }

    // Already attempted for this session
    if (hasAttemptedRef.current) {
      return
    }

    // Trigger auth ONCE
    console.log('🔐 Auto-auth: Wallet connected, no session found. Requesting signature...')
    hasAttemptedRef.current = true
    
    setTimeout(() => {
      signInWithWallet()
    }, 500)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, connected, publicKey])

  // Reset on disconnect
  useEffect(() => {
    if (!connected) {
      hasAttemptedRef.current = false
      setUser(null)
    }
  }, [connected])

  /**
   * Sign out
   */
  const logout = async () => {
    try {
      await fetch('/api/auth/signout', { method: 'POST' })
      await disconnect()
      setUser(null)
      hasAttemptedRef.current = false
      window.location.href = '/'
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return {
    user,
    session: user ? { user } : null,
    loading: loading || isAuthenticating,
    authenticated,
    connected,
    publicKey: publicKey?.toBase58(),
    signInWithWallet,
    logout,
  }
}

