-- $ENGRISH Database Migration
-- Run this in your Supabase SQL Editor
-- Database: PostgreSQL via Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- TABLES
-- ============================================================================

-- Users table (stores wallet addresses and profile data)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wallet_address VARCHAR(44) UNIQUE NOT NULL, -- Solana wallet address
  email VARCHAR(255) UNIQUE, -- Optional email for magic link auth
  name VARCHAR(255),
  bio TEXT,
  avatar TEXT,
  twitter_id VARCHAR(255) UNIQUE,
  twitter_username VARCHAR(255),
  twitter_linked_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sessions table (NextAuth)
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_token VARCHAR(255) UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  expires TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Accounts table (NextAuth - for OAuth providers)
CREATE TABLE IF NOT EXISTS accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  type VARCHAR(50) NOT NULL,
  provider VARCHAR(50) NOT NULL,
  provider_account_id VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at INTEGER,
  token_type VARCHAR(50),
  scope TEXT,
  id_token TEXT,
  session_state TEXT,
  UNIQUE(provider, provider_account_id)
);

-- Generated Images table
CREATE TABLE IF NOT EXISTS generated_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  prompt TEXT NOT NULL,
  image_url TEXT NOT NULL,
  replicate_id VARCHAR(255), -- Replicate prediction ID
  is_public BOOLEAN DEFAULT true,
  shared_to_twitter BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Twitter Mentions table (for leaderboard tracking)
CREATE TABLE IF NOT EXISTS twitter_mentions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  twitter_user_id VARCHAR(255) NOT NULL,
  twitter_username VARCHAR(255) NOT NULL,
  tweet_id VARCHAR(255) UNIQUE NOT NULL,
  tweet_text TEXT,
  tweet_url TEXT,
  mention_count INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  indexed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Stats table (cached aggregates for performance)
CREATE TABLE IF NOT EXISTS user_stats (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  images_generated INTEGER DEFAULT 0,
  images_shared INTEGER DEFAULT 0,
  twitter_mentions INTEGER DEFAULT 0,
  leaderboard_rank INTEGER,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- INDEXES (for query performance)
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_users_wallet_address ON users(wallet_address);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_twitter_id ON users(twitter_id);
CREATE INDEX IF NOT EXISTS idx_users_twitter_username ON users(twitter_username);

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(session_token);

CREATE INDEX IF NOT EXISTS idx_accounts_user_id ON accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_accounts_provider ON accounts(provider, provider_account_id);

CREATE INDEX IF NOT EXISTS idx_generated_images_user_id ON generated_images(user_id);
CREATE INDEX IF NOT EXISTS idx_generated_images_created_at ON generated_images(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_generated_images_is_public ON generated_images(is_public) WHERE is_public = true;

CREATE INDEX IF NOT EXISTS idx_twitter_mentions_username ON twitter_mentions(twitter_username);
CREATE INDEX IF NOT EXISTS idx_twitter_mentions_user_id ON twitter_mentions(twitter_user_id);
CREATE INDEX IF NOT EXISTS idx_twitter_mentions_created_at ON twitter_mentions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_user_stats_rank ON user_stats(leaderboard_rank) WHERE leaderboard_rank IS NOT NULL;

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE twitter_mentions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Service role can do anything with users" ON users
  FOR ALL USING (auth.role() = 'service_role');

-- Sessions policies
CREATE POLICY "Users can read their own sessions" ON sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage sessions" ON sessions
  FOR ALL USING (auth.role() = 'service_role');

-- Accounts policies
CREATE POLICY "Users can read their own accounts" ON accounts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage accounts" ON accounts
  FOR ALL USING (auth.role() = 'service_role');

-- Generated images policies
CREATE POLICY "Users can read their own images" ON generated_images
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create images" ON generated_images
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own images" ON generated_images
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own images" ON generated_images
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Anyone can read public images" ON generated_images
  FOR SELECT USING (is_public = true);

CREATE POLICY "Service role can manage images" ON generated_images
  FOR ALL USING (auth.role() = 'service_role');

-- Twitter mentions policies (public read)
CREATE POLICY "Anyone can read twitter mentions" ON twitter_mentions
  FOR SELECT USING (true);

CREATE POLICY "Service role can manage twitter mentions" ON twitter_mentions
  FOR ALL USING (auth.role() = 'service_role');

-- User stats policies
CREATE POLICY "Users can read their own stats" ON user_stats
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Anyone can read stats (for leaderboard)" ON user_stats
  FOR SELECT USING (true);

CREATE POLICY "Service role can manage user stats" ON user_stats
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for users table
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for user_stats table
CREATE TRIGGER update_user_stats_updated_at BEFORE UPDATE ON user_stats
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create user_stats entry when user is created
CREATE OR REPLACE FUNCTION create_user_stats()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_stats (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-create user_stats
CREATE TRIGGER on_user_created AFTER INSERT ON users
  FOR EACH ROW EXECUTE FUNCTION create_user_stats();

-- ============================================================================
-- INITIAL DATA (Optional)
-- ============================================================================

-- You can add any seed data here if needed

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Run these to verify the migration worked:
-- SELECT COUNT(*) FROM users;
-- SELECT COUNT(*) FROM generated_images;
-- SELECT * FROM information_schema.tables WHERE table_schema = 'public';

COMMENT ON TABLE users IS 'User accounts linked to Solana wallet addresses';
COMMENT ON TABLE generated_images IS 'AI-generated meme images created by users';
COMMENT ON TABLE twitter_mentions IS 'Tracks Twitter mentions of $ENGRISH for leaderboard';
COMMENT ON TABLE user_stats IS 'Cached aggregate statistics for user activity';

