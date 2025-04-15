import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { sendContactEmail } from '@/lib/emailService';

export async function POST(request: Request) {
  try {
    console.log('Iniciando procesamiento de contacto...');
    const body = await request.json();
    const { name, email, subject, message } = body;

    console.log('Datos recibidos:', { name, email, subject });

    // Validar campos requeridos
    if (!name || !email || !subject || !message) {
      console.log('Error: Campos faltantes');
      return NextResponse.json(
        { error: 'Por favor, complete todos los campos' },
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Error: Formato de email inválido');
      return NextResponse.json(
        { error: 'Por favor, ingrese un email válido' },
        { status: 400 }
      );
    }

    console.log('Intentando guardar en Supabase...');
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
      console.error('Error detallado de Supabase:', {
        code: dbError.code,
        message: dbError.message,
        details: dbError.details
      });
      return NextResponse.json(
        { error: 'No pudimos procesar su mensaje. Por favor, intente nuevamente más tarde.' },
        { status: 500 }
      );
    }

    console.log('Mensaje guardado en Supabase, intentando enviar email...');
    // Enviar email de notificación
    const { success: emailSuccess, error: emailError } = await sendContactEmail({
      name,
      email,
      subject,
      message
    });

    if (!emailSuccess) {
      console.error('Error al enviar email:', emailError);
      return NextResponse.json(
        { error: 'Hubo un problema al enviar su mensaje. Por favor, intente nuevamente.' },
        { status: 500 }
      );
    }

    console.log('Proceso completado exitosamente');
    return NextResponse.json(
      { message: 'Mensaje enviado correctamente' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error detallado en el endpoint:', {
      message: error.message,
      stack: error.stack
    });
    return NextResponse.json(
      { error: 'No pudimos procesar su mensaje. Por favor, intente nuevamente más tarde.' },
      { status: 500 }
    );
  }
} 