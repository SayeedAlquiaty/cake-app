import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import CakeList from './components/CakeList';

const App: React.FC = () => {
  return (
    <div className="cake-details">
      <header>
        <h1>Cake App</h1>
        <nav>
          <Link to="/">Home</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<CakeList />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
