import React from 'react';

const Navigation = ({ activeMain, setActiveMain, activeSub, setActiveSub }) => {
    const menuItems = [
        { name: 'Dashboard', icon: <i className="fas fa-tachometer-alt w-6"></i> },
        { name: 'Schedule', icon: <i className="fas fa-calendar-alt w-6"></i> },
        { name: 'Patient Charts', icon: <i className="fas fa-file-medical w-6"></i> },
        { name: 'Inbox', icon: <i className="fas fa-inbox w-6"></i> },
        { name: 'Reports', icon: <i className="fas fa-chart-bar w-6"></i> }
    ];
    const subMenuItems = ['Summary', 'Encounters', 'Medications', 'Labs'];
    
    return (
        <div className="w-64 h-screen bg-gray-800 text-white fixed flex flex-col">
            <div className="p-4 text-xl font-bold border-b border-gray-700">
                <i className="fas fa-clinic-medical mr-2"></i> EHR System
            </div>
            <nav className="flex-1 mt-4">
                {menuItems.map(item => (
                    <div 
                        key={item.name} 
                        onClick={() => { 
                            setActiveMain(item.name); 
                            if (item.name === 'Patient Charts') setActiveSub('Summary'); 
                            else setActiveSub(null); 
                        }} 
                        className={`flex items-center p-4 cursor-pointer hover:bg-gray-700 transition-colors duration-200 ${activeMain === item.name ? 'bg-blue-600 text-white' : 'text-gray-300'}`}
                    >
                        {item.icon}<span className="ml-3">{item.name}</span>
                    </div>
                ))}
                {activeMain === 'Patient Charts' && (
                    <div className="pl-8 mt-2">
                        {subMenuItems.map(sub => (
                            <div 
                                key={sub} 
                                onClick={() => setActiveSub(sub)} 
                                className={`p-2 text-sm cursor-pointer hover:bg-gray-700 ${activeSub === sub ? 'font-bold text-white' : 'text-gray-400'}`}
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