import { TEAM_MEMBERS } from '~/lib/constants'
import { Twitter } from 'lucide-react'

export function TeamSection() {
  return (
    <section id="team" className="py-24 px-4 bg-gradient-to-b from-black/20 via-black/30 to-black/20">
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl font-bold font-display text-center mb-4">
          <span className="text-gradient-red">MEET THE LEGENDARY TEAM</span>
        </h2>
        <p className="text-center text-gray-400 mb-12 text-lg">
          Very Professional Developer (We Have Certificate From YouTube)
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {TEAM_MEMBERS.map((member, index) => (
            <div
              key={index}
              className="bg-black/40 backdrop-blur-sm border-2 border-brand-red-400 rounded-2xl p-6 hover:shadow-xl hover:shadow-brand-red-500/30 hover:border-brand-red-300 transition-all group"
            >
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-brand-gold-400 to-brand-gold-600 rounded-full flex items-center justify-center text-4xl">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-2">
                {member.name}
              </h3>
              <p className="text-brand-gold-400 text-center mb-3 font-semibold">
                {member.role}
              </p>
              <p className="text-gray-400 text-sm text-center mb-4">
                {member.description}
              </p>
              <div className="flex justify-center">
                <a
                  href={member.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-background-darker hover:bg-brand-red-500 transition-all text-gray-400 hover:text-white"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

