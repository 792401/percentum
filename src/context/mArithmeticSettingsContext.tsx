import React, { createContext, useContext, useState } from 'react';

const ArithmeticSettingsContext = createContext<any>(null);

export const useSettings = () => useContext(ArithmeticSettingsContext);

export const ArithmeticSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(100);
  const [playTime, setPlayTime] = useState<number>(1);
  const [additionEnabled, setAdditionEnabled] = useState<boolean>(false);
  const [subtractionEnabled, setSubtractionEnabled] = useState<boolean>(false);
  const [multiplicationEnabled, setMultiplicationEnabled] = useState<boolean>(false);
  const [divisionEnabled, setDivisionEnabled] = useState<boolean>(false);
  const [includeMultiplesOf3, setIncludeMultiplesOf3] = useState<boolean>(false);
  const [includeMultiplesOf5, setIncludeMultiplesOf5] = useState<boolean>(false);
  const [includeMultiplesOf10, setIncludeMultiplesOf10] = useState<boolean>(false);

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
        includeMultiplesOf3,
        setIncludeMultiplesOf3,
        includeMultiplesOf5,
        setIncludeMultiplesOf5,
        includeMultiplesOf10,
        setIncludeMultiplesOf10,
      }}
    >
      {children}
    </ArithmeticSettingsContext.Provider>
  );
};
