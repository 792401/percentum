import React from 'react';
import { useHistory } from '../context/HistoryContext';
import { useNavigate } from 'react-router-dom';

const SessionStats: React.FC = () => {
  const { history } = useHistory();
  const navigate = useNavigate();

  const handleExit = ()=>{
    navigate("/");
  }

  return (
    <div className="App" style={{ margin: '20px' }}>
      <h1>Statistics</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Status</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Question</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Correct Answer</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Your Answer</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, index) => {
            const isCorrect = item.correctAnswer === item.userAnswer;
            return (
              <tr key={index}>
                <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>
                  {isCorrect ? (
                    <span style={{ color: 'green' }}>✔️</span>
                  ) : (
                    <span style={{ color: 'red' }}>❌</span>
                  )}
                </td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.question}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.correctAnswer}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.userAnswer}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button style={{ marginTop: '20px', padding: '10px 20px' }}  onClick={handleExit}>Exit</button>
    </div>
  );
};

export default SessionStats;
