import { useState, useEffect } from 'react';

export interface AIModel {
  id: string;
  name: string;
  apiKey: string;
  icon?: string;
  color?: string;
}

const STORAGE_KEY = 'ecoai_models';

const defaultModels: AIModel[] = [
  { id: 'openai-4', name: 'OpenAI 4.0', apiKey: '', icon: '⚡', color: '#10B981' },
  { id: 'perplexity', name: 'Perplexity 0.1.2', apiKey: '', icon: '🔮', color: '#8B5CF6' },
  { id: 'claude', name: 'Claude 6', apiKey: '', icon: '✨', color: '#EC4899' },
  { id: 'gemini', name: 'Gemini 2.5', apiKey: '', icon: '⭐', color: '#3B82F6' },
];

export function useModels() {
  const [models, setModels] = useState<AIModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      setModels(parsed);
      if (parsed.length > 0) {
        setSelectedModel(parsed[0]);
      }
    } else {
      setModels(defaultModels);
      setSelectedModel(defaultModels[0]);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultModels));
    }
  }, []);

  const addModel = (model: Omit<AIModel, 'id'>) => {
    const newModel: AIModel = {
      ...model,
      id: `model-${Date.now()}`,
    };
    const updated = [...models, newModel];
    setModels(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newModel;
  };

  const updateModel = (id: string, updates: Partial<AIModel>) => {
    const updated = models.map(m => m.id === id ? { ...m, ...updates } : m);
    setModels(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    if (selectedModel?.id === id) {
      setSelectedModel({ ...selectedModel, ...updates });
    }
  };

  const deleteModel = (id: string) => {
    const updated = models.filter(m => m.id !== id);
    setModels(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    if (selectedModel?.id === id && updated.length > 0) {
      setSelectedModel(updated[0]);
    } else if (updated.length === 0) {
      setSelectedModel(null);
    }
  };

  const selectModel = (id: string) => {
    const model = models.find(m => m.id === id);
    if (model) {
      setSelectedModel(model);
    }
  };

  return {
    models,
    selectedModel,
    addModel,
    updateModel,
    deleteModel,
    selectModel,
  };
}
