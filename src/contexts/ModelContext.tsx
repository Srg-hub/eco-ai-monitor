import React, { createContext, useContext, ReactNode } from 'react';
import { useModels, AIModel } from '@/hooks/useModels';

interface ModelContextType {
  models: AIModel[];
  selectedModel: AIModel | null;
  addModel: (model: Omit<AIModel, 'id'>) => AIModel;
  updateModel: (id: string, updates: Partial<AIModel>) => void;
  deleteModel: (id: string) => void;
  selectModel: (id: string) => void;
}

const ModelContext = createContext<ModelContextType | undefined>(undefined);

export function ModelProvider({ children }: { children: ReactNode }) {
  const modelState = useModels();

  return (
    <ModelContext.Provider value={modelState}>
      {children}
    </ModelContext.Provider>
  );
}

export function useModelContext() {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error('useModelContext must be used within a ModelProvider');
  }
  return context;
}
