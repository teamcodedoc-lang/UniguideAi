import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';
import CollegeDetails from './pages/CollegeDetails';
import Login from './pages/Login';
import Scholarships from './pages/Scholarships';
import ChoiceFilling from './pages/ChoiceFilling';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/results" element={<Results />} />
      <Route path="/college/:id" element={<CollegeDetails />} />
      <Route path="/scholarships" element={<Scholarships />} />
      <Route path="/choice-filling" element={<ChoiceFilling />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
