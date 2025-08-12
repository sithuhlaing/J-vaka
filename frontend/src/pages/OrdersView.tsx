import React, { useState } from 'react';
import PatientHeader from '../components/PatientHeader';

const OrdersView = () => {
    const [activeTab, setActiveTab] = useState('Medications');
    const [searchTerm, setSearchTerm] = useState('Atorvastatin');
    const [currentOrders, setCurrentOrders] = useState([
        { 
            id: 1, 
            type: 'medication',
            name: 'Atorvastatin 20mg', 
            details: 'Take once daily • Qty: 30 • 5 refills',
            priority: 'routine'
        },
        { 
            id: 2, 
            type: 'lab',
            name: 'Comprehensive Metabolic Panel', 
            details: 'Fasting required • STAT priority',
            priority: 'stat'
        },
        { 
            id: 3, 
            type: 'imaging',
            name: 'Chest X-Ray', 
            details: 'PA and Lateral views • Routine',
            priority: 'routine'
        }
    ]);

    const removeOrder = (orderId: number) => {
        setCurrentOrders(currentOrders.filter(order => order.id !== orderId));
    };

    const tabs = ['Medications', 'Labs', 'Imaging', 'Favorites'];

    return (
        <div>
            <PatientHeader encounterType="New Orders" />
            
            <div className="p-6">
                <div className="grid grid-cols-2 gap-6">
                    {/* Order Entry */}
                    <div className="bg-white rounded-lg shadow-lg">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-slate-800 flex items-center">
                                🔍 Order Entry
                            </h2>
                        </div>
                        
                        <div className="p-6">
                            {/* Tabs */}
                            <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
                                {tabs.map(tab => (
                                    <button 
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                                            activeTab === tab 
                                                ? 'bg-white text-blue-600 shadow-sm' 
                                                : 'text-gray-600 hover:text-gray-800'
                                        }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* Search */}
                            <div className="mb-6">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Search medications..."
                                />
                            </div>

                            {/* Search Results */}
                            {activeTab === 'Medications' && searchTerm && (
                                <div className="bg-gray-50 p-4 rounded-lg border">
                                    <div className="mb-3">
                                        <div className="font-semibold text-slate-800">Atorvastatin 20mg tablets</div>
                                        <div className="text-sm text-gray-600">Generic available • $12.50/month</div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Dosage:</label>
                                            <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                <option>20mg daily</option>
                                                <option>40mg daily</option>
                                                <option>80mg daily</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity:</label>
                                            <input 
                                                type="number" 
                                                defaultValue={30}
                                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Refills:</label>
                                        <select className="w-32 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option>0</option>
                                            <option>1</option>
                                            <option>3</option>
                                            <option>5</option>
                                        </select>
                                    </div>
                                    
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                        ➕ Add to Orders
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Current Orders */}
                    <div className="bg-white rounded-lg shadow-lg">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-slate-800 flex items-center">
                                🛒 Current Orders ({currentOrders.length})
                            </h2>
                        </div>
                        
                        <div className="p-6 space-y-4">
                            {currentOrders.map(order => (
                                <div key={order.id} className="bg-gray-50 p-4 rounded-lg border">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="font-semibold text-slate-800">{order.name}</div>
                                            <div className="text-sm text-gray-600">{order.details}</div>
                                            {order.priority === 'stat' && (
                                                <div className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded mt-1 inline-block">
                                                    STAT
                                                </div>
                                            )}
                                        </div>
                                        <button 
                                            onClick={() => removeOrder(order.id)}
                                            className="text-red-500 hover:text-red-700 font-medium"
                                        >
                                            ✕ Remove
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* Drug Interaction Alert */}
                            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                                <div className="flex items-start">
                                    <div className="text-yellow-600 mr-2">⚠️</div>
                                    <div>
                                        <div className="font-semibold text-yellow-800">Drug Interaction Alert:</div>
                                        <div className="text-sm text-yellow-700">No interactions detected with current medications</div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-3 pt-4">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                    📋 Review All
                                </button>
                                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                                    ✅ Sign & Send Orders
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrdersView;