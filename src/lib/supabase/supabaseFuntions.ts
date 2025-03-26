// src/lib/supabase/supabaseFunctions.ts
import { supabase } from './supabaseClient';

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
