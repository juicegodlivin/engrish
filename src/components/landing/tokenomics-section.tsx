import { TOKENOMICS } from '~/lib/constants'
import Image from 'next/image'

export function TokenomicsSection() {
  const items = [
    { label: 'Total Supply', value: TOKENOMICS.totalSupply, icon: '/images/icons/china-05.png' }, // gold-ingot - wealth
    { label: 'Liquidity Pool', value: TOKENOMICS.liquidityPool, icon: '/images/icons/china-04.png' }, // noodles - liquid/pool
    { label: 'Community', value: TOKENOMICS.community, icon: '/images/icons/china-01.png' }, // teapot - gathering
    { label: 'Marketing', value: TOKENOMICS.marketing, icon: '/images/icons/china-08.png' }, // incense - spreading
    { label: 'Team', value: TOKENOMICS.team, icon: '/images/icons/china-09.png' }, // lucky-coin - rewards
  ]

  return (
    <section id="tokenomics" className="py-24 px-4 bg-gradient-to-b from-black/30 via-black/20 to-black/30">
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl font-bold font-display text-center mb-4">
          <span className="text-gradient-gold">TOKENOMICS</span>
        </h2>
        <p className="text-center text-gray-400 mb-12 text-lg">
          Very Fair Distribution (Trust Us Ser!)
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-black/40 backdrop-blur-sm border-2 border-brand-red-400 rounded-2xl p-6 hover:shadow-xl hover:shadow-brand-red-500/30 hover:border-brand-red-300 transition-all animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
               <div className="flex justify-center mb-3">
                 <div className="w-14 h-14 relative">
                   <Image
                     src={item.icon}
                     alt={item.label}
                     fill
                     sizes="56px"
                     className="object-contain"
                   />
                 </div>
               </div>
              <div className="text-3xl font-bold text-brand-gold-400 mb-2">
                {item.value}
              </div>
              <div className="text-white font-semibold">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

