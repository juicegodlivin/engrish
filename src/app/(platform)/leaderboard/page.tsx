import { LeaderboardTable } from '~/components/leaderboard/leaderboard-table'

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <LeaderboardTable />

        {/* Info Box */}
        <div className="mt-8 p-6 bg-background-card border-2 border-brand-gold-400 rounded-2xl">
          <h3 className="text-xl font-bold text-brand-gold-400 mb-4">
            📢 How to Climb the Ranks
          </h3>
          <ul className="space-y-2 text-gray-300">
            <li>✓ Tweet about $ENGRISH and mention @ENGRISH</li>
            <li>✓ Share your generated memes on Twitter</li>
            <li>✓ Link your Twitter account in your dashboard</li>
            <li>✓ The more mentions, the higher your rank!</li>
            <li>✓ Top 3 get special badges and bragging rights</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

