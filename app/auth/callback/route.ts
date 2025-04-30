import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // const next = searchParams.get('next') ?? '/'; // Mantenemos la redirección a la raíz por simplicidad ahora

  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          // Modificación clave: Pasar funciones lambda que capturen cookieStore
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.set({ name, value: '', ...options });
          },
        },
      }
    );
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Redirigir a la página principal después de un inicio de sesión exitoso
      // return NextResponse.redirect(`${origin}${next}`); // Usar `next` si se prefiere
      return NextResponse.redirect(origin); 
    }
  }

  // Redirigir de vuelta al origen (página principal) si hay un error
  console.error('Error en el callback de autenticación o código no encontrado');
  return NextResponse.redirect(`${origin}/?error=auth_callback_failed`);
}
