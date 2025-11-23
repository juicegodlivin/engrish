# 🚀 CURSOR QUICK START GUIDE - $ENGRISH

## 📌 IMMEDIATE ACTION STEPS

### Step 1: Copy Build Context to Cursor
1. Open the main context file: `ENGRISH_BUILD_CONTEXT.md`
2. In Cursor, create a new file: `.cursorrules` in your project root
3. Paste the ENTIRE build context into `.cursorrules`
4. Cursor will now have full context for the entire build

### Step 2: Initial Setup Commands

```bash
# 1. Create the project
npx create-next-app@latest engrish-website --typescript --tailwind --app
cd engrish-website

# 2. Install ALL dependencies in one go
npm install @trpc/server @trpc/client @trpc/react-query @trpc/next @tanstack/react-query @supabase/supabase-js next-auth @upstash/redis replicate zod react-hook-form @hookform/resolvers framer-motion lucide-react @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-slot @radix-ui/react-toast class-variance-authority clsx tailwind-merge tailwindcss-animate superjson

# 3. Set up environment file
touch .env.local
```

### Step 3: Essential Prompts for Cursor

#### **Prompt 1: Project Structure Setup**
```
Create the complete project structure as defined in ENGRISH_BUILD_CONTEXT.md including:
- All directories under src/
- Set up the tRPC configuration
- Create the basic layout files
- Set up the providers
- Configure tailwind with the custom theme colors and fonts
```

#### **Prompt 2: Database Setup**
```
Set up the Supabase database integration:
1. Create the Supabase client in src/server/db/client.ts
2. Generate TypeScript types for all the database tables defined in the context
3. Set up the database schema with all tables and RLS policies
4. Create the SQL migration file
```

#### **Prompt 3: Authentication**
```
Implement NextAuth v5 with:
- Email authentication
- Twitter OAuth provider
- Session management
- Protected route middleware
- Auth context provider
Follow the exact configuration in the build context
```

#### **Prompt 4: tRPC Routers**
```
Build all tRPC routers as specified:
- User router with profile management
- Image router with generation and gallery features
- Twitter router with linking and feed features
- Leaderboard router with top mentioners
Include all the procedures with proper validation
```

#### **Prompt 5: External Service Integration**
```
Set up all external service integrations:
1. Replicate AI service for image generation (src/server/services/replicate.ts)
2. Twitter API service using twitterapi.io (src/server/services/twitter.ts)
3. Redis caching service with Upstash (src/server/services/redis.ts)
Include rate limiting and caching strategies
```

#### **Prompt 6: Landing Page Components**
```
Build the landing page with all sections following the design system:
- Hero section with custom red fan background
- Animated stats bar with live data
- About section with Engrish storytelling
- Tokenomics cards with hover effects
- Team member profiles
- How to buy step-by-step guide
Use the exact colors and animations from the context
```

#### **Prompt 7: AI Image Generator**
```
Create the complete AI image generator feature:
- Image generator form with validation
- Real-time generation status
- Result display with download and share
- User image gallery
- Public image gallery
Include proper error handling and loading states
```

#### **Prompt 8: Twitter Features**
```
Implement all Twitter-related features:
- Twitter account linking flow
- Leaderboard table with rankings
- Global tweet feed
- User mention tracking
- Share to Twitter functionality
Use the caching strategy defined in context
```

#### **Prompt 9: Dashboard & User Features**
```
Build the user dashboard:
- Dashboard layout with sidebar
- Profile management page
- Twitter linking card
- User stats overview
- Generated images library
- Settings page
```

#### **Prompt 10: Polish & Optimization**
```
Add polish and optimizations:
- Implement all animations from the design system
- Add loading states and skeletons
- Implement error boundaries
- Add mobile responsive design
- Optimize images with Next.js Image
- Add SEO meta tags
- Implement rate limiting
```

---

## 🎯 FASTEST PATH TO MVP

If you want to build the MVP SUPER FAST, use this exact sequence:

### **Phase 1: Foundation (30 minutes)**
```
Cursor Prompt: "Set up the complete Next.js 14 project structure with TypeScript, Tailwind, tRPC, and all environment configuration as specified in the build context. Include the custom color theme with Dragon Red and Imperial Gold."
```

### **Phase 2: Database & Auth (45 minutes)**
```
Cursor Prompt: "Set up Supabase with all database tables (users, sessions, accounts, generated_images, twitter_mentions, user_stats) including RLS policies. Then implement NextAuth v5 with email and Twitter OAuth."
```

### **Phase 3: Landing Page (60 minutes)**
```
Cursor Prompt: "Build the complete landing page with hero section (using the red fan background), stats bar, about section, tokenomics, team cards, and how-to-buy guide. Use the exact Engrish copywriting from the context and apply all animations."
```

### **Phase 4: Core Features (90 minutes)**
```
Cursor Prompt: "Implement the AI image generator with Replicate integration, user dashboard with profile management, and Twitter linking functionality. Include all tRPC routers and proper error handling."
```

### **Phase 5: Twitter Features (60 minutes)**
```
Cursor Prompt: "Build the leaderboard system that tracks Twitter mentions, global tweet feed showing @ENGRISH mentions, and share-to-Twitter functionality. Implement Redis caching for performance."
```

### **Phase 6: Polish (30 minutes)**
```
Cursor Prompt: "Add loading states, error boundaries, mobile responsiveness, animations, and optimize all images. Ensure the entire site matches the design system perfectly."
```

**TOTAL TIME: ~5 hours for complete MVP** 🚀

---

## 💡 PRO TIPS FOR WORKING WITH CURSOR

### **1. Use Composer Mode for Multi-File Changes**
When you need to update multiple files at once (like setting up tRPC routers), use Cursor's Composer mode (Cmd/Ctrl + I) and reference the context file.

### **2. Reference the Context in Every Prompt**
Start prompts with: "Based on ENGRISH_BUILD_CONTEXT.md, ..."

### **3. Build in Order**
Follow this order to avoid dependency issues:
1. Config & Setup
2. Database & Types
3. Auth
4. tRPC Routers
5. UI Components
6. Pages
7. Integrations

### **4. Test Each Phase**
After each major feature, test it works before moving on:
```bash
npm run dev
# Test the feature in browser
```

### **5. Use Cursor's Chat for Debugging**
If something breaks, use Chat (Cmd/Ctrl + L) and say:
"I'm getting this error: [error]. Based on the ENGRISH_BUILD_CONTEXT.md, what's wrong?"

### **6. Generate Tests Alongside Code**
Ask Cursor to generate tests for critical functions:
"Create tests for the image generation tRPC procedure"

---

## 🔧 ESSENTIAL CONFIGURATION FILES

### **1. Tailwind Config**
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: {
            50: '#FFE5E5',
            100: '#FFB8B8',
            200: '#FF8A8A',
            300: '#FF5C5C',
            400: '#FF4444',
            500: '#DD2222',
            600: '#CC1111',
            700: '#AA0000',
            800: '#880000',
            900: '#660000',
          },
          gold: {
            50: '#FFFEF0',
            100: '#FFFACD',
            200: '#FFF59D',
            300: '#FFEE58',
            400: '#FFD700',
            500: '#FFA500',
            600: '#FF8C00',
            700: '#FF7700',
            800: '#FF6600',
            900: '#FF5500',
          },
        },
        background: {
          dark: '#1a1a1a',
          darker: '#0a0a0a',
          card: '#2a2a2a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 68, 68, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 68, 68, 0.8)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config
```

### **2. Next.js Config**
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'replicate.delivery',
      'replicate.com',
      'pbxt.replicate.delivery',
      'pbs.twimg.com',
      'abs.twimg.com',
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
}

module.exports = nextConfig
```

### **3. TypeScript Config**
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "~/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## 🎨 ASSET CHECKLIST

Make sure these files are in `/public/images/`:
- [ ] `background-fan.png` - Red fan background (uploaded)
- [ ] `logo-seal.svg` - Red seal logo (generated)
- [ ] `logo-minimal.svg` - Minimal golden E logo (generated)
- [ ] `logo-full.svg` - Full text logo (generated)

---

## 🐛 COMMON ISSUES & FIXES

### **Issue: tRPC types not working**
```bash
# Regenerate types
npm run dev
# Wait for types to generate, then restart Cursor
```

### **Issue: Supabase connection failing**
```
Check:
1. .env.local has correct SUPABASE_URL
2. SUPABASE_ANON_KEY is set
3. Database is running in Supabase dashboard
```

### **Issue: NextAuth not working**
```
Check:
1. NEXTAUTH_SECRET is set (generate: openssl rand -base64 32)
2. NEXTAUTH_URL matches your dev URL
3. Twitter OAuth app is configured correctly
```

### **Issue: Replicate images not generating**
```
Check:
1. REPLICATE_API_TOKEN is valid
2. Model version ID is correct
3. Check Replicate dashboard for errors
```

### **Issue: Twitter API failing**
```
Check:
1. TWITTER_API_KEY from twitterapi.io is valid
2. API limits not exceeded
3. Rate limiting is implemented
```

---

## 📊 SUCCESS METRICS

After building, verify these work:
- [ ] Landing page loads with all sections
- [ ] Users can sign up/login
- [ ] Users can link Twitter account
- [ ] AI image generation works
- [ ] Generated images appear in gallery
- [ ] Leaderboard shows top mentioners
- [ ] Global feed shows tweets
- [ ] Share to Twitter works
- [ ] All animations work
- [ ] Mobile responsive
- [ ] No console errors

---

## 🚀 DEPLOYMENT CHECKLIST

Before deploying to production:
- [ ] All environment variables set in Vercel
- [ ] Supabase RLS policies tested
- [ ] Rate limiting tested
- [ ] Error handling works
- [ ] Analytics set up
- [ ] SEO meta tags added
- [ ] Images optimized
- [ ] Performance tested (Lighthouse score >90)
- [ ] Mobile tested on real devices
- [ ] Twitter OAuth works in production

---

## 💪 YOU GOT THIS!

With this quick start guide and the full context file, you can build the entire $ENGRISH website in one focused session.

**Remember:**
1. Copy context to `.cursorrules`
2. Use the prompts in order
3. Test as you go
4. Deploy and moon 🚀

**The Engrish community is waiting for this legendary site!**

"We build very fast. We build very good. We go moon together!" 
- Chang Wei, 3am Chart Checker

🔥 LET'S GOOOOOO! 💎🙌🚀
