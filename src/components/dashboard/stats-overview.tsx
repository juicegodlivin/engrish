'use client'

import { Image, Share2, Trophy, Twitter } from 'lucide-react'
import { Card, CardContent } from '~/components/ui/card'
import { trpc } from '~/lib/trpc'
import type { Database } from '~/types/database'

type UserStats = Database['public']['Tables']['user_stats']['Row']

// Loading skeleton for stats
function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="animate-pulse">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-gray-700 rounded-xl mb-4" />
            <div className="h-8 w-16 bg-gray-700 rounded mb-2" />
            <div className="h-4 w-24 bg-gray-700 rounded" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function StatsOverview() {
  const { data: statsData, isLoading } = trpc.user.getUserStats.useQuery(undefined, {
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  })
  const { data: rankData, isLoading: rankLoading } = trpc.leaderboard.getUserRank.useQuery(undefined, {
    staleTime: 10 * 60 * 1000, // Cache rank for 10 minutes
  })
  
  const stats: UserStats | undefined = statsData as UserStats | undefined
  const rank = rankData as { rank: number | null } | undefined

  // Show skeleton on initial load only
  if (isLoading && !stats) {
    return <StatsSkeleton />
  }

  const statCards = [
    {
      title: 'Images Generated',
      value: stats?.images_generated || 0,
      icon: Image,
      color: 'from-brand-red-400 to-brand-red-600',
      loading: false,
    },
    {
      title: 'Images Shared',
      value: stats?.images_shared || 0,
      icon: Share2,
      color: 'from-brand-gold-400 to-brand-gold-600',
      loading: false,
    },
    {
      title: 'Twitter Mentions',
      value: stats?.twitter_mentions || 0,
      icon: Twitter,
      color: 'from-blue-400 to-blue-600',
      loading: false,
    },
    {
      title: 'Leaderboard Rank',
      value: rankLoading ? '...' : rank?.rank ? `#${rank.rank}` : 'N/A',
      icon: Trophy,
      color: 'from-purple-400 to-purple-600',
      loading: rankLoading,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className="transition-all hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className={`text-3xl font-bold text-white mb-1 ${stat.loading ? 'animate-pulse' : ''}`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.title}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

