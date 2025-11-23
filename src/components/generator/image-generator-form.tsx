'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Sparkles } from 'lucide-react'
import { trpc } from '~/lib/trpc'
import { imageGenerationSchema, type ImageGenerationInput } from '~/lib/validations'
import { Button } from '~/components/ui/button'
import { Textarea } from '~/components/ui/textarea'
import { Label } from '~/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { PromptSuggestions } from './prompt-suggestions'
import { GenerationResult } from './generation-result'

export function ImageGeneratorForm() {
  const [generatedImage, setGeneratedImage] = useState<any>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ImageGenerationInput>({
    resolver: zodResolver(imageGenerationSchema),
  })

  const prompt = watch('prompt')
  const characterCount = prompt?.length || 0

  const generateMutation = trpc.image.generate.useMutation({
    onSuccess: (data) => {
      console.log('✅ Image generated successfully!', data)
      setGeneratedImage(data)
    },
    onError: (error) => {
      console.error('❌ Generation error:', error)
      // Error is shown in the UI via generateMutation.error
    },
  })

  const onSubmit = (data: ImageGenerationInput) => {
    console.log('🚀 Submitting generation request...')
    setGeneratedImage(null) // Clear previous result
    generateMutation.mutate(data)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setValue('prompt', suggestion)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-brand-gold-400" />
            AI Meme Generator
          </CardTitle>
          <CardDescription>
            Enter your meme idea in perfect Engrish and let AI make it beautiful ser!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Show generating progress */}
            {generateMutation.isLoading && (
              <div className="p-6 bg-gradient-to-r from-brand-red-500/20 to-brand-gold-500/20 border-2 border-brand-gold-400 rounded-2xl text-center">
                <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-brand-gold-400" />
                <p className="text-xl font-bold text-white mb-2">
                  🎨 AI Making Your Masterpiece...
                </p>
                <p className="text-sm text-gray-300">
                  This usually takes 10-30 seconds. Very worth the wait ser!
                </p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-brand-gold-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-brand-gold-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-brand-gold-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="prompt">Your Meme Idea 🎨</Label>
                <span
                  className={`text-sm ${
                    characterCount > 500
                      ? 'text-red-400'
                      : characterCount > 400
                      ? 'text-brand-gold-400'
                      : 'text-gray-500'
                  }`}
                >
                  {characterCount} / 500
                </span>
              </div>
              <Textarea
                id="prompt"
                {...register('prompt')}
                placeholder="Example: Make picture of doge wearing lambo with text 'Much Rich Very Profit' on moon background with many diamond hands"
                rows={6}
                disabled={generateMutation.isLoading}
              />
              {errors.prompt && (
                <p className="text-sm text-red-400">{errors.prompt.message}</p>
              )}
            </div>

            {/* Prompt Suggestions */}
            <PromptSuggestions onSelect={handleSuggestionClick} />

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="submit"
                disabled={generateMutation.isLoading || !prompt}
                className="flex-1"
                size="lg"
              >
                {generateMutation.isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    AI Very Busy Ser...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate Image!
                  </>
                )}
              </Button>
            </div>

            {generateMutation.error && (
              <div className="p-4 border-2 border-red-500 bg-red-500/10 rounded-xl">
                <p className="text-sm text-red-400 font-semibold mb-1">
                  ❌ Generation Failed
                </p>
                <p className="text-xs text-red-300">
                  {generateMutation.error.message}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Check that REPLICATE_API_TOKEN and REPLICATE_MODEL_VERSION are set in your .env.local
                </p>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {generatedImage && <GenerationResult image={generatedImage} />}
    </div>
  )
}

