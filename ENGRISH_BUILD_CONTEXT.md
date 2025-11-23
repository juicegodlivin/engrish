# 🔥 $ENGRISH - COMPLETE PROJECT CONTEXT & BUILD SPECIFICATION

## 📋 PROJECT OVERVIEW

**Project Name:** $ENGRISH - The Meme Coin Website with AI Image Generator
**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, tRPC, Supabase, NextAuth, Upstash Redis, Replicate AI
**Purpose:** Full-featured crypto meme coin website with user authentication, AI image generation, Twitter integration, and community features

---

## 🎯 CORE FEATURES

### 1. **Main Landing Pages**
- Hero section with custom red fan background
- About/History section with Engrish storytelling
- Live tokenomics stats
- Team member profiles
- How to buy guide
- Meme gallery
- Social links

### 2. **AI Image Generator** 
- Authenticated users can generate custom meme images
- Powered by Replicate.com custom model
- Download and share to socials
- Gallery of user-generated images

### 3. **User System**
- NextAuth authentication (Email, Twitter OAuth)
- User dashboard
- Profile management
- Twitter account linking
- Generated images library

### 4. **Twitter Integration**
- Link Twitter account in dashboard
- Leaderboard tracking mentions of $ENGRISH
- Global feed showing all tweets mentioning @ENGRISH
- Real-time updates using twitterapi.io

### 5. **Community Features**
- Leaderboard (top mentioners)
- Global tweet feed
- Share-to-Twitter functionality
- Social proof metrics

---

## 🏗️ TECH STACK DETAILS

### **Frontend**
```
- Next.js 14 (App Router with TypeScript)
- React 18
- Tailwind CSS 3.4+
- Framer Motion (animations)
- React Hook Form + Zod (forms)
- Radix UI (accessible components)
- Lucide React (icons)
```

### **Backend & API**
```
- tRPC v10 (type-safe API)
- Next.js API Routes
- Server Actions
- Zod (validation)
```

### **Database & Auth**
```
- Supabase (PostgreSQL database)
- NextAuth v5 (authentication)
- Supabase Auth (optional secondary)
- Upstash Redis (caching, rate limiting, sessions)
```

### **External APIs**
```
- Replicate.com (AI image generation)
- twitterapi.io (Twitter data & OAuth)
- Solana Web3.js (optional blockchain data)
```

### **Deployment**
```
- Vercel (hosting)
- Supabase Cloud (database)
- Upstash (Redis)
```

---

## 📁 PROJECT STRUCTURE

```
$engrish-website/
├── src/
│   ├── app/
│   │   ├── (marketing)/
│   │   │   ├── page.tsx                    # Landing page
│   │   │   ├── about/page.tsx              # About/History
│   │   │   └── how-to-buy/page.tsx         # Guide
│   │   ├── (platform)/
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx                # User dashboard
│   │   │   │   ├── profile/page.tsx        # Profile settings
│   │   │   │   └── images/page.tsx         # User's generated images
│   │   │   ├── generate/
│   │   │   │   └── page.tsx                # AI image generator
│   │   │   └── leaderboard/
│   │   │       └── page.tsx                # Twitter mentions leaderboard
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/
│   │   │   │   └── route.ts                # NextAuth config
│   │   │   ├── trpc/[trpc]/
│   │   │   │   └── route.ts                # tRPC handler
│   │   │   └── webhooks/
│   │   │       └── twitter/route.ts        # Twitter webhook
│   │   ├── layout.tsx                      # Root layout
│   │   ├── globals.css                     # Global styles
│   │   └── providers.tsx                   # Client providers
│   ├── components/
│   │   ├── landing/
│   │   │   ├── hero-section.tsx
│   │   │   ├── stats-bar.tsx
│   │   │   ├── about-section.tsx
│   │   │   ├── tokenomics-section.tsx
│   │   │   ├── team-section.tsx
│   │   │   ├── how-to-buy-section.tsx
│   │   │   └── meme-gallery.tsx
│   │   ├── generator/
│   │   │   ├── image-generator-form.tsx
│   │   │   ├── generation-result.tsx
│   │   │   └── prompt-suggestions.tsx
│   │   ├── dashboard/
│   │   │   ├── twitter-link-card.tsx
│   │   │   ├── stats-overview.tsx
│   │   │   └── recent-generations.tsx
│   │   ├── leaderboard/
│   │   │   ├── leaderboard-table.tsx
│   │   │   └── leaderboard-card.tsx
│   │   ├── feed/
│   │   │   ├── twitter-feed.tsx
│   │   │   └── tweet-card.tsx
│   │   ├── ui/                             # Reusable UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...
│   │   └── layout/
│   │       ├── navbar.tsx
│   │       ├── footer.tsx
│   │       └── sidebar.tsx
│   ├── server/
│   │   ├── api/
│   │   │   ├── root.ts                     # tRPC root router
│   │   │   ├── trpc.ts                     # tRPC setup
│   │   │   └── routers/
│   │   │       ├── user.ts                 # User operations
│   │   │       ├── image.ts                # Image generation
│   │   │       ├── twitter.ts              # Twitter operations
│   │   │       └── leaderboard.ts          # Leaderboard data
│   │   ├── db/
│   │   │   ├── client.ts                   # Supabase client
│   │   │   └── schema.ts                   # Database types
│   │   └── services/
│   │       ├── replicate.ts                # Replicate AI service
│   │       ├── twitter.ts                  # Twitter API service
│   │       └── redis.ts                    # Redis cache service
│   ├── lib/
│   │   ├── utils.ts                        # Helper functions
│   │   ├── constants.ts                    # App constants
│   │   └── validations.ts                  # Zod schemas
│   ├── hooks/
│   │   ├── use-user.ts                     # User hook
│   │   ├── use-twitter.ts                  # Twitter hook
│   │   └── use-image-generator.ts          # Generator hook
│   └── types/
│       ├── index.ts                        # Shared types
│       ├── database.ts                     # Database types
│       └── api.ts                          # API types
├── public/
│   ├── images/
│   │   ├── background-fan.png              # Custom red fan bg
│   │   ├── logo-seal.svg                   # Red seal logo
│   │   ├── logo-minimal.svg                # Minimal logo
│   │   └── logo-full.svg                   # Full logo
│   └── fonts/                              # Custom fonts if needed
├── prisma/                                 # Optional: Prisma schema
│   └── schema.prisma
├── .env.local                              # Environment variables
├── .env.example                            # Example env file
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🔐 ENVIRONMENT VARIABLES

Create `.env.local` with:

```bash
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=$ENGRISH

# Database - Supabase
DATABASE_URL=postgresql://...
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Auth - NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here (generate with: openssl rand -base64 32)

# Twitter OAuth
TWITTER_CLIENT_ID=your-twitter-client-id
TWITTER_CLIENT_SECRET=your-twitter-client-secret

# Twitter API - twitterapi.io
TWITTER_API_KEY=your-twitterapi-io-key
TWITTER_API_BASE_URL=https://api.twitterapi.io/v1

# Replicate AI
REPLICATE_API_TOKEN=your-replicate-token
REPLICATE_MODEL_VERSION=your-custom-model-version

# Redis - Upstash
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-redis-token

# Rate Limiting
RATE_LIMIT_WINDOW=60000          # 1 minute in ms
RATE_LIMIT_MAX_REQUESTS=10       # Max requests per window

# Optional: Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 🗄️ DATABASE SCHEMA (Supabase)

### **Tables**

```sql
-- Users table (extends NextAuth)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  image TEXT,
  twitter_id VARCHAR(255) UNIQUE,
  twitter_username VARCHAR(255),
  twitter_linked_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Sessions table (NextAuth)
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_token VARCHAR(255) UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  expires TIMESTAMP NOT NULL
);

-- Accounts table (NextAuth - OAuth)
CREATE TABLE accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  provider VARCHAR(50) NOT NULL,
  provider_account_id VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at INTEGER,
  token_type VARCHAR(50),
  scope TEXT,
  id_token TEXT,
  session_state TEXT,
  UNIQUE(provider, provider_account_id)
);

-- Generated Images table
CREATE TABLE generated_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  image_url TEXT NOT NULL,
  replicate_id VARCHAR(255),
  is_public BOOLEAN DEFAULT true,
  shared_to_twitter BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Twitter Mentions table (for leaderboard)
CREATE TABLE twitter_mentions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  twitter_user_id VARCHAR(255) NOT NULL,
  twitter_username VARCHAR(255) NOT NULL,
  tweet_id VARCHAR(255) UNIQUE NOT NULL,
  tweet_text TEXT,
  tweet_url TEXT,
  mention_count INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  indexed_at TIMESTAMP DEFAULT NOW()
);

-- User Stats table (cached aggregates)
CREATE TABLE user_stats (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  images_generated INTEGER DEFAULT 0,
  images_shared INTEGER DEFAULT 0,
  twitter_mentions INTEGER DEFAULT 0,
  leaderboard_rank INTEGER,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_users_twitter_id ON users(twitter_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_generated_images_user_id ON generated_images(user_id);
CREATE INDEX idx_generated_images_created_at ON generated_images(created_at DESC);
CREATE INDEX idx_twitter_mentions_username ON twitter_mentions(twitter_username);
CREATE INDEX idx_twitter_mentions_created_at ON twitter_mentions(created_at DESC);
```

### **Row Level Security (RLS)**

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Users can read their own images
CREATE POLICY "Users can read own images" ON generated_images
  FOR SELECT USING (auth.uid() = user_id);

-- Users can create images
CREATE POLICY "Users can create images" ON generated_images
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Anyone can read public images
CREATE POLICY "Public images are viewable" ON generated_images
  FOR SELECT USING (is_public = true);
```

---

## 🎨 DESIGN SYSTEM

### **Color Palette**

```typescript
// tailwind.config.ts - Add to theme.extend.colors
colors: {
  brand: {
    red: {
      50: '#FFE5E5',
      100: '#FFB8B8',
      200: '#FF8A8A',
      300: '#FF5C5C',
      400: '#FF4444',  // Primary Dragon Red
      500: '#DD2222',  // Deep Fire Red
      600: '#CC1111',  // Blood Moon Red
      700: '#AA0000',
      800: '#880000',
      900: '#660000',
    },
    gold: {
      50: '#FFFEF0',
      100: '#FFFACD',
      200: '#FFF59D',
      300: '#FFEE58',
      400: '#FFD700',  // Imperial Gold
      500: '#FFA500',
      600: '#FF8C00',
      700: '#FF7700',
      800: '#FF6600',
      900: '#FF5500',
    },
  },
  background: {
    dark: '#1a1a1a',    // Midnight Black
    darker: '#0a0a0a',
    card: '#2a2a2a',    // Shadow Gray
  },
}
```

### **Typography**

```typescript
// tailwind.config.ts - Add to theme.extend
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  display: ['Poppins', 'sans-serif'],
  mono: ['JetBrains Mono', 'monospace'],
},
fontSize: {
  'display-1': ['7rem', { lineHeight: '1', fontWeight: '700' }],
  'display-2': ['5rem', { lineHeight: '1.1', fontWeight: '700' }],
  'display-3': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
}
```

### **Component Styles**

```typescript
// Button variants
const buttonVariants = {
  primary: 'bg-gradient-to-r from-brand-red-400 to-brand-red-500 hover:from-brand-red-500 hover:to-brand-red-600 text-white shadow-lg shadow-brand-red-400/30',
  secondary: 'border-2 border-brand-red-400 text-brand-red-400 hover:bg-brand-red-400 hover:text-white',
  gold: 'bg-gradient-to-r from-brand-gold-400 to-brand-gold-500 text-black hover:from-brand-gold-500 hover:to-brand-gold-600',
}

// Card styles
const cardStyles = 'bg-background-card border-2 border-brand-red-400 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-brand-red-500/30 transition-all'
```

### **Animations**

```css
/* globals.css - Add custom animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px rgba(255, 68, 68, 0.5); }
  50% { box-shadow: 0 0 40px rgba(255, 68, 68, 0.8); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-glow {
  animation: glow 2s ease-in-out infinite;
}
```

---

## 🔌 API INTEGRATION DETAILS

### **1. Replicate AI Integration**

```typescript
// src/server/services/replicate.ts
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function generateImage(prompt: string) {
  const output = await replicate.run(
    process.env.REPLICATE_MODEL_VERSION as `${string}/${string}:${string}`,
    {
      input: {
        prompt: prompt,
        // Add your custom model parameters
        num_outputs: 1,
        quality: "standard",
      }
    }
  );
  
  return output;
}

export async function getGenerationStatus(predictionId: string) {
  const prediction = await replicate.predictions.get(predictionId);
  return prediction;
}
```

### **2. Twitter API Integration (twitterapi.io)**

```typescript
// src/server/services/twitter.ts
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const TWITTER_API_BASE = process.env.TWITTER_API_BASE_URL;
const TWITTER_API_KEY = process.env.TWITTER_API_KEY;

interface TwitterUser {
  id: string;
  username: string;
  name: string;
  profile_image_url: string;
}

interface Tweet {
  id: string;
  text: string;
  author_id: string;
  created_at: string;
  public_metrics: {
    like_count: number;
    retweet_count: number;
    reply_count: number;
  };
}

// Get user by username
export async function getTwitterUser(username: string): Promise<TwitterUser> {
  const cacheKey = `twitter:user:${username}`;
  const cached = await redis.get(cacheKey);
  
  if (cached) return cached as TwitterUser;
  
  const response = await fetch(
    `${TWITTER_API_BASE}/users/by/username/${username}`,
    {
      headers: {
        'Authorization': `Bearer ${TWITTER_API_KEY}`,
      },
    }
  );
  
  const data = await response.json();
  await redis.set(cacheKey, data.data, { ex: 3600 }); // Cache 1 hour
  return data.data;
}

// Search tweets mentioning @ENGRISH
export async function searchMentions(query: string = '@ENGRISH', maxResults: number = 100) {
  const response = await fetch(
    `${TWITTER_API_BASE}/tweets/search/recent?query=${encodeURIComponent(query)}&max_results=${maxResults}&tweet.fields=created_at,public_metrics&expansions=author_id`,
    {
      headers: {
        'Authorization': `Bearer ${TWITTER_API_KEY}`,
      },
    }
  );
  
  const data = await response.json();
  return data;
}

// Get user's tweets
export async function getUserTweets(userId: string, maxResults: number = 10) {
  const response = await fetch(
    `${TWITTER_API_BASE}/users/${userId}/tweets?max_results=${maxResults}&tweet.fields=created_at,public_metrics`,
    {
      headers: {
        'Authorization': `Bearer ${TWITTER_API_KEY}`,
      },
    }
  );
  
  const data = await response.json();
  return data;
}

// Build leaderboard from mentions
export async function buildLeaderboard() {
  const mentions = await searchMentions('@ENGRISH', 100);
  
  const userMentionCounts = new Map<string, number>();
  
  mentions.data?.forEach((tweet: Tweet) => {
    const authorId = tweet.author_id;
    userMentionCounts.set(authorId, (userMentionCounts.get(authorId) || 0) + 1);
  });
  
  const leaderboard = Array.from(userMentionCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 50);
  
  return leaderboard;
}
```

### **3. Redis Caching Strategy**

```typescript
// src/server/services/redis.ts
import { Redis } from '@upstash/redis';

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Cache keys
export const CACHE_KEYS = {
  LEADERBOARD: 'leaderboard:global',
  TWITTER_FEED: 'twitter:feed:global',
  USER_STATS: (userId: string) => `user:stats:${userId}`,
  TWITTER_USER: (username: string) => `twitter:user:${username}`,
  RATE_LIMIT: (ip: string) => `rate_limit:${ip}`,
};

// Rate limiting
export async function checkRateLimit(identifier: string, max: number = 10, window: number = 60000) {
  const key = CACHE_KEYS.RATE_LIMIT(identifier);
  const current = await redis.get(key) as number | null;
  
  if (current && current >= max) {
    return { success: false, remaining: 0 };
  }
  
  const newCount = await redis.incr(key);
  if (newCount === 1) {
    await redis.expire(key, Math.floor(window / 1000));
  }
  
  return { success: true, remaining: max - newCount };
}

// Cache helpers
export async function getCached<T>(key: string, fallback: () => Promise<T>, ttl: number = 3600): Promise<T> {
  const cached = await redis.get(key);
  if (cached) return cached as T;
  
  const fresh = await fallback();
  await redis.set(key, fresh, { ex: ttl });
  return fresh;
}
```

---

## 🛠️ tRPC ROUTER SETUP

### **Root Router**

```typescript
// src/server/api/root.ts
import { createTRPCRouter } from './trpc';
import { userRouter } from './routers/user';
import { imageRouter } from './routers/image';
import { twitterRouter } from './routers/twitter';
import { leaderboardRouter } from './routers/leaderboard';

export const appRouter = createTRPCRouter({
  user: userRouter,
  image: imageRouter,
  twitter: twitterRouter,
  leaderboard: leaderboardRouter,
});

export type AppRouter = typeof appRouter;
```

### **Image Router**

```typescript
// src/server/api/routers/image.ts
import { z } from 'zod';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import { generateImage } from '~/server/services/replicate';

export const imageRouter = createTRPCRouter({
  generate: protectedProcedure
    .input(z.object({
      prompt: z.string().min(10).max(500),
    }))
    .mutation(async ({ ctx, input }) => {
      // Check rate limit
      const rateLimitKey = `generate:${ctx.session.user.id}`;
      const rateLimit = await checkRateLimit(rateLimitKey, 5, 60000); // 5 per minute
      
      if (!rateLimit.success) {
        throw new TRPCError({ code: 'TOO_MANY_REQUESTS' });
      }
      
      // Generate image
      const result = await generateImage(input.prompt);
      
      // Save to database
      const image = await ctx.db.generatedImages.create({
        data: {
          userId: ctx.session.user.id,
          prompt: input.prompt,
          imageUrl: result.output[0],
          replicateId: result.id,
        },
      });
      
      return image;
    }),
    
  getUserImages: protectedProcedure
    .input(z.object({
      limit: z.number().min(1).max(100).default(20),
      cursor: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      const images = await ctx.db.generatedImages.findMany({
        where: { userId: ctx.session.user.id },
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: 'desc' },
      });
      
      let nextCursor: string | undefined = undefined;
      if (images.length > input.limit) {
        const nextItem = images.pop();
        nextCursor = nextItem?.id;
      }
      
      return { images, nextCursor };
    }),
    
  getPublicGallery: publicProcedure
    .input(z.object({
      limit: z.number().min(1).max(100).default(20),
    }))
    .query(async ({ ctx, input }) => {
      const images = await ctx.db.generatedImages.findMany({
        where: { isPublic: true },
        take: input.limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { name: true, image: true },
          },
        },
      });
      
      return images;
    }),
});
```

### **Twitter Router**

```typescript
// src/server/api/routers/twitter.ts
import { z } from 'zod';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import { getTwitterUser, searchMentions } from '~/server/services/twitter';

export const twitterRouter = createTRPCRouter({
  linkAccount: protectedProcedure
    .input(z.object({
      username: z.string().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      // Verify Twitter account exists
      const twitterUser = await getTwitterUser(input.username);
      
      // Update user record
      await ctx.db.users.update({
        where: { id: ctx.session.user.id },
        data: {
          twitterId: twitterUser.id,
          twitterUsername: twitterUser.username,
          twitterLinkedAt: new Date(),
        },
      });
      
      return { success: true, user: twitterUser };
    }),
    
  getGlobalFeed: publicProcedure
    .input(z.object({
      maxResults: z.number().min(10).max(100).default(50),
    }))
    .query(async ({ input }) => {
      const cacheKey = CACHE_KEYS.TWITTER_FEED;
      
      return getCached(cacheKey, async () => {
        const mentions = await searchMentions('@ENGRISH', input.maxResults);
        return mentions.data || [];
      }, 300); // Cache 5 minutes
    }),
    
  getUserMentions: protectedProcedure
    .query(async ({ ctx }) => {
      const user = await ctx.db.users.findUnique({
        where: { id: ctx.session.user.id },
      });
      
      if (!user?.twitterUsername) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Twitter not linked' });
      }
      
      const mentions = await searchMentions(`from:${user.twitterUsername} @ENGRISH`);
      return mentions.data || [];
    }),
});
```

### **Leaderboard Router**

```typescript
// src/server/api/routers/leaderboard.ts
import { createTRPCRouter, publicProcedure } from '../trpc';
import { buildLeaderboard } from '~/server/services/twitter';

export const leaderboardRouter = createTRPCRouter({
  getTopMentioners: publicProcedure
    .query(async () => {
      const cacheKey = CACHE_KEYS.LEADERBOARD;
      
      return getCached(cacheKey, async () => {
        const leaderboard = await buildLeaderboard();
        
        // Fetch user details for top 50
        const enriched = await Promise.all(
          leaderboard.map(async ([userId, count]) => {
            const mentions = await ctx.db.twitterMentions.findMany({
              where: { twitterUserId: userId },
              orderBy: { createdAt: 'desc' },
              take: 1,
            });
            
            return {
              userId,
              username: mentions[0]?.twitterUsername || 'Unknown',
              mentionCount: count,
            };
          })
        );
        
        return enriched;
      }, 600); // Cache 10 minutes
    }),
});
```

---

## 🎨 KEY COMPONENT IMPLEMENTATIONS

### **Image Generator Component**

```typescript
// src/components/generator/image-generator-form.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api } from '~/lib/api';
import { Button } from '~/components/ui/button';
import { Textarea } from '~/components/ui/textarea';
import { Loader2 } from 'lucide-react';

const schema = z.object({
  prompt: z.string().min(10, 'Prompt too short ser').max(500, 'Prompt too long ser'),
});

type FormData = z.infer<typeof schema>;

export function ImageGeneratorForm() {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  
  const generateMutation = api.image.generate.useMutation({
    onSuccess: (data) => {
      setGeneratedImage(data.imageUrl);
    },
  });
  
  const onSubmit = (data: FormData) => {
    generateMutation.mutate(data);
  };
  
  return (
    <div className="max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-xl font-bold text-brand-red-400 mb-3">
            Enter Your Meme Idea (In Perfect Engrish) 🎨
          </label>
          <Textarea
            {...register('prompt')}
            placeholder="Example: Make picture of doge wearing lambo with text 'Much Rich Very Profit' on moon background"
            rows={5}
            className="w-full bg-background-card border-2 border-brand-red-400 text-white"
          />
          {errors.prompt && (
            <p className="text-red-400 text-sm mt-2">{errors.prompt.message}</p>
          )}
        </div>
        
        <Button
          type="submit"
          disabled={generateMutation.isLoading}
          className="w-full"
        >
          {generateMutation.isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating... AI Very Busy
            </>
          ) : (
            'Generate Image Ser!'
          )}
        </Button>
      </form>
      
      {generatedImage && (
        <div className="mt-8">
          <img 
            src={generatedImage} 
            alt="Generated meme" 
            className="w-full rounded-2xl border-4 border-brand-red-400 shadow-2xl"
          />
          <div className="flex gap-4 mt-4">
            <Button className="flex-1">
              Download Image
            </Button>
            <Button variant="secondary" className="flex-1">
              Share to Twitter
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
```

### **Leaderboard Table**

```typescript
// src/components/leaderboard/leaderboard-table.tsx
'use client';

import { api } from '~/lib/api';
import { Card } from '~/components/ui/card';

export function LeaderboardTable() {
  const { data: leaderboard, isLoading } = api.leaderboard.getTopMentioners.useQuery();
  
  if (isLoading) {
    return <div className="text-center text-gray-400">Loading very important people...</div>;
  }
  
  return (
    <div className="space-y-4">
      <h2 className="text-4xl font-bold text-brand-red-400 text-center mb-8">
        🏆 TOP ENGRISH WARRIORS 🏆
      </h2>
      
      {leaderboard?.map((user, index) => (
        <Card 
          key={user.userId}
          className="flex items-center justify-between p-6 bg-background-card border-2 border-brand-red-400 hover:shadow-xl hover:shadow-brand-red-400/30 transition-all"
        >
          <div className="flex items-center gap-6">
            <div className={`text-5xl font-bold ${
              index === 0 ? 'text-brand-gold-400' :
              index === 1 ? 'text-gray-300' :
              index === 2 ? 'text-orange-400' :
              'text-gray-500'
            }`}>
              #{index + 1}
            </div>
            
            <div>
              <p className="text-xl font-bold text-white">@{user.username}</p>
              <p className="text-gray-400">Professional Engrish Speaker</p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-3xl font-bold text-brand-red-400">{user.mentionCount}</p>
            <p className="text-sm text-gray-400">Mentions Total</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
```

### **Twitter Feed**

```typescript
// src/components/feed/twitter-feed.tsx
'use client';

import { api } from '~/lib/api';
import { TweetCard } from './tweet-card';

export function TwitterFeed() {
  const { data: tweets, isLoading } = api.twitter.getGlobalFeed.useQuery({
    maxResults: 50,
  });
  
  if (isLoading) {
    return <div className="text-center text-gray-400">Loading tweets very fast...</div>;
  }
  
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <h2 className="text-4xl font-bold text-brand-red-400 text-center mb-8">
        🐦 GLOBAL ENGRISH FEED 🐦
      </h2>
      
      {tweets?.map((tweet: any) => (
        <TweetCard key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
}
```

---

## 📦 PACKAGE.JSON DEPENDENCIES

```json
{
  "name": "engrish-website",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:push": "prisma db push",
    "db:studio": "prisma studio"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.3.4",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-toast": "^1.1.5",
    "@supabase/supabase-js": "^2.39.7",
    "@tanstack/react-query": "^5.20.5",
    "@trpc/client": "^10.45.1",
    "@trpc/next": "^10.45.1",
    "@trpc/react-query": "^10.45.1",
    "@trpc/server": "^10.45.1",
    "@upstash/redis": "^1.28.4",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "framer-motion": "^11.0.5",
    "lucide-react": "^0.344.0",
    "next": "14.1.0",
    "next-auth": "^5.0.0-beta.15",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.50.1",
    "replicate": "^0.29.1",
    "superjson": "^2.2.1",
    "tailwind-merge": "^2.2.1",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@types/node": "^20.11.16",
    "@types/react": "^18.2.52",
    "@types/react-dom": "^18.2.18",
    "autoprefixer": "^10.4.17",
    "eslint": "^8.56.0",
    "eslint-config-next": "14.1.0",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.3.3"
  }
}
```

---

## 🚀 IMPLEMENTATION CHECKLIST

### **Phase 1: Foundation (Day 1-2)**
- [ ] Initialize Next.js 14 project with TypeScript
- [ ] Set up Tailwind CSS with custom theme
- [ ] Configure environment variables
- [ ] Set up Supabase project and database
- [ ] Create database tables and RLS policies
- [ ] Set up Upstash Redis
- [ ] Configure NextAuth with email and Twitter OAuth
- [ ] Set up tRPC with basic routers

### **Phase 2: Core Features (Day 3-4)**
- [ ] Build landing page with all sections
- [ ] Implement hero section with background
- [ ] Create stats bar component
- [ ] Build about/history section
- [ ] Implement tokenomics section
- [ ] Create team member cards
- [ ] Build how-to-buy guide
- [ ] Add meme gallery

### **Phase 3: Authentication & Dashboard (Day 5-6)**
- [ ] Implement NextAuth configuration
- [ ] Create login/signup flows
- [ ] Build user dashboard layout
- [ ] Implement profile management
- [ ] Create Twitter linking flow
- [ ] Build user stats overview

### **Phase 4: AI Image Generator (Day 7-8)**
- [ ] Set up Replicate API integration
- [ ] Build image generator form
- [ ] Implement generation queue/status
- [ ] Create image result display
- [ ] Add download functionality
- [ ] Implement share-to-Twitter
- [ ] Build user's image gallery
- [ ] Create public image gallery

### **Phase 5: Twitter Integration (Day 9-10)**
- [ ] Set up twitterapi.io integration
- [ ] Implement mention tracking system
- [ ] Build leaderboard calculation
- [ ] Create leaderboard display
- [ ] Implement global tweet feed
- [ ] Add real-time updates (polling)
- [ ] Create user mention history

### **Phase 6: Optimization & Polish (Day 11-12)**
- [ ] Implement Redis caching strategy
- [ ] Add rate limiting
- [ ] Optimize database queries
- [ ] Add loading states
- [ ] Implement error handling
- [ ] Add animations and transitions
- [ ] Mobile responsive polish
- [ ] SEO optimization
- [ ] Performance testing

### **Phase 7: Testing & Deployment (Day 13-14)**
- [ ] Test all user flows
- [ ] Test API integrations
- [ ] Test rate limiting
- [ ] Test error scenarios
- [ ] Deploy to Vercel
- [ ] Configure production environment variables
- [ ] Set up monitoring
- [ ] Final QA pass

---

## 🎯 QUICK START COMMANDS

```bash
# Create project
npx create-next-app@latest engrish-website --typescript --tailwind --app

# Install dependencies
cd engrish-website
npm install @trpc/server @trpc/client @trpc/react-query @trpc/next
npm install @tanstack/react-query
npm install @supabase/supabase-js
npm install next-auth
npm install @upstash/redis
npm install replicate
npm install zod react-hook-form @hookform/resolvers
npm install framer-motion
npm install lucide-react
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-slot @radix-ui/react-toast
npm install class-variance-authority clsx tailwind-merge tailwindcss-animate

# Set up environment
cp .env.example .env.local
# Edit .env.local with your keys

# Run development server
npm run dev
```

---

## 🔥 COPYWRITING EXAMPLES FOR SITE

### **Hero Section**
```
$ENGRISH
WE NO SPEAK GOOD ENGRISH
BUT WE SPEAK MOON LANGUAGE PERFECT 🚀

The only token where bad grammar = good investment. 
Join 38,888 Asian degen who finally speak same language.
Trust us ser, we never rug (maybe small rug but very small).
```

### **About Section**
```
THE LEGENDARY STORY OF $ENGRISH

In year 2025, when Solana reach $1,420.69 (very lucky number),
Chang from Shenzhen wake up 3am, see chart green like jade dragon.
He message all cousin: "Flen, I have vision for token that unite all Asian degen."

Rajesh from Mumbai answer: "Yesss ser! I code website faster than Delhi tummy!"
Kim from Seoul eating ramen say: "I make meme so viral even whale notice!"
Wei Wei from Singapore on yacht agree: "I buy 200,000 SOL if team all Asian."

And so $ENGRISH born. No white paper (we have yellow paper, more lucky).
Only pure community, pure meme, pure profit. We speak Engrish not good,
but we speak GREEN CANDLE very fluent. 📈
```

### **Generator Page**
```
🎨 ENGRISH MEME GENERATOR 🎨

Make custom meme with AI power! Our computer very smart, 
understand Engrish perfect even when you no speak good.

Type your idea below. AI make beautiful picture for share Twitter,
make everyone laugh, make everyone want buy $ENGRISH.

Remember: More funny = more viral = more moon = more lambo for everyone!
```

### **Leaderboard Page**
```
🏆 HALL OF FAME 🏆

These warrior mention $ENGRISH most time on Twitter.
They are true believer. They spread word like Chang spread butter on toast.

Top 1 get special badge: "SUPREME ENGRISH EMPEROR"
Top 10 get special badge: "DIAMOND TONGUE WARRIOR"
Everyone else get: "RESPECTED MEMBER OF FAMILY"

Keep mention us, climb rank, make mother proud!
```

---

## 💡 ADDITIONAL FEATURES TO CONSIDER

### **Future Enhancements**
1. **Discord Bot** - Connect Discord for community management
2. **NFT Gallery** - Turn generated images into NFTs
3. **Staking Dashboard** - Show token staking (if applicable)
4. **Price Chart** - Embed live price chart
5. **Swap Widget** - Direct swap functionality on site
6. **Referral System** - Track referrals and reward
7. **Achievement Badges** - Gamify user engagement
8. **Mobile App** - React Native companion app

### **Analytics to Track**
- User signups
- Images generated
- Twitter mentions
- Page views
- Share clicks
- Wallet connects
- Time on site

---

## 📝 NOTES FOR CURSOR

**Key Implementation Tips:**
1. Start with database and auth - get foundation solid
2. Use tRPC for all API calls - type safety is crucial
3. Implement caching early - Twitter API has rate limits
4. Build mobile-first - most crypto users on mobile
5. Use Vercel Edge for fast global delivery
6. Implement error boundaries for graceful failures
7. Add loading skeletons for better UX
8. Use React Query for automatic refetching
9. Implement optimistic updates where possible
10. Test rate limiting thoroughly before launch

**Common Gotchas:**
- Twitter API rate limits - cache aggressively
- Replicate API can be slow - show progress
- Supabase RLS can be tricky - test thoroughly
- NextAuth requires proper callbacks configured
- Redis needs proper serialization
- Image uploads need size limits
- Don't forget CORS for API routes

**Performance Priorities:**
1. Use Next.js Image component for all images
2. Implement lazy loading for below-fold content
3. Code split heavy components
4. Use React.memo for expensive renders
5. Minimize bundle size
6. Use CDN for static assets
7. Implement proper caching headers

---

## 🎉 READY TO BUILD!

This context file contains everything needed to build $ENGRISH from scratch.
Follow the phases, implement each feature systematically, and test thoroughly.

The design is fire 🔥, the tech stack is solid 💪, and the Engrish is perfect 😂.

**LET'S GOOOOOO! 🚀🌙💎**

---

*"We no speak perfect Engrish, but we build perfect website!"*
- Chang Wei, CEO of $ENGRISH
