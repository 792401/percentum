import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../context/settingsContext'

const Settings: React.FC = () => {
  const { setMin, setMax, percentageType, togglePercentageType } = useSettings();
  const [numberRange, setNumberRange] = useState<{ min: string; max: string }>({ min: '0', max: '100' });
  const navigate = useNavigate();

  const handleStart = () => {
    setMin(parseInt(numberRange.min));
    setMax(parseInt(numberRange.max));
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
        <label>Number Types </label>
        {[5, 10].map((p) => (
          <label key={p}>
            <input
              type="checkbox"
              checked={percentageType.includes(p)}
              onChange={() => togglePercentageType(p)}
            />
            Multiples of {p}
          </label>
        ))}
      </div>
      <button onClick={handleStart}>Start</button>
    </div>
  );
};

export default Settings;