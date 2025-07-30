import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

// Define the shape of your property data
interface Property {
  id: string;
  title: string | null;
  address: string | null;
  city: string | null;
}

const App: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('id, title, address, city');

      if (error) {
        console.error('❌ Error fetching properties:', error.message);
        setError('Failed to load properties.');
      } else {
        console.log('✅ Data received from Supabase:', data);
        setProperties(data || []);
      }

      setLoading(false);
    };

    fetchProperties();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '600px', margin: 'auto' }}>
      <h1>🏠 Welcome to FIZZBO</h1>
      <p>✅ This page is connected to Supabase and rendering live listings.</p>

      <h2 style={{ marginTop: '2rem' }}>Live Listings</h2>

      {loading && <p>Loading listings...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {properties.map((property) => (
          <li
            key={property.id}
            style={{
              marginBottom: '1rem',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '1rem',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
            }}
          >
            <h3 style={{ margin: '0 0 0.5rem 0' }}>{property.title}</h3>
            <p style={{ margin: 0 }}>
              {property.address}, {property.city}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
