import { useState } from 'react';
import { Download } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { ModelSelector } from '@/components/ModelSelector';
import { PromptInput } from '@/components/PromptInput';
import { ResponseDisplay } from '@/components/ResponseDisplay';
import { useEco } from '@/contexts/EcoContext';
import { useModelContext } from '@/contexts/ModelContext';
import { useHistory } from '@/contexts/HistoryContext';

export default function Index() {
  const { ecoMode } = useEco();
  const { selectedModel } = useModelContext();
  const { addToHistory } = useHistory();
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [response, setResponse] = useState('');
  
  const baseTokens = 35;
  const tokens = ecoMode ? Math.round(baseTokens * 0.7) : baseTokens;
  const co2 = ecoMode ? 2.2 : 3.1;

  const handlePrompt = (prompt: string) => {
    // If there's already a response, save it to history first
    if (response && currentPrompt) {
      addToHistory({
        prompt: currentPrompt,
        response: response,
        model: selectedModel?.name || 'Unknown',
        tokens: tokens,
        co2: co2,
      });
    }

    // Set new prompt - response will be empty until real AI is connected
    setCurrentPrompt(prompt);
    setResponse('');
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Header with Model Selector */}
        <div className="flex items-center justify-between mb-8">
          <ModelSelector />
        </div>

        {/* Main Content */}
        <div className="mb-8">
          {/* Response Area */}
          <div className="max-w-2xl mx-auto">
            {response ? (
              <div className="space-y-4">
                <div className="glass-card p-4 border-l-2 border-primary/50">
                  <p className="text-sm text-muted-foreground mb-1">Your prompt:</p>
                  <p className="text-foreground">{currentPrompt}</p>
                </div>
                <ResponseDisplay text={response} />
              </div>
            ) : (
              <div className="glass-card p-6 flex items-center justify-center min-h-[120px]">
                <p className="text-muted-foreground text-center text-sm">
                  Enter a prompt to see AI response and metrics
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Metrics Row */}
        <div className="flex items-center justify-center gap-8 mb-8">
          <div className="glass-card px-6 py-3 rounded-full flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <span className="text-sm text-muted-foreground">CO2</span>
            <span className="font-bold text-foreground ml-2">{co2} gm</span>
            <span className={`text-xs ml-2 ${ecoMode ? 'text-eco-green' : 'text-energy-red'}`}>
              {ecoMode ? '-30%' : '+11.6%'}
            </span>
          </div>

          <div className="glass-card px-6 py-3 rounded-full flex items-center gap-3">
            <span className="font-bold text-foreground">{tokens} Tokens used</span>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${ecoMode ? 'bg-eco-green' : 'bg-muted-foreground'}`} />
              <span className="text-xs text-muted-foreground">eco · off-line</span>
            </div>
          </div>
        </div>

        {/* Prompt Input */}
        <div className="max-w-2xl mx-auto mb-8">
          <PromptInput onSubmit={handlePrompt} />
        </div>

        {/* Download Report */}
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
