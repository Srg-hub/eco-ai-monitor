import { useState } from 'react';

// Update this URL when you have a public endpoint
const API_URL = import.meta.env.VITE_PYTHON_API_URL || 'http://127.0.0.1:5000';

export interface EcoImpacts {
  energy: { value: number; unit: string };
  co2: { value: number; unit: string };
  water: { value: number; unit: string };
  primary_energy: { value: number; unit: string };
  metal_depletion: { value: number; unit: string };
}

export interface ChatResponse {
  response: string;
  impacts: EcoImpacts;
}

export function useEcoChat() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendPrompt = async (prompt: string): Promise<ChatResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data: ChatResponse = await response.json();
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to connect to AI server';
      setError(message);
      console.error('EcoChat error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { sendPrompt, isLoading, error };
}
