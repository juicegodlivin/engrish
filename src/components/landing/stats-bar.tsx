import Image from 'next/image'

export function StatsBar() {
  const stats = [
    { label: 'Holders', value: '38,888', subtext: 'Very Lucky Number', icon: '/images/icons/china-07.png' }, // fortune-cookies - community
    { label: 'Market Cap', value: '$888K', subtext: 'Going Moon Soon', icon: '/images/icons/china-02.png' }, // gong - announcements
    { label: 'Memes Generated', value: '12,345', subtext: 'AI Work Hard Ser', icon: '/images/icons/china-03.png' }, // mahjong - activity
    { label: 'Twitter Mentions', value: '50,000+', subtext: 'Very Viral', icon: '/images/icons/china-11.png' }, // firecrackers - viral/explosive
  ]

  return (
    <section id="stats" className="py-16 bg-black/40 backdrop-blur-sm border-y border-brand-red-400/30">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
               <div className="flex justify-center mb-3">
                 <div className="w-12 h-12 relative">
                   <Image
                     src={stat.icon}
                     alt={stat.label}
                     fill
                     sizes="48px"
                     className="object-contain"
                   />
                 </div>
               </div>
              <div className="text-3xl md:text-4xl font-bold text-gradient-gold mb-2">
                {stat.value}
              </div>
              <div className="text-white font-semibold mb-1">{stat.label}</div>
              <div className="text-sm text-gray-400">{stat.subtext}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

