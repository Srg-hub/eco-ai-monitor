import { useState } from 'react';
import { Download } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { ModelSelector } from '@/components/ModelSelector';
import { Co2Visualization } from '@/components/Co2Visualization';
import { EnergyVisualization } from '@/components/EnergyVisualization';
import { PromptInput } from '@/components/PromptInput';
import { ResponseDisplay } from '@/components/ResponseDisplay';
import { useEco } from '@/contexts/EcoContext';
import { useModelContext } from '@/contexts/ModelContext';

export default function Index() {
  const { ecoMode } = useEco();
  const { selectedModel } = useModelContext();
  const [hasPrompted, setHasPrompted] = useState(false);
  const [response, setResponse] = useState('');
  
  const baseTokens = 35;
  const tokens = ecoMode ? Math.round(baseTokens * 0.7) : baseTokens;

  const handlePrompt = (prompt: string) => {
    setHasPrompted(true);
    setResponse(
      "Artificial intelligence (AI) is the capability of computational systems to perform tasks typically associated with human intelligence, such as learning, reasoning, problem-solving, perception, and decision-making. It is a field of research in computer science that develops and studies methods and software that enable machines."
    );
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Header with Model Selector */}
        <div className="flex items-center justify-between mb-8">
          <ModelSelector />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* CO2 Visualization */}
          <Co2Visualization value={4.9} avg={4.5} frameNumber={3} />

          {/* Response Area */}
          <div className="lg:col-span-1">
            {hasPrompted ? (
              <ResponseDisplay text={response} />
            ) : (
              <div className="glass-card p-6 h-full flex items-center justify-center">
                <p className="text-muted-foreground text-center text-sm">
                  Enter a prompt to see AI response and metrics
                </p>
              </div>
            )}
          </div>

          {/* Energy Visualization */}
          <EnergyVisualization value={0.78} avg={0.69} frameNumber={4} />
        </div>

        {/* Metrics Row */}
        <div className="flex items-center justify-center gap-8 mb-8">
          <div className="glass-card px-6 py-3 rounded-full flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <span className="text-sm text-muted-foreground">CO2</span>
            <span className="font-bold text-foreground ml-2">{ecoMode ? '2.2' : '3.1'} gm</span>
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
