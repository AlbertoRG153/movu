import { supabase } from './supabaseClient';

export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('person') // Asegúrate de que esta tabla existe en tu base de datos
      .select('*')
      .limit(1);

    if (error) throw error;

    console.log('Supabase connection successful', data);
    return true;
  } catch (error) {
    console.error('Supabase connection error', error);
    return false;
  }
}
