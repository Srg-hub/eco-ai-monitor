import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EcoContextType {
  ecoMode: boolean;
  setEcoMode: (mode: boolean) => void;
}

const EcoContext = createContext<EcoContextType | undefined>(undefined);

export function EcoProvider({ children }: { children: ReactNode }) {
  const [ecoMode, setEcoMode] = useState(false);

  return (
    <EcoContext.Provider value={{ ecoMode, setEcoMode }}>
      {children}
    </EcoContext.Provider>
  );
}

export function useEco() {
  const context = useContext(EcoContext);
  if (!context) {
    throw new Error('useEco must be used within an EcoProvider');
  }
  return context;
}
