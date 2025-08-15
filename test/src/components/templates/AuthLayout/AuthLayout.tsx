import React from 'react';
import Header from '../../organisms/Header';

export interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`min-h-screen bg-nhsuk-grey-5 ${className}`.trim()}>
      <Header 
        showSearch={false}
        showNavigation={false}
      />
      <main className="nhsuk-width-container nhsuk-main-wrapper" id="main-content" role="main">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;