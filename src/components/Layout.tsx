import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { EcoToggle } from './EcoToggle';

interface LayoutProps {
  children: ReactNode;
  showEcoToggle?: boolean;
}

export function Layout({ children, showEcoToggle = true }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="ml-48 min-h-screen relative">
        {showEcoToggle && (
          <div className="absolute top-4 right-4 left-0 flex justify-center z-40">
            <EcoToggle />
          </div>
        )}
        <div className="pt-20 px-6 pb-6">
          {children}
        </div>
      </main>
    </div>
  );
}
