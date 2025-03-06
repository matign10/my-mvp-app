import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const code = request.nextUrl.searchParams.get('code');

    if (code) {
      const cookieStore = cookies();
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            get(name: string) {
              return cookieStore.get(name)?.value;
            },
            set(name: string, value: string, options: any) {
              cookieStore.set({ name, value, ...options });
            },
            remove(name: string, options: any) {
              cookieStore.set({ name, value: '', ...options });
            },
          },
        }
      );
      
      // Intercambiar el código por una sesión
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (error) {
        console.error('Error en el callback de autenticación:', error);
        return NextResponse.redirect('/login?error=auth_callback_error');
      }
    }

    // Redirigir al dashboard después de una autenticación exitosa
    return NextResponse.redirect('/dashboard');
  } catch (error) {
    console.error('Error inesperado en el callback:', error);
    return NextResponse.redirect('/login?error=unexpected_error');
  }
}
