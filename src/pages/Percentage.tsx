import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../context/settingsContext';
import { useHistory } from '../context/HistoryContext'; 

const Percentage: React.FC = () => {
  const { min, max, percentageType } = useSettings();
  const { addHistoryItem } = useHistory();  // Use the history context

  const [percentage, setPercentage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [inputData, setInputData] = useState<{ userAnswer: string; inputClass: string }>({
    userAnswer: '',
    inputClass: '',
  });
  const navigate = useNavigate();

  const correctAnswer = useMemo(() => (percentage / 100) * total, [percentage, total]);

  const generateProblem = useCallback(() => {
    let newPercentage: number;
    let newTotal: number;
    let answer: number;

    const validPercentageType = percentageType.length > 0 ? percentageType : Array.from({ length: 100 }, (_, i) => i + 1);

    do {
      newPercentage = validPercentageType[Math.floor(Math.random() * validPercentageType.length)];
      newTotal = Math.floor(Math.random() * (max - min + 1)) + min;
      answer = (newPercentage / 100) * newTotal;
    } while (answer % 1 !== 0 && max > min);

    setPercentage(newPercentage);
    setTotal(newTotal);
    setInputData({ userAnswer: '', inputClass: '' });
  }, [percentageType, min, max]);

  const checkAnswer = useCallback(() => {
    const userAnswerNum = parseFloat(inputData.userAnswer);

    const newHistoryItem = {
      question: `${percentage}% * ${total}`,
      correctAnswer: correctAnswer.toFixed(0),
      userAnswer: userAnswerNum.toFixed(0),
    };

    if (userAnswerNum === correctAnswer) {
      addHistoryItem(newHistoryItem);  // Add the history item to the context
      setInputData({ userAnswer: '', inputClass: '' });
      setTimeout(generateProblem, 500);
    } else {
      setInputData((prev) => ({ ...prev, inputClass: 'error' }));
      addHistoryItem(newHistoryItem);  // Add the history item even if incorrect
    }
  }, [correctAnswer, inputData.userAnswer, percentage, total, generateProblem, addHistoryItem]);

  const handleUserAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
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

  const handleStop = () => {
    navigate('/percentages/sessionstats');
  };

  useEffect(() => {
    generateProblem();
  }, [generateProblem]);

  return (
    <div className="App">
      <h1>Percentum</h1>
      <p>{percentage}% of {total}</p>
      <input
        type="text"
        placeholder="Result"
        value={inputData.userAnswer}
        onChange={handleUserAnswerChange}
        onKeyDown={handleKeyDown}
        className={`input-range result-input ${inputData.inputClass}`}
      />
      <button onClick={handleStop}>Stop</button>
    </div>
  );
};

export default Percentage;
