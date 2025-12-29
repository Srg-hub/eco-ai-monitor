import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, BarChart3, History, Settings, GitCompare, Leaf } from 'lucide-react';

const navItems = [
  { path: '/', label: 'new chat', icon: MessageSquare },
  { path: '/compare', label: 'compare', icon: GitCompare },
  { path: '/statistics', label: 'statistics', icon: BarChart3 },
  { path: '/history', label: 'history', icon: History },
  { path: '/settings', label: 'settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-full w-48 bg-sidebar border-r border-sidebar-border flex flex-col z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-eco-green to-primary flex items-center justify-center glow-green">
          <Leaf className="w-5 h-5 text-primary-foreground" />
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${isActive ? 'active' : ''}`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <button className="sidebar-link w-full text-muted-foreground hover:text-foreground">
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}
