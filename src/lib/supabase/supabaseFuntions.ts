// @/lib/supabase/supabaseFuntions.ts
import { createClient } from '@supabase/supabase-js';

// Inicializa el cliente de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Función para verificar credenciales con la tabla person
export async function loginUser(email: string, password: string) {
  try {
    const { data: isValid, error: rpcError } = await supabase.rpc(
      'verify_person_credentials',
      {
        input_email: email,
        input_password: password
      }
    );

    console.log("Respuesta de RPC:", isValid);
    if (rpcError) {
      console.error("Error en la RPC:", rpcError);
      throw new Error('Error al verificar credenciales: ' + rpcError.message);
    }

    if (!isValid) {
      throw new Error('Correo electrónico o contraseña incorrectos');
    }

    const { data: userData, error: userError } = await supabase
      .from('person')
      .select('id, first_name, first_surname, email, dni')
      .eq('email', email)
      .single();

    if (userError) {
      console.error("Error obteniendo datos del usuario:", userError);
      throw new Error('Error al obtener información del usuario');
    }

    localStorage.setItem('currentUser', JSON.stringify(userData));
    return userData;
    
  } catch (error: unknown) {
    console.error('Error de inicio de sesión:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Error desconocido durante el inicio de sesión');
  }
}

//CONECTADA CON app/supabase/pages.tsx
export interface Person {
  id: number;
  first_name: string;
  second_name: string;
  email: string;
}

export async function getProjects(): Promise<Person[]> {
  const { data, error } = await supabase.from('person').select('*');

  if (error) {
    console.error('Error fetching data from person:', error);
    return [];
  }

  // Mapear los datos según la estructura esperada
  return data.map((item) => ({
    id: item.id,
    first_name: item.first_name,
    second_name: item.second_name,
    email: item.email,
  })) as Person[];
}