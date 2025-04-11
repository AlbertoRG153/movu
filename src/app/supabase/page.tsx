// src/app/supabase/page.tsx
'use client';

import { useEffect } from 'react';
import { testSupabaseConnection } from '@/lib/supabase/testSupabaseConnection';

export default function SupabaseTest() {
  useEffect(() => {
    async function checkConnection() {
      await testSupabaseConnection();
    }
    
    checkConnection();
  }, []);
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Supabase Connection Test</h1>
      <p>Check the console for connection status.</p>
    </div>
  );
}