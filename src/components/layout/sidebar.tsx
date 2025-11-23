'use client'

import Link from 'next/link'
import NextImage from 'next/image'
import { usePathname } from 'next/navigation'
import { Home, Image, Trophy, Settings, LogOut, Sparkles, LayoutDashboard, ArrowLeft } from 'lucide-react'
import { useAuth } from '~/hooks/use-auth'
import { cn, formatWalletAddress } from '~/lib/utils'
import { Button } from '~/components/ui/button'

const navigation = [
  { name: 'Back to Home', href: '/', icon: ArrowLeft },
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Generate', href: '/generate', icon: Sparkles },
  { name: 'My Images', href: '/dashboard/images', icon: Image },
  { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
  { name: 'Profile', href: '/dashboard/profile', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, publicKey, logout } = useAuth()

  return (
    <aside className="w-64 bg-black/40 backdrop-blur-md border-r-2 border-brand-red-400/30 flex flex-col">
      {/* User Info */}
      <div className="p-6 border-b border-brand-red-400/30">
        <div className="flex items-center gap-3 mb-2">
          {user?.image ? (
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand-red-400 relative">
              <NextImage
                src={user.image}
                alt={user.name || 'User'}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 bg-gradient-to-br from-brand-red-400 to-brand-red-600 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-white">
                {user?.name?.[0] || publicKey?.[0] || '?'}
              </span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-white truncate">
              {user?.name || 'Anon User'}
            </p>
            {publicKey && (
              <p className="text-xs text-gray-400 truncate">
                {formatWalletAddress(publicKey)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium',
                isActive
                  ? 'bg-brand-red-500 text-white shadow-lg shadow-brand-red-500/30'
                  : 'text-gray-400 hover:bg-black/30 hover:text-white'
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-brand-red-400/30">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={logout}
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span>Sign Out</span>
        </Button>
      </div>
    </aside>
  )
}

