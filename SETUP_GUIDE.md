# 🚀 $ENGRISH Setup & Deployment Guide

## ✅ What's Been Built

Your complete $ENGRISH MVP is now ready! Here's what we've built:

### Phase 1: Foundation ✅
- Next.js 14 with TypeScript and App Router
- Tailwind CSS with custom Dragon Red & Imperial Gold theme
- All dependencies installed (Solana wallets, tRPC, Supabase, Redis, Replicate)
- Premium design system with responsive typography

### Phase 2: Database & Auth ✅
- Supabase database schema (ready to migrate)
- NextAuth v5 with Solana wallet authentication
- Upstash Redis for caching and rate limiting
- Complete auth flow with login page

### Phase 3: API Layer ✅
- tRPC API with type-safe procedures
- User, Image, Twitter, and Leaderboard routers
- Replicate AI integration for image generation
- Twitter API integration via twitterapi.io
- Rate limiting (5 images/minute)

### Phase 4: UI Components ✅
- Premium Radix UI components with custom styling
- Button, Card, Input, Dialog, Toast components
- Loading states and skeleton screens
- Responsive design

### Phase 5: Landing Page ✅
- Hero section with animated logo
- Stats bar with live data
- About, Tokenomics, Team sections
- How to Buy guide
- Meme gallery
- Navbar and Footer

### Phase 6: AI Generator ✅
- Image generation form with validation
- Prompt suggestions
- Download and share functionality
- User image gallery
- Public community gallery

### Phase 7: Dashboard ✅
- User dashboard with stats overview
- Profile management
- Twitter account linking (manual)
- My Images page
- Sidebar navigation

### Phase 8: Twitter Features ✅
- Leaderboard tracking Twitter mentions
- Global Twitter feed
- Tweet cards with engagement stats
- User rank tracking

---

## 📋 Setup Instructions

### Step 1: Create Supabase Project

1. Go to https://supabase.com and create a new project
2. Wait for the database to be provisioned
3. Go to Settings > API
4. Copy these values:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

5. Go to SQL Editor and run the migration from `database-migration.sql`

### Step 2: Create Upstash Redis

1. Go to https://console.upstash.com
2. Create a new Redis database
3. Copy these values:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

### Step 3: Get Replicate API Key

1. Go to https://replicate.com/account/api-tokens
2. Create a new API token
3. Copy the value for `REPLICATE_API_TOKEN`
4. Choose your model and copy its version for `REPLICATE_MODEL_VERSION`

### Step 4: Get TwitterAPI.io Key

1. Go to https://twitterapi.io/dashboard
2. Sign up and get your API key
3. Copy the value for `TWITTER_API_KEY`

### Step 5: Generate NextAuth Secret

Run in terminal:
```bash
openssl rand -base64 32
```

Copy the output for `NEXTAUTH_SECRET`

### Step 6: Update Environment Variables

Create `.env.local` file (use `.env.example.md` as reference):

```bash
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=$ENGRISH

# Supabase
DATABASE_URL=postgresql://[CONNECTION-STRING]
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR-PROJECT].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR-ANON-KEY]
SUPABASE_SERVICE_ROLE_KEY=[YOUR-SERVICE-KEY]

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=[YOUR-SECRET-FROM-OPENSSL]

# Replicate
REPLICATE_API_TOKEN=[YOUR-TOKEN]
REPLICATE_MODEL_VERSION=[YOUR-MODEL-VERSION]

# Upstash Redis
UPSTASH_REDIS_REST_URL=https://[YOUR-REDIS].upstash.io
UPSTASH_REDIS_REST_TOKEN=[YOUR-TOKEN]

# TwitterAPI.io
TWITTER_API_KEY=[YOUR-KEY]
TWITTER_API_BASE_URL=https://api.twitterapi.io/v1
```

### Step 7: Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

---

## 🚀 Deploying to Vercel

### Prerequisites
- GitHub account
- Vercel account (free tier works!)
- All API keys ready

### Steps

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit - ENGRISH MVP"
git remote add origin [YOUR-REPO-URL]
git push -u origin main
```

2. **Connect to Vercel**
- Go to https://vercel.com
- Click "Import Project"
- Select your GitHub repository
- Vercel will detect Next.js automatically

3. **Add Environment Variables**
- In Vercel project settings, go to "Environment Variables"
- Add ALL variables from `.env.local` (except change NEXTAUTH_URL to your production URL)
- Important: Update `NEXTAUTH_URL` to your Vercel domain

4. **Deploy**
- Click "Deploy"
- Wait for build to complete
- Your site is live! 🎉

### Post-Deployment Checklist

- [ ] Test wallet connection in production
- [ ] Generate a test image
- [ ] Link Twitter account
- [ ] Check leaderboard updates
- [ ] Test all pages on mobile
- [ ] Check console for errors

---

## 🔧 Common Issues & Solutions

### Issue: Wallet won't connect
**Solution**: Make sure you're using HTTPS (Vercel provides this automatically)

### Issue: tRPC errors
**Solution**: Check that all environment variables are set in Vercel

### Issue: Images not generating
**Solution**: Verify your Replicate API token and model version are correct

### Issue: Twitter data not loading
**Solution**: Check your twitterapi.io API key and rate limits

### Issue: Database errors
**Solution**: Ensure the Supabase migration ran successfully

---

## 📊 Features to Test

### Authentication
- [ ] Connect with Phantom wallet
- [ ] Connect with Solflare wallet
- [ ] Sign in and see dashboard
- [ ] Sign out

### Image Generation
- [ ] Generate an image with a prompt
- [ ] Download generated image
- [ ] Share to Twitter
- [ ] View in My Images
- [ ] Toggle public/private

### Twitter Integration
- [ ] Link Twitter account manually
- [ ] View leaderboard
- [ ] Check personal rank
- [ ] View global feed

### Profile & Dashboard
- [ ] Update display name
- [ ] Update bio
- [ ] View stats
- [ ] Navigate sidebar

---

## 🎨 Customization Guide

### Changing Colors
Edit `tailwind.config.ts`:
- `brand.red` - Main brand color
- `brand.gold` - Accent color
- `background` - Dark theme colors

### Updating Content
- Landing page text: `src/lib/constants.ts`
- Team members: Update `TEAM_MEMBERS` array
- How to buy steps: Update `HOW_TO_BUY_STEPS`
- Tokenomics: Update `TOKENOMICS` object

### Adding Features
- New tRPC procedures: Add to routers in `src/server/api/routers/`
- New pages: Add to `src/app/`
- New components: Add to `src/components/`

---

## 📈 Performance Optimization

Your site already includes:
- ✅ Image optimization with Next.js Image
- ✅ Code splitting
- ✅ Redis caching for API calls
- ✅ Rate limiting
- ✅ Lazy loading
- ✅ Responsive design

### Additional Optimizations

1. **CDN for Images**: Store generated images in S3/R2
2. **Analytics**: Add Vercel Analytics or Google Analytics
3. **Error Tracking**: Add Sentry
4. **SEO**: Add more meta tags and sitemap
5. **PWA**: Add service worker for offline support

---

## 🔐 Security Checklist

- [x] Environment variables not committed
- [x] Supabase RLS policies enabled
- [x] Rate limiting on API endpoints
- [x] HTTPS enforced (Vercel default)
- [x] Input validation with Zod
- [x] SQL injection protection (Supabase)
- [ ] Add CORS headers if needed
- [ ] Add content security policy

---

## 💡 Next Steps

### Immediate (Pre-Launch)
1. Test everything thoroughly
2. Add real team member photos
3. Update contract address in constants
4. Create social media accounts
5. Prepare launch announcement

### Short Term (Week 1)
1. Monitor error logs
2. Collect user feedback
3. Fix bugs
4. Add more prompt examples
5. Create tutorial videos

### Medium Term (Month 1)
1. Add more AI models
2. Implement NFT minting
3. Add Discord bot
4. Create referral system
5. Launch competitions

---

## 📞 Support

If you encounter issues:

1. Check the browser console for errors
2. Check Vercel deployment logs
3. Verify all environment variables
4. Check Supabase logs
5. Test in incognito mode

---

## 🎉 You're Ready!

Your $ENGRISH website is production-ready! 

**Built with:**
- Next.js 14 + TypeScript
- Solana Wallet Integration
- tRPC for type-safe APIs
- Supabase for database
- Redis for caching
- Replicate AI for image generation
- TwitterAPI.io for social features
- Premium custom design

**Time to moon! 🚀🌙💎**

---

*"We build very good website. Now you make it moon ser!"* - Chang Wei, 3am

