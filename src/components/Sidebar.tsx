import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <Link to="/">Home</Link>
      {/* <ul>
        <li><Link to="/arithmetic-settings">Arithmetic</Link></li>
        <li><Link to="/about">About</Link></li>      
      </ul> */}
    </div>
  );
};

export default Sidebar;
