import React, { createContext, useContext, useState } from 'react';

const SettingsContext = createContext<any>(null);

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(100);
  const [playTime, setPlayTime] = useState<number>(1);
  const [percentageType, setPercentageType] = useState<number[]>([5, 10]);

  const togglePercentageType = (value: number) => {
    setPercentageType((prev) =>
      prev.includes(value)
        ? prev.filter((p) => p !== value)
        : [...prev, value]
    );
  };

  return (
    <SettingsContext.Provider
      value={{
        min,
        max,
        setMin,
        setMax,
        playTime,
        setPlayTime,
        percentageType,
        togglePercentageType,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
