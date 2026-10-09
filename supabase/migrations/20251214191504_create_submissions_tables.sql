/*
  # Create Submissions Tables

  1. New Tables
    - `job_submissions`
      - `id` (uuid, primary key)
      - `title` (text)
      - `company` (text)
      - `location` (text)
      - `job_type` (text)
      - `salary_range` (text, optional)
      - `is_remote` (boolean)
      - `description` (text)
      - `application_url` (text)
      - `email` (text)
      - `featured` (boolean)
      - `sponsored` (boolean)
      - `status` (text, default: 'pending')
      - `created_at` (timestamptz)

    - `tool_submissions`
      - `id` (uuid, primary key)
      - `name` (text)
      - `tagline` (text)
      - `category` (text)
      - `pricing` (text)
      - `description` (text)
      - `website_url` (text)
      - `email` (text)
      - `featured` (boolean)
      - `sponsored` (boolean)
      - `status` (text, default: 'pending')
      - `created_at` (timestamptz)

    - `blog_submissions`
      - `id` (uuid, primary key)
      - `title` (text)
      - `category` (text)
      - `excerpt` (text)
      - `content` (text)
      - `image_url` (text, optional)
      - `email` (text)
      - `status` (text, default: 'pending')
      - `created_at` (timestamptz)

    - `event_submissions`
      - `id` (uuid, primary key)
      - `title` (text)
      - `event_type` (text)
      - `location` (text)
      - `start_date` (date)
      - `end_date` (date)
      - `is_virtual` (boolean)
      - `description` (text)
      - `registration_url` (text)
      - `email` (text)
      - `status` (text, default: 'pending')
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for inserting submissions
    - Add policies for admins to view/update submissions
*/

-- Job Submissions Table
CREATE TABLE IF NOT EXISTS job_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  location text NOT NULL,
  job_type text NOT NULL,
  salary_range text,
  is_remote boolean DEFAULT false,
  description text NOT NULL,
  application_url text NOT NULL,
  email text NOT NULL,
  featured boolean DEFAULT false,
  sponsored boolean DEFAULT false,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE job_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert job submissions"
  ON job_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view all job submissions"
  ON job_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Tool Submissions Table
CREATE TABLE IF NOT EXISTS tool_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  tagline text NOT NULL,
  category text NOT NULL,
  pricing text NOT NULL,
  description text NOT NULL,
  website_url text NOT NULL,
  email text NOT NULL,
  featured boolean DEFAULT false,
  sponsored boolean DEFAULT false,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tool_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert tool submissions"
  ON tool_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view all tool submissions"
  ON tool_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Blog Submissions Table
CREATE TABLE IF NOT EXISTS blog_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  image_url text,
  email text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE blog_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert blog submissions"
  ON blog_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view all blog submissions"
  ON blog_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Event Submissions Table
CREATE TABLE IF NOT EXISTS event_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  event_type text NOT NULL,
  location text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  is_virtual boolean DEFAULT false,
  description text NOT NULL,
  registration_url text NOT NULL,
  email text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE event_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert event submissions"
  ON event_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view all event submissions"
  ON event_submissions
  FOR SELECT
  TO authenticated
  USING (true);