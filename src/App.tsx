import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';

import About from './pages/About';
// import Sidebar from './components/Sidebar';


import Home from './pages/Home';
import Arithmetic from './pages/Arithmetic'
import Percentage from './pages/Percentage';
import ArithmeticSettings from './pages/ArithmeticSettings'
import PercentageSettings from './pages/PercentageSettings'
import SessionStats from './pages/SessionStats';
import { ArithmeticSettingsProvider } from './context/mArithmeticSettingsContext';
import { HistoryProvider } from './context/HistoryContext';
import Memory from './pages/Memory';
import { PercentageSettingsProvider } from './context/PercentageSettingsContext';

const App: React.FC = () => {

  return (
    <ArithmeticSettingsProvider>
      <PercentageSettingsProvider>
        <HistoryProvider>
          <Router>
            {/* <Sidebar /> */}
            <div className="App">
              <Link to="/"><h1>Σ</h1></Link>
              <Routes>
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/" element={<Home />} />
                <Route path="/stats" element={<SessionStats />} />
                <Route path="/percentage-settings" element={<PercentageSettings />} />
                <Route path="/percentage" element={<Percentage />} />
                <Route path="/arithmetic-settings" element={<ArithmeticSettings />} />
                <Route path="/arithmetic" element={<Arithmetic />} />
                <Route path="/number-recall" element={<Memory />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </div>
          </Router>
        </HistoryProvider>
      </PercentageSettingsProvider>
    </ArithmeticSettingsProvider>

  );
};

export default App;
