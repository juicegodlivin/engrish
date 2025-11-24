import type { Metadata } from 'next'
import { Noto_Sans_JP, Noto_Serif } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const notoSansJP = Noto_Sans_JP({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
})

const notoSerif = Noto_Serif({ 
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-noto-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: '$ENGRISH - We No Speak Good Engrish But We Speak Moon Language Perfect',
  description: 'The only token where bad grammar = good investment. Join the legendary $ENGRISH community and generate custom memes with AI!',
  keywords: ['Solana', 'Meme Coin', 'ENGRISH', 'Crypto', 'AI Memes', 'Web3'],
  authors: [{ name: '$ENGRISH Team' }],
  icons: {
    icon: '/images/Engrish Favicon.png',
    shortcut: '/images/Engrish Favicon.png',
    apple: '/images/Engrish Favicon.png',
  },
  openGraph: {
    title: '$ENGRISH - We No Speak Good Engrish',
    description: 'The legendary meme coin with AI-powered meme generation. Trust us ser, we go moon together!',
    type: 'website',
    images: ['/images/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '$ENGRISH - We No Speak Good Engrish',
    description: 'The legendary meme coin with AI-powered meme generation',
    images: ['/images/twitter-card.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${notoSansJP.variable} ${notoSerif.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

