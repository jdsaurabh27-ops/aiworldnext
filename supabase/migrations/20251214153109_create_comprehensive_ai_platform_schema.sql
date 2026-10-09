/*
  # AI World Next - Comprehensive Platform Schema

  ## Overview
  This migration creates the complete database structure for AIWorldNext.com as "The Global Search Engine for Artificial Intelligence".
  It includes tables for blogs, jobs, tools, events, submissions, categories, tags, and user tracking.

  ## New Tables

  ### 1. Categories
  - `id` (uuid, primary key)
  - `name` (text) - Category name
  - `slug` (text) - URL-friendly slug
  - `description` (text) - Category description
  - `type` (text) - Type: blog, job, tool, event
  - `created_at` (timestamptz)

  ### 2. Tags
  - `id` (uuid, primary key)
  - `name` (text) - Tag name
  - `slug` (text) - URL-friendly slug
  - `created_at` (timestamptz)

  ### 3. Authors
  - `id` (uuid, primary key)
  - `name` (text) - Author name
  - `email` (text) - Author email
  - `bio` (text) - Author biography
  - `avatar_url` (text) - Profile image URL
  - `website` (text) - Author website
  - `twitter` (text) - Twitter handle
  - `linkedin` (text) - LinkedIn profile
  - `created_at` (timestamptz)

  ### 4. Blogs
  - `id` (uuid, primary key)
  - `title` (text) - Blog post title
  - `slug` (text) - URL-friendly slug
  - `excerpt` (text) - Short description
  - `content` (text) - Full blog content
  - `author_id` (uuid) - Foreign key to authors
  - `category_id` (uuid) - Foreign key to categories
  - `featured_image` (text) - Image URL
  - `meta_title` (text) - SEO title
  - `meta_description` (text) - SEO description
  - `published` (boolean) - Published status
  - `featured` (boolean) - Featured post
  - `views` (integer) - View count
  - `published_at` (timestamptz) - Publication date
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 5. Blog Tags (Junction Table)
  - `blog_id` (uuid) - Foreign key to blogs
  - `tag_id` (uuid) - Foreign key to tags

  ### 6. Jobs
  - `id` (uuid, primary key)
  - `title` (text) - Job title
  - `slug` (text) - URL-friendly slug
  - `company` (text) - Company name
  - `company_logo` (text) - Company logo URL
  - `location` (text) - Job location
  - `remote` (boolean) - Remote work option
  - `job_type` (text) - full-time, part-time, contract, etc.
  - `category_id` (uuid) - Foreign key to categories
  - `description` (text) - Job description
  - `requirements` (text) - Job requirements
  - `salary_range` (text) - Salary range
  - `apply_url` (text) - Application URL
  - `featured` (boolean) - Featured job (paid)
  - `sponsored` (boolean) - Sponsored job
  - `active` (boolean) - Active status
  - `views` (integer) - View count
  - `expires_at` (timestamptz) - Expiration date
  - `meta_title` (text) - SEO title
  - `meta_description` (text) - SEO description
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 7. Tools
  - `id` (uuid, primary key)
  - `name` (text) - Tool name
  - `slug` (text) - URL-friendly slug
  - `tagline` (text) - Short tagline
  - `description` (text) - Full description
  - `category_id` (uuid) - Foreign key to categories
  - `website_url` (text) - Tool website
  - `logo_url` (text) - Tool logo
  - `pricing` (text) - free, freemium, paid
  - `featured` (boolean) - Featured tool (paid)
  - `sponsored` (boolean) - Sponsored tool
  - `verified` (boolean) - Verified tool
  - `rating` (numeric) - Average rating
  - `views` (integer) - View count
  - `meta_title` (text) - SEO title
  - `meta_description` (text) - SEO description
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 8. Tool Tags (Junction Table)
  - `tool_id` (uuid) - Foreign key to tools
  - `tag_id` (uuid) - Foreign key to tags

  ### 9. Events
  - `id` (uuid, primary key)
  - `title` (text) - Event title
  - `slug` (text) - URL-friendly slug
  - `description` (text) - Event description
  - `event_type` (text) - conference, webinar, workshop, etc.
  - `location` (text) - Event location
  - `virtual` (boolean) - Virtual event
  - `start_date` (timestamptz) - Event start date
  - `end_date` (timestamptz) - Event end date
  - `registration_url` (text) - Registration link
  - `image_url` (text) - Event image
  - `featured` (boolean) - Featured event
  - `created_at` (timestamptz)

  ### 10. Submissions
  - `id` (uuid, primary key)
  - `submission_type` (text) - job, tool, blog, event
  - `data` (jsonb) - Submission data
  - `email` (text) - Submitter email
  - `status` (text) - pending, approved, rejected
  - `created_at` (timestamptz)

  ### 11. Newsletter Subscribers
  - `id` (uuid, primary key)
  - `email` (text) - Subscriber email
  - `subscribed` (boolean) - Subscription status
  - `created_at` (timestamptz)

  ### 12. Analytics
  - `id` (uuid, primary key)
  - `resource_type` (text) - blog, job, tool, event
  - `resource_id` (uuid) - Resource ID
  - `event_type` (text) - view, click, submit
  - `metadata` (jsonb) - Additional data
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Add appropriate policies for public read access
  - Restrict write access to authenticated users where needed
*/

-- Create Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  type text NOT NULL CHECK (type IN ('blog', 'job', 'tool', 'event')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  TO public
  USING (true);

-- Create Tags Table
CREATE TABLE IF NOT EXISTS tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tags are viewable by everyone"
  ON tags FOR SELECT
  TO public
  USING (true);

-- Create Authors Table
CREATE TABLE IF NOT EXISTS authors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  bio text DEFAULT '',
  avatar_url text DEFAULT '',
  website text DEFAULT '',
  twitter text DEFAULT '',
  linkedin text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE authors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authors are viewable by everyone"
  ON authors FOR SELECT
  TO public
  USING (true);

-- Create Blogs Table
CREATE TABLE IF NOT EXISTS blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text DEFAULT '',
  content text NOT NULL,
  author_id uuid REFERENCES authors(id) ON DELETE SET NULL,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  featured_image text DEFAULT '',
  meta_title text DEFAULT '',
  meta_description text DEFAULT '',
  published boolean DEFAULT false,
  featured boolean DEFAULT false,
  views integer DEFAULT 0,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published blogs are viewable by everyone"
  ON blogs FOR SELECT
  TO public
  USING (published = true);

-- Create Blog Tags Junction Table
CREATE TABLE IF NOT EXISTS blog_tags (
  blog_id uuid REFERENCES blogs(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (blog_id, tag_id)
);

ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Blog tags are viewable by everyone"
  ON blog_tags FOR SELECT
  TO public
  USING (true);

-- Create Jobs Table
CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  company text NOT NULL,
  company_logo text DEFAULT '',
  location text DEFAULT '',
  remote boolean DEFAULT false,
  job_type text DEFAULT 'full-time',
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  description text NOT NULL,
  requirements text DEFAULT '',
  salary_range text DEFAULT '',
  apply_url text NOT NULL,
  featured boolean DEFAULT false,
  sponsored boolean DEFAULT false,
  active boolean DEFAULT true,
  views integer DEFAULT 0,
  expires_at timestamptz DEFAULT (now() + interval '30 days'),
  meta_title text DEFAULT '',
  meta_description text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active jobs are viewable by everyone"
  ON jobs FOR SELECT
  TO public
  USING (active = true AND expires_at > now());

-- Create Tools Table
CREATE TABLE IF NOT EXISTS tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  tagline text DEFAULT '',
  description text NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  website_url text NOT NULL,
  logo_url text DEFAULT '',
  pricing text DEFAULT 'free' CHECK (pricing IN ('free', 'freemium', 'paid')),
  featured boolean DEFAULT false,
  sponsored boolean DEFAULT false,
  verified boolean DEFAULT false,
  rating numeric DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  views integer DEFAULT 0,
  meta_title text DEFAULT '',
  meta_description text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tools ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tools are viewable by everyone"
  ON tools FOR SELECT
  TO public
  USING (true);

-- Create Tool Tags Junction Table
CREATE TABLE IF NOT EXISTS tool_tags (
  tool_id uuid REFERENCES tools(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (tool_id, tag_id)
);

ALTER TABLE tool_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tool tags are viewable by everyone"
  ON tool_tags FOR SELECT
  TO public
  USING (true);

-- Create Events Table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  event_type text DEFAULT 'conference',
  location text DEFAULT '',
  virtual boolean DEFAULT false,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  registration_url text DEFAULT '',
  image_url text DEFAULT '',
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Events are viewable by everyone"
  ON events FOR SELECT
  TO public
  USING (true);

-- Create Submissions Table
CREATE TABLE IF NOT EXISTS submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_type text NOT NULL CHECK (submission_type IN ('job', 'tool', 'blog', 'event')),
  data jsonb NOT NULL,
  email text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit content"
  ON submissions FOR INSERT
  TO public
  WITH CHECK (true);

-- Create Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe"
  ON newsletter_subscribers FOR INSERT
  TO public
  WITH CHECK (true);

-- Create Analytics Table
CREATE TABLE IF NOT EXISTS analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_type text NOT NULL,
  resource_id uuid NOT NULL,
  event_type text NOT NULL,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can track analytics"
  ON analytics FOR INSERT
  TO public
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(published);
CREATE INDEX IF NOT EXISTS idx_blogs_featured ON blogs(featured);
CREATE INDEX IF NOT EXISTS idx_blogs_published_at ON blogs(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_jobs_active ON jobs(active);
CREATE INDEX IF NOT EXISTS idx_jobs_featured ON jobs(featured);
CREATE INDEX IF NOT EXISTS idx_jobs_expires_at ON jobs(expires_at);
CREATE INDEX IF NOT EXISTS idx_jobs_slug ON jobs(slug);
CREATE INDEX IF NOT EXISTS idx_tools_featured ON tools(featured);
CREATE INDEX IF NOT EXISTS idx_tools_slug ON tools(slug);
CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date);
CREATE INDEX IF NOT EXISTS idx_categories_type ON categories(type);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);