import { createClient } from '@supabase/supabase-js';  

// Reemplaza estos valores con tus credenciales de Supabase.  
const SUPABASE_URL = 'https://glvcepgixaupskgpfqqi.supabase.co';  
const SUPABASE_ANON_KEY = proceso . env . SUPABASE_KEY;  

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);  

export default supabase;  