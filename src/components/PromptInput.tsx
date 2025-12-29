import { useState } from 'react';
import { Send } from 'lucide-react';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  placeholder?: string;
}

export function PromptInput({ onSubmit, placeholder = "Enter prompt..." }: PromptInputProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value.trim());
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="prompt-input pr-14"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
}
