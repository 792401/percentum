import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import './App.css';
import Percentage from './pages/Percentage';
import About from './pages/About';
// import Sidebar from './components/Sidebar';


import Settings from './pages/Settings';
import SessionStats from './pages/SessionStats';
import { SettingsProvider } from './context/settingsContext';
import { HistoryProvider } from './context/HistoryContext'; 

const App: React.FC = () => {

  return (
    <SettingsProvider>
       <HistoryProvider>
      <Router>
        {/* <Sidebar /> */}
        <div className="app">
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<Settings />} />
            <Route path="/stats" element={<SessionStats />} />
            <Route path="/percentages" element={<Percentage />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
      </HistoryProvider>
    </SettingsProvider>
  );
};

export default App;
