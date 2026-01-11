import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { PromptInput } from '@/components/PromptInput';
import { useEco } from '@/contexts/EcoContext';
import { Plus, Download, Check, BarChart3 } from 'lucide-react';

const models = [
  { id: 'openai', name: 'openAI', icon: '⚡', color: 'bg-eco-green', selected: true },
  { id: 'perplexity', name: 'Perplexity', icon: '🔮', color: 'bg-accent', selected: false },
  { id: 'claude', name: 'claude', icon: '✨', color: 'bg-pink-500', selected: false },
  { id: 'gemini', name: 'Gemini', icon: '⭐', color: 'bg-token-blue', selected: false },
];

export default function Compare() {
  const { ecoMode } = useEco();
  const [selectedModels, setSelectedModels] = useState(models.map(m => ({ ...m })));
  const [activeTab, setActiveTab] = useState<'co2' | 'energy'>('co2');
  const [hasPrompted, setHasPrompted] = useState(false);

  const toggleModel = (id: string) => {
    setSelectedModels(prev => 
      prev.map(m => m.id === id ? { ...m, selected: !m.selected } : m)
    );
  };

  const handlePrompt = (prompt: string) => {
    // In a real implementation, this would call the AI service for each selected model
    // For now, we just show empty state since we're clearing mock data
    setHasPrompted(true);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Prompt Input */}
        <div className="flex items-center gap-4 mb-6">
          <button className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <Plus className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <PromptInput 
              onSubmit={handlePrompt} 
              placeholder="Enter prompt, or prompt ID ..." 
            />
          </div>
        </div>

        {/* Model Selection */}
        <div className="flex items-center gap-3 mb-8">
          {selectedModels.map((model) => (
            <button
              key={model.id}
              onClick={() => toggleModel(model.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                model.selected 
                  ? 'glass-card border-2 border-primary/50' 
                  : 'glass-card opacity-60 hover:opacity-100'
              }`}
            >
              <span>{model.icon}</span>
              <span className="text-sm font-medium">{model.name}</span>
              {model.selected && (
                <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Chart Area */}
        <div className="glass-card p-8 rounded-xl mb-8">
          {/* Tabs */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab('co2')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'co2' 
                  ? 'bg-secondary text-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              CO2 emission
            </button>
            <button
              onClick={() => setActiveTab('energy')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'energy' 
                  ? 'bg-secondary text-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Energy consumption
            </button>
          </div>

          <div className="h-64 flex flex-col items-center justify-center">
            <BarChart3 className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              {hasPrompted 
                ? 'Connect to AI service to see comparison data' 
                : 'Enter a prompt to compare models'}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Real comparison data requires AI integration
            </p>
          </div>
        </div>

        {/* Download Button */}
        <div className="flex justify-end">
          <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <span className="text-sm">download report</span>
          </button>
        </div>
      </div>
    </Layout>
  );
}
