'use client'

import React from 'react'
import Image from 'next/image'
import { Trophy, ChevronLeft, ChevronRight } from 'lucide-react'
import { trpc } from '~/lib/trpc'
import { LoadingSpinner } from '~/components/ui/loading-spinner'
import { Card, CardContent } from '~/components/ui/card'
import { Button} from '~/components/ui/button'

type LeaderboardEntry = {
  twitter_user_id: string
  twitter_username: string
  mention_count: number
  rank: number
}

export function LeaderboardTable() {
  const [page, setPage] = React.useState(1)
  const { data, isLoading, refetch } = trpc.leaderboard.getTopMentioners.useQuery({ page, limit: 50 })
  const { data: userRank } = trpc.leaderboard.getUserRank.useQuery()
  const utils = trpc.useContext()

  const refreshMutation = trpc.leaderboard.refreshLeaderboard.useMutation({
    onSuccess: () => {
      utils.leaderboard.getTopMentioners.invalidate()
      utils.leaderboard.getUserRank.invalidate()
    },
  })

  const leaderboard: LeaderboardEntry[] = (data?.items as LeaderboardEntry[]) || []
  const totalPages = data?.totalPages || 1
  const totalUsers = data?.totalUsers || 0

  // DEBUG
  if (leaderboard && leaderboard.length > 0) {
    console.log('🏆 Frontend leaderboard data:', leaderboard.map(e => ({
      rank: e.rank,
      username: e.username,
      avatar: e.avatar,
      name: e.name
    })))
  }

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Loading leaderboard..." />
  }

  return (
    <div className="space-y-6">
      {/* Header with Refresh */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold font-display text-gradient-red">
            🏆 TOP ENGRISH WARRIORS 🏆
          </h2>
          <p className="text-gray-400 mt-2">
            Ranked by total points for mentioning @Engrishcoin
          </p>
          <p className="text-sm text-gray-500 mt-1">
            10 pts/tweet + 5 for images + 10 for videos • Top 50
          </p>
        </div>
        <Button
          variant="secondary"
          onClick={() => refreshMutation.mutate()}
          disabled={refreshMutation.isLoading}
        >
          {refreshMutation.isLoading ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>

      {/* User's Rank Card */}
      {userRank && userRank.rank && (
        <Card className="bg-brand-gold-500/10 border-brand-gold-400">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Your Rank</p>
                <p className="text-3xl font-bold text-brand-gold-400">
                  #{userRank.rank}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-1">Total Score</p>
                <p className="text-3xl font-bold text-brand-gold-400">
                  {userRank.totalScore || 0}
                </p>
                <p className="text-xs text-gray-500">points</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400 mb-1">Mentions</p>
                <p className="text-3xl font-bold text-white">
                  {userRank.mentionCount}
                </p>
                <p className="text-xs text-gray-500">tweets</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Leaderboard List */}
      <div className="space-y-3">
        {leaderboard && leaderboard.length > 0 ? (
          leaderboard.map((entry) => {
            const medalColors = {
              1: 'from-brand-gold-400 to-brand-gold-600',
              2: 'from-gray-300 to-gray-500',
              3: 'from-orange-400 to-orange-600',
            }
            const isTopThree = entry.rank <= 3
            const medalGradient = medalColors[entry.rank as keyof typeof medalColors]

            return (
              <Card
                key={entry.userId}
                className={`transition-all hover:scale-[1.02] ${
                  isTopThree ? 'border-brand-gold-400 shadow-lg shadow-brand-gold-500/20' : ''
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    {/* Rank Number - BIG AND CLEAR */}
                    <div className={`text-5xl font-bold w-20 text-center flex-shrink-0 ${isTopThree ? 'text-brand-gold-400' : 'text-gray-500'}`}>
                      #{entry.rank}
                    </div>

                    {/* Avatar - Twitter Profile Picture */}
                    <div className="relative flex-shrink-0">
                      {(entry.avatar && entry.avatar !== 'null' && entry.avatar !== '') ? (
                        <div className={`w-16 h-16 rounded-full overflow-hidden relative ${
                          isTopThree ? 'ring-4 ring-brand-gold-400 shadow-xl shadow-brand-gold-500/30' : 'ring-2 ring-gray-600'
                        }`}>
                          <Image
                            src={entry.avatar}
                            alt={entry.name || entry.username}
                            fill
                            className="object-cover"
                            unoptimized
                            onError={(e) => {
                              console.error('Image load error for:', entry.username, entry.avatar)
                              e.currentTarget.style.display = 'none'
                            }}
                          />
                        </div>
                      ) : (
                        <div className={`w-16 h-16 bg-gradient-to-br from-brand-red-400 to-brand-red-600 rounded-full flex items-center justify-center ${
                          isTopThree ? 'ring-4 ring-brand-gold-400' : 'ring-2 ring-gray-600'
                        }`}>
                          <span className="text-2xl font-bold text-white">
                            {entry.username?.[0]?.toUpperCase() || '?'}
                          </span>
                        </div>
                      )}
                      {isTopThree && (
                        <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-br ${medalGradient} flex items-center justify-center border-2 border-black`}>
                          <Trophy className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                      <p className="text-xl font-bold text-white">
                        {entry.name || entry.username}
                      </p>
                      <p className="text-sm text-gray-400">
                        @{entry.username} • {isTopThree ? getRankTitle(entry.rank) : 'Respected Member'}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-8">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-brand-gold-400">
                          {entry.totalScore || entry.mentionCount * 10}
                        </p>
                        <p className="text-xs text-gray-400">points</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">
                          {entry.mentionCount}
                        </p>
                        <p className="text-xs text-gray-400">mentions</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-400">No leaderboard data yet. Start mentioning @ENGRISH on Twitter!</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <Button
            variant="secondary"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <div className="text-gray-400">
            Page {page} of {totalPages} • {totalUsers} total warriors
          </div>
          
          <Button
            variant="secondary"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  )
}

function getRankTitle(rank: number): string {
  switch (rank) {
    case 1:
      return 'SUPREME ENGRISH EMPEROR 👑'
    case 2:
      return 'DIAMOND TONGUE WARRIOR 💎'
    case 3:
      return 'BRONZE LEGEND 🥉'
    default:
      return 'Respected Member'
  }
}

