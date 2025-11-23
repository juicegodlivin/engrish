# ==============================================
# $ENGRISH ENVIRONMENT VARIABLES
# ==============================================
# Copy this file to .env.local and fill in your actual values
# ==============================================

# ----------------------------------------------
# APP CONFIGURATION
# ----------------------------------------------
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=$ENGRISH

# ----------------------------------------------
# DATABASE - SUPABASE
# ----------------------------------------------
# Get these from: https://supabase.com/dashboard/project/_/settings/api
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR-PROJECT-REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ----------------------------------------------
# AUTHENTICATION - NEXTAUTH
# ----------------------------------------------
# Generate NEXTAUTH_SECRET with: openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here-generate-with-openssl

# ----------------------------------------------
# TWITTER OAUTH
# ----------------------------------------------
# Get these from: https://developer.twitter.com/en/portal/projects-and-apps
# Create a Twitter App with OAuth 2.0 enabled
TWITTER_CLIENT_ID=your-twitter-oauth-client-id
TWITTER_CLIENT_SECRET=your-twitter-oauth-client-secret

# ----------------------------------------------
# TWITTER API - twitterapi.io
# ----------------------------------------------
# Sign up at: https://twitterapi.io
# This is separate from Twitter OAuth - used for fetching tweets and mentions
TWITTER_API_KEY=your-twitterapi-io-key
TWITTER_API_BASE_URL=https://api.twitterapi.io/v1

# Alternatively, if using Twitter API v2 directly:
# TWITTER_BEARER_TOKEN=your-twitter-v2-bearer-token

# ----------------------------------------------
# AI IMAGE GENERATION - REPLICATE
# ----------------------------------------------
# Get from: https://replicate.com/account/api-tokens
REPLICATE_API_TOKEN=r8_xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Your custom model version (format: owner/model:version)
# Example: stability-ai/sdxl:xxxxxxxxxxxxx
REPLICATE_MODEL_VERSION=your-model-owner/your-model-name:version-hash

# ----------------------------------------------
# CACHING & RATE LIMITING - UPSTASH REDIS
# ----------------------------------------------
# Get from: https://console.upstash.com/
UPSTASH_REDIS_REST_URL=https://your-redis-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-upstash-redis-token

# Rate limiting configuration
RATE_LIMIT_WINDOW=60000          # Time window in ms (60000 = 1 minute)
RATE_LIMIT_MAX_REQUESTS=10       # Max requests per window per user

# Image generation rate limits
IMAGE_GEN_RATE_LIMIT_MAX=5       # Max image generations per minute
IMAGE_GEN_RATE_LIMIT_WINDOW=60000

# API rate limits
API_RATE_LIMIT_MAX=100           # Max API calls per minute
API_RATE_LIMIT_WINDOW=60000

# ----------------------------------------------
# OPTIONAL: ANALYTICS
# ----------------------------------------------
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Vercel Analytics (automatically enabled on Vercel)
# NEXT_PUBLIC_VERCEL_ANALYTICS_ID=

# ----------------------------------------------
# OPTIONAL: ERROR TRACKING
# ----------------------------------------------
# Sentry
# NEXT_PUBLIC_SENTRY_DSN=https://xxxx@xxxx.ingest.sentry.io/xxxx
# SENTRY_AUTH_TOKEN=

# ----------------------------------------------
# OPTIONAL: BLOCKCHAIN/WEB3
# ----------------------------------------------
# If you want to show real token data
# SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
# TOKEN_CONTRACT_ADDRESS=your-token-address

# CoinGecko API (for price data)
# COINGECKO_API_KEY=your-api-key

# ----------------------------------------------
# FEATURE FLAGS
# ----------------------------------------------
# Enable/disable features in development
NEXT_PUBLIC_ENABLE_IMAGE_GEN=true
NEXT_PUBLIC_ENABLE_TWITTER_FEED=true
NEXT_PUBLIC_ENABLE_LEADERBOARD=true
NEXT_PUBLIC_MAINTENANCE_MODE=false

# ----------------------------------------------
# DEVELOPMENT SETTINGS
# ----------------------------------------------
# Log level: debug, info, warn, error
LOG_LEVEL=info

# Enable debug mode
DEBUG=false

# Skip rate limiting in development
SKIP_RATE_LIMIT=true

# ----------------------------------------------
# PRODUCTION-ONLY SETTINGS
# ----------------------------------------------
# Set these in Vercel/production environment

# Production URLs
# NEXT_PUBLIC_APP_URL=https://engrish.com
# NEXTAUTH_URL=https://engrish.com

# Production database (if different)
# DATABASE_URL=postgresql://...production-db...

# ----------------------------------------------
# TWITTER APP CONFIGURATION NOTES
# ----------------------------------------------
# 
# When setting up your Twitter OAuth app:
# 1. Go to: https://developer.twitter.com/en/portal/projects-and-apps
# 2. Create a new app or use existing
# 3. Enable OAuth 2.0
# 4. Set callback URL: http://localhost:3000/api/auth/callback/twitter
# 5. Add production URL when deploying: https://your-domain.com/api/auth/callback/twitter
# 6. Request these scopes: tweet.read, users.read, offline.access
# 
# For twitterapi.io:
# 1. Sign up at: https://twitterapi.io
# 2. Get API key from dashboard
# 3. Choose plan based on request volume needs
#

# ----------------------------------------------
# REPLICATE MODEL SETUP NOTES
# ----------------------------------------------
# 
# 1. Go to: https://replicate.com
# 2. Create account and get API token
# 3. Choose a model or train your own:
#    - Pre-built: stability-ai/sdxl, stability-ai/stable-diffusion
#    - Custom: Train your own model for Engrish-specific memes
# 4. Copy the model version string (format: owner/model:version)
# 5. Test with: replicate.predictions.create()
#

# ----------------------------------------------
# SUPABASE SETUP NOTES
# ----------------------------------------------
#
# 1. Create project at: https://supabase.com
# 2. Get connection string and keys from: Settings > API
# 3. Run the SQL schema from ENGRISH_BUILD_CONTEXT.md
# 4. Enable Row Level Security (RLS)
# 5. Set up storage bucket for user uploads (optional)
# 6. Configure auth providers (email, Twitter)
#

# ----------------------------------------------
# UPSTASH REDIS SETUP NOTES
# ----------------------------------------------
#
# 1. Create database at: https://console.upstash.com/
# 2. Choose a region close to your users
# 3. Copy the REST URL and Token
# 4. Use for caching and rate limiting
# 5. Configure eviction policy: allkeys-lru (recommended)
#

# ==============================================
# DEPLOYMENT CHECKLIST
# ==============================================
# 
# Before deploying to production:
# [ ] All tokens and secrets regenerated for production
# [ ] NEXTAUTH_SECRET is production-strength (64+ chars)
# [ ] Twitter OAuth callback URL includes production domain
# [ ] Rate limits adjusted for production traffic
# [ ] Database connection uses production credentials
# [ ] Redis instance is production-tier
# [ ] Error tracking enabled (Sentry, etc)
# [ ] Analytics enabled
# [ ] Environment variables set in Vercel dashboard
# [ ] Test all integrations in staging first
#
# ==============================================

# ==============================================
# QUICK SETUP GUIDE
# ==============================================
#
# 1. Copy this file:
#    cp .env.example .env.local
#
# 2. Set up services (in order):
#    a. Supabase → Database
#    b. Upstash → Redis
#    c. Twitter Developer → OAuth
#    d. twitterapi.io → API Key
#    e. Replicate → AI Model
#
# 3. Generate NextAuth secret:
#    openssl rand -base64 32
#
# 4. Fill in all required values above
#
# 5. Test locally:
#    npm run dev
#
# 6. Deploy to Vercel:
#    - Push to GitHub
#    - Import in Vercel
#    - Add all env vars in Vercel dashboard
#    - Deploy!
#
# ==============================================

# That's it ser! You ready to moon! 🚀
