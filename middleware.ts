import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          res.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          res.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  // Verificar si el usuario está autenticado
  // La lógica de autenticación puede permanecer por si se usa en otro lugar,
  // pero la redirección específica para /admin ya no es necesaria.
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();
  // 
  // // Si la ruta comienza con /admin y no hay sesión, redirigir al login
  // if (request.nextUrl.pathname.startsWith('/admin') && !session) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  return res;
}

export const config = {
  matcher: [], // No hay rutas que necesiten este middleware actualmente
}; 