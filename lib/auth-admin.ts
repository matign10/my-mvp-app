import { supabase } from './supabase';

export async function createAdminUser(email: string, password: string) {
  try {
    console.log('Iniciando creación de usuario admin...');

    // 1. Crear el usuario en Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Si el usuario no existe, lo creamos
    if (authError && authError.message.includes('Invalid login credentials')) {
      console.log('Usuario no existe, creando nuevo usuario...');
      
      const { data: newAuthData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: 'admin'
          }
        }
      });

      if (signUpError) {
        console.error('Error creando usuario:', signUpError);
        return {
          success: false,
          error: {
            message: signUpError.message,
            details: 'Error al crear el usuario'
          }
        };
      }

      if (!newAuthData.user) {
        console.error('No se recibió información del usuario');
        return {
          success: false,
          error: {
            message: 'No se pudo crear el usuario',
            details: 'No se recibió información del usuario'
          }
        };
      }

      // Crear el perfil del usuario
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: newAuthData.user.id,
          email: email,
          role: 'admin',
          name: 'Administrador',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (profileError) {
        console.error('Error creando perfil:', profileError);
        return {
          success: true,
          error: {
            message: 'Usuario creado pero hubo un error al crear el perfil',
            details: 'Por favor, intenta iniciar sesión y completar tu perfil más tarde'
          }
        };
      }

      console.log('Usuario y perfil creados exitosamente');
      return {
        success: true,
        error: null,
        message: 'Usuario creado exitosamente. Ya puedes iniciar sesión.'
      };
    } else if (!authError) {
      // El usuario ya existe
      return {
        success: false,
        error: {
          message: 'El usuario ya existe',
          details: 'Este email ya está registrado. Por favor, intenta iniciar sesión.'
        }
      };
    } else {
      // Otro tipo de error
      return {
        success: false,
        error: {
          message: authError.message,
          details: 'Error en la autenticación'
        }
      };
    }
  } catch (error) {
    console.error('Error inesperado:', error);
    const err = error as Error;
    return {
      success: false,
      error: {
        message: err.message,
        details: 'Error inesperado al crear el usuario'
      }
    };
  }
} 