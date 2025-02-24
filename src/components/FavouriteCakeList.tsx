import React, { useEffect, useState } from 'react';
import { getFavouriteCakes } from '../api/cakeApi';
import { Cake } from '../types/Cake';
import { Link } from 'react-router-dom';

const FavouriteCakeList: React.FC = () => {
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const data = await getFavouriteCakes();
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
      <h2>🍰 Favourite Cakes</h2>
      {cakes.length === 0 ? (
        <p>No cakes added yet.</p>
      ) : (
        <ul>
          {cakes.map((cake) => (
            <li key={cake.id}>
              <img src={cake.imageUrl} alt={cake.name} width="100" />
              <p>{cake.name}</p>
              <Link to={`/favourite/${cake.id}`} className="cake-card" key={cake.id}>
                {'Favourite Cake details'}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavouriteCakeList;
