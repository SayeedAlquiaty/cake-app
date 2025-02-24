import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import CakeList from './components/CakeList';
import CakeForm from './components/CakeForm';
import FavouriteCakeList from './components/FavouriteCakeList';

const App: React.FC = () => {
  return (
    <div className="cake-details">
      <header>
        <h1>Cake App</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/add">Add Favourite Cake</Link> | <Link to="/favourites">Favourites Cakes</Link> 
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<CakeList />} />
          <Route path="/add/:id" element={<CakeForm />} />
          <Route path="/favourites" element={<FavouriteCakeList />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
