import React from 'react';

interface NavigationProps {
    activeMain: string;
    setActiveMain: (main: string) => void;
    activeSub: string | null;
    setActiveSub: (sub: string | null) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeMain, setActiveMain, activeSub, setActiveSub }) => {
    const menuItems = [
        { name: 'Dashboard', icon: '🏠', emoji: true },
        { name: 'Schedule', icon: '📅', emoji: true },
        { name: 'Patient Charts', icon: '📋', emoji: true },
        { name: 'Inbox', icon: '📥', emoji: true },
        { name: 'Reports', icon: '📊', emoji: true },
        { name: 'Billing', icon: '💰', emoji: true }
    ];
    const subMenuItems = ['Summary', 'Encounters', 'Medications', 'Labs', 'Orders'];
    
    return (
        <div className="w-64 bg-gray-200 border-r border-gray-300 flex flex-col">
            <nav className="flex-1">
                {menuItems.map(item => (
                    <div 
                        key={item.name} 
                        onClick={() => { 
                            setActiveMain(item.name); 
                            if (item.name === 'Patient Charts') setActiveSub('Summary'); 
                            else setActiveSub(null); 
                        }} 
                        className={`flex items-center px-6 py-4 cursor-pointer border-b border-gray-300 transition-colors duration-200 ${
                            activeMain === item.name ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        <span className="mr-3 text-lg">{item.icon}</span>
                        <span className="font-medium">{item.name}</span>
                    </div>
                ))}
                {activeMain === 'Patient Charts' && (
                    <div className="bg-gray-100">
                        {subMenuItems.map(sub => (
                            <div 
                                key={sub} 
                                onClick={() => setActiveSub(sub)} 
                                className={`px-12 py-3 text-sm cursor-pointer transition-colors ${
                                    activeSub === sub ? 'bg-blue-400 text-white font-semibold' : 'text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {sub}
                            </div>
                        ))}
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navigation;