import { TwitterFeed } from '~/components/feed/twitter-feed'
import { Navbar } from '~/components/layout/navbar'
import { Footer } from '~/components/layout/footer'

export default function FeedPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background-darker to-background-dark">
      <Navbar />
      <div className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <TwitterFeed />
        </div>
      </div>
      <Footer />
    </main>
  )
}

