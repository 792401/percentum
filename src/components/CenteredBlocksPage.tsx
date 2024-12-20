// CenteredBlocksPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './CenteredBlocksPage.css';

const CenteredBlocksPage: React.FC = () => {
  return (
    <div >
      <h1>Select game</h1>
      <div className="options-container">
      <Link to="/arithmetic-settings">
        <div className="option">
          Mental Arithmetic
        </div>
        </Link>
       <Link to="/number-recall">
        <div className="option">
          Memory Game
        </div>
        </Link>
      </div>
    </div>
  );
};

export default CenteredBlocksPage;
