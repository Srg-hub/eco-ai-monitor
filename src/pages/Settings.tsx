import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useModelContext } from '@/contexts/ModelContext';
import { Plus, Trash2, Eye, EyeOff, Save } from 'lucide-react';
import { toast } from 'sonner';

const iconOptions = ['⚡', '🔮', '✨', '⭐', '🤖', '🧠', '💡', '🚀'];
const colorOptions = ['#10B981', '#8B5CF6', '#EC4899', '#3B82F6', '#F59E0B', '#EF4444', '#06B6D4', '#84CC16'];

export default function Settings() {
  const { models, addModel, updateModel, deleteModel } = useModelContext();
  const [showApiKeys, setShowApiKeys] = useState<Record<string, boolean>>({});
  const [newModel, setNewModel] = useState({
    name: '',
    apiKey: '',
    icon: '🤖',
    color: '#10B981',
  });
  const [isAdding, setIsAdding] = useState(false);

  const handleAddModel = () => {
    if (!newModel.name.trim()) {
      toast.error('Please enter a model name');
      return;
    }
    if (!newModel.apiKey.trim()) {
      toast.error('Please enter an API key');
      return;
    }

    addModel(newModel);
    setNewModel({ name: '', apiKey: '', icon: '🤖', color: '#10B981' });
    setIsAdding(false);
    toast.success('Model added successfully');
  };

  const handleUpdateApiKey = (id: string, apiKey: string) => {
    updateModel(id, { apiKey });
    toast.success('API key updated');
  };

  const handleDeleteModel = (id: string) => {
    deleteModel(id);
    toast.success('Model deleted');
  };

  const toggleShowApiKey = (id: string) => {
    setShowApiKeys(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Layout showEcoToggle={false}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-display font-bold text-foreground">AI Model Settings</h1>
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Model
          </button>
        </div>

        {/* Add New Model Form */}
        {isAdding && (
          <div className="glass-card p-6 mb-6 animate-fade-in">
            <h3 className="text-lg font-display font-semibold text-foreground mb-4">Add New AI Model</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Model Name</label>
                <input
                  type="text"
                  value={newModel.name}
                  onChange={(e) => setNewModel(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., GPT-4 Turbo"
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">API Key</label>
                <input
                  type="password"
                  value={newModel.apiKey}
                  onChange={(e) => setNewModel(prev => ({ ...prev, apiKey: e.target.value }))}
                  placeholder="sk-..."
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">Icon</label>
                <div className="flex gap-2">
                  {iconOptions.map((icon) => (
                    <button
                      key={icon}
                      onClick={() => setNewModel(prev => ({ ...prev, icon }))}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all ${
                        newModel.icon === icon 
                          ? 'bg-primary/20 ring-2 ring-primary' 
                          : 'bg-secondary hover:bg-secondary/80'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">Color</label>
                <div className="flex gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => setNewModel(prev => ({ ...prev, color }))}
                      className={`w-8 h-8 rounded-full transition-all ${
                        newModel.color === color 
                          ? 'ring-2 ring-offset-2 ring-offset-background ring-primary' 
                          : ''
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleAddModel}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save Model
                </button>
                <button
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Existing Models */}
        <div className="space-y-4">
          {models.map((model, index) => (
            <div 
              key={model.id}
              className="glass-card p-5 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${model.color}20` }}
                  >
                    {model.icon || '🤖'}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{model.name}</h3>
                    <p className="text-xs text-muted-foreground">ID: {model.id}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteModel(model.id)}
                  className="p-2 hover:bg-destructive/20 rounded-lg transition-colors group"
                >
                  <Trash2 className="w-4 h-4 text-muted-foreground group-hover:text-destructive" />
                </button>
              </div>

              <div className="mt-4">
                <label className="block text-sm text-muted-foreground mb-2">API Key</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type={showApiKeys[model.id] ? 'text' : 'password'}
                      value={model.apiKey}
                      onChange={(e) => handleUpdateApiKey(model.id, e.target.value)}
                      placeholder="Enter API key"
                      className="w-full bg-secondary border border-border rounded-lg px-4 py-2 pr-10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <button
                      onClick={() => toggleShowApiKey(model.id)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showApiKeys[model.id] ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {models.length === 0 && !isAdding && (
          <div className="glass-card p-12 text-center">
            <div className="text-4xl mb-4">🤖</div>
            <p className="text-muted-foreground mb-4">No AI models configured yet</p>
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors mx-auto"
            >
              <Plus className="w-4 h-4" />
              Add Your First Model
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
