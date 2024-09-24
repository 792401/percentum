import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './App.css'; // Ensure this file is imported

// interface HistoryItem {
//   question: string;
//   correctAnswer: string;
// }

const App: React.FC = () => {
  const [percentage, setPercentage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [inputData, setInputData] = useState<{ userAnswer: string; inputClass: string }>({
    userAnswer: '',
    inputClass: '',
  });
  // const [history, setHistory] = useState<HistoryItem[]>([]);

  const [numberRange, setNumberRange] = useState<{ min: string; max: string }>({ min: '0', max: '100' });
  const [percentageType, setPercentageType] = useState<number[]>([3, 5, 10]);

  const correctAnswer = useMemo(() => (percentage / 100) * total, [percentage, total]);

  const generateProblem = useCallback(() => {
    let newPercentage: number;
    let newTotal: number;
    let answer: number;
    const min = parseInt(numberRange.min, 10) || 0;
    const max = parseInt(numberRange.max, 10) || 100;

    const validPercentageType = percentageType.length > 0 ? percentageType : Array.from({ length: 100 }, (_, i) => i + 1);

    do {
      newPercentage = validPercentageType[Math.floor(Math.random() * validPercentageType.length)];
      newTotal = Math.floor(Math.random() * (max - min + 1)) + min;
      answer = (newPercentage / 100) * newTotal;
    } while (answer % 1 !== 0 && max > min);

    setPercentage(newPercentage);
    setTotal(newTotal);
    setInputData({ userAnswer: '', inputClass: '' });
  }, [percentageType, numberRange]);

  const checkAnswer = useCallback(() => {
    const userAnswerNum = parseFloat(inputData.userAnswer);

    // const newHistoryItem: HistoryItem = {
    //   question: `${percentage}% * ${total}`,
    //   correctAnswer: correctAnswer.toFixed(0),
    // };

    if (userAnswerNum === correctAnswer) {
      // setHistory((prevHistory) => [newHistoryItem, ...prevHistory]);
      setInputData({ userAnswer: '', inputClass: '' });
      setTimeout(generateProblem, 500);
    } else {
      setInputData((prev) => ({ ...prev, inputClass: 'error' }));
    }
  }, [correctAnswer, inputData.userAnswer, percentage, total, generateProblem]);

  const handleUserAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow positive numbers in the result field
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      setInputData({ userAnswer: value, inputClass: '' });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      checkAnswer();
    }
  };

  const handleRangeChange = (side: 'min' | 'max', value: string) => {
    if (/^\d*$/.test(value)) {
      setNumberRange((prevRange) => ({
        ...prevRange,
        [side]: value === '' ? '' : value,
      }));
    }
  };

  const handleCheckboxChange = (value: number) => {
    setPercentageType((prev) =>
      prev.includes(value) ? prev.filter((type) => type !== value) : [...prev, value]
    );
  };

  useEffect(() => {
    generateProblem();
  }, [generateProblem]);

  return (
    <div className="App">
      <h1>Percentum</h1>

      {/* Settings for Number Range */}
      <div>
        <label>Range</label>
        <input
          type="number"
          value={numberRange.min}
          onChange={(e) => handleRangeChange('min', e.target.value)}
          placeholder="min"
          className="input-range"
        />
        <span> - </span>
        <input
          type="number"
          value={numberRange.max}
          onChange={(e) => handleRangeChange('max', e.target.value)}
          placeholder="max"
          className="input-range"
        />
      </div>

      {/* Settings for Percentage Types */}
      <div>
        {/* <label>Select Percentage Types: </label> */}
        {[3, 5, 10].map((p) => (
          <label key={p}>
            <input
              type="checkbox"
              checked={percentageType.includes(p)}
              onChange={() => handleCheckboxChange(p)}
            />
            Multiples of {p}
          </label>
        ))}
      </div>

      {/* Question Section */}
      <p>{percentage}% of {total}</p>
      <input
        type="text"
        placeholder="Result"
        value={inputData.userAnswer}
        onChange={handleUserAnswerChange}
        onKeyDown={handleKeyDown}
        className={`input-range result-input ${inputData.inputClass}`}
      />

      {/* History Section
      <h2>History</h2>
      <ul>
        {history.map((item, index) => (
          <li key={index}>
            {item.question} = {item.correctAnswer}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default App;
