import { Switch } from '@/components/ui/switch';
import { useEco } from '@/contexts/EcoContext';

export function EcoToggle() {
  const { ecoMode, setEcoMode } = useEco();

  return (
    <div className="flex items-center gap-3 glass-card px-4 py-2 rounded-full">
      <span className="text-sm font-medium text-foreground">ECO</span>
      <Switch
        checked={ecoMode}
        onCheckedChange={setEcoMode}
        className="eco-toggle data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-eco-green data-[state=checked]:to-primary"
      />
    </div>
  );
}
