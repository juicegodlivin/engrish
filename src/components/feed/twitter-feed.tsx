'use client'

import { trpc } from '~/lib/trpc'
import { LoadingSpinner } from '~/components/ui/loading-spinner'
import { TweetCard } from './tweet-card'
import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'

export function TwitterFeed() {
  const { data: tweets, isLoading } = trpc.twitter.getGlobalFeed.useQuery({
    maxResults: 50,
  })
  const utils = trpc.useContext()

  const refreshMutation = trpc.twitter.refreshFeed.useMutation({
    onSuccess: () => {
      utils.twitter.getGlobalFeed.invalidate()
    },
  })

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Loading tweets very fast..." />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold font-display text-gradient-red">
            🐦 GLOBAL ENGRISH FEED 🐦
          </h2>
          <p className="text-gray-400 mt-2">
            All tweets mentioning @ENGRISH (updates every 5 minutes)
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

      {/* Tweet List */}
      <div className="space-y-4">
        {tweets && tweets.length > 0 ? (
          tweets.map((tweet) => <TweetCard key={tweet.id} tweet={tweet} />)
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-6xl mb-4">🐦</div>
              <p className="text-xl text-gray-400 mb-2">
                No tweets found ser!
              </p>
              <p className="text-sm text-gray-500">
                Be the first to mention @ENGRISH on Twitter!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

