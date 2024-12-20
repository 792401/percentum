import { Link,BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';

import About from './pages/About';
// import Sidebar from './components/Sidebar';


import Home from './pages/Home';
import Arithmetic from './pages/Arithmetic'
import ArithmeticSettings from './pages/ArithmeticSettings'
import SessionStats from './pages/SessionStats';
import { SettingsProvider } from './context/arithmeticSettingsContext';
import { HistoryProvider } from './context/HistoryContext';
import Memory from './pages/Memory';

const App: React.FC = () => {

  return (
    <SettingsProvider>
      <HistoryProvider>
        <Router>
          {/* <Sidebar /> */}
          <div className="app">
          <Link to="/"><h1>Σ</h1></Link>
            <Routes>
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/" element={<Home />} />
              <Route path="/stats" element={<SessionStats />} />
              <Route path="/arithmetic-settings" element={<ArithmeticSettings />} />
              <Route path="/arithmetic" element={<Arithmetic />} />
              <Route path="/number-recall" element={<Memory />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </HistoryProvider>
    </SettingsProvider>
  );
};

export default App;
