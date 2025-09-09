import { useState } from 'react';
import { Albums } from './Albums';
import { Posts } from './Posts';
import { Todos } from './Todos';
import { Admin } from './Admin';
import { BottomNavigation } from '@/components/Navigation/BottomNavigation';

const Index = () => {
  const [activeTab, setActiveTab] = useState('albums');

  const renderContent = () => {
    switch (activeTab) {
      case 'albums':
        return <Albums />;
      case 'posts':
        return <Posts />;
      case 'todos':
        return <Todos />;
      case 'admin':
        return <Admin />;
      default:
        return <Albums />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderContent()}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
