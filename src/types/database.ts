/**
 * Database types generated from Supabase schema
 * These will be updated once we create the database
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          wallet_address: string
          email: string | null
          name: string | null
          bio: string | null
          avatar: string | null
          twitter_id: string | null
          twitter_username: string | null
          twitter_linked_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          wallet_address: string
          email?: string | null
          name?: string | null
          bio?: string | null
          avatar?: string | null
          twitter_id?: string | null
          twitter_username?: string | null
          twitter_linked_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          wallet_address?: string
          email?: string | null
          name?: string | null
          bio?: string | null
          avatar?: string | null
          twitter_id?: string | null
          twitter_username?: string | null
          twitter_linked_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      sessions: {
        Row: {
          id: string
          session_token: string
          user_id: string
          expires: string
        }
        Insert: {
          id?: string
          session_token: string
          user_id: string
          expires: string
        }
        Update: {
          id?: string
          session_token?: string
          user_id?: string
          expires?: string
        }
      }
      accounts: {
        Row: {
          id: string
          user_id: string
          type: string
          provider: string
          provider_account_id: string
          refresh_token: string | null
          access_token: string | null
          expires_at: number | null
          token_type: string | null
          scope: string | null
          id_token: string | null
          session_state: string | null
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          provider: string
          provider_account_id: string
          refresh_token?: string | null
          access_token?: string | null
          expires_at?: number | null
          token_type?: string | null
          scope?: string | null
          id_token?: string | null
          session_state?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          provider?: string
          provider_account_id?: string
          refresh_token?: string | null
          access_token?: string | null
          expires_at?: number | null
          token_type?: string | null
          scope?: string | null
          id_token?: string | null
          session_state?: string | null
        }
      }
      generated_images: {
        Row: {
          id: string
          user_id: string
          prompt: string
          image_url: string
          replicate_id: string | null
          is_public: boolean
          shared_to_twitter: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          prompt: string
          image_url: string
          replicate_id?: string | null
          is_public?: boolean
          shared_to_twitter?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          prompt?: string
          image_url?: string
          replicate_id?: string | null
          is_public?: boolean
          shared_to_twitter?: boolean
          created_at?: string
        }
      }
      twitter_mentions: {
        Row: {
          id: string
          twitter_user_id: string
          twitter_username: string
          tweet_id: string
          tweet_text: string | null
          tweet_url: string | null
          mention_count: number
          created_at: string
          indexed_at: string
        }
        Insert: {
          id?: string
          twitter_user_id: string
          twitter_username: string
          tweet_id: string
          tweet_text?: string | null
          tweet_url?: string | null
          mention_count?: number
          created_at?: string
          indexed_at?: string
        }
        Update: {
          id?: string
          twitter_user_id?: string
          twitter_username?: string
          tweet_id?: string
          tweet_text?: string | null
          tweet_url?: string | null
          mention_count?: number
          created_at?: string
          indexed_at?: string
        }
      }
      user_stats: {
        Row: {
          user_id: string
          images_generated: number
          images_shared: number
          twitter_mentions: number
          leaderboard_rank: number | null
          updated_at: string
        }
        Insert: {
          user_id: string
          images_generated?: number
          images_shared?: number
          twitter_mentions?: number
          leaderboard_rank?: number | null
          updated_at?: string
        }
        Update: {
          user_id?: string
          images_generated?: number
          images_shared?: number
          twitter_mentions?: number
          leaderboard_rank?: number | null
          updated_at?: string
        }
      }
    }
  }
}

