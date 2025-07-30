import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

interface Property {
  id: string;
  title: string | null;
  address: string | null;
  city: string | null;
}

const App = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from('properties').select('id, title, address, city');
      if (error) {
        console.error('❌ Error fetching properties:', error);
      } else {
        console.log('✅ Data received from Supabase:', data);
        setProperties(data);
      }
    }

    fetchData();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Welcome to FIZZBO 🚀</h1>
      <p>✅ The app is loading correctly!</p>
      <h2>Live Listings</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {properties.map((prop) => (
          <li
            key={prop.id}
            style={{
              marginBottom: '1rem',
              border: '1px solid #ccc',
              padding: '1rem',
              borderRadius: '8px'
            }}
          >
            <strong>{prop.title}</strong>
            <br />
            {prop.address}, {prop.city}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
