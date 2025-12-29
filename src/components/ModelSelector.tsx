import { ChevronDown, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useModelContext } from '@/contexts/ModelContext';

export function ModelSelector() {
  const { models, selectedModel, selectModel } = useModelContext();

  if (!selectedModel) {
    return (
      <div className="glass-card px-4 py-2 rounded-full text-muted-foreground text-sm">
        No models added
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 glass-card-hover px-4 py-2 rounded-full text-foreground hover:bg-secondary/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50">
          <span className="text-lg">{selectedModel.icon || '🤖'}</span>
          <span className="font-medium text-sm">{selectedModel.name}</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="start" 
        className="w-56 bg-popover border border-border/50 backdrop-blur-xl rounded-xl p-1 shadow-xl z-[100]"
      >
        {models.map((model) => (
          <DropdownMenuItem
            key={model.id}
            onClick={() => selectModel(model.id)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors focus:bg-secondary/50"
          >
            <span className="text-lg">{model.icon || '🤖'}</span>
            <span className="flex-1 font-medium text-sm">{model.name}</span>
            {selectedModel.id === model.id && (
              <Check className="w-4 h-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
