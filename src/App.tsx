import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WeatherPage from './pages/WeatherPage';
import SciencePage from './pages/SciencePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/weather" element={<WeatherPage />} />
      <Route path="/science" element={<SciencePage />} />
    </Routes>
  );
}

export default App;