import React from 'react';
import './App.css';
import { Main } from './pages/Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Vote } from './pages/Vote';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main></Main>} />
        <Route path="/vote" element={<Vote></Vote>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
