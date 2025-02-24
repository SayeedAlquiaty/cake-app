import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Cake } from '../types/Cake';
import { getFavouriteCakeById } from '../api/cakeApi';

const FavouriteCakeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cake, setCake] = useState<Cake | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCake = async () => {
      try {
        const data = await getFavouriteCakeById(Number(id));
        setCake(data);
      } catch (err) {
        setError('Cake not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchCake();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error || !cake) return <div>{error || 'Cake not found.'}</div>;

  return (
    <div className="cake-details">
      <img src={cake.imageUrl} alt={cake.name} />
      <h1>{cake.name}</h1>
      <p>{cake.comment}</p>
      <p><strong>Yum Factor:</strong> {'⭐'.repeat(cake.yumFactor)}</p>
      <Link to="/"> ← Back to Gallery</Link>
    </div>
  );
};

export default FavouriteCakeDetail;
