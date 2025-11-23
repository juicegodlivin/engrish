import Image from 'next/image'

export function MemeGallery() {
  // Placeholder - will be populated with actual generated images later
  const placeholderImages = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    prompt: 'Very Funny Meme',
    icon: `/images/icons/china-${(i % 6) + 15}.png`, // Use china-15 through china-18 and repeat
  }))

  return (
    <section id="gallery" className="py-24 px-4 bg-gradient-to-b from-black/30 via-black/20 to-black/30">
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl font-bold font-display text-center mb-4">
          <span className="text-gradient-red">MEME GALLERY</span>
        </h2>
        <p className="text-center text-gray-400 mb-12 text-lg">
          Community Generated Masterpiece (AI Very Smart Ser!)
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {placeholderImages.map((image) => (
            <div
              key={image.id}
              className="aspect-square bg-black/40 backdrop-blur-sm border-2 border-brand-red-400 rounded-2xl hover:shadow-xl hover:shadow-brand-red-500/30 hover:border-brand-red-300 transition-all flex items-center justify-center"
            >
               <div className="text-center text-gray-400">
                 <div className="flex justify-center mb-4">
                   <div className="w-20 h-20 relative">
                     <Image
                       src={image.icon}
                       alt={image.prompt}
                       fill
                       sizes="80px"
                       className="object-contain opacity-60"
                     />
                   </div>
                 </div>
                <p className="text-lg font-semibold">{image.prompt}</p>
                <p className="text-sm mt-2">AI Generated Meme Here</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a
            href="/generate"
            className="btn-base px-8 py-4 bg-gradient-to-r from-brand-red-400 to-brand-red-600 hover:from-brand-red-500 hover:to-brand-red-700 text-white text-lg shadow-lg hover:shadow-brand-red-500/50"
          >
            Generate Your Own Meme 🎨
          </a>
        </div>
      </div>
    </section>
  )
}

