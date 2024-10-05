import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Midpart from './components/Midpart';
import Footer from './components/Footer';
import MealDetails from './components/MealDetails';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Midpart />} />
        <Route path="/meal/:idMeal" element={<MealDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
