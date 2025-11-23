import { StatsOverview } from '~/components/dashboard/stats-overview'
import { TwitterLinkCard } from '~/components/dashboard/twitter-link-card'
import { Button } from '~/components/ui/button'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold font-display text-gradient-red">
            Dashboard
          </h1>
          <p className="text-gray-400 mt-2">
            Welcome back ser! Ready to make some memes?
          </p>
        </div>
        <Link href="/generate">
          <Button size="lg">
            <Sparkles className="w-5 h-5 mr-2" />
            Generate Meme
          </Button>
        </Link>
      </div>

      {/* Stats Overview */}
      <StatsOverview />

      {/* Twitter Linking */}
      <div className="max-w-2xl">
        <TwitterLinkCard />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/generate" className="group">
          <div className="p-6 bg-background-card border-2 border-brand-red-400 rounded-2xl hover:shadow-xl hover:shadow-brand-red-500/30 transition-all cursor-pointer">
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="font-bold text-white mb-2 group-hover:text-brand-red-400">
              Generate Meme
            </h3>
            <p className="text-sm text-gray-400">
              Create new AI-powered memes
            </p>
          </div>
        </Link>

        <Link href="/dashboard/images" className="group">
          <div className="p-6 bg-background-card border-2 border-brand-red-400 rounded-2xl hover:shadow-xl hover:shadow-brand-red-500/30 transition-all cursor-pointer">
            <div className="text-4xl mb-3">🖼️</div>
            <h3 className="font-bold text-white mb-2 group-hover:text-brand-red-400">
              My Images
            </h3>
            <p className="text-sm text-gray-400">
              View your generated memes
            </p>
          </div>
        </Link>

        <Link href="/leaderboard" className="group">
          <div className="p-6 bg-background-card border-2 border-brand-red-400 rounded-2xl hover:shadow-xl hover:shadow-brand-red-500/30 transition-all cursor-pointer">
            <div className="text-4xl mb-3">🏆</div>
            <h3 className="font-bold text-white mb-2 group-hover:text-brand-red-400">
              Leaderboard
            </h3>
            <p className="text-sm text-gray-400">
              Check your Twitter rank
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}

