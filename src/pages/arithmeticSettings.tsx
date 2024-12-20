import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../context/mArithmeticSettingsContext';
import { useHistory } from '../context/HistoryContext';

const Settings: React.FC = () => {
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
    percentagesEnabled,
    setPercentagesEnabled,
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
        <div className="switch-container">
          <span className="switch-label">Percentages</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={percentagesEnabled}
              onChange={() => setPercentagesEnabled(!percentagesEnabled)}
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
            divisionEnabled ||
            percentagesEnabled
          )
        }
      >Start</button>
    </div>
  );
};

export default Settings;
