import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../context/settingsContext';
import { useHistory } from '../context/HistoryContext';

const Percentage: React.FC = () => {
  const { min, max, percentageType, playTime } = useSettings();
  const { addHistoryItem } = useHistory();
  const navigate = useNavigate();

  const [percentage, setPercentage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [inputData, setInputData] = useState<{ userAnswer: string; inputClass: string }>({
    userAnswer: '',
    inputClass: '',
  });
  const [timeLeft, setTimeLeft] = useState<number>(playTime * 60);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const correctAnswer = useMemo(() => (percentage / 100) * total, [percentage, total]);

  const generateProblem = useCallback(() => {
    const generateMultiples = (num: number) => {
      let multiples = [];
      for (let i = num; i <= 100; i += num) {
        multiples.push(i);
      }
      return multiples;
    };

    const validPercentageType = percentageType.length > 0
      ? percentageType.flatMap((p:number) => generateMultiples(p))
      : Array.from({ length: 100 }, (_, i) => i + 1);
    let newPercentage: number;
    let newTotal: number;
    let answer: number;

    do {
      newPercentage = validPercentageType[Math.floor(Math.random() * validPercentageType.length)];
      newTotal = Math.floor(Math.random() * (max - min + 1)) + min;
      answer = (newPercentage / 100) * newTotal;
    } while (answer % 1 !== 0 && max > min);

    setPercentage(newPercentage);
    setTotal(newTotal);
    setInputData({ userAnswer: '', inputClass: '' });
  }, [percentageType, min, max]);

  const checkAnswer = useCallback((userAnswer: string) => {
    const userAnswerNum = parseFloat(userAnswer);

    if (!isNaN(userAnswerNum)) {
      const newHistoryItem = {
        question: `${percentage}% of ${total}`,
        correctAnswer: correctAnswer.toFixed(0),
        userAnswer: userAnswerNum.toFixed(0),
      };
      if (userAnswerNum === correctAnswer) {
        setInputData((prev) => ({ ...prev, inputClass: 'correct' }));
        setTimeout(() => {
          addHistoryItem(newHistoryItem);
          generateProblem();
        }, 300);

      } else {
        setInputData((prev) => ({ ...prev, inputClass: 'error' }));
        addHistoryItem(newHistoryItem);

        setTimeout(() => {
          setInputData((prev) => ({ ...prev, userAnswer: '', inputClass: '' }));
        }, 300);
      }
    }
  }, [correctAnswer, percentage, total, generateProblem, addHistoryItem]);

  const handleUserAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^\d*\.?\d*$/.test(value) || value === '') {
      setInputData({ userAnswer: value, inputClass: '' });

      if (value !== '') {
        checkAnswer(value);
      }
    }
  };

  const handleStop = useCallback(() => {
    setIsGameOver(true);
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    if (playTime > 0 && timeLeft > 0 && !isGameOver) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (playTime > 0 && timeLeft <= 0) {
      setIsGameOver(true);
      handleStop();
    }
  }, [timeLeft, isGameOver, playTime, handleStop]);

  useEffect(() => {
    generateProblem();
  }, [generateProblem]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="App">
      <h1>Percent</h1>
      <p>{percentage}% of {total}</p>
      <input
        type="text"
        placeholder="Result"
        value={inputData.userAnswer}
        onChange={handleUserAnswerChange}
        className={`input-range result-input ${inputData.inputClass}`}
        disabled={isGameOver}
      />
      {playTime > 0 && <p>Time Left: {formatTime(timeLeft)}</p>}
      {isGameOver && <p>Time's up!</p>}
      <button onClick={handleStop}>Stop</button>
    </div>
  );
};

export default Percentage;
