import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../context/settingsContext';
import { useHistory } from '../context/HistoryContext';

const Settings: React.FC = () => {
  const {clearHistory} = useHistory();
  const { setMin, setMax, setPlayTime, percentageType, togglePercentageType } = useSettings();
  const [numberRange, setNumberRange] = useState<{ min: string; max: string }>({ min: '0', max: '100' });
  const [selectedPlayTime, setSelectedPlayTime] = useState<string>('0');
  const navigate = useNavigate();

  const handleStart = () => {
    clearHistory();
    setMin(parseInt(numberRange.min));
    setMax(parseInt(numberRange.max));
    setPlayTime(parseInt(selectedPlayTime));
    navigate('/percentages');
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
      <h1>Settings</h1>
      <div>
        <label>Number Range</label>
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
        <option value="0">No time</option>
          <option value="1">1 minute</option>
          <option value="3">3 minutes</option>
          <option value="5">5 minutes</option>
          <option value="10">10 minutes</option>
        </select>
      </div>

      <div>
        <label>Only include:</label>
        {[3,5,10].map((p) => (
          <label key={p}>
            <input
              type="checkbox"
              checked={percentageType.includes(p)}
              onChange={() => togglePercentageType(p)}
            />Multiples of {p}
          </label>
        ))}
      </div>
      
      <button onClick={handleStart}>Start</button>
    </div>
  );
};

export default Settings;
