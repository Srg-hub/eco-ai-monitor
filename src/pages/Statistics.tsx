import { Layout } from '@/components/Layout';
import { MetricCard } from '@/components/MetricCard';
import { useEco } from '@/contexts/EcoContext';
import { useHistory } from '@/contexts/HistoryContext';
import { BarChart3 } from 'lucide-react';

export default function Statistics() {
  const { ecoMode } = useEco();
  const { history } = useHistory();

  // Calculate totals from actual history
  const totalCo2 = history.reduce((sum, item) => sum + item.co2, 0);
  const totalTokens = history.reduce((sum, item) => sum + item.tokens, 0);
  const promptCount = history.length;

  // Estimate energy based on tokens (rough estimate: 0.003 KWh per token)
  const totalEnergy = totalTokens * 0.003;

  // Apply eco mode reduction for display
  const displayCo2 = ecoMode ? totalCo2 * 0.7 : totalCo2;
  const displayTokens = ecoMode ? Math.round(totalTokens * 0.7) : totalTokens;
  const displayEnergy = ecoMode ? totalEnergy * 0.7 : totalEnergy;

  const hasData = history.length > 0;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard
            value={`${displayCo2.toFixed(2)} gms`}
            label="co2 emitted till now"
            icon={<span className="text-3xl">CO₂</span>}
            gradient="teal"
          />
          <MetricCard
            value={`${displayTokens} tokens`}
            label="used till now"
            icon={<span className="text-3xl">⚙️</span>}
            gradient="blue"
          />
          <MetricCard
            value={`${displayEnergy.toFixed(2)} KWh`}
            label="energy consumed till now"
            icon={<span className="text-3xl">⚡</span>}
            gradient="red"
          />
        </div>

        {hasData ? (
          <>
            {/* Prompt count */}
            <div className="glass-card p-6 mb-6">
              <div className="text-muted-foreground text-sm mb-4">{promptCount} prompts</div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {promptCount > 0 ? (displayEnergy / promptCount).toFixed(2) : '0.00'} KWh per prompt
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {promptCount > 0 ? (displayCo2 / promptCount).toFixed(2) : '0.00'} gm per prompt
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {promptCount > 0 ? (displayTokens / promptCount).toFixed(0) : '0'} tokens per prompt
                  </span>
                </div>
              </div>
            </div>

            {ecoMode && (
              <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm text-foreground font-medium">Eco mode savings</span>
                  <span className="text-xs text-muted-foreground">🌱</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-eco-green">{(totalEnergy * 0.3).toFixed(2)} KWh</span>
                    <span className="text-muted-foreground">energy conserved</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-eco-green">{(totalCo2 * 0.3).toFixed(2)} gm</span>
                    <span className="text-muted-foreground">CO2 less</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-eco-green">{Math.round(totalTokens * 0.3)}</span>
                    <span className="text-muted-foreground">tokens saved</span>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="glass-card p-12 text-center">
            <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No usage data yet</p>
            <p className="text-sm text-muted-foreground mt-2">Start chatting to see your statistics</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
