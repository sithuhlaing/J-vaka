import React, { useState } from 'react';

const InboxView = () => {
    const initialItems = [
        { 
            id: 1, 
            type: 'Lab Result', 
            patient: 'David Lee', 
            subject: 'CBC Result', 
            isUrgent: true, 
            date: '10:15 AM', 
            content: { 
                'Hemoglobin': { value: 13.1, range: '13.5-17.5 g/dL', isAbnormal: true }, 
                'WBC': { value: 6.5, range: '4.5-11.0 K/uL' } 
            } 
        },
        { 
            id: 2, 
            type: 'Staff Message', 
            patient: 'Sarah Jones', 
            subject: 'Patient called with question', 
            isUrgent: false, 
            date: '9:45 AM', 
            content: 'Sarah Jones called asking if she should fast for her lab draw tomorrow. Please advise.' 
        },
        { 
            id: 3, 
            type: 'Refill Request', 
            patient: 'Robert Miller', 
            subject: 'Lisinopril 20mg', 
            isUrgent: false, 
            date: '8:30 AM', 
            content: 'Requesting a 90-day refill for Lisinopril 20mg.' 
        }
    ];

    const [inboxItems, setInboxItems] = useState(initialItems);
    const [selectedItem, setSelectedItem] = useState(initialItems[0]);

    const handleAcknowledge = (id) => {
        setInboxItems(inboxItems.filter(item => item.id !== id));
        setSelectedItem(inboxItems.find(item => item.id !== id) || null);
    };

    return (
        <div className="flex h-full">
            <div className="w-1/3 bg-white border-r flex flex-col">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold">Inbox ({inboxItems.length})</h2>
                </div>
                <ul className="overflow-y-auto">
                    {inboxItems.map(item => (
                        <li
                            key={item.id}
                            onClick={() => setSelectedItem(item)}
                            className={`p-4 border-b cursor-pointer ${selectedItem && selectedItem.id === item.id ? 'bg-blue-100' : 'hover:bg-gray-50'}`}
                        >
                            <div className="flex justify-between text-sm">
                                <span className="font-semibold">{item.patient}</span>
                                <span className="text-gray-500">{item.date}</span>
                            </div>
                            <div className="flex items-center">
                                {item.isUrgent && <i className="fas fa-exclamation-circle text-red-500 mr-2"></i>}
                                <p className="text-gray-800">{item.subject}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="w-2/3 p-6">
                {selectedItem ? (
                    <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col">
                        <div className="border-b pb-4 mb-4">
                            <h3 className="text-2xl font-bold">{selectedItem.subject}</h3>
                            <p className="text-gray-600">For: <span className="font-semibold">{selectedItem.patient}</span></p>
                        </div>

                        <div className="flex-1">
                            {selectedItem.type === 'Lab Result' && (
                                <div className="space-y-2">
                                    {Object.entries(selectedItem.content).map(([key, data]) => (
                                        <p key={key} className={data.isAbnormal ? 'text-red-600 font-bold' : ''}>
                                            {key}: {data.value} (Ref: {data.range})
                                        </p>
                                    ))}
                                </div>
                            )}
                            {selectedItem.type !== 'Lab Result' && (
                                <p>{selectedItem.content}</p>
                            )}
                        </div>

                        <div className="mt-6 pt-4 border-t flex justify-end space-x-3">
                            <button className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100">Create Task</button>
                            <button className="px-4 py-2 border rounded-lg text-blue-600 border-blue-600 hover:bg-blue-50">Send to Patient</button>
                            <button 
                                onClick={() => handleAcknowledge(selectedItem.id)} 
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                            >
                                Acknowledge
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        <p>Select an item to view details or Inbox Zero!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InboxView;