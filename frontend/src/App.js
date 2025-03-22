import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ImageUpload from "./pages/ImageUpload";
import Home from './pages/Home';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login'; // Import Login component
import Register from './pages/Register'; // Import Register component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> {/* Default route */}
          <Route path="upload" element={<ImageUpload />} />
          <Route path="about" element={<About />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;