/*
  # Create Contact Submissions Table

  ## Summary
  Creates a table to store contact form submissions from the BahkoStudio website.

  ## Tables Created
  1. **contact_submissions**
    - `id` (uuid, primary key) - Unique identifier for each submission
    - `name` (text, required) - Name of the person submitting
    - `email` (text, required) - Email address
    - `phone` (text, optional) - Phone number
    - `company` (text, optional) - Company name
    - `message` (text, optional) - Message content
    - `created_at` (timestamptz) - Timestamp of submission
    - `status` (text) - Status of the submission (new, contacted, completed)

  ## Security
  - Enable RLS on contact_submissions table
  - Add policy for inserting submissions (anyone can submit)
  - Add policy for reading submissions (only authenticated admins)

  ## Notes
  - This table allows public inserts so visitors can submit the form
  - Only authenticated users (admins) can read the submissions
  - The status field helps track which submissions have been handled
*/

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  message text,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (submit form)
CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Only authenticated users can read submissions
CREATE POLICY "Authenticated users can read submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Only authenticated users can update submissions
CREATE POLICY "Authenticated users can update submissions"
  ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create index on created_at for faster queries
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at 
  ON contact_submissions(created_at DESC);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status 
  ON contact_submissions(status);