import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');

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
        return NextResponse.redirect(new URL('/login?error=auth_callback_error', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'));
      }
    }

    // Redirigir al dashboard después de una autenticación exitosa
    return NextResponse.redirect(new URL('/dashboard', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'));
  } catch (error) {
    console.error('Error inesperado en el callback:', error);
    return NextResponse.redirect(new URL('/login?error=unexpected_error', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'));
  }
}
