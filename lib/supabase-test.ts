import { supabase } from './supabase';

export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase.from('profiles').select('*').limit(1);
    if (error) {
      console.error('Error de conexión:', error.message);
      return false;
    }
    console.log('Conexión exitosa a Supabase');
    return true;
  } catch (error) {
    console.error('Error inesperado:', error);
    return false;
  }
} 