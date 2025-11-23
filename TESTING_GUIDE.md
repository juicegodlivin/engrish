# 🧪 $ENGRISH Testing Guide

## 📋 Pre-Test Checklist

### ✅ Already Complete:
- [x] Supabase database configured and migrated
- [x] Redis configured
- [x] TwitterAPI.io key added
- [x] Dev server running on http://localhost:3000

### ⏳ Need to Add:
- [ ] Add Replicate API token to `.env.local`
- [ ] Add Replicate model version: `google/nano-banana`
- [ ] Have Phantom or Solflare wallet installed in browser

---

## 🔍 Testing Sequence

### **TEST 1: Landing Page (Public - No Wallet Needed)**

1. **Open:** http://localhost:3000
2. **Check:**
   - [ ] Red fan background appears
   - [ ] Hero section with floating "E" logo
   - [ ] Stats bar with Chinese icons loads
   - [ ] All sections scroll smoothly
   - [ ] Navigation links work
   - [ ] Footer links present
   - [ ] Mobile responsive (resize browser)

**Expected:** Everything should look professional with the red background and Chinese icons.

---

### **TEST 2: Wallet Connection**

1. **Click:** "Select Wallet" button in navbar
2. **Check:**
   - [ ] Modal opens with Phantom/Solflare options
   - [ ] Click your wallet (Phantom recommended)
   - [ ] Wallet extension opens
   - [ ] Approve connection
   - [ ] Modal closes
   - [ ] Button changes to show wallet address
   - [ ] **Dashboard button appears to the left of wallet button**

**Expected:** After connecting, you should see:
- Wallet address in navbar (8u5r..oHHP format)
- Gold **"Dashboard"** button to the left of wallet button

---

### **TEST 3: Dashboard Access**

1. **Click:** Dashboard button (or go to http://localhost:3000/dashboard)
2. **Check:**
   - [ ] Dashboard loads with sidebar
   - [ ] See 4 stats cards (Images Generated, Images Shared, etc.)
   - [ ] All show "0" initially
   - [ ] Twitter Link Card shows "not linked"
   - [ ] Quick action cards visible
   - [ ] Sidebar navigation works

**Expected:** Clean dashboard with your wallet address at top of sidebar.

---

### **TEST 4: Profile Management**

1. **Navigate:** Dashboard → Profile (sidebar)
2. **Check:**
   - [ ] See your wallet address (read-only)
   - [ ] Can edit Display Name
   - [ ] Can edit Bio
   - [ ] Click "Save Changes"
   - [ ] Success message appears
   - [ ] Data persists (refresh page)

**Test Database:** This will create your first user record in Supabase!

---

### **TEST 5: Twitter Account Linking**

1. **Go to:** Dashboard homepage
2. **Find:** Twitter Account card
3. **Enter:** Your Twitter username (without @)
4. **Click:** "Link" button
5. **Check:**
   - [ ] Verifying message appears
   - [ ] Success! Shows your Twitter profile
   - [ ] Card turns green with checkmark
   - [ ] Can click "Unlink" to remove

**Test Database:** Updates your user record with Twitter info.

**Note:** This uses twitterapi.io, so it just verifies the username exists - no OAuth needed!

---

### **TEST 6: AI Image Generation** ⚠️ NEEDS REPLICATE TOKEN

**Before testing, add to `.env.local`:**
```bash
REPLICATE_API_TOKEN=r8_your_token_here
REPLICATE_MODEL_VERSION=google/nano-banana
```

Then restart dev server: `Ctrl+C` and `npm run dev`

1. **Click:** "Generate" in sidebar or "Generate Memes Ser!" button
2. **On Generator Page:**
   - [ ] Form loads with prompt textarea
   - [ ] Character counter works (0/500)
   - [ ] Click a suggestion to populate prompt
   - [ ] Enter custom prompt (min 10 chars)
   - [ ] Click "Generate Image!"
   - [ ] Button shows "AI Very Busy Ser..."
   - [ ] Wait 10-30 seconds
   - [ ] Image appears below form
   - [ ] Can download image
   - [ ] Can share to Twitter (opens Twitter compose)

**Test Database:** Creates record in `generated_images` table and increments `user_stats.images_generated`.

---

### **TEST 7: My Images Gallery**

1. **Navigate:** Dashboard → My Images
2. **Check:**
   - [ ] Generated image appears in grid
   - [ ] Hover shows delete/visibility buttons
   - [ ] Click eye icon to toggle public/private
   - [ ] Click trash icon to delete
   - [ ] Confirm dialog appears
   - [ ] Image deleted from database

**Test Database:** CRUD operations on `generated_images` table.

---

### **TEST 8: Twitter Feed (Public)**

1. **Navigate:** http://localhost:3000/feed
2. **Check:**
   - [ ] Page loads
   - [ ] Shows "Loading tweets..." or "No tweets found"
   - [ ] Click "Refresh" button
   - [ ] (If Twitter API working) Tweets appear

**Note:** May show "No tweets" if no one has mentioned @ENGRISH yet or if TwitterAPI.io quota is exceeded.

---

### **TEST 9: Leaderboard (Public)**

1. **Navigate:** http://localhost:3000/leaderboard
2. **Check:**
   - [ ] Page loads with sidebar (if authenticated)
   - [ ] Shows "No leaderboard data yet" or actual rankings
   - [ ] Click "Refresh" button
   - [ ] If Twitter linked, shows "Your Rank" card

**Test:** Once you link Twitter and tweets exist, should show rankings.

---

### **TEST 10: Public Gallery**

1. **Navigate:** http://localhost:3000/gallery
2. **Check:**
   - [ ] Page loads
   - [ ] Shows generated images (if any exist and are public)
   - [ ] Or shows "No public images yet"
   - [ ] Images in responsive grid

---

## 🗄️ Database Verification

After testing, verify data in Supabase:

### Check Users Table:
```sql
SELECT * FROM users ORDER BY created_at DESC LIMIT 5;
```
**Should see:** Your wallet address, name, Twitter info (if linked)

### Check Generated Images:
```sql
SELECT * FROM generated_images ORDER BY created_at DESC LIMIT 10;
```
**Should see:** Your generated images with prompts

### Check User Stats:
```sql
SELECT * FROM user_stats;
```
**Should see:** Your stats with counts

---

## 🐛 Common Issues & Fixes

### Issue: Wallet won't connect
**Fix:** 
- Ensure you're on localhost (wallets require secure context)
- Check wallet extension is unlocked
- Try different wallet (Phantom vs Solflare)

### Issue: "Not authenticated" errors
**Fix:** 
- This is expected until NextAuth is fully fixed
- Wallet connection modal works but session isn't persisting yet
- Need to implement proper wallet JWT auth

### Issue: Images not generating
**Fix:**
- Verify `REPLICATE_API_TOKEN` is set
- Verify `REPLICATE_MODEL_VERSION=google/nano-banana`
- Check Replicate dashboard for API errors
- Check browser console for errors

### Issue: Twitter features not working
**Fix:**
- Verify `TWITTER_API_KEY` is correct
- Check twitterapi.io dashboard for quota
- May need to upgrade plan if free tier exceeded

### Issue: Page loads but shows "Loading..." forever
**Fix:**
- Check browser console for errors
- Check server terminal for tRPC errors
- Verify environment variables are set

---

## 📸 Screenshots to Take

After testing, take screenshots of:
1. Landing page (full scroll)
2. Connected wallet with Dashboard button visible
3. Dashboard with stats
4. Generated image (if Replicate works)
5. Profile page
6. Twitter linking

---

## ✅ Success Criteria

**MVP is complete when:**
- [ ] Landing page loads perfectly ✅ (DONE!)
- [ ] Wallet connects and shows Dashboard button ⏳
- [ ] Dashboard displays user info ⏳
- [ ] Can update profile ⏳
- [ ] Can link Twitter ⏳
- [ ] Can generate image ⏳ (needs Replicate token)
- [ ] Generated image saves to database ⏳
- [ ] Can view My Images ⏳
- [ ] Twitter feed loads (or gracefully shows empty) ✅ (DONE!)
- [ ] Leaderboard loads (or gracefully shows empty) ✅ (DONE!)

---

## 🚀 After Testing

Once all features work:
1. Document any bugs found
2. Add your Replicate token
3. Test image generation thoroughly
4. Deploy to Vercel
5. Test production environment
6. GO MOON! 🌙

---

**Start with TEST 1 (landing page) and work your way through!**

Let me know what you find ser! 🔥

