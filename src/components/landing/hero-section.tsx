import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4 relative overflow-hidden">
      {/* Background - Subtle gradient only */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30 -z-10" />
      
      <div className="container-custom text-center">
        <div className="animate-float mb-8">
          <Image
            src="/images/Engrish Logo.png"
            alt="$ENGRISH Logo"
            width={160}
            height={160}
            className="mx-auto drop-shadow-2xl"
            priority
          />
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display mb-6">
          <span className="text-gradient-red">$ENGRISH</span>
        </h1>
        
        <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
          WE NO SPEAK GOOD ENGRISH
        </p>
        <p className="text-xl md:text-2xl text-brand-gold-400 font-semibold mb-8">
          BUT WE SPEAK GOOD MOON 
        </p>
        
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12">
          $ENGRISH token equal good investment.
          <br />
          Join thousand Asian degen who finally speak same language.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/generate"
             className="btn-base px-8 py-4 bg-gradient-to-r from-brand-red-400 to-brand-red-600 hover:from-brand-red-500 hover:to-brand-red-700 text-white text-lg shadow-lg shadow-brand-red-500/30 hover:shadow-brand-red-500/60"
          >
            Generate Memes Ser! 
          </a>
          <a
            href="#how-to-buy"
            className="btn-base px-8 py-4 bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 hover:from-brand-gold-500 hover:to-brand-gold-700 text-black text-lg shadow-lg hover:shadow-brand-gold-500/50 font-bold"
          >
            Buy $ENGRISH 
          </a>
        </div>
      </div>
    </section>
  )
}

