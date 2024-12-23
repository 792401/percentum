import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../context/mArithmeticSettingsContext';
import { useHistory } from '../context/HistoryContext';

const ArithmeticSettings: React.FC = () => {
  const { clearHistory } = useHistory();
  const {
    setMin,
    setMax,
    setPlayTime,
    additionEnabled,
    setAdditionEnabled,
    subtractionEnabled,
    setSubtractionEnabled,
    multiplicationEnabled,
    setMultiplicationEnabled,
    divisionEnabled,
    setDivisionEnabled,
    includeMultiplesOf3,
    setIncludeMultiplesOf3,
    includeMultiplesOf5,
    setIncludeMultiplesOf5,
    includeMultiplesOf10,
    setIncludeMultiplesOf10,

  } = useSettings();
  const [numberRange, setNumberRange] = useState<{ min: string; max: string }>({ min: '0', max: '100' });
  const [selectedPlayTime, setSelectedPlayTime] = useState<string>('1');
  const navigate = useNavigate();

  const handleStart = () => {
    clearHistory();
    setMin(parseInt(numberRange.min));
    setMax(parseInt(numberRange.max));
    setPlayTime(parseInt(selectedPlayTime));
    navigate('/arithmetic');
  };

  const handleRangeChange = (side: 'min' | 'max', value: string) => {
    if (/^\d*$/.test(value)) {
      setNumberRange((prevRange) => ({
        ...prevRange,
        [side]: value === '' ? '' : value,
      }));
    }
  };

  const handleTimeChange = (value: string) => {
    setSelectedPlayTime(value);
  };

  return (
    <div>
      {/* <h1>Settings</h1> */}
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

      <div>
        <label>Time</label>
        <select value={selectedPlayTime} onChange={(e) => handleTimeChange(e.target.value)} className="input-time">
          <option value="1">1 minute</option>
          <option value="3">3 minutes</option>
          <option value="5">5 minutes</option>
          <option value="0">No pressure 🐢</option>
        </select>
      </div>
      <div>
  <div className="switch-container">
    <span className="switch-label">Multiples of 3</span>
    <label className="switch">
      <input
        type="checkbox"
        checked={includeMultiplesOf3}
        onChange={() => setIncludeMultiplesOf3(!includeMultiplesOf3)}
      />
      <span className="slider round"></span>
    </label>
  </div>
  <div className="switch-container">
    <span className="switch-label">Multiples of 5</span>
    <label className="switch">
      <input
        type="checkbox"
        checked={includeMultiplesOf5}
        onChange={() => setIncludeMultiplesOf5(!includeMultiplesOf5)}
      />
      <span className="slider round"></span>
    </label>
  </div>
  <div className="switch-container">
    <span className="switch-label">Multiples of 10</span>
    <label className="switch">
      <input
        type="checkbox"
        checked={includeMultiplesOf10}
        onChange={() => setIncludeMultiplesOf10(!includeMultiplesOf10)}
      />
      <span className="slider round"></span>
    </label>
  </div>
</div>
      <div>
        {/* <label>Operations</label> */}
        <div className="switch-container">
          <span className="switch-label">Addition</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={additionEnabled}
              onChange={() => setAdditionEnabled(!additionEnabled)}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="switch-container">
          <span className="switch-label">Subtraction</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={subtractionEnabled}
              onChange={() => setSubtractionEnabled(!subtractionEnabled)}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="switch-container">
          <span className="switch-label">Multiplication</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={multiplicationEnabled}
              onChange={() => setMultiplicationEnabled(!multiplicationEnabled)}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="switch-container">
          <span className="switch-label">Division</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={divisionEnabled}
              onChange={() => setDivisionEnabled(!divisionEnabled)}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>


      <button
        onClick={handleStart}
        disabled={
          !(
            additionEnabled ||
            subtractionEnabled ||
            multiplicationEnabled ||
            divisionEnabled
          )
        }
      >Start</button>
    </div>
  );
};

export default ArithmeticSettings;