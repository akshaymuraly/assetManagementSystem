import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './pages/GRN/Layout';

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;