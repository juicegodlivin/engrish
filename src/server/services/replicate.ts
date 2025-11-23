/**
 * Replicate AI Service
 * Handles image generation using Replicate API
 */
import Replicate from 'replicate'

// Initialize Replicate client
const replicate = process.env.REPLICATE_API_TOKEN
  ? new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    })
  : null

const MODEL_VERSION = process.env.REPLICATE_MODEL_VERSION || 'black-forest-labs/flux-schnell'

export interface GenerateImageInput {
  prompt: string
  numOutputs?: number
  quality?: 'standard' | 'hd'
}

export interface GenerateImageOutput {
  id: string
  imageUrl: string
  status: 'processing' | 'succeeded' | 'failed'
}

/**
 * Generate an image using Replicate
 */
export async function generateImage(
  input: GenerateImageInput
): Promise<GenerateImageOutput> {
  if (!replicate) {
    throw new Error('Replicate API not configured. Please add REPLICATE_API_TOKEN to your .env.local')
  }

  if (!MODEL_VERSION) {
    throw new Error('Replicate model not configured. Please add REPLICATE_MODEL_VERSION to your .env.local')
  }

  try {
    console.log('🎨 Generating image with Replicate...')
    console.log('📝 Prompt:', input.prompt.substring(0, 50) + '...')
    console.log('🤖 Model:', MODEL_VERSION)

    const output = await replicate.run(
      MODEL_VERSION as `${string}/${string}:${string}`,
      {
        input: {
          prompt: input.prompt,
          num_outputs: input.numOutputs || 1,
          width: 1024,
          height: 1024,
          // Add your model-specific parameters here
        },
      }
    )

    console.log('✅ Replicate output received:', typeof output)

    // Parse the output based on your model's output format
    let imageUrl: string
    
    if (Array.isArray(output)) {
      imageUrl = output[0] as string
    } else if (typeof output === 'string') {
      imageUrl = output
    } else if (output && typeof output === 'object' && 'url' in output) {
      imageUrl = (output as any).url
    } else {
      console.error('Unexpected output format:', output)
      throw new Error('Unexpected output format from Replicate')
    }

    console.log('🖼️  Image URL:', imageUrl.substring(0, 50) + '...')

    return {
      id: '', // Replicate prediction ID will be in the metadata
      imageUrl,
      status: 'succeeded',
    }
  } catch (error) {
    console.error('❌ Replicate generation error:', error)
    throw new Error(error instanceof Error ? error.message : 'Failed to generate image')
  }
}

/**
 * Get the status of a generation
 */
export async function getGenerationStatus(
  predictionId: string
): Promise<GenerateImageOutput> {
  if (!replicate) {
    throw new Error('Replicate API not configured')
  }

  try {
    const prediction = await replicate.predictions.get(predictionId)

    return {
      id: prediction.id,
      imageUrl: Array.isArray(prediction.output)
        ? prediction.output[0]
        : (prediction.output as string) || '',
      status:
        prediction.status === 'succeeded'
          ? 'succeeded'
          : prediction.status === 'failed'
          ? 'failed'
          : 'processing',
    }
  } catch (error) {
    console.error('Replicate status check error:', error)
    throw new Error('Failed to check generation status')
  }
}

/**
 * Cancel a generation (optional)
 */
export async function cancelGeneration(predictionId: string): Promise<void> {
  if (!replicate) {
    throw new Error('Replicate API not configured')
  }

  try {
    await replicate.predictions.cancel(predictionId)
  } catch (error) {
    console.error('Replicate cancel error:', error)
    throw new Error('Failed to cancel generation')
  }
}

