import React, { useState, useEffect } from 'react';
import './App.css';

interface HistoryItem {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

const App: React.FC = () => {
  const [percentage, setPercentage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [inputClass, setInputClass] = useState<string>(''); // For input highlighting
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Settings state
  const [numberRange, setNumberRange] = useState<{ min: number; max: number }>({ min: 100, max: 500 });
  const [percentageType, setPercentageType] = useState<number[]>([3, 5, 10]);

  const generateProblem = () => {
    let newPercentage: number;
    let newTotal: number;
    let correctAnswer: number;

    do {
      newPercentage = percentageType[Math.floor(Math.random() * percentageType.length)];
      newTotal = Math.floor(Math.random() * (numberRange.max - numberRange.min + 1)) + numberRange.min;
      correctAnswer = (newPercentage / 100) * newTotal;
    } while (correctAnswer % 1 !== 0);

    setPercentage(newPercentage);
    setTotal(newTotal);
    setUserAnswer('');
    setInputClass(''); // Reset input class
  };

  const checkAnswer = () => {
    const correctAnswer = (percentage / 100) * total;
    const userAnswerNum = parseFloat(userAnswer);

    const newHistoryItem: HistoryItem = {
      question: `${percentage}% of ${total}`,
      userAnswer,
      correctAnswer: correctAnswer.toFixed(0),
      isCorrect: userAnswerNum === correctAnswer,
    };

    setHistory([newHistoryItem, ...history]);

    if (userAnswerNum === correctAnswer) {
      setInputClass(''); // Remove red border if correct
      setTimeout(generateProblem, 500); // Move to next question
    } else {
      setInputClass('error'); // Highlight input in red
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  useEffect(() => {
    generateProblem();
  }, [percentageType, numberRange]);

  return (
    <div className="App">
      <h1>Percentum</h1>

      {/* Settings for Number Range */}
      <div>
        <label>Number Range: </label>
        <input
          type="number"
          value={numberRange.min}
          onChange={(e) => setNumberRange({ ...numberRange, min: parseInt(e.target.value) })}
        />
        <span> - </span>
        <input
          type="number"
          value={numberRange.max}
          onChange={(e) => setNumberRange({ ...numberRange, max: parseInt(e.target.value) })}
        />
      </div>

      {/* Settings for Percentage Types */}
      <div>
        <label>Select Percentage Types: </label>
        <label>
          <input
            type="checkbox"
            checked={percentageType.includes(3)}
            onChange={() => setPercentageType(percentageType.includes(3) ? percentageType.filter(p => p !== 3) : [...percentageType, 3])}
          />
          Multiples of 3
        </label>
        <label>
          <input
            type="checkbox"
            checked={percentageType.includes(5)}
            onChange={() => setPercentageType(percentageType.includes(5) ? percentageType.filter(p => p !== 5) : [...percentageType, 5])}
          />
          Multiples of 5
        </label>
        <label>
          <input
            type="checkbox"
            checked={percentageType.includes(10)}
            onChange={() => setPercentageType(percentageType.includes(10) ? percentageType.filter(p => p !== 10) : [...percentageType, 10])}
          />
          Multiples of 10
        </label>
      </div>

      {/* Question Section */}
      <p>{percentage}% of {total}</p>
      <input
        type="number"
        placeholder="Enter your answer"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        onKeyDown={handleKeyDown} // Handle Enter key
        className={inputClass}
      />

      {/* History Section */}
      <h2>History</h2>
      <ul>
        {history.map((item, index) => (
          <li key={index}>
            {item.question} - Your Answer: {item.userAnswer}, Correct Answer: {item.correctAnswer} ({item.isCorrect ? 'Correct' : 'Wrong'})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
