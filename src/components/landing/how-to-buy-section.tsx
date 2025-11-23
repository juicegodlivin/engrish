import { HOW_TO_BUY_STEPS } from '~/lib/constants'
import Image from 'next/image'

const stepIcons = [
  '/images/icons/china-10.png', // bell - alert/notification for Get Wallet
  '/images/icons/china-05.png', // gold-ingot - money for Buy SOL
  '/images/icons/china-06.png', // scroll - contract for Connect Wallet
  '/images/icons/china-12.png', // bamboo - growth for Swap
  '/images/icons/china-14.png', // gong-mallet - big action for HODL
]

export function HowToBuySection() {
  return (
    <section id="how-to-buy" className="py-24 px-4 bg-gradient-to-b from-black/30 via-black/20 to-black/30">
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl font-bold font-display text-center mb-4">
          <span className="text-gradient-gold">HOW TO BUY $ENGRISH</span>
        </h2>
        <p className="text-center text-gray-400 mb-12 text-lg">
          Very Easy Process (Even Grandma Can Do!)
        </p>
        
        <div className="max-w-4xl mx-auto space-y-6">
          {HOW_TO_BUY_STEPS.map((step, index) => (
            <div
              key={index}
              className="bg-black/40 backdrop-blur-sm border-2 border-brand-red-400 rounded-2xl p-6 hover:shadow-xl hover:shadow-brand-red-500/30 hover:border-brand-red-300 transition-all flex items-start gap-6"
            >
               <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-brand-red-400 to-brand-red-600 rounded-full flex items-center justify-center p-3">
                 <div className="w-14 h-14 relative">
                   <Image
                     src={stepIcons[index]}
                     alt={`Step ${step.step}`}
                     fill
                     sizes="56px"
                     className="object-contain"
                   />
                 </div>
               </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-brand-gold-400 font-bold text-xl">{step.step}</span>
                  <h3 className="text-2xl font-bold text-white">
                    {step.title}
                  </h3>
                </div>
                <p className="text-gray-400">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a
            href="#"
            className="btn-base px-8 py-4 bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 hover:from-brand-gold-500 hover:to-brand-gold-700 text-black text-lg shadow-lg hover:shadow-brand-gold-500/50 font-bold inline-flex items-center"
          >
            Buy Now on Decentralized Finance
          </a>
        </div>
      </div>
    </section>
  )
}

