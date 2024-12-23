import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../context/PercentageSettingsContext';
import { useHistory } from '../context/HistoryContext';

const Percentage: React.FC = () => {
  const {
    min,
    max,
    playTime,
    percentagesEnabled,
    percentageIncreaseEnabled,
    percentageDecreaseEnabled,
    includeMultiplesOf3,
    includeMultiplesOf5,
    includeMultiplesOf10

  } = useSettings();
  const { addHistoryItem } = useHistory();
  const navigate = useNavigate();

  const [currentProblem, setCurrentProblem] = useState<{ question: string; correctAnswer: number }>({ question: '', correctAnswer: 0 });
  const [inputData, setInputData] = useState<{ userAnswer: string; inputClass: string }>({
    userAnswer: '',
    inputClass: '',
  });
  const [timeLeft, setTimeLeft] = useState<number>(playTime * 60);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const enabledOperations = useMemo(() => {
    const ops = [];
    if (percentagesEnabled) ops.push('percentage');
    if (percentageIncreaseEnabled) ops.push('percentageIncrease');
    if (percentageDecreaseEnabled) ops.push('percentageDecrease');
    return ops;
  }, [percentagesEnabled, percentageIncreaseEnabled, percentageDecreaseEnabled]);

  const generateProblem = useCallback(() => {
    if (enabledOperations.length === 0) {
      setCurrentProblem({ question: 'No operations enabled', correctAnswer: 0 });
      return;
    }
  
    const operation = enabledOperations[Math.floor(Math.random() * enabledOperations.length)];
  
    let operand1: number;
    let percentage: number;
    let question = '';
    let correctAnswer = 0;
    let validProblem = false;
  
    while (!validProblem) {
      operand1 = Math.floor(Math.random() * (max - min + 1)) + min;
      percentage = Math.floor(Math.random() * 100) + 1;
  
      // Apply the filters for multiples
      if (includeMultiplesOf3 && operand1 % 3 !== 0) continue;
      if (includeMultiplesOf5 && operand1 % 5 !== 0) continue;
      if (includeMultiplesOf10 && operand1 % 10 !== 0) continue;
  
      if (includeMultiplesOf3 && percentage % 3 !== 0) continue;
      if (includeMultiplesOf5 && percentage % 5 !== 0) continue;
      if (includeMultiplesOf10 && percentage % 10 !== 0) continue;
  
      switch (operation) {
        case 'percentage': {
          correctAnswer = parseFloat(((percentage / 100) * operand1).toFixed(2));
          validProblem =
            correctAnswer >= min &&
            correctAnswer <= max &&
            correctAnswer > 0;
          if (validProblem) {
            question = `${percentage}% of ${operand1}`;
          }
          break;
        }
        case 'percentageIncrease': {
          const increase = parseFloat(((percentage / 100) * operand1).toFixed(2));
          correctAnswer = parseFloat((operand1 + increase).toFixed(2));
          validProblem =
            correctAnswer >= min &&
            correctAnswer <= max;
          if (validProblem) {
            question = `${percentage}% increase of ${operand1}`;
          }
          break;
        }
        case 'percentageDecrease': {
          const decrease = parseFloat(((percentage / 100) * operand1).toFixed(2));
          correctAnswer = parseFloat((operand1 - decrease).toFixed(2));
          validProblem =
            correctAnswer >= min &&
            correctAnswer <= max &&
            correctAnswer > 0;
          if (validProblem) {
            question = `${percentage}% decrease of ${operand1}`;
          }
          break;
        }
        default:
          break;
      }
    }
  
    setCurrentProblem({ question, correctAnswer });
    setInputData({ userAnswer: '', inputClass: '' });
  }, [enabledOperations, min, max, includeMultiplesOf3, includeMultiplesOf5, includeMultiplesOf10]);
    

  const checkAnswer = useCallback(
    (userAnswer: string) => {
      const userAnswerNum = parseFloat(userAnswer);

      if (!isNaN(userAnswerNum)) {
        const newHistoryItem = {
          question: currentProblem.question,
          correctAnswer: currentProblem.correctAnswer.toString(),
          userAnswer: userAnswerNum.toString(),
        };
        if (Math.abs(userAnswerNum - currentProblem.correctAnswer) < 1e-6) {
          setInputData((prev) => ({ ...prev, inputClass: 'correct' }));
          setTimeout(() => {
            addHistoryItem(newHistoryItem);
            generateProblem();
          }, 300);
        } else {
          setInputData((prev) => ({ ...prev, inputClass: 'error' }));
          addHistoryItem(newHistoryItem);
        }
      }
    },
    [currentProblem, generateProblem, addHistoryItem]
  );

  const handleUserAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^\d*\.?\d*$/.test(value) || value === '') {
      setInputData((prev) => ({ ...prev, userAnswer: value, inputClass: '' }));

    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputData.userAnswer !== '') {
      checkAnswer(inputData.userAnswer);
    }
  };

  const handleStop = useCallback(() => {
    setIsGameOver(true);
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    if (playTime > 0 && timeLeft > 0 && !isGameOver) {
      const timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearTimeout(timer);
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

      <h2>{currentProblem.question}</h2>
      <input
        type="text"
        placeholder="Result"
        value={inputData.userAnswer}
        onChange={handleUserAnswerChange}
        onKeyDown={handleKeyDown}
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
