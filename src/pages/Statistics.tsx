import { Layout } from '@/components/Layout';
import { MetricCard } from '@/components/MetricCard';
import { useEco } from '@/contexts/EcoContext';
import { useModelContext } from '@/contexts/ModelContext';
import { Settings } from 'lucide-react';

const mockStats = [
  { id: 'openai-4', name: 'chatGPT 4.0', tokens: 536, co2: 17.33, energy: 1.2, best: true, icon: '⚡' },
  { id: 'perplexity', name: 'perplexity 0.1.2', tokens: 196, co2: 19.78, energy: 0.75, best: false, icon: '🔮' },
  { id: 'claude', name: 'Claude 6', tokens: 322, co2: 23.48, energy: 0.98, best: false, icon: '✨' },
  { id: 'gemini', name: 'Gemini 2.5', tokens: 450, co2: 41.54, energy: 1.1, best: false, icon: '⭐' },
];

export default function Statistics() {
  const { ecoMode } = useEco();
  
  const totalCo2 = ecoMode ? 71.49 : 102.13;
  const totalTokens = ecoMode ? 1053 : 1504;
  const totalEnergy = ecoMode ? 2.89 : 4.13;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard
            value={`${totalCo2.toFixed(2)} gms`}
            label="co2 emitted till now"
            icon={<span className="text-3xl">CO₂</span>}
            gradient="teal"
          />
          <MetricCard
            value={`${totalTokens} tokens`}
            label="used till now"
            icon={<span className="text-3xl">⚙️</span>}
            gradient="blue"
          />
          <MetricCard
            value={`${totalEnergy.toFixed(2)} KWh`}
            label="energy consumed till now"
            icon={<span className="text-3xl">⚡</span>}
            gradient="red"
          />
        </div>

        {/* Sort By */}
        <div className="flex items-center gap-2 mb-4 text-muted-foreground">
          <span className="text-sm">sort by :</span>
          <span className="text-sm text-foreground">efficiency (H to L)</span>
        </div>

        {/* Model Stats List */}
        <div className="space-y-3 mb-8">
          {mockStats.map((stat, index) => (
            <div 
              key={stat.id} 
              className="stat-row animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{stat.icon}</span>
                <span className="font-medium text-foreground w-40">{stat.name}</span>
                <span className="text-muted-foreground text-sm w-24">{stat.tokens} tokens</span>
                <span className="text-muted-foreground text-sm w-28">{stat.co2.toFixed(2)} gms CO2</span>
                <span className="text-muted-foreground text-sm w-28">{stat.energy.toFixed(2)} KWh energy</span>
                {stat.best && (
                  <span className="model-badge bg-eco-green/20 text-eco-green border border-eco-green/30">
                    best
                  </span>
                )}
              </div>
              <button className="p-2 hover:bg-secondary/50 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <div className="text-muted-foreground text-sm mb-4">62 prompts</div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">0.64 KWh per prompt</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-energy-red to-destructive" style={{ width: '20%' }} />
                  </div>
                  <span className="text-xs text-energy-red">20.3% less efficient than best</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">1.33 gm per prompt</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-eco-green to-primary" style={{ width: '3.6%' }} />
                  </div>
                  <span className="text-xs text-eco-green">3.6% more efficient than best</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">6.08 tokens per prompt</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-eco-green to-primary" style={{ width: '1.68%' }} />
                  </div>
                  <span className="text-xs text-eco-green">1.68% more efficient than best</span>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-foreground font-medium">Eco mode</span>
              <span className="text-xs text-muted-foreground">🌱</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-eco-green">0.73 KWh</span>
                <span className="text-muted-foreground">energy conserved</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-eco-green">30.12 gm</span>
                <span className="text-muted-foreground">CO2 less</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-eco-green">386</span>
                <span className="text-muted-foreground">tokens saved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
