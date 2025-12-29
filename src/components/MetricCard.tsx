import { ReactNode } from 'react';

interface MetricCardProps {
  value: string;
  label: string;
  icon: ReactNode;
  gradient: 'teal' | 'blue' | 'red' | 'green';
  change?: string;
  changeType?: 'positive' | 'negative';
}

const gradientClasses = {
  teal: 'from-co2-teal/20 to-primary/10 border-co2-teal/30',
  blue: 'from-token-blue/20 to-accent/10 border-token-blue/30',
  red: 'from-energy-red/20 to-destructive/10 border-energy-red/30',
  green: 'from-eco-green/20 to-primary/10 border-eco-green/30',
};

const glowClasses = {
  teal: 'glow-teal',
  blue: '',
  red: 'glow-red',
  green: 'glow-green',
};

export function MetricCard({ value, label, icon, gradient, change, changeType }: MetricCardProps) {
  return (
    <div className={`metric-card bg-gradient-to-br ${gradientClasses[gradient]} ${glowClasses[gradient]} animate-fade-in`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-2xl font-bold font-display text-foreground">{value}</div>
          <div className="text-sm text-muted-foreground mt-1">{label}</div>
          {change && (
            <div className={`text-xs mt-2 ${changeType === 'positive' ? 'text-eco-green' : 'text-energy-red'}`}>
              {change}
            </div>
          )}
        </div>
        <div className="text-2xl opacity-80">{icon}</div>
      </div>
    </div>
  );
}
