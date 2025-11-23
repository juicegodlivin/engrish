/**
 * Shared TypeScript types
 */

export interface User {
  id: string
  walletAddress: string
  name?: string
  bio?: string
  avatar?: string
  twitterId?: string
  twitterUsername?: string
  twitterLinkedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface GeneratedImage {
  id: string
  userId: string
  prompt: string
  imageUrl: string
  replicateId?: string
  isPublic: boolean
  sharedToTwitter: boolean
  createdAt: Date
  user?: {
    name?: string
    avatar?: string
    walletAddress: string
  }
}

export interface TwitterMention {
  id: string
  twitterUserId: string
  twitterUsername: string
  tweetId: string
  tweetText: string
  tweetUrl: string
  mentionCount: number
  createdAt: Date
  indexedAt: Date
}

export interface UserStats {
  userId: string
  imagesGenerated: number
  imagesShared: number
  twitterMentions: number
  leaderboardRank?: number
  updatedAt: Date
}

export interface LeaderboardEntry {
  rank: number
  userId: string
  username: string
  mentionCount: number
  avatar?: string
}

export interface Tweet {
  id: string
  text: string
  authorId: string
  author: {
    id: string
    username: string
    name: string
    profileImageUrl?: string
  }
  createdAt: string
  publicMetrics: {
    likeCount: number
    retweetCount: number
    replyCount: number
  }
  url: string
  hasImage?: boolean
  hasVideo?: boolean
  score?: number
}

export interface WalletContextType {
  publicKey: string | null
  connected: boolean
  connecting: boolean
  disconnecting: boolean
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  signMessage: (message: Uint8Array) => Promise<Uint8Array>
}

export interface PaginatedResponse<T> {
  items: T[]
  nextCursor?: string
  hasMore: boolean
  total?: number
}

// API Response types
export type ApiResponse<T> = 
  | { success: true; data: T }
  | { success: false; error: string }

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

// Theme
export type Theme = 'dark' | 'light'

