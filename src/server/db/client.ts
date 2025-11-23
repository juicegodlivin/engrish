import { createClient } from '@supabase/supabase-js'
import type { Database } from '~/types/database'

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Warn if Supabase is not configured (allow dev without full setup)
const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

if (!isSupabaseConfigured) {
  console.warn('⚠️  Supabase is not configured. Database features will be disabled.')
  console.warn('   See env.example.md for setup instructions.')
}

/**
 * Supabase client for client-side operations
 * Uses anon key with RLS policies
 * Returns null if not configured
 */
export const supabase = isSupabaseConfigured
  ? createClient<Database>(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: false, // We use NextAuth for session management
      },
    })
  : null

/**
 * Supabase admin client for server-side operations
 * Bypasses RLS policies - use with caution!
 */
export const supabaseAdmin =
  isSupabaseConfigured && supabaseServiceKey
    ? createClient<Database>(supabaseUrl!, supabaseServiceKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      })
    : null

/**
 * Helper to get user by wallet address
 * Uses admin client to bypass RLS
 */
export async function getUserByWalletAddress(walletAddress: string) {
  if (!supabaseAdmin) {
    throw new Error('Supabase admin client not initialized. Please check your environment variables.')
  }

  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('wallet_address', walletAddress)
    .single()

  if (error && error.code !== 'PGRST116') {
    // PGRST116 is "not found" - other errors should throw
    console.error('Error fetching user:', error)
    throw error
  }

  return data
}

/**
 * Helper to create or update user
 */
export async function upsertUser(walletAddress: string, data?: Partial<Database['public']['Tables']['users']['Insert']>) {
  if (!supabaseAdmin) {
    throw new Error('Supabase admin client not initialized. Please check your environment variables.')
  }

  const { data: user, error } = await supabaseAdmin
    .from('users')
    .upsert({
      wallet_address: walletAddress,
      ...data,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) throw error
  return user
}

/**
 * Helper to get user stats
 */
export async function getUserStats(userId: string) {
  if (!supabase) {
    throw new Error('Supabase is not configured. Please check your environment variables.')
  }

  const { data, error } = await supabase
    .from('user_stats')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error && error.code !== 'PGRST116') {
    throw error
  }

  return data
}

