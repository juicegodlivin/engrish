'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, type ReactNode } from 'react'
import { trpc, createTRPCClient } from '~/lib/trpc-client'
import { WalletProvider } from '~/components/wallet/wallet-provider'
import { AuthHandler } from '~/components/wallet/auth-handler'

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes - keep data fresh longer
        cacheTime: 10 * 60 * 1000, // 10 minutes in cache
        refetchOnWindowFocus: false,
        refetchOnMount: false, // Don't refetch on every mount
        retry: 1, // Only retry once on failure
      },
    },
  }))

  const [trpcClient] = useState(() => createTRPCClient())

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <WalletProvider>
          <AuthHandler />
          {children}
        </WalletProvider>
      </QueryClientProvider>
    </trpc.Provider>
  )
}

