import { createContext, useContext, useState, ReactNode } from 'react';

export interface EcoImpacts {
  energy: { value: number; unit: string };
  co2: { value: number; unit: string };
  water: { value: number; unit: string };
  primary_energy: { value: number; unit: string };
  metal_depletion: { value: number; unit: string };
}

export interface HistoryItem {
  id: string;
  prompt: string;
  response: string;
  model: string;
  tokens: number;
  co2: number;
  impacts?: EcoImpacts;
  timestamp: string;
}

interface HistoryContextType {
  history: HistoryItem[];
  addToHistory: (item: Omit<HistoryItem, 'id' | 'timestamp'>) => void;
  deleteFromHistory: (id: string) => void;
  clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const addToHistory = (item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
    const newItem: HistoryItem = {
      ...item,
      id: Date.now().toString(),
      timestamp: 'Just now',
    };
    setHistory(prev => [newItem, ...prev]);
  };

  const deleteFromHistory = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <HistoryContext.Provider value={{ history, addToHistory, deleteFromHistory, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
}
