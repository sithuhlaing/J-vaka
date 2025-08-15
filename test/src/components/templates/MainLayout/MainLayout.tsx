import React from 'react';
import Header from '../../organisms/Header';

export interface MainLayoutProps {
  children: React.ReactNode;
  headerProps?: {
    serviceName?: string;
    showSearch?: boolean;
    showNavigation?: boolean;
    navigationItems?: Array<{
      href: string;
      label: string;
      active?: boolean;
    }>;
    accountText?: string;
  };
  className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  headerProps = {},
  className = '',
}) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`.trim()}>
      <Header {...headerProps} />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;