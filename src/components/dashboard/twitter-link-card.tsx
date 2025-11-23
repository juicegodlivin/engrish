'use client'

import { useState } from 'react'
import { Twitter, Check, X, Loader2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { trpc } from '~/lib/trpc'

export function TwitterLinkCard() {
  const [username, setUsername] = useState('')
  const utils = trpc.useContext()

  const { data: profile, isLoading } = trpc.user.getProfile.useQuery(undefined, {
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  })
  const isLinked = !!profile?.twitter_username

  const linkMutation = trpc.twitter.linkAccount.useMutation({
    onSuccess: async (data) => {
      // Invalidate all cached queries to refresh UI
      utils.user.getProfile.invalidate()
      utils.user.getUserStats.invalidate()
      utils.leaderboard.getUserRank.invalidate()
      utils.leaderboard.getTopMentioners.invalidate()
      setUsername('')
      
      // Refresh session to get updated avatar
      await fetch('/api/auth/session').then(res => res.json())
      
      // Reload to show updated avatar
      window.location.reload()
      
      if (data.mentionsCount > 0) {
        alert(`✅ Twitter linked! Found ${data.mentionsCount} mentions worth ${data.totalScore} points!`)
      } else {
        alert(`✅ Twitter account linked! Start tweeting about @Engrishcoin to earn points!`)
      }
    },
    onError: (error) => {
      console.error('Link error:', error)
      alert(`❌ Failed to link Twitter: ${error.message}`)
    },
  })

  const unlinkMutation = trpc.twitter.unlinkAccount.useMutation({
    onSuccess: () => {
      utils.user.getProfile.invalidate()
    },
  })

  const syncMutation = trpc.twitter.syncUserMentions.useMutation({
    onSuccess: (data) => {
      // Invalidate cached queries to refresh UI
      utils.user.getUserStats.invalidate()
      utils.leaderboard.getUserRank.invalidate()
      utils.leaderboard.getTopMentioners.invalidate()
      
      if (data.mentionsCount > 0) {
        alert(`✅ Synced ${data.mentionsCount} mentions! Total score: ${data.totalScore} points`)
      } else {
        alert(`✅ Sync complete! No new mentions found. Keep tweeting about @Engrishcoin!`)
      }
    },
    onError: (error) => {
      alert(`❌ Sync failed: ${error.message}`)
    },
  })

  const handleLink = () => {
    if (username.trim()) {
      linkMutation.mutate({ username: username.replace('@', '') })
    }
  }

  const handleUnlink = () => {
    if (confirm('Are you sure you want to unlink your Twitter account?')) {
      unlinkMutation.mutate()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Twitter className="w-5 h-5 text-blue-400" />
          Twitter Account
        </CardTitle>
        <CardDescription>
          Link your Twitter to track mentions and join the leaderboard!
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-16 bg-gray-700 rounded-xl" />
            <div className="h-10 bg-gray-700 rounded-lg" />
          </div>
        ) : isLinked ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-green-500/10 border-2 border-green-500 rounded-xl">
              <Check className="w-5 h-5 text-green-500" />
              <div className="flex-1">
                <p className="font-semibold text-white">
                  @{profile.twitter_username}
                </p>
                <p className="text-sm text-gray-400">Tracking mentions of @Engrishcoin</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => syncMutation.mutate()}
                disabled={syncMutation.isLoading}
                className="flex-1"
              >
                {syncMutation.isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Syncing...
                  </>
                ) : (
                  <>
                    <Twitter className="w-4 h-4 mr-2" />
                    Sync Mentions
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={handleUnlink}
                disabled={unlinkMutation.isLoading}
              >
                <X className="w-4 h-4 mr-2" />
                Unlink
              </Button>
            </div>
            <p className="text-xs text-gray-500 text-center">
              Click &quot;Sync Mentions&quot; to update your score and leaderboard rank
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="twitter-username">Twitter Username</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    @
                  </span>
                  <Input
                    id="twitter-username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="username"
                    className="pl-8"
                    disabled={linkMutation.isLoading}
                  />
                </div>
                <Button
                  onClick={handleLink}
                  disabled={!username.trim() || linkMutation.isLoading}
                >
                  {linkMutation.isLoading ? 'Verifying...' : 'Link'}
                </Button>
              </div>
            </div>
            {linkMutation.error && (
              <p className="text-sm text-red-400">
                Error: {linkMutation.error.message}
              </p>
            )}
            <p className="text-xs text-gray-500">
              We&apos;ll verify your Twitter account and fetch all @Engrishcoin mentions
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

