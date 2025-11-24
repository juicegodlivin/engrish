'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music, ChevronDown, ChevronUp } from 'lucide-react'

interface Song {
  id: string
  title: string
  artist: string
  filename: string
}

// Update these with your actual song files
const SONGS: Song[] = [
  {
    id: '1',
    title: 'Engrish Festival',
    artist: '$ENGRISH',
    filename: 'song1.mp3'
  },
  {
    id: '2',
    title: 'Engrish Kawaii Party',
    artist: '$ENGRISH',
    filename: 'song2.mp3'
  },
  {
    id: '3',
    title: 'Engrish Kawaii Party 2',
    artist: '$ENGRISH',
    filename: 'song3.mp3'
  },
  {
    id: '4',
    title: 'Engrish Trap',
    artist: '$ENGRISH',
    filename: 'song4.mp3'
  },
  {
    id: '5',
    title: 'Engrish Trap 2',
    artist: '$ENGRISH',
    filename: 'song5.mp3'
  }
]

export function MusicPlayer() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showPlaylist, setShowPlaylist] = useState(false)
  
  const audioRef = useRef<HTMLAudioElement>(null)

  const currentSong = SONGS[currentSongIndex]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => handleNext()

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [currentSongIndex])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % SONGS.length)
    setIsPlaying(true)
    setTimeout(() => audioRef.current?.play(), 100)
  }

  const handlePrevious = () => {
    setCurrentSongIndex((prev) => (prev - 1 + SONGS.length) % SONGS.length)
    setIsPlaying(true)
    setTimeout(() => audioRef.current?.play(), 100)
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    setCurrentTime(time)
    if (audioRef.current) {
      audioRef.current.currentTime = time
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    setIsMuted(false)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const selectSong = (index: number) => {
    setCurrentSongIndex(index)
    setIsPlaying(true)
    setShowPlaylist(false)
    setTimeout(() => audioRef.current?.play(), 100)
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={`/audio/${currentSong.filename}`}
        preload="metadata"
      />

      <div className="fixed bottom-4 right-4 z-50">
        {/* Playlist Dropdown */}
        {showPlaylist && (
          <div className="absolute bottom-full right-0 mb-2 w-64 bg-background-card/95 backdrop-blur-lg border border-white/10 rounded-lg shadow-xl overflow-hidden">
            <div className="p-3 border-b border-white/10">
              <h3 className="font-display font-semibold text-sm">Playlist</h3>
            </div>
            <div className="max-h-64 overflow-y-auto scrollbar-thin">
              {SONGS.map((song, index) => (
                <button
                  key={song.id}
                  onClick={() => selectSong(index)}
                  className={`w-full px-3 py-2 text-left hover:bg-white/5 transition-colors ${
                    index === currentSongIndex ? 'bg-brand-red-400/20 text-brand-red-400' : ''
                  }`}
                >
                  <div className="font-medium text-sm">{song.title}</div>
                  <div className="text-xs text-gray-400">{song.artist}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Player */}
        <div className={`bg-background-card/95 backdrop-blur-lg border border-white/10 rounded-lg shadow-2xl transition-all duration-300 ${
          isExpanded ? 'w-80' : 'w-64'
        }`}>
          {/* Expanded View */}
          {isExpanded && (
            <div className="p-4 border-b border-white/10">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-sm truncate">
                    {currentSong.title}
                  </h3>
                  <p className="text-xs text-gray-400 truncate">{currentSong.artist}</p>
                </div>
                <button
                  onClick={() => setShowPlaylist(!showPlaylist)}
                  className="ml-2 p-1 hover:bg-white/10 rounded transition-colors"
                  title="Playlist"
                >
                  <Music className="w-4 h-4" />
                </button>
              </div>

              {/* Time Slider */}
              <div className="space-y-1">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleTimeChange}
                  className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-red"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="p-3">
            {!isExpanded && (
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Music className="w-4 h-4 text-brand-red-400 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium truncate">{currentSong.title}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Playback Controls */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrevious}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Previous"
                >
                  <SkipBack className="w-4 h-4" />
                </button>
                <button
                  onClick={togglePlay}
                  className="p-2 bg-brand-red-400 hover:bg-brand-red-500 rounded-lg transition-colors"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Next"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                {isExpanded && (
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-red"
                  />
                )}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title={isExpanded ? 'Collapse' : 'Expand'}
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronUp className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider-red::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          background: #FF4444;
          border-radius: 50%;
          cursor: pointer;
        }

        .slider-red::-moz-range-thumb {
          width: 12px;
          height: 12px;
          background: #FF4444;
          border-radius: 50%;
          cursor: pointer;
          border: none;
        }

        .slider-red::-webkit-slider-thumb:hover {
          background: #FF5555;
        }

        .slider-red::-moz-range-thumb:hover {
          background: #FF5555;
        }
      `}</style>
    </>
  )
}

