-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policy to allow insert from authenticated users only
CREATE POLICY "Allow insert for authenticated users only" ON messages
    FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

-- Create policy to allow select for authenticated users only
CREATE POLICY "Allow select for authenticated users only" ON messages
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- Create policy to allow update for authenticated users only
CREATE POLICY "Allow update for authenticated users only" ON messages
    FOR UPDATE
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Create policy to allow delete for authenticated users only
CREATE POLICY "Allow delete for authenticated users only" ON messages
    FOR DELETE
    USING (auth.role() = 'authenticated'); 