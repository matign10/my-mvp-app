import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    const { data, error, count } = await supabase
      .from('messages')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error al obtener mensajes:', error);
      return NextResponse.json(
        { error: 'Error al obtener mensajes' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      messages: data,
      total: count,
      page,
      totalPages: Math.ceil((count || 0) / limit)
    });
  } catch (error) {
    console.error('Error en el endpoint de mensajes:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, read } = body;

    if (!id || typeof read !== 'boolean') {
      return NextResponse.json(
        { error: 'ID y estado de lectura son requeridos' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('messages')
      .update({ read })
      .eq('id', id);

    if (error) {
      console.error('Error al actualizar mensaje:', error);
      return NextResponse.json(
        { error: 'Error al actualizar mensaje' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Mensaje actualizado correctamente' });
  } catch (error) {
    console.error('Error en el endpoint de mensajes:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID es requerido' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error al eliminar mensaje:', error);
      return NextResponse.json(
        { error: 'Error al eliminar mensaje' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Mensaje eliminado correctamente' });
  } catch (error) {
    console.error('Error en el endpoint de mensajes:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 