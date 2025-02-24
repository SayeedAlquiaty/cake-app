import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Cake } from '../types/Cake';
import { addFavouriteCake } from '../api/cakeApi';
import { getCakeById } from '../api/cakeApi';

const CakeForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cake, setCake] = useState<Cake | null>(null);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [yumFactor, setYumFactor] = useState(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCake = async () => {
      try {
        const data = await getCakeById(Number(id));
        setCake(data);
        setName(data.name);
        setImageUrl(data.imageUrl)
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

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = 'Name is required.';
    if (!comment.trim() || comment.length < 5 || comment.length > 200)
      newErrors.comment = 'Comment must be between 5 and 200 characters.';
    if (!imageUrl.trim()) newErrors.imageUrl = 'Image URL is required.';
    if (yumFactor < 1 || yumFactor > 5)
      newErrors.yumFactor = 'Yum Factor must be between 1 and 5.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await addFavouriteCake({ name, comment, imageUrl, yumFactor });
      navigate('/');
    } catch (error: any) {
      alert('Error creating cake: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div className="form-container">
      <h2>Add a Favourite Cake</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label><br />
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
        </div>
        <div>
          <label>Comment:</label><br />
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
          {errors.comment && <div style={{ color: 'red' }}>{errors.comment}</div>}
        </div>
        <div>
          <label>Image URL:</label><br />
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          {errors.imageUrl && <div style={{ color: 'red' }}>{errors.imageUrl}</div>}
        </div>
        <div>
          <label>Yum Factor (1-5):</label><br />
          <input type="number" value={yumFactor} onChange={(e) => setYumFactor(Number(e.target.value))} />
          {errors.yumFactor && <div style={{ color: 'red' }}>{errors.yumFactor}</div>}
        </div>
        <button type="submit" className="submit-button">Add Cake</button>
      </form>
    </div>
  );
};

export default CakeForm;
