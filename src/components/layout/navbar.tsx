'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Menu, X } from 'lucide-react'
import { APP_NAME } from '~/lib/constants'
import { cn } from '~/lib/utils'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { connected } = useWallet()

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const navigation = [
    { name: 'About', href: '#about' },
    { name: 'Tokenomics', href: '#tokenomics' },
    { name: 'Team', href: '#team' },
    { name: 'How to Buy', href: '#how-to-buy' },
    { name: 'Gallery', href: '#gallery' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-brand-red-400/30" suppressHydrationWarning>
      <div className="container-custom" suppressHydrationWarning>
        <div className="flex items-center justify-between h-20" suppressHydrationWarning>
          {/* Logo */}
          <div className="flex items-center" suppressHydrationWarning>
            <a href="/" className="flex items-center space-x-3 group" suppressHydrationWarning>
              <Image
                src="/images/Engrish Logo.png"
                alt="$ENGRISH Logo"
                width={48}
                height={48}
                className="drop-shadow-lg group-hover:scale-105 transition-transform"
              />
              <span className="text-2xl font-bold font-display text-gradient-red group-hover:scale-105 transition-transform">
                {APP_NAME}
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8" suppressHydrationWarning>
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-brand-red-400 transition-colors font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Dashboard Button (when connected) & Wallet Button & Mobile Menu */}
          <div className="flex items-center space-x-4 min-h-[44px]" suppressHydrationWarning>
            {mounted && connected && (
              <a
                href="/dashboard"
                className="hidden lg:flex items-center gap-2 px-6 py-2.5 bg-background-card border-2 border-brand-gold-400 text-brand-gold-400 hover:bg-brand-gold-400 hover:text-black rounded-xl font-semibold transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Dashboard
              </a>
            )}
            {mounted ? (
              <WalletMultiButton className="!bg-gradient-to-r !from-brand-red-400 !to-brand-red-600 hover:!from-brand-red-500 hover:!to-brand-red-700 !rounded-xl !font-semibold !transition-all !shadow-lg hover:!shadow-brand-red-500/50" />
            ) : (
              <div className="h-11 w-32 bg-background-card/50 rounded-xl animate-pulse" />
            )}
            
            {/* Mobile menu button */}
            {mounted && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-background-card transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-2 border-t border-brand-red-500/20">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-2 px-4 text-gray-300 hover:text-brand-red-400 hover:bg-background-card rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

