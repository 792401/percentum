import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Memory: React.FC = () => {
    const [showStartModal, setShowStartModal] = useState(true);
    const [currentLevel, setCurrentLevel] = useState(3);
    const [generatedNumber, setGeneratedNumber] = useState('');
    const [userInput, setUserInput] = useState('');
    const [gameState, setGameState] = useState<'countdown' | 'showNumber' | 'userInput' | 'end'>('countdown');
    const [countdown, setCountdown] = useState(3);
    const [attemptsLeft, setAttemptsLeft] = useState(3);
    const navigate = useNavigate();


    const baseTimePerDigit = 1; 
    const additionalTimePerDigit = 0.2; 

    useEffect(() => {
        if (gameState === 'countdown') {
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setGameState('showNumber');
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }

        if (gameState === 'showNumber') {
            const number = generateRandomNumber(currentLevel);
            setGeneratedNumber(number);
            const displayTime = baseTimePerDigit + (currentLevel - 3) * additionalTimePerDigit;
            const timer = setTimeout(() => setGameState('userInput'), displayTime * 1000);
            return () => clearTimeout(timer);
        }
    }, [gameState, currentLevel]);

    const generateRandomNumber = (length: number): string => {
        return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
    };

    const handleUserSubmit = () => {
        if (userInput === generatedNumber) {
            if (currentLevel < 15) {
                setCurrentLevel((prev) => prev + 1);
            }
            setUserInput('');
            setAttemptsLeft(3);
            setGameState('showNumber');
        } else {
            const remainingAttempts = attemptsLeft - 1;
            if (remainingAttempts === 0) {
                setGameState('end');
            } else {
                setAttemptsLeft(remainingAttempts);
                setGeneratedNumber(generateRandomNumber(currentLevel));
                setUserInput('');
                setGameState('showNumber');
            }
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && gameState === 'userInput') {
            handleUserSubmit();
        }
    };

    const preventCopyPaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setUserInput(value);
        }
    };

    return (
        <div className="App" onKeyPress={handleKeyPress} tabIndex={0}>
            {showStartModal ? (
                <div className="modal">
                    <h2>Memory Game</h2>
                    <p>Memorize the number displayed and type it in</p>
                    <p>The numbers get longer with each level</p>
                    <button onClick={() => setShowStartModal(false)}>Start</button>
                </div>
            ) : gameState === 'end' ? (
                <div className="modal">
                    <h2>Game Over</h2>
                    <p>You reached level {currentLevel}.</p>
                    <button onClick={() => navigate('/')}>Exit</button>
                </div>
            ) : (
                <div className="game-container">
                    {gameState === 'countdown' && <h2>Starting in {countdown}</h2>}

                    {gameState === 'showNumber' && (
                        <div className="number-display">
                            <h2>{generatedNumber}</h2>
                        </div>
                    )}

                    {gameState === 'userInput' && (
                        <div className="input-section">
                            <h2>Enter the number:</h2>
                            <input
                                autoFocus={gameState === 'userInput'}
                                type="text"
                                value={userInput}
                                onChange={handleInputChange}
                                onPaste={preventCopyPaste}
                                maxLength={15}
                                className="input-range"
                                disabled={gameState !== 'userInput'}
                            />
                            {attemptsLeft < 3 && attemptsLeft > 0 && (
                                <p style={{ color: 'red' }}>Attempts left: {attemptsLeft}/3</p>
                            )}
                            <div className="button-row spaced-buttons">
                                <button onClick={() => navigate('/')} className="exit-button">Exit</button>
                                <button onClick={handleUserSubmit} disabled={gameState !== 'userInput'}>Submit</button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Memory;
