import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient'; // Asumiendo que este es tu cliente configurado

export const dynamic = 'force-dynamic'; // Asegura que la función se ejecute siempre

export async function GET() {
  try {
    // Realizar una operación mínima para generar actividad en Supabase
    // getUser() interactúa con el servicio de autenticación de Supabase
    const { data, error } = await supabase.auth.getUser();

    if (error && error.message !== 'Auth session missing!') { 
      // Ignoramos el error esperado si no hay sesión, pero logueamos otros errores
      console.error('Keep-alive Supabase error:', error);
      // Aun así devolvemos éxito para que el cron no falle innecesariamente
      return NextResponse.json({ message: 'Keep-alive pinged with Supabase client error.' });
    }

    // Si no hubo error (o fue el esperado de sesión faltante), todo bien
    return NextResponse.json({ message: 'Keep-alive ping successful.' });

  } catch (err: any) {
    console.error('Error en la ruta keep-alive:', err);
    return NextResponse.json(
      { error: 'Internal Server Error in keep-alive route.' },
      { status: 500 }
    );
  }
} 