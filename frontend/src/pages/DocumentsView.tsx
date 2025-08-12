import React, { useState } from 'react';
import { Search, Upload, FolderOpen, Eye, Download, Share2 } from 'lucide-react';

const DocumentsView = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const documents = [
        {
            id: 1,
            title: 'Annual Health Certificate',
            type: 'PDF',
            size: '2.3 MB',
            date: 'Feb 28, 2024',
            category: 'health-certificates',
            icon: '📄',
            iconColor: 'bg-blue-600'
        },
        {
            id: 2,
            title: 'Blood Test Results',
            type: 'PDF',
            size: '1.8 MB',
            date: 'Feb 25, 2024',
            category: 'test-results',
            icon: '🩺',
            iconColor: 'bg-green-600'
        },
        {
            id: 3,
            title: 'Risk Assessment Form',
            type: 'PDF',
            size: '956 KB',
            date: 'Feb 20, 2024',
            category: 'forms',
            icon: '📋',
            iconColor: 'bg-orange-600'
        },
        {
            id: 4,
            title: 'Workplace Injury Photos',
            type: 'Images',
            size: '4.2 MB',
            date: 'Jan 15, 2024',
            category: 'reports',
            icon: '📷',
            iconColor: 'bg-purple-600'
        }
    ];

    const categories = [
        { id: 'all', label: 'All Documents', count: 12 },
        { id: 'health-certificates', label: 'Health Certificates', count: 3 },
        { id: 'test-results', label: 'Test Results', count: 4 },
        { id: 'reports', label: 'Reports', count: 3 },
        { id: 'forms', label: 'Forms', count: 2 }
    ];

    const filteredDocuments = documents.filter(doc => {
        const matchesCategory = activeCategory === 'all' || doc.category === activeCategory;
        const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="p-6">
            {/* Header */}
            <div className="bg-white border border-gray-200 rounded-lg mb-6 p-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">My Documents</h2>
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search documents..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
                            <Upload className="h-4 w-4" />
                            <span>Upload</span>
                        </button>
                        <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center space-x-2">
                            <FolderOpen className="h-4 w-4" />
                            <span>Organize</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Category Filters */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-4 py-2 rounded-md font-medium transition-colors ${
                                activeCategory === category.id
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-500 text-white hover:bg-gray-600'
                            }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
                <div className="text-gray-600">
                    {filteredDocuments.length} documents found
                </div>
            </div>

            {/* Documents Grid */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredDocuments.map(doc => (
                            <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="flex items-start space-x-3 mb-4">
                                    <div className={`w-10 h-10 ${doc.iconColor} rounded-md flex items-center justify-center text-white text-lg flex-shrink-0`}>
                                        {doc.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-gray-900 text-sm mb-1 truncate">
                                            {doc.title}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            {doc.type} • {doc.size}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Updated: {doc.date}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex justify-between space-x-2">
                                    <button className="flex-1 px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors text-xs flex items-center justify-center space-x-1">
                                        <Eye className="h-3 w-3" />
                                        <span>View</span>
                                    </button>
                                    <button className="flex-1 px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors text-xs flex items-center justify-center space-x-1">
                                        <Download className="h-3 w-3" />
                                        <span>Download</span>
                                    </button>
                                    <button className="flex-1 px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors text-xs flex items-center justify-center space-x-1">
                                        <Share2 className="h-3 w-3" />
                                        <span>Share</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentsView;