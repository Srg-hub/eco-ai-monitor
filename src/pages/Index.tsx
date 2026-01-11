import { useState } from 'react';
import { Download, Loader2, AlertCircle } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { ModelSelector } from '@/components/ModelSelector';
import { PromptInput } from '@/components/PromptInput';
import { ResponseDisplay } from '@/components/ResponseDisplay';
import { useEco } from '@/contexts/EcoContext';
import { useModelContext } from '@/contexts/ModelContext';
import { useHistory, EcoImpacts } from '@/contexts/HistoryContext';
import { useEcoChat } from '@/hooks/useEcoChat';

export default function Index() {
  const { ecoMode } = useEco();
  const { selectedModel } = useModelContext();
  const { addToHistory } = useHistory();
  const { sendPrompt, isLoading, error } = useEcoChat();
  
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [impacts, setImpacts] = useState<EcoImpacts | null>(null);

  const handlePrompt = async (prompt: string) => {
    // If there's already a response, save it to history first
    if (response && currentPrompt) {
      addToHistory({
        prompt: currentPrompt,
        response: response,
        model: selectedModel?.name || 'Gemini',
        tokens: 0,
        co2: impacts?.co2.value || 0,
        impacts: impacts || undefined,
      });
    }

    setCurrentPrompt(prompt);
    setResponse('');
    setImpacts(null);

    const result = await sendPrompt(prompt);
    
    if (result) {
      setResponse(result.response);
      setImpacts(result.impacts);
    }
  };

  const displayCo2 = impacts?.co2.value ?? 0;
  const displayEnergy = impacts?.energy.value ?? 0;

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
            {error && (
              <div className="glass-card p-4 border-l-2 border-destructive mb-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-destructive">Connection Error</p>
                  <p className="text-sm text-muted-foreground">{error}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Make sure your Python server is running and accessible.
                  </p>
                </div>
              </div>
            )}
            
            {isLoading ? (
              <div className="glass-card p-6 flex items-center justify-center min-h-[120px]">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                <span className="ml-3 text-muted-foreground">Generating response...</span>
              </div>
            ) : response ? (
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
                  Enter a prompt to see AI response and real EcoLogits metrics
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Metrics Row */}
        <div className="flex items-center justify-center gap-8 mb-8 flex-wrap">
          <div className="glass-card px-6 py-3 rounded-full flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <span className="text-sm text-muted-foreground">CO₂</span>
            <span className="font-bold text-foreground ml-2">
              {displayCo2.toFixed(4)} {impacts?.co2.unit || 'kgCO2eq'}
            </span>
          </div>

          <div className="glass-card px-6 py-3 rounded-full flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span className="text-sm text-muted-foreground">Energy</span>
            <span className="font-bold text-foreground ml-2">
              {displayEnergy.toFixed(4)} {impacts?.energy.unit || 'kWh'}
            </span>
          </div>

          <div className="glass-card px-6 py-3 rounded-full flex items-center gap-2">
            <span className="text-2xl">💧</span>
            <span className="text-sm text-muted-foreground">Water</span>
            <span className="font-bold text-foreground ml-2">
              {(impacts?.water.value ?? 0).toFixed(4)} {impacts?.water.unit || 'L'}
            </span>
          </div>

          <div className="glass-card px-6 py-3 rounded-full flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${ecoMode ? 'bg-eco-green' : 'bg-muted-foreground'}`} />
            <span className="text-xs text-muted-foreground">eco · {ecoMode ? 'on' : 'off'}</span>
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
