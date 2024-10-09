import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../context/settingsContext';
import { useHistory } from '../context/HistoryContext';

const Percentage: React.FC = () => {
  const {
    min,
    max,
    playTime,
    additionEnabled,
    subtractionEnabled,
    multiplicationEnabled,
    divisionEnabled,
    percentagesEnabled,
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
    if (additionEnabled) ops.push('addition');
    if (subtractionEnabled) ops.push('subtraction');
    if (multiplicationEnabled) ops.push('multiplication');
    if (divisionEnabled) ops.push('division');
    if (percentagesEnabled) ops.push('percentage');
    return ops;
  }, [additionEnabled, subtractionEnabled, multiplicationEnabled, divisionEnabled, percentagesEnabled]);


  const generateProblem = useCallback(() => {
    if (enabledOperations.length === 0) {
      setCurrentProblem({ question: 'No operations enabled', correctAnswer: 0 });
      return;
    }

    const operation = enabledOperations[Math.floor(Math.random() * enabledOperations.length)];

    let operand1: number;
    let operand2: number;
    let question = '';
    let correctAnswer = 0;
    let validProblem = false;

    while (!validProblem) {
      operand1 = Math.floor(Math.random() * (max - min + 1)) + min;
      operand2 = Math.floor(Math.random() * (max - min + 1)) + min;

      switch (operation) {
        case 'addition':
          correctAnswer = operand1 + operand2;
          validProblem = correctAnswer >= min && correctAnswer <= max;
          if (validProblem) {
            question = `${operand1} + ${operand2}`;
          }
          break;
        case 'subtraction':
          if (operand1 < operand2) {
            [operand1, operand2] = [operand2, operand1];
          }
          correctAnswer = operand1 - operand2;
          validProblem = correctAnswer >= min && correctAnswer <= max;
          if (validProblem) {
            question = `${operand1} - ${operand2}`;
          }
          break;
        case 'multiplication':
          correctAnswer = operand1 * operand2;
          validProblem = correctAnswer >= min && correctAnswer <= max;
          if (validProblem && correctAnswer > 0) {
            question = `${operand1} × ${operand2}`;
          }
          break;
        case 'division':
          if (operand2 === 0 || operand1 % operand2 !== 0) continue;
          correctAnswer = operand1 / operand2;
          validProblem = correctAnswer >= min && correctAnswer <= max;
          if (validProblem && correctAnswer > 0) {
            question = `${operand1} ÷ ${operand2}`;
          }
          break;
        case 'percentage':
          const percentage = Math.floor(Math.random() * 100) + 1;
          correctAnswer = Math.floor((percentage / 100) * operand1);
          validProblem =
            Number.isInteger(correctAnswer) &&
            correctAnswer >= min &&
            correctAnswer <= max &&
            correctAnswer > 0;
          if (validProblem) {
            question = `${percentage}% of ${operand1}`;
          }
          break;
        default:
          break;
      }
    }

    setCurrentProblem({ question, correctAnswer });
    setInputData({ userAnswer: '', inputClass: '' });
  }, [enabledOperations, min, max]);

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
      <h1>🧠🔥</h1>
      <p>{currentProblem.question}</p>
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
