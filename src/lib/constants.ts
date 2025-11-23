/**
 * Application-wide constants
 */

export const APP_NAME = '$ENGRISH'
export const APP_DESCRIPTION = 'We No Speak Good Engrish But We Speak Moon Language Perfect'

// Social Links
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/Engrishcoin',
  telegram: 'https://t.me/engrish',
  discord: 'https://discord.gg/engrish',
} as const

// Twitter Tracking
export const TWITTER_CONFIG = {
  trackingAccount: '@Engrishcoin', // The account we track mentions for
  searchQuery: '@Engrishcoin OR #Engrishcoin OR $ENGRISH', // Search query for mentions
} as const

// Token Info
export const TOKEN_INFO = {
  symbol: '$ENGRISH',
  name: 'Engrish',
  decimals: 9,
  contractAddress: 'YOUR_CONTRACT_ADDRESS_HERE',
} as const

// Rate Limits
export const RATE_LIMITS = {
  IMAGE_GENERATION: {
    MAX_REQUESTS: 5,
    WINDOW_MS: 60 * 1000, // 1 minute
  },
  API_CALLS: {
    MAX_REQUESTS: 100,
    WINDOW_MS: 60 * 1000, // 1 minute
  },
} as const

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const

// Cache TTLs (in seconds)
export const CACHE_TTL = {
  LEADERBOARD: 600, // 10 minutes
  TWITTER_FEED: 300, // 5 minutes
  USER_STATS: 3600, // 1 hour
  TWITTER_USER: 3600, // 1 hour
} as const

// Image Generation
export const IMAGE_GENERATION = {
  MAX_PROMPT_LENGTH: 500,
  MIN_PROMPT_LENGTH: 10,
  DEFAULT_PROMPT: 'Make picture of doge wearing lambo with text "Much Rich Very Profit" on moon background',
} as const

// Team Members (for landing page)
export const TEAM_MEMBERS = [
  {
    name: 'Chang Wei',
    role: 'CEO',
    description: 'Wake up 3am all day to check chart. Never sleep, only moon.',
    avatar: '/images/team/chang.png',
    twitter: 'https://twitter.com/chang',
  },
  {
    name: 'Rajesh Kumar',
    role: 'CTO',
    description: 'Code website faster than Delhi tummy. 10x developer ser!',
    avatar: '/images/team/rajesh.png',
    twitter: 'https://twitter.com/rajesh',
  },
  {
    name: 'Kim Jong-Un',
    role: 'CMO',
    description: 'Make meme so viral even whale notice! Expert in Korean APY.',
    avatar: '/images/team/kim.png',
    twitter: 'https://twitter.com/kim',
  },
  {
    name: 'Wei Wei',
    role: 'CFO',
    description: 'Never sell, only buy. Have diamond hands from mining bitcoin.',
    avatar: '/images/team/weiwei.png',
    twitter: 'https://twitter.com/weiwei',
  },
] as const

// How to Buy Steps
export const HOW_TO_BUY_STEPS = [
  {
    step: 1,
    title: 'Get Wallet',
    description: 'Phantom or Solflare wallet is download. Very easy ser, even grandma do!',
    icon: 'wallet',
  },
  {
    step: 2,
    title: 'Buy SOL',
    description: 'Buy SOL on DeFi like Jupiter or Raydium. Need SOL for pay gas fee.',
    icon: 'coins',
  },
  {
    step: 3,
    title: 'Connect Wallet',
    description: 'Click "Connect Wallet" button. Approve connection. Trust us!',
    icon: 'link',
  },
  {
    step: 4,
    title: 'Swap for $ENGRISH',
    description: 'Use Jupiter or Raydium to swap SOL for $ENGRISH. Easy peasy!',
    icon: 'repeat',
  },
  {
    step: 5,
    title: 'HODL & Generate Memes',
    description: 'Now official $ENGRISH holder! Generate memes, share Twitter, go moon!',
    icon: 'rocket',
  },
] as const

// Tokenomics
export const TOKENOMICS = {
  totalSupply: '1,000,000,000',
  liquidityPool: '25%',
  community: '10%',
  marketing: '0%',
  team: '0%',
} as const

