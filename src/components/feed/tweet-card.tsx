import { ExternalLink, Heart, Repeat2, MessageCircle } from 'lucide-react'
import { Card, CardContent } from '~/components/ui/card'
import { formatRelativeTime } from '~/lib/utils'
import type { Tweet } from '~/types'

interface TweetCardProps {
  tweet: Tweet
}

export function TweetCard({ tweet }: TweetCardProps) {
  return (
    <Card className="hover:shadow-xl hover:shadow-brand-red-500/20 transition-all">
      <CardContent className="p-6">
        {/* Author */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {tweet.author.name[0]}
            </div>
            <div>
              <p className="font-bold text-white">{tweet.author.name}</p>
              <p className="text-sm text-gray-400">@{tweet.author.username}</p>
            </div>
          </div>
          <a
            href={tweet.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-brand-red-400 transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>

        {/* Tweet Text */}
        <p className="text-white text-lg mb-4 leading-relaxed">{tweet.text}</p>

        {/* Metadata */}
        <div className="flex items-center justify-between text-sm text-gray-400 border-t border-gray-700 pt-4">
          <span>{formatRelativeTime(tweet.createdAt)}</span>

          {/* Engagement Stats */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>{tweet.publicMetrics.likeCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <Repeat2 className="w-4 h-4" />
              <span>{tweet.publicMetrics.retweetCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              <span>{tweet.publicMetrics.replyCount}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

