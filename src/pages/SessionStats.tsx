import React from 'react';
// import { useHistory } from '../context/HistoryContext';
import { useNavigate } from 'react-router-dom';

const SessionStats: React.FC = () => {
  // const { history } = useHistory();
  const navigate = useNavigate();

  const handleExit = ()=>{
    navigate("/");
  }

  return (
    <div className="App" style={{ margin: '20px' }}>
      <h1>Statistics</h1>
      

      <button style={{ marginTop: '20px', padding: '10px 20px' }}  onClick={handleExit}>Exit</button>
    </div>
  );
};

export default SessionStats;
