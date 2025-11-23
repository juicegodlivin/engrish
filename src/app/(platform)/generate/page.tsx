import { ImageGeneratorForm } from '~/components/generator/image-generator-form'

export default function GeneratePage() {
  return (
    <div className="min-h-screen py-24 px-4">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold font-display mb-4">
            <span className="text-gradient-red">AI MEME GENERATOR</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Create custom $ENGRISH memes powered by AI technology very advanced ser! 🎨
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Rate limit: 5 generations per minute (We protect server from overwork)
          </p>
        </div>

        {/* Generator Form */}
        <ImageGeneratorForm />

        {/* Tips Section */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-background-card border-2 border-brand-gold-400 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-brand-gold-400 mb-4">
              💡 Tips for Best Results
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>✓ Be specific about characters, poses, and background</li>
              <li>✓ Include text you want in the image in quotes</li>
              <li>✓ Mention colors and mood (funny, dramatic, epic)</li>
              <li>✓ Reference popular meme formats for better results</li>
              <li>✓ Longer prompts = more detailed images (but not too long!)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

