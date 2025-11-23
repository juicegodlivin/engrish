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
  const [sessionChecked, setSessionChecked] = useState(false)
  const hasAttemptedRef = useRef(false)

  const authenticated = !!user

  // Check session on mount ONCE
  useEffect(() => {
    let isMounted = true
    
    // FIRST: Try to restore from localStorage (synchronous, instant)
    try {
      const savedUser = localStorage.getItem('engrish-user')
      if (savedUser) {
        const userData = JSON.parse(savedUser)
        console.log('✅ Restored session from localStorage:', userData.walletAddress)
        setUser(userData)
        hasAttemptedRef.current = true // Prevent auto-auth
        setSessionChecked(true) // Mark as checked
        setLoading(false)
        return
      }
    } catch (err) {
      console.warn('Failed to restore from localStorage:', err)
    }
    
    // SECOND: Check server session (cookie-based)
    console.log('🔍 Checking server session...')
    fetch('/api/auth/session', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return
        
        if (data.user) {
          console.log('✅ Found server session:', data.user.walletAddress)
          setUser(data.user)
          localStorage.setItem('engrish-user', JSON.stringify(data.user))
          hasAttemptedRef.current = true
        } else {
          console.log('❌ No server session found')
        }
      })
      .catch((err) => {
        if (!isMounted) return
        console.error('Session check error:', err)
      })
      .finally(() => {
        if (!isMounted) return
        console.log('✅ Session check complete')
        setSessionChecked(true) // Mark as checked
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
        credentials: 'include', // CRITICAL: Ensure cookies are set
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
      
      // Save to localStorage for persistence
      localStorage.setItem('engrish-user', JSON.stringify(data.user))
      
      // Set user and mark as authenticated to prevent re-auth
      setUser(data.user)
      hasAttemptedRef.current = true

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
    // CRITICAL: Wait for session check to complete
    if (!sessionChecked) {
      return
    }

    // If already authenticated, never trigger
    if (authenticated) {
      console.log('✅ Already authenticated, skipping auto-auth')
      return
    }

    // Wallet not connected or not ready
    if (!connected || !publicKey || !signMessage) {
      return
    }

    // Already attempted for this session
    if (hasAttemptedRef.current) {
      console.log('✅ Already attempted auth, skipping')
      return
    }

    // Trigger auth ONCE
    console.log('🔐 Auto-auth: Wallet connected, no session found. Requesting signature...')
    hasAttemptedRef.current = true
    
    setTimeout(() => {
      signInWithWallet()
    }, 500)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionChecked, authenticated, connected, publicKey])

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
      localStorage.removeItem('engrish-user') // Clear localStorage
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

