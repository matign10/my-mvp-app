import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });

  // Verificar si el usuario está autenticado
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Si la ruta comienza con /admin y no hay sesión, redirigir al login
  if (request.nextUrl.pathname.startsWith('/admin') && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*', '/api/messages/:path*'],
}; 