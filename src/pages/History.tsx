import { Layout } from '@/components/Layout';
import { Clock, FileText, Trash2 } from 'lucide-react';
import { useHistory } from '@/contexts/HistoryContext';

export default function History() {
  const { history, deleteFromHistory } = useHistory();

  return (
    <Layout showEcoToggle={false}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-display font-bold text-foreground mb-8">Prompt History</h1>

        <div className="space-y-3">
          {history.map((item, index) => (
            <div 
              key={item.id}
              className="glass-card-hover p-4 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="font-medium text-foreground">{item.prompt}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.timestamp}
                    </span>
                    <span>{item.model}</span>
                    <span>{item.tokens} tokens</span>
                    <span>{item.co2} gm CO₂</span>
                  </div>
                </div>
                <button 
                  onClick={() => deleteFromHistory(item.id)}
                  className="p-2 hover:bg-destructive/20 rounded-lg transition-colors group"
                >
                  <Trash2 className="w-4 h-4 text-muted-foreground group-hover:text-destructive" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {history.length === 0 && (
          <div className="glass-card p-12 text-center">
            <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No prompt history yet</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
