import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { sendContactEmail } from '@/lib/emailService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validar campos requeridos
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'El formato del email no es válido' },
        { status: 400 }
      );
    }

    // Guardar mensaje en la base de datos
    const { error: dbError } = await supabase
      .from('messages')
      .insert([
        {
          name,
          email,
          subject,
          message,
          read: false,
          created_at: new Date().toISOString()
        }
      ]);

    if (dbError) {
      console.error('Error al guardar mensaje:', dbError);
      return NextResponse.json(
        { error: 'Error al procesar el mensaje' },
        { status: 500 }
      );
    }

    // Enviar email de notificación
    const { success: emailSuccess, error: emailError } = await sendContactEmail({
      name,
      email,
      subject,
      message
    });

    if (!emailSuccess) {
      console.error('Error al enviar email:', emailError);
      // No retornamos error al cliente si falla el email, solo lo registramos
    }

    return NextResponse.json(
      { message: 'Mensaje enviado correctamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en el endpoint de contacto:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 