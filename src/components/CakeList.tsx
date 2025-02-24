import React, { useEffect, useState } from 'react';
import { getCakes } from '../api/cakeApi';
import { Cake } from '../types/Cake';
import { Link } from 'react-router-dom';

const CakeList: React.FC = () => {
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const data = await getCakes();
        setCakes(data);
      } catch (error) {
        console.error('Error fetching cakes', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCakes();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="navbar">
      <h2>🍰 Cakes Gallery</h2>
      {cakes.length === 0 ? (
        <p>No cakes added yet.</p>
      ) : (
        <div className="cake-grid">
            {cakes.map((cake) => (
              <div className="cake-card">
                <label >{'Name: '}{cake.name}</label>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default CakeList;
