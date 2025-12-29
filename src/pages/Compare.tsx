import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { PromptInput } from '@/components/PromptInput';
import { useEco } from '@/contexts/EcoContext';
import { Plus, Download, Check } from 'lucide-react';

const models = [
  { id: 'openai', name: 'openAI', icon: '⚡', color: 'bg-eco-green', selected: true },
  { id: 'perplexity', name: 'Perplexity', icon: '🔮', color: 'bg-accent', selected: false },
  { id: 'claude', name: 'claude', icon: '✨', color: 'bg-pink-500', selected: false },
  { id: 'gemini', name: 'Gemini', icon: '⭐', color: 'bg-token-blue', selected: false },
];

const mockData = {
  co2: [
    { model: 'openai', value: 3.1, color: '#10B981' },
    { model: 'perplexity', value: 3.9, color: '#8B5CF6' },
    { model: 'claude', value: 2.3, color: '#EC4899' },
    { model: 'gemini', value: 2.9, color: '#3B82F6' },
  ],
  energy: [
    { model: 'openai', value: 0.8, color: '#10B981' },
    { model: 'perplexity', value: 1.1, color: '#8B5CF6' },
    { model: 'claude', value: 0.6, color: '#EC4899' },
    { model: 'gemini', value: 0.9, color: '#3B82F6' },
  ],
};

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
    setHasPrompted(true);
  };

  const data = activeTab === 'co2' ? mockData.co2 : mockData.energy;
  const maxValue = Math.max(...data.map(d => d.value));

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

          {hasPrompted ? (
            <>
              {/* Y-Axis Label */}
              <div className="flex">
                <div className="w-16 flex flex-col justify-between text-xs text-muted-foreground py-4">
                  <span>{activeTab === 'co2' ? '4 gm' : '1.5'}</span>
                  <span>{activeTab === 'co2' ? '3 gm' : '1.0'}</span>
                  <span>{activeTab === 'co2' ? '2 gm' : '0.5'}</span>
                  <span>0</span>
                </div>

                {/* Chart */}
                <div className="flex-1 relative">
                  <div className="absolute left-0 text-xs text-muted-foreground -rotate-90 origin-left translate-y-20">
                    {activeTab === 'co2' ? 'CO2 emission gms' : 'Energy KWh'}
                  </div>
                  
                  <div className="flex items-end justify-around h-64 pl-8">
                    {data.map((item, index) => {
                      const height = (item.value / maxValue) * 100;
                      const ecoHeight = ecoMode ? height * 0.7 : height;
                      const displayValue = ecoMode ? item.value * 0.7 : item.value;
                      
                      return (
                        <div key={item.model} className="flex flex-col items-center gap-2">
                          <span className="text-xs text-foreground font-medium">
                            {displayValue.toFixed(1)} {activeTab === 'co2' ? 'gm' : 'KWh'}
                          </span>
                          <div 
                            className="w-16 chart-bar animate-scale-in"
                            style={{ 
                              height: `${ecoHeight}%`,
                              backgroundColor: item.color,
                              animationDelay: `${index * 100}ms`,
                            }}
                          />
                          <span className="text-2xl mt-2">{models.find(m => m.id === item.model)?.icon}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* X-Axis */}
              <div className="flex justify-center mt-4">
                <span className="text-xs text-muted-foreground">+</span>
              </div>
            </>
          ) : (
            <div className="h-64 flex items-center justify-center">
              <p className="text-muted-foreground">Enter a prompt to compare models</p>
            </div>
          )}
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
