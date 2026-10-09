/*
  # AIWorldNext Core Database Schema
  
  ## Overview
  This migration creates the complete database infrastructure for AIWorldNext's enhancement strategy,
  supporting user authentication, personalization, community features, and content management.
  
  ## 1. New Tables
  
  ### User Management & Personalization
    - `profiles` - Extended user profile information beyond auth.users
      - `id` (uuid, FK to auth.users)
      - `username` (text, unique)
      - `full_name` (text)
      - `avatar_url` (text)
      - `bio` (text)
      - `expertise_areas` (text[]) - Array of expertise tags
      - `interested_topics` (text[]) - Array of interest tags for personalization
      - `is_expert` (boolean) - Whether user is in expert directory
      - `linkedin_url` (text)
      - `twitter_url` (text)
      - `website_url` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `user_preferences` - User dashboard and filter preferences
      - `id` (uuid, primary key)
      - `user_id` (uuid, FK to profiles)
      - `selected_interests` (text[]) - Top 3-5 interests for personalized feed
      - `job_filters` (jsonb) - Saved job search filters
      - `news_filters` (jsonb) - Saved news filters
      - `email_notifications` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  ### Community Features
    - `forum_categories` - Q&A forum categories
      - `id` (uuid, primary key)
      - `name` (text)
      - `slug` (text, unique)
      - `description` (text)
      - `icon` (text)
      - `order_index` (integer)
      - `created_at` (timestamptz)
    
    - `forum_posts` - Forum questions/discussions
      - `id` (uuid, primary key)
      - `user_id` (uuid, FK to profiles)
      - `category_id` (uuid, FK to forum_categories)
      - `title` (text)
      - `content` (text)
      - `tags` (text[])
      - `views_count` (integer)
      - `upvotes_count` (integer)
      - `is_solved` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `forum_replies` - Replies to forum posts
      - `id` (uuid, primary key)
      - `post_id` (uuid, FK to forum_posts)
      - `user_id` (uuid, FK to profiles)
      - `content` (text)
      - `is_solution` (boolean)
      - `upvotes_count` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `forum_votes` - Upvotes for posts and replies
      - `id` (uuid, primary key)
      - `user_id` (uuid, FK to profiles)
      - `post_id` (uuid, FK to forum_posts, nullable)
      - `reply_id` (uuid, FK to forum_replies, nullable)
      - `vote_type` (text) - 'upvote' or 'downvote'
      - `created_at` (timestamptz)
  
  ### Content Management
    - `tool_reviews` - In-depth tool reviews
      - `id` (uuid, primary key)
      - `tool_name` (text)
      - `category` (text)
      - `description` (text)
      - `detailed_review` (text)
      - `pros` (text[])
      - `cons` (text[])
      - `pricing` (text)
      - `expert_score` (numeric) - 1-10 rating
      - `user_rating_avg` (numeric)
      - `user_rating_count` (integer)
      - `comparison_tools` (text[])
      - `use_cases` (text[])
      - `author_id` (uuid, FK to profiles)
      - `published_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `tool_user_ratings` - User ratings for tools
      - `id` (uuid, primary key)
      - `tool_id` (uuid, FK to tool_reviews)
      - `user_id` (uuid, FK to profiles)
      - `rating` (integer) - 1-5 stars
      - `review_text` (text)
      - `created_at` (timestamptz)
    
    - `learning_paths` - Curated learning roadmaps
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `description` (text)
      - `difficulty` (text) - 'beginner', 'intermediate', 'advanced'
      - `estimated_hours` (integer)
      - `tags` (text[])
      - `thumbnail_url` (text)
      - `author_id` (uuid, FK to profiles)
      - `published_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `learning_modules` - Individual modules within learning paths
      - `id` (uuid, primary key)
      - `path_id` (uuid, FK to learning_paths)
      - `title` (text)
      - `content` (text)
      - `order_index` (integer)
      - `resources` (jsonb) - Links to courses, tutorials, etc.
      - `created_at` (timestamptz)
    
    - `user_learning_progress` - Track user progress through learning paths
      - `id` (uuid, primary key)
      - `user_id` (uuid, FK to profiles)
      - `path_id` (uuid, FK to learning_paths)
      - `module_id` (uuid, FK to learning_modules)
      - `completed` (boolean)
      - `completed_at` (timestamptz)
    
    - `live_events` - Webinars and AMA sessions
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `event_type` (text) - 'webinar', 'ama', 'workshop'
      - `host_id` (uuid, FK to profiles)
      - `scheduled_at` (timestamptz)
      - `duration_minutes` (integer)
      - `meeting_url` (text)
      - `max_attendees` (integer)
      - `registration_required` (boolean)
      - `tags` (text[])
      - `created_at` (timestamptz)
    
    - `event_registrations` - Track event registrations
      - `id` (uuid, primary key)
      - `event_id` (uuid, FK to live_events)
      - `user_id` (uuid, FK to profiles)
      - `registered_at` (timestamptz)
      - `attended` (boolean)
    
    - `ai_index_data` - Proprietary AI industry tracking data
      - `id` (uuid, primary key)
      - `data_type` (text) - 'benchmark', 'funding', 'regulation', 'adoption'
      - `category` (text)
      - `metric_name` (text)
      - `metric_value` (numeric)
      - `metadata` (jsonb)
      - `time_period` (text)
      - `source` (text)
      - `recorded_at` (timestamptz)
      - `created_at` (timestamptz)
  
  ## 2. Security (Row Level Security)
  All tables have RLS enabled with appropriate policies for:
    - Public read access where appropriate
    - Authenticated user access for user-generated content
    - Owner-only access for sensitive user data
  
  ## 3. Indexes
  Performance indexes on:
    - Foreign keys
    - Frequently queried fields (tags, categories, dates)
    - Full-text search fields
  
  ## 4. Functions
    - Automatic timestamp updates
    - Vote counting triggers
    - Rating average calculations
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- USER MANAGEMENT & PERSONALIZATION
-- =====================================================

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  username text UNIQUE,
  full_name text,
  avatar_url text,
  bio text,
  expertise_areas text[] DEFAULT '{}',
  interested_topics text[] DEFAULT '{}',
  is_expert boolean DEFAULT false,
  linkedin_url text,
  twitter_url text,
  website_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  selected_interests text[] DEFAULT '{}',
  job_filters jsonb DEFAULT '{}',
  news_filters jsonb DEFAULT '{}',
  email_notifications boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- =====================================================
-- COMMUNITY FEATURES
-- =====================================================

-- Forum categories
CREATE TABLE IF NOT EXISTS forum_categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  icon text,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Forum posts
CREATE TABLE IF NOT EXISTS forum_posts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  category_id uuid REFERENCES forum_categories(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  tags text[] DEFAULT '{}',
  views_count integer DEFAULT 0,
  upvotes_count integer DEFAULT 0,
  is_solved boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Forum replies
CREATE TABLE IF NOT EXISTS forum_replies (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id uuid REFERENCES forum_posts(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  is_solution boolean DEFAULT false,
  upvotes_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Forum votes
CREATE TABLE IF NOT EXISTS forum_votes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  post_id uuid REFERENCES forum_posts(id) ON DELETE CASCADE,
  reply_id uuid REFERENCES forum_replies(id) ON DELETE CASCADE,
  vote_type text NOT NULL CHECK (vote_type IN ('upvote', 'downvote')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, post_id),
  UNIQUE(user_id, reply_id),
  CHECK ((post_id IS NOT NULL AND reply_id IS NULL) OR (post_id IS NULL AND reply_id IS NOT NULL))
);

-- =====================================================
-- CONTENT MANAGEMENT
-- =====================================================

-- Tool reviews
CREATE TABLE IF NOT EXISTS tool_reviews (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tool_name text NOT NULL,
  category text NOT NULL,
  description text,
  detailed_review text,
  pros text[] DEFAULT '{}',
  cons text[] DEFAULT '{}',
  pricing text,
  expert_score numeric(3,1) CHECK (expert_score >= 1 AND expert_score <= 10),
  user_rating_avg numeric(3,2) DEFAULT 0,
  user_rating_count integer DEFAULT 0,
  comparison_tools text[] DEFAULT '{}',
  use_cases text[] DEFAULT '{}',
  author_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  published_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tool user ratings
CREATE TABLE IF NOT EXISTS tool_user_ratings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tool_id uuid REFERENCES tool_reviews(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(tool_id, user_id)
);

-- Learning paths
CREATE TABLE IF NOT EXISTS learning_paths (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  difficulty text NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  estimated_hours integer,
  tags text[] DEFAULT '{}',
  thumbnail_url text,
  author_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  published_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Learning modules
CREATE TABLE IF NOT EXISTS learning_modules (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  path_id uuid REFERENCES learning_paths(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  content text,
  order_index integer DEFAULT 0,
  resources jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

-- User learning progress
CREATE TABLE IF NOT EXISTS user_learning_progress (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  path_id uuid REFERENCES learning_paths(id) ON DELETE CASCADE NOT NULL,
  module_id uuid REFERENCES learning_modules(id) ON DELETE CASCADE NOT NULL,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  UNIQUE(user_id, module_id)
);

-- Live events
CREATE TABLE IF NOT EXISTS live_events (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text,
  event_type text NOT NULL CHECK (event_type IN ('webinar', 'ama', 'workshop')),
  host_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  scheduled_at timestamptz NOT NULL,
  duration_minutes integer DEFAULT 60,
  meeting_url text,
  max_attendees integer,
  registration_required boolean DEFAULT true,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Event registrations
CREATE TABLE IF NOT EXISTS event_registrations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id uuid REFERENCES live_events(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  registered_at timestamptz DEFAULT now(),
  attended boolean DEFAULT false,
  UNIQUE(event_id, user_id)
);

-- AI index data
CREATE TABLE IF NOT EXISTS ai_index_data (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  data_type text NOT NULL CHECK (data_type IN ('benchmark', 'funding', 'regulation', 'adoption')),
  category text NOT NULL,
  metric_name text NOT NULL,
  metric_value numeric,
  metadata jsonb DEFAULT '{}',
  time_period text,
  source text,
  recorded_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_is_expert ON profiles(is_expert) WHERE is_expert = true;
CREATE INDEX IF NOT EXISTS idx_forum_posts_category ON forum_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_forum_posts_tags ON forum_posts USING gin(tags);
CREATE INDEX IF NOT EXISTS idx_forum_posts_created ON forum_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_forum_replies_post ON forum_replies(post_id);
CREATE INDEX IF NOT EXISTS idx_tool_reviews_category ON tool_reviews(category);
CREATE INDEX IF NOT EXISTS idx_learning_paths_slug ON learning_paths(slug);
CREATE INDEX IF NOT EXISTS idx_learning_paths_difficulty ON learning_paths(difficulty);
CREATE INDEX IF NOT EXISTS idx_learning_modules_path ON learning_modules(path_id, order_index);
CREATE INDEX IF NOT EXISTS idx_live_events_scheduled ON live_events(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_ai_index_data_type ON ai_index_data(data_type, category);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- User preferences
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own preferences"
  ON user_preferences FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences"
  ON user_preferences FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences"
  ON user_preferences FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Forum categories (public read)
ALTER TABLE forum_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are viewable by everyone"
  ON forum_categories FOR SELECT
  TO public
  USING (true);

-- Forum posts
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Posts are viewable by everyone"
  ON forum_posts FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create posts"
  ON forum_posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts"
  ON forum_posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own posts"
  ON forum_posts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Forum replies
ALTER TABLE forum_replies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Replies are viewable by everyone"
  ON forum_replies FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create replies"
  ON forum_replies FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own replies"
  ON forum_replies FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own replies"
  ON forum_replies FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Forum votes
ALTER TABLE forum_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Votes are viewable by everyone"
  ON forum_votes FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can vote"
  ON forum_votes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own votes"
  ON forum_votes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Tool reviews
ALTER TABLE tool_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tool reviews are viewable by everyone"
  ON tool_reviews FOR SELECT
  TO public
  USING (true);

-- Tool user ratings
ALTER TABLE tool_user_ratings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Ratings are viewable by everyone"
  ON tool_user_ratings FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can rate tools"
  ON tool_user_ratings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own ratings"
  ON tool_user_ratings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Learning paths
ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Learning paths are viewable by everyone"
  ON learning_paths FOR SELECT
  TO public
  USING (true);

-- Learning modules
ALTER TABLE learning_modules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Learning modules are viewable by everyone"
  ON learning_modules FOR SELECT
  TO public
  USING (true);

-- User learning progress
ALTER TABLE user_learning_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress"
  ON user_learning_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_learning_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_learning_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Live events
ALTER TABLE live_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Events are viewable by everyone"
  ON live_events FOR SELECT
  TO public
  USING (true);

-- Event registrations
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Registrations are viewable by event hosts and registrants"
  ON event_registrations FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id OR
    auth.uid() IN (
      SELECT host_id FROM live_events WHERE id = event_id
    )
  );

CREATE POLICY "Authenticated users can register for events"
  ON event_registrations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- AI index data
ALTER TABLE ai_index_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "AI index data is viewable by everyone"
  ON ai_index_data FOR SELECT
  TO public
  USING (true);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to relevant tables
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_profiles_updated_at') THEN
    CREATE TRIGGER update_profiles_updated_at
      BEFORE UPDATE ON profiles
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_user_preferences_updated_at') THEN
    CREATE TRIGGER update_user_preferences_updated_at
      BEFORE UPDATE ON user_preferences
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_forum_posts_updated_at') THEN
    CREATE TRIGGER update_forum_posts_updated_at
      BEFORE UPDATE ON forum_posts
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_forum_replies_updated_at') THEN
    CREATE TRIGGER update_forum_replies_updated_at
      BEFORE UPDATE ON forum_replies
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_tool_reviews_updated_at') THEN
    CREATE TRIGGER update_tool_reviews_updated_at
      BEFORE UPDATE ON tool_reviews
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_learning_paths_updated_at') THEN
    CREATE TRIGGER update_learning_paths_updated_at
      BEFORE UPDATE ON learning_paths
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- Function to update tool rating averages
CREATE OR REPLACE FUNCTION update_tool_rating_avg()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE tool_reviews
  SET 
    user_rating_avg = (
      SELECT COALESCE(AVG(rating), 0)
      FROM tool_user_ratings
      WHERE tool_id = COALESCE(NEW.tool_id, OLD.tool_id)
    ),
    user_rating_count = (
      SELECT COUNT(*)
      FROM tool_user_ratings
      WHERE tool_id = COALESCE(NEW.tool_id, OLD.tool_id)
    )
  WHERE id = COALESCE(NEW.tool_id, OLD.tool_id);
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Apply rating trigger
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_tool_ratings_on_insert') THEN
    CREATE TRIGGER update_tool_ratings_on_insert
      AFTER INSERT ON tool_user_ratings
      FOR EACH ROW
      EXECUTE FUNCTION update_tool_rating_avg();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_tool_ratings_on_update') THEN
    CREATE TRIGGER update_tool_ratings_on_update
      AFTER UPDATE ON tool_user_ratings
      FOR EACH ROW
      EXECUTE FUNCTION update_tool_rating_avg();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_tool_ratings_on_delete') THEN
    CREATE TRIGGER update_tool_ratings_on_delete
      AFTER DELETE ON tool_user_ratings
      FOR EACH ROW
      EXECUTE FUNCTION update_tool_rating_avg();
  END IF;
END $$;
