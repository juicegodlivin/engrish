'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useAuth } from '~/hooks/use-auth'
import { APP_NAME } from '~/lib/constants'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const { authenticated, loading } = useAuth()

  // Redirect if authenticated
  useEffect(() => {
    if (authenticated) {
      router.push('/dashboard')
    }
  }, [authenticated, router])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-background-darker to-background-dark">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-brand-red-400 to-brand-red-600 rounded-full flex items-center justify-center animate-glow mb-6">
            <span className="text-5xl font-bold text-white font-display">E</span>
          </div>
          <h1 className="text-4xl font-bold font-display text-gradient-red mb-2">
            Welcome to {APP_NAME}
          </h1>
          <p className="text-gray-400 text-lg">
            Connect wallet to start generating memes!
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-background-card border-2 border-brand-red-400 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Sign In to Continue
          </h2>

          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-brand-red-400" />
              <span className="ml-3 text-gray-400">Authenticating...</span>
            </div>
          )}

          {!loading && (
            <div className="space-y-6">
              {/* Wallet Connect */}
              <div className="flex flex-col items-center">
                <p className="text-sm text-gray-400 mb-4 text-center">
                  Connect your Solana wallet to sign in
                </p>
                <WalletMultiButton className="!bg-gradient-to-r !from-brand-red-400 !to-brand-red-600 hover:!from-brand-red-500 hover:!to-brand-red-700 !rounded-xl !font-semibold !transition-all !shadow-lg hover:!shadow-brand-red-500/50 !px-8 !py-4 !text-lg" />
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background-card text-gray-500">
                    Why connect wallet?
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-start">
                  <span className="text-brand-gold-400 mr-2">✓</span>
                  <span>Generate AI memes for free (first 5/day)</span>
                </div>
                <div className="flex items-start">
                  <span className="text-brand-gold-400 mr-2">✓</span>
                  <span>Compete on the leaderboard</span>
                </div>
                <div className="flex items-start">
                  <span className="text-brand-gold-400 mr-2">✓</span>
                  <span>Link Twitter and track mentions</span>
                </div>
                <div className="flex items-start">
                  <span className="text-brand-gold-400 mr-2">✓</span>
                  <span>Your wallet = your identity (no emails!)</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-8">
          By connecting, you agree we make very good memes ser! 🔥
        </p>
      </div>
    </div>
  )
}

