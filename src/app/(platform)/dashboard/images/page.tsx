'use client'

import Image from 'next/image'
import { Trash2, Eye, EyeOff, Download } from 'lucide-react'
import { trpc } from '~/lib/trpc'
import { LoadingSpinner } from '~/components/ui/loading-spinner'
import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'

export default function MyImagesPage() {
  const { data, isLoading } = trpc.image.getUserImages.useQuery({ limit: 20 })
  const utils = trpc.useContext()

  const deleteMutation = trpc.image.deleteImage.useMutation({
    onSuccess: () => {
      utils.image.getUserImages.invalidate()
    },
  })

  const toggleVisibilityMutation = trpc.image.toggleVisibility.useMutation({
    onSuccess: () => {
      utils.image.getUserImages.invalidate()
    },
  })

  const handleDelete = (imageId: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      deleteMutation.mutate({ imageId })
    }
  }

  const handleToggleVisibility = (imageId: string, isPublic: boolean) => {
    toggleVisibilityMutation.mutate({ imageId, isPublic: !isPublic })
  }

  const handleDownload = async (imageUrl: string, prompt: string) => {
    try {
      // Fetch the image
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      
      // Create a download link
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      
      // Generate filename from prompt (sanitized)
      const sanitizedPrompt = prompt
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .substring(0, 50)
      link.download = `engrish-${sanitizedPrompt}-${Date.now()}.png`
      
      // Trigger download
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Clean up
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
      alert('Failed to download image. Please try again.')
    }
  }

  if (isLoading) {
    return (
      <div className="p-8">
        <LoadingSpinner size="lg" text="Loading your images..." />
      </div>
    )
  }

  const images = data?.items || []

  return (
    <div className="p-8 space-y-8 min-h-screen">
      <div>
        <h1 className="text-4xl font-bold font-display text-gradient-red">
          My Generated Images
        </h1>
        <p className="text-gray-400 mt-2">
          Total images: {images.length}
        </p>
      </div>

      {images.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-6xl mb-4">🎨</div>
            <p className="text-xl text-gray-400 mb-6">
              No images generated yet ser!
            </p>
            <Button asChild>
              <a href="/generate">Generate Your First Meme</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden group">
              <div className="relative aspect-square">
                <Image
                  src={image.image_url}
                  alt={image.prompt}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={() => handleDownload(image.image_url, image.prompt)}
                    title="Download image"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant={image.is_public ? 'primary' : 'secondary'}
                    onClick={() => handleToggleVisibility(image.id, image.is_public)}
                    title={image.is_public ? 'Make private' : 'Make public'}
                  >
                    {image.is_public ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleDelete(image.id)}
                    disabled={deleteMutation.isLoading}
                    title="Delete image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-gray-400 line-clamp-2">
                  {image.prompt}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">
                    {new Date(image.created_at).toLocaleDateString()}
                  </span>
                  <span className={`text-xs ${image.is_public ? 'text-green-400' : 'text-gray-400'}`}>
                    {image.is_public ? 'Public' : 'Private'}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

