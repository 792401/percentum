import React, { createContext, useContext, useState } from 'react';

const ArithmeticSettingsContext = createContext<any>(null);

export const useSettings = () => useContext(ArithmeticSettingsContext);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(100);
  const [playTime, setPlayTime] = useState<number>(1);
  const [additionEnabled, setAdditionEnabled] = useState<boolean>(false);
  const [subtractionEnabled, setSubtractionEnabled] = useState<boolean>(false);
  const [multiplicationEnabled, setMultiplicationEnabled] = useState<boolean>(false);
  const [divisionEnabled, setDivisionEnabled] = useState<boolean>(false);
  const [percentagesEnabled, setPercentagesEnabled] = useState<boolean>(false);

  return (
    <ArithmeticSettingsContext.Provider
      value={{
        min,
        max,
        setMin,
        setMax,
        playTime,
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
      }}
    >
      {children}
    </ArithmeticSettingsContext.Provider>
  );
};
