# Audio Files for Music Player

This directory contains the audio files for the site-wide music player.

## Required Files

Add the following 5 MP3 files to this directory:

1. `song1.mp3` - Engrish Theme
2. `song2.mp3` - Moon Language
3. `song3.mp3` - We Go Together
4. `song4.mp3` - Trust Us Ser
5. `song5.mp3` - No Speak Good

## File Requirements

- **Format**: MP3
- **Recommended bitrate**: 128-192 kbps (good quality, reasonable file size)
- **Duration**: 2-5 minutes per song
- **Max file size**: 10MB per file (for faster loading)

## Where to Get Royalty-Free Music

Here are some great sources for royalty-free music that fits a meme coin vibe:

1. **YouTube Audio Library** - https://studio.youtube.com/channel/UC/music
   - 100% free, no attribution required
   - Filter by "Electronic" or "Hip Hop" genres

2. **Pixabay Music** - https://pixabay.com/music/
   - Free for commercial use
   - Great electronic/upbeat tracks

3. **Incompetech** - https://incompetech.com/music/royalty-free/
   - Free with attribution
   - Huge library, filter by mood/genre

4. **Free Music Archive** - https://freemusicarchive.org/
   - Creative Commons licensed
   - Diverse selection

5. **Bensound** - https://www.bensound.com/
   - Free with attribution
   - High-quality tracks

## Adding Your Music

1. Download your MP3 files from any source above
2. Rename them to: `song1.mp3`, `song2.mp3`, `song3.mp3`, `song4.mp3`, `song5.mp3`
3. Place them in this directory (`public/audio/`)
4. Update song titles in `/src/components/music-player/music-player.tsx` (optional)

## Customizing Songs

To change song titles, artist names, or add more songs, edit the `SONGS` array in:
`/src/components/music-player/music-player.tsx`

```typescript
const SONGS: Song[] = [
  {
    id: '1',
    title: 'Your Song Title',  // Update this
    artist: 'Artist Name',      // Update this
    filename: 'song1.mp3'       // Keep this matching your file
  },
  // Add more songs here...
]
```

## Testing Without Audio Files

The player will work without audio files, but you'll see console errors. Add at least one MP3 file to test the full functionality.

