import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos de datos
export type Profile = {
  id: string;
  name: string;
  email: string;
  title: string;
  bio: string;
  specialties: string;
  phone: string;
  avatar_url: string;
  role: 'admin' | 'lawyer';
  created_at: string;
};

export type Publication = {
  id: string;
  title: string;
  content: string;
  image_url: string;
  author_id: string;
  created_at: string;
  updated_at: string;
};

export type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read: boolean;
}; 