import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');

    if (code) {
      const cookieStore = cookies();
      const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
      
      // Intercambiar el código por una sesión
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (error) {
        console.error('Error en el callback de autenticación:', error);
        return NextResponse.redirect(
          new URL('/login?error=auth_callback_error', request.url)
        );
      }
    }

    // Redirigir al dashboard después de una autenticación exitosa
    return NextResponse.redirect(new URL('/dashboard', request.url));
  } catch (error) {
    console.error('Error inesperado en el callback:', error);
    return NextResponse.redirect(
      new URL('/login?error=unexpected_error', request.url)
    );
  }
}
