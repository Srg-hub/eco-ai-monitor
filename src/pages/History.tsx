import { Layout } from '@/components/Layout';
import { Clock, FileText, Trash2 } from 'lucide-react';

const mockHistory = [
  { id: '1', prompt: 'What is artificial intelligence?', model: 'OpenAI 4.0', tokens: 35, co2: 3.1, timestamp: '2 hours ago' },
  { id: '2', prompt: 'Explain machine learning basics', model: 'Claude 6', tokens: 42, co2: 2.8, timestamp: '5 hours ago' },
  { id: '3', prompt: 'Compare deep learning frameworks', model: 'Gemini 2.5', tokens: 58, co2: 4.2, timestamp: '1 day ago' },
  { id: '4', prompt: 'Write a Python function for sorting', model: 'Perplexity 0.1.2', tokens: 28, co2: 2.1, timestamp: '2 days ago' },
  { id: '5', prompt: 'Explain neural networks', model: 'OpenAI 4.0', tokens: 45, co2: 3.5, timestamp: '3 days ago' },
];

export default function History() {
  return (
    <Layout showEcoToggle={false}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-display font-bold text-foreground mb-8">Prompt History</h1>

        <div className="space-y-3">
          {mockHistory.map((item, index) => (
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
                <button className="p-2 hover:bg-destructive/20 rounded-lg transition-colors group">
                  <Trash2 className="w-4 h-4 text-muted-foreground group-hover:text-destructive" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {mockHistory.length === 0 && (
          <div className="glass-card p-12 text-center">
            <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No prompt history yet</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
