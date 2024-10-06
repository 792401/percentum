import React, { createContext, useState, useContext } from 'react';

// Define the interface for the context value
interface SettingsContextType {
  min: number;
  max: number;
  percentageType: number[];
  setMin: (value: number) => void;
  setMax: (value: number) => void;
  togglePercentageType: (value: number) => void;
}

// Create the context with default values
const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// Create a provider component
export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(100);
  const [percentageType, setPercentageType] = useState<number[]>([3, 5, 10]);

  const togglePercentageType = (value: number) => {
    setPercentageType((prev) =>
      prev.includes(value) ? prev.filter((type) => type !== value) : [...prev, value]
    );
  };

  return (
    <SettingsContext.Provider value={{ min, max, percentageType, setMin, setMax, togglePercentageType }}>
      {children}
    </SettingsContext.Provider>
  );
};

// Create a hook to easily use the context
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
