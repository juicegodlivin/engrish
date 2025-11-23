'use client'

import { Lightbulb } from 'lucide-react'
import { Button } from '~/components/ui/button'

const SUGGESTIONS = [
  "Doge in lambo driving to moon with text 'Much Speed Very Fast'",
  "Pepe wearing gold chain counting money with text 'Stonks Only Go Up'",
  "Cat pushing button labeled 'Buy $ENGRISH' with rainbow explosion",
  "Asian grandma looking at chart saying 'Why You No Buy Dip?'",
  "Rocket ship made of ramen flying past Solana logo",
  "Wojak crying while looking at green candles thinking 'I Sold Bottom'",
]

interface PromptSuggestionsProps {
  onSelect: (prompt: string) => void
}

export function PromptSuggestions({ onSelect }: PromptSuggestionsProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Lightbulb className="w-4 h-4" />
        <span>Need inspiration? Try these:</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {SUGGESTIONS.map((suggestion, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(suggestion)}
            className="text-left p-3 text-sm bg-background-darker hover:bg-background-card border border-gray-700 hover:border-brand-red-400 rounded-lg transition-all text-gray-300 hover:text-white"
          >
            "{suggestion}"
          </button>
        ))}
      </div>
    </div>
  )
}

