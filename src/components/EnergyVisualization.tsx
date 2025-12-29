import { useEco } from '@/contexts/EcoContext';

interface EnergyVisualizationProps {
  value: number;
  avg: number;
  frameNumber: number;
}

export function EnergyVisualization({ value, avg, frameNumber }: EnergyVisualizationProps) {
  const { ecoMode } = useEco();
  const displayValue = ecoMode ? value * 0.75 : value;
  
  return (
    <div className="glass-card p-4 relative overflow-hidden animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground">Frame {frameNumber}</span>
      </div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-muted-foreground">— avg —</span>
        <span className="text-xs text-muted-foreground">{displayValue.toFixed(2)} KWh</span>
      </div>
      
      <div className="relative h-32 rounded-lg overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, hsl(0 0% 20%) 0%, hsl(0 60% 30%) 30%, hsl(0 70% 45%) 60%, hsl(20 80% 50%) 100%)',
            opacity: 0.9,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        
        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <div className="w-6 h-6 text-foreground">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <span className="text-xs font-medium text-foreground">Energy</span>
        </div>
      </div>
      
      <div className="mt-3 flex items-center justify-end gap-2">
        <span className="text-lg font-bold font-display text-foreground">{displayValue.toFixed(2)} KWh</span>
      </div>
    </div>
  );
}
