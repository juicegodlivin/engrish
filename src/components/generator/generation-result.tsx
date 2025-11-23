'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Download, Twitter, Share2, Check } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'
import { trpc } from '~/lib/trpc'

interface GenerationResultProps {
  image: {
    id: string
    prompt: string
    image_url: string
    created_at: string
  }
}

export function GenerationResult({ image }: GenerationResultProps) {
  const [downloading, setDownloading] = useState(false)
  const [shared, setShared] = useState(false)

  const markSharedMutation = trpc.image.markShared.useMutation()

  const handleDownload = async () => {
    setDownloading(true)
    try {
      const response = await fetch(image.image_url)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `engrish-meme-${image.id}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download error:', error)
    } finally {
      setDownloading(false)
    }
  }

  const handleShareTwitter = () => {
    const tweetText = `Check out my $ENGRISH meme! 🔥\n\nGenerated with AI on engrish.fun\n\n#ENGRISH #SolanaMeme #AIArt`
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`
    window.open(twitterUrl, '_blank')
    
    // Mark as shared in database
    markSharedMutation.mutate({ imageId: image.id })
    setShared(true)
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(image.image_url)
      // Show toast notification (implement later)
      alert('Link copied ser!')
    } catch (error) {
      console.error('Copy error:', error)
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Check className="w-5 h-5 text-green-500" />
          Generation Complete! 🎉
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Generated Image */}
        <div className="relative aspect-square w-full rounded-xl overflow-hidden border-4 border-brand-red-400 bg-background-darker">
          <Image
            src={image.image_url}
            alt={image.prompt}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Prompt */}
        <div className="p-4 bg-background-darker rounded-xl">
          <p className="text-sm text-gray-400 mb-1">Your Prompt:</p>
          <p className="text-white">{image.prompt}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="primary"
          onClick={handleDownload}
          disabled={downloading}
          className="flex-1"
        >
          <Download className="mr-2 h-4 w-4" />
          {downloading ? 'Downloading...' : 'Download Image'}
        </Button>
        <Button
          variant="gold"
          onClick={handleShareTwitter}
          disabled={shared}
          className="flex-1"
        >
          <Twitter className="mr-2 h-4 w-4" />
          {shared ? 'Shared!' : 'Share to Twitter'}
        </Button>
        <Button variant="secondary" onClick={handleCopyLink}>
          <Share2 className="mr-2 h-4 w-4" />
          Copy Link
        </Button>
      </CardFooter>
    </Card>
  )
}

