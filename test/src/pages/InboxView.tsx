import React, { useState } from 'react';

const InboxView = () => {
    const [activeTab, setActiveTab] = useState('All Results');
    
    const initialItems = [
        { 
            id: 1, 
            type: 'Lab Result', 
            patient: 'John Smith', 
            subject: 'Troponin I - 2.1 ng/mL', 
            isUrgent: true, 
            isCritical: true,
            date: '01/25/2025 2:30 PM', 
            content: { 
                'Troponin I': { value: '2.1 ng/mL', range: '≤ 0.04 ng/mL', isAbnormal: true, flag: 'CRITICAL HIGH' } 
            } 
        },
        { 
            id: 2, 
            type: 'Lab Result', 
            patient: 'Maria Garcia', 
            subject: 'HbA1c - 9.2%', 
            isUrgent: false, 
            isCritical: false,
            date: '01/25/2025 8:00 AM', 
            content: { 
                'HbA1c': { value: '9.2%', range: '<7.0%', isAbnormal: true, flag: 'HIGH' } 
            } 
        },
        { 
            id: 3, 
            type: 'Lab Result', 
            patient: 'Sarah Johnson', 
            subject: 'Complete Blood Count', 
            isUrgent: false, 
            isCritical: false,
            date: '01/24/2025 10:15 AM', 
            content: 'CBC results within normal limits.' 
        },
        { 
            id: 4, 
            type: 'Imaging', 
            patient: 'Emma Williams', 
            subject: 'Chest X-Ray', 
            isUrgent: false, 
            isCritical: false,
            date: '01/23/2025 3:00 PM', 
            content: 'No acute cardiopulmonary process identified.' 
        }
    ];

    const [inboxItems, setInboxItems] = useState(initialItems);
    const [selectedItem, setSelectedItem] = useState(initialItems[0]);

    const handleAcknowledge = (id: number) => {
        setInboxItems(inboxItems.filter(item => item.id !== id));
        const remainingItems = inboxItems.filter(item => item.id !== id);
        setSelectedItem(remainingItems[0] || null);
    };

    const tabs = [
        { name: 'All Results', count: 12 },
        { name: 'Critical', count: 2 },
        { name: 'Labs', count: 8 },
        { name: 'Imaging', count: 2 },
        { name: 'Pathology', count: 0 }
    ];

    const filteredItems = inboxItems.filter(item => {
        if (activeTab === 'All Results') return true;
        if (activeTab === 'Critical') return item.isCritical;
        if (activeTab === 'Labs') return item.type === 'Lab Result';
        if (activeTab === 'Imaging') return item.type === 'Imaging';
        if (activeTab === 'Pathology') return item.type === 'Pathology';
        return true;
    });

    return (
        <div className="p-6">
            {/* Tabs */}
            <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
                {tabs.map(tab => (
                    <button 
                        key={tab.name}
                        onClick={() => setActiveTab(tab.name)}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                            activeTab === tab.name 
                                ? 'bg-white text-blue-600 shadow-sm' 
                                : 'text-gray-600 hover:text-gray-800'
                        }`}
                    >
                        {tab.name} ({tab.count})
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-3 gap-6 h-[600px]">
                {/* Results List */}
                <div className="bg-white rounded-lg shadow-lg border overflow-hidden">
                    <div className="px-4 py-3 bg-gray-50 border-b">
                        <h3 className="font-semibold text-gray-800">Results</h3>
                    </div>
                    <div className="overflow-y-auto h-full">
                        {filteredItems.map(item => (
                            <div
                                key={item.id}
                                onClick={() => setSelectedItem(item)}
                                className={`p-4 border-b cursor-pointer transition-colors ${
                                    selectedItem && selectedItem.id === item.id 
                                        ? 'bg-blue-100 border-l-4 border-l-blue-500' 
                                        : 'hover:bg-gray-50'
                                } ${item.isCritical ? 'bg-red-50 border-l-4 border-l-red-500' : ''}`}
                            >
                                <div className="space-y-1">
                                    {item.isCritical && (
                                        <div className="text-xs font-bold text-red-600 flex items-center">
                                            🚨 CRITICAL
                                        </div>
                                    )}
                                    <div className="font-semibold text-gray-800">{item.patient}</div>
                                    <div className="text-sm text-gray-600">{item.subject}</div>
                                    <div className="text-xs text-gray-500">Collected: {item.date}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Result Detail */}
                <div className="col-span-2 bg-white rounded-lg shadow-lg border">
                    {selectedItem ? (
                        <div className="h-full flex flex-col">
                            <div className="px-6 py-4 border-b">
                                {selectedItem.isCritical && (
                                    <div className="text-lg font-bold text-red-600 mb-2">🚨 CRITICAL RESULT</div>
                                )}
                                <h3 className="text-xl font-semibold text-gray-800">{selectedItem.subject}</h3>
                                <div className="text-sm text-gray-600 space-y-1 mt-2">
                                    <div><strong>Patient:</strong> {selectedItem.patient} (DOB: 05/12/1965)</div>
                                    <div><strong>Test:</strong> {selectedItem.subject.split(' - ')[0]}</div>
                                    <div><strong>Collected:</strong> {selectedItem.date}</div>
                                    <div><strong>Resulted:</strong> {selectedItem.date}</div>
                                </div>
                            </div>
                            
                            <div className="flex-1 p-6">
                                {selectedItem.type === 'Lab Result' && typeof selectedItem.content === 'object' ? (
                                    <div>
                                        <table className="w-full border-collapse border border-gray-300">
                                            <thead>
                                                <tr className="bg-gray-50">
                                                    <th className="border border-gray-300 px-4 py-2 text-left">Test</th>
                                                    <th className="border border-gray-300 px-4 py-2 text-left">Result</th>
                                                    <th className="border border-gray-300 px-4 py-2 text-left">Reference Range</th>
                                                    <th className="border border-gray-300 px-4 py-2 text-left">Flag</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Object.entries(selectedItem.content).map(([test, data]) => (
                                                    <tr key={test}>
                                                        <td className="border border-gray-300 px-4 py-2">{test}</td>
                                                        <td className={`border border-gray-300 px-4 py-2 font-semibold ${data.isAbnormal ? 'text-red-600' : ''}`}>
                                                            {data.value}
                                                        </td>
                                                        <td className="border border-gray-300 px-4 py-2">{data.range}</td>
                                                        <td className={`border border-gray-300 px-4 py-2 font-semibold ${data.isAbnormal ? 'text-red-600' : ''}`}>
                                                            {data.flag || 'Normal'}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        
                                        {selectedItem.isCritical && (
                                            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                                                <strong>📞 Critical Value Called:</strong> Dr. Reed notified at 4:20 PM
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-gray-700">{typeof selectedItem.content === 'string' ? selectedItem.content : JSON.stringify(selectedItem.content)}</div>
                                )}
                            </div>
                            
                            <div className="px-6 py-4 border-t bg-gray-50">
                                <div className="flex justify-between space-x-3">
                                    <div className="flex space-x-3">
                                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                            📞 Call Patient
                                        </button>
                                        {selectedItem.isCritical && (
                                            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                                🏥 Admit to Hospital
                                            </button>
                                        )}
                                        <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                            📝 Add Note
                                        </button>
                                    </div>
                                    <button 
                                        onClick={() => handleAcknowledge(selectedItem.id)} 
                                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                                    >
                                        ✅ Acknowledge
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-500">
                            <p>Select a result to view details</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InboxView;