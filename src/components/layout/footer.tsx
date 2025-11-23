import Image from 'next/image'
import { Twitter, Send, MessageCircle } from 'lucide-react'
import { APP_NAME, SOCIAL_LINKS } from '~/lib/constants'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-brand-red-400/30 bg-black/40 backdrop-blur-sm">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="/images/Engrish Logo.png"
                alt="$ENGRISH Logo"
                width={40}
                height={40}
                className="drop-shadow-lg"
              />
              <span className="text-xl font-bold font-display text-gradient-red">
                {APP_NAME}
              </span>
            </div>
            <p className="text-gray-400 max-w-md mb-6">
              We No Speak Good Engrish But We Speak Moon Language Perfect 🚀
              <br />
              The only token where bad grammar = good investment ser!
            </p>
            <div className="flex items-center space-x-4">
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-background-card hover:bg-brand-red-500 transition-all text-gray-400 hover:text-white"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-background-card hover:bg-brand-red-500 transition-all text-gray-400 hover:text-white"
              >
                <Send className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-background-card hover:bg-brand-red-500 transition-all text-gray-400 hover:text-white"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-gray-400 hover:text-brand-red-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#tokenomics" className="text-gray-400 hover:text-brand-red-400 transition-colors">
                  Tokenomics
                </a>
              </li>
              <li>
                <a href="#how-to-buy" className="text-gray-400 hover:text-brand-red-400 transition-colors">
                  How to Buy
                </a>
              </li>
              <li>
                <a href="/generate" className="text-gray-400 hover:text-brand-red-400 transition-colors">
                  Generate Memes
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-bold text-white mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <a href="/leaderboard" className="text-gray-400 hover:text-brand-red-400 transition-colors">
                  Leaderboard
                </a>
              </li>
              <li>
                <a href="/feed" className="text-gray-400 hover:text-brand-red-400 transition-colors">
                  Twitter Feed
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-gray-400 hover:text-brand-red-400 transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="/dashboard" className="text-gray-400 hover:text-brand-red-400 transition-colors">
                  Dashboard
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-brand-red-500/20 mt-12 pt-8 text-center text-gray-400">
          <p>
            © {currentYear} {APP_NAME}. We build very good website. Trust us ser! 🔥
          </p>
          <p className="text-sm mt-2">
            Disclaimer: This very serious financial advice. DYOR ser!
          </p>
        </div>
      </div>
    </footer>
  )
}

