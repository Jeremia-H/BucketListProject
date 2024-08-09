import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NotFound from './components/NotFound';
import Test from './components/Test';
function App() {
  return (
      <Router>
        <Routes>
          <Route path="/test" element={<Test />} />
            <Route path="*" element={<NotFound />} /> {/* 404-Fehlerseite */}
        </Routes>
      </Router>

  );
}

export default App;
