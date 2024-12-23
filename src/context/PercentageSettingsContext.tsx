import React, { createContext, useContext, useState } from 'react';

const PercentageSettingsContext = createContext<any>(null);

export const useSettings = () => useContext(PercentageSettingsContext);

export const PercentageSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(100);
  const [playTime, setPlayTime] = useState<number>(1);
  const [percentagesEnabled, setPercentagesEnabled] = useState<boolean>(false);
  const [percentageIncreaseEnabled, setPercentageIncreaseEnabled] = useState<boolean>(false);
  const [percentageDecreaseEnabled, setPercentageDecreaseEnabled] = useState<boolean>(false);
  const [includeMultiplesOf3, setIncludeMultiplesOf3] = useState<boolean>(false);
    const [includeMultiplesOf5, setIncludeMultiplesOf5] = useState<boolean>(false);
    const [includeMultiplesOf10, setIncludeMultiplesOf10] = useState<boolean>(false);
  

  return (
    <PercentageSettingsContext.Provider
      value={{
        min,
        max,
        setMin,
        setMax,
        playTime,
        setPlayTime,
        percentagesEnabled,
        setPercentagesEnabled,
        percentageIncreaseEnabled,
        setPercentageIncreaseEnabled,
        percentageDecreaseEnabled,
        setPercentageDecreaseEnabled,
        includeMultiplesOf3,
        setIncludeMultiplesOf3,
        includeMultiplesOf5,
        setIncludeMultiplesOf5,
        includeMultiplesOf10,
        setIncludeMultiplesOf10,
      }}
    >
      {children}
    </PercentageSettingsContext.Provider>
  );
};
