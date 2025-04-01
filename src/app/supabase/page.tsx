// src/app/supabase/page.ts
'use client';

import { useEffect, useState } from 'react';
import { testSupabaseConnection } from '@/lib/supabase/testSupabaseConnection';
import { getProjects, Person } from '@/lib/supabase/supabaseFuntions'; // Importamos el tipo Person

export default function SupabaseTest() {
  const [connectionStatus, setConnectionStatus] = useState<boolean | null>(null);
  const [people, setPeople] = useState<Person[]>([]); // Ahora sí especificamos el tipo Person[]
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkConnectionAndFetch() {
      const status = await testSupabaseConnection();
      setConnectionStatus(status);

      if (status) {
        const data = await getProjects();
        setPeople(data);
      }

      setLoading(false);
    }

    checkConnectionAndFetch();
  }, []);

  return (
    <div>
      <h2>Supabase Connection Test</h2>
      {connectionStatus === null && <p>Checking connection...</p>}
      {connectionStatus === true && <p>✅ Connected successfully</p>}
      {connectionStatus === false && <p>❌ Connection failed</p>}

      <hr className="my-4" />

      <h2>People</h2>
      {loading ? (
        <p>Loading people...</p>
      ) : (
        <ul>
          {people.length === 0 ? (
            <li>No records found.</li>
          ) : (
            people.map((person) => (
              <li key={person.id}>
                <strong>{person.first_name} {person.second_name}</strong> - Email: {person.email}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
