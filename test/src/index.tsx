import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const AppWithNHSInit: React.FC = () => {
  useEffect(() => {
    // Initialize NHS.UK components after React has rendered and DOM is ready
    const initializeNHS = () => {
      // The NHS.UK JavaScript is loaded via script tag and initializes automatically
      // but we can manually trigger initialization for dynamically added content
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);
    };

    // Small delay to ensure all React components are mounted
    const timer = setTimeout(initializeNHS, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return <App />;
};

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <AppWithNHSInit />
  </React.StrictMode>
);