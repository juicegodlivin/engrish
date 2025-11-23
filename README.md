# 🔥 $ENGRISH - The Legendary Meme Coin Website

![ENGRISH](https://img.shields.io/badge/$ENGRISH-WE%20GO%20MOON-FF4444?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Solana](https://img.shields.io/badge/Solana-Wallet-purple?style=for-the-badge&logo=solana)

## 🚀 We No Speak Good Engrish But We Build Perfect Website!

Full-featured crypto meme coin website with AI image generation, Twitter integration, and Web3 wallet authentication.

### ✨ Features

- 🎨 **AI Meme Generator** - Create custom memes with Replicate AI
- 💰 **Solana Wallet Auth** - Connect with Phantom, Solflare
- 🐦 **Twitter Integration** - Leaderboard tracking mentions via twitterapi.io
- 📊 **User Dashboard** - Profile, stats, and image gallery
- 🏆 **Leaderboard System** - Compete for top Twitter mentioner
- 🎭 **Premium Design** - Custom Dragon Red & Imperial Gold theme
- ⚡ **Type-Safe API** - tRPC for end-to-end type safety
- 🔒 **Secure** - Supabase + RLS policies
- 📱 **Fully Responsive** - Mobile-first design

### 🛠️ Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Radix UI

**Backend:**
- tRPC
- Supabase (PostgreSQL)
- NextAuth v5
- Upstash Redis

**Integrations:**
- Solana Wallet Adapter
- Replicate AI
- TwitterAPI.io
- Web3.js

### 📦 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your API keys

# Run Supabase migration
# (Copy contents of database-migration.sql to Supabase SQL Editor)

# Start development server
npm run dev
```

Visit http://localhost:3000

### 📖 Full Documentation

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for complete setup and deployment instructions.

### 🎯 Project Structure

```
src/
├── app/               # Next.js App Router pages
│   ├── (marketing)/  # Public pages (landing, feed, gallery)
│   ├── (platform)/   # Protected pages (dashboard, generate)
│   └── api/          # API routes (NextAuth, tRPC)
├── components/       # React components
│   ├── ui/          # Base UI components (Radix UI)
│   ├── landing/     # Landing page sections
│   ├── generator/   # AI generator components
│   ├── dashboard/   # Dashboard components
│   ├── leaderboard/ # Leaderboard components
│   └── feed/        # Twitter feed components
├── server/          # Backend code
│   ├── api/         # tRPC routers
│   ├── db/          # Database client
│   └── services/    # External services (Replicate, Twitter, Redis)
├── lib/             # Utilities and helpers
├── hooks/           # Custom React hooks
└── types/           # TypeScript types
```

### 🔑 Environment Variables Required

```bash
# See .env.example.md for full list
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXTAUTH_SECRET=
REPLICATE_API_TOKEN=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
TWITTER_API_KEY=
```

### 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions.

### 📝 Key Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### 🎨 Customization

Edit `src/lib/constants.ts` to change:
- Team members
- Tokenomics
- How to buy steps
- Social links

Edit `tailwind.config.ts` to change:
- Brand colors
- Typography
- Animations

### 🐛 Troubleshooting

**Wallet won't connect?**
- Use HTTPS (localhost is OK for dev)
- Check browser wallet extension

**tRPC errors?**
- Verify environment variables
- Check Supabase connection
- Ensure Redis is configured

**Images not generating?**
- Check Replicate API token
- Verify model version
- Check rate limits

### 📄 License

MIT License - feel free to use for your own projects!

### 🤝 Contributing

This is a template project - fork it and make it your own!

### 💬 Support

- Check [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- Review [BUILD_CHECKLIST.md](./BUILD_CHECKLIST.md)
- See original spec: [ENGRISH_BUILD_CONTEXT.md](./ENGRISH_BUILD_CONTEXT.md)

---

**Built with ❤️ by the $ENGRISH team**

*"We code very fast. We build very good. We go moon together!"* 🚀🌙💎

---

### 🎉 What's Included

✅ Complete authentication system with Solana wallets  
✅ AI-powered meme generator with Replicate  
✅ Twitter integration and leaderboard system  
✅ User dashboard and profile management  
✅ Image gallery (public and private)  
✅ Rate limiting and caching with Redis  
✅ Type-safe API with tRPC  
✅ Premium responsive design  
✅ Production-ready deployment  

**Ready to launch! Trust us ser, it's very good!** 🔥
