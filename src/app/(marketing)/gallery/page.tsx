'use client'

import Image from 'next/image'
import { trpc } from '~/lib/trpc'
import { Navbar } from '~/components/layout/navbar'
import { Footer } from '~/components/layout/footer'
import { LoadingSpinner } from '~/components/ui/loading-spinner'
import { Card, CardContent } from '~/components/ui/card'
import type { Database } from '~/types/database'

type GeneratedImage = Database['public']['Tables']['generated_images']['Row']

export default function GalleryPage() {
  const { data, isLoading } = trpc.image.getPublicGallery.useQuery({ limit: 30 })
  const images: GeneratedImage[] = (data?.items as GeneratedImage[]) || []

  return (
    <main className="min-h-screen bg-gradient-to-b from-background-darker to-background-dark">
      <Navbar />
      <div className="py-24 px-4">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold font-display text-gradient-red mb-4">
              COMMUNITY MEME GALLERY
            </h1>
            <p className="text-xl text-gray-300">
              AI-generated masterpieces from the $ENGRISH community 🎨
            </p>
          </div>

          {isLoading && <LoadingSpinner size="lg" text="Loading gallery..." />}

          {images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image) => (
                <Card key={image.id} className="overflow-hidden group">
                  <div className="relative aspect-square">
                    <Image
                      src={image.image_url}
                      alt={image.prompt}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-400 line-clamp-2 mb-2">
                      {image.prompt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>by {image.users?.name || 'Anonymous'}</span>
                      <span>{new Date(image.created_at).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {data && data.items.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="text-6xl mb-4">🎨</div>
                <p className="text-xl text-gray-400">
                  No public images yet. Be the first to create!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}

