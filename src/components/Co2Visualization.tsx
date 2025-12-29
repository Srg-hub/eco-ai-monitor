import { useEco } from '@/contexts/EcoContext';

interface Co2VisualizationProps {
  value: number;
  avg: number;
  frameNumber: number;
}

export function Co2Visualization({ value, avg, frameNumber }: Co2VisualizationProps) {
  const { ecoMode } = useEco();
  const displayValue = ecoMode ? value * 0.7 : value;
  
  return (
    <div className="glass-card p-4 relative overflow-hidden animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground">{displayValue.toFixed(2)} gm</span>
        <span className="text-xs text-muted-foreground">— avg —</span>
      </div>
      <div className="text-xs text-muted-foreground mb-3">Frame {frameNumber}</div>
      
      <div className="relative h-32 rounded-lg overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, hsl(200 60% 50%) 0%, hsl(173 80% 45%) 30%, hsl(142 70% 50%) 50%, hsl(60 80% 50%) 70%, hsl(30 80% 50%) 100%)',
            opacity: 0.9,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <div className="w-6 h-6 text-foreground">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="M12 6v12M6 12h12" />
            </svg>
          </div>
          <span className="text-xs font-medium text-foreground">CO2</span>
        </div>
      </div>
      
      <div className="mt-3 flex items-center gap-2">
        <span className="text-lg font-bold font-display text-foreground">{displayValue.toFixed(1)} gm</span>
        <span className={`text-xs ${ecoMode ? 'text-eco-green' : 'text-energy-red'}`}>
          {ecoMode ? '-30%' : '+11.6%'}
        </span>
      </div>
    </div>
  );
}
