import React, { useState } from 'react';
import { Search, Video, FileText, Paperclip, Send, Smile } from 'lucide-react';

const ChatInterface = () => {
    const [messageText, setMessageText] = useState('');
    const [selectedChat, setSelectedChat] = useState(0);

    const conversations = [
        {
            id: 1,
            name: 'Dr. Sarah Johnson',
            avatar: '👨‍⚕️',
            lastMessage: 'Your test results are ready for review...',
            time: '2 hours ago',
            unread: true,
            online: true
        },
        {
            id: 2,
            name: 'Jane Mitchell',
            avatar: '👩‍⚕️',
            lastMessage: 'Thanks for uploading the form...',
            time: 'Yesterday',
            unread: false,
            online: false
        },
        {
            id: 3,
            name: 'HR Team',
            avatar: '👔',
            lastMessage: 'Reminder: Annual health assessment...',
            time: '3 days ago',
            unread: false,
            online: false
        }
    ];

    const messages = [
        {
            id: 1,
            sender: 'Dr. Johnson',
            text: 'Hi John! I\'ve reviewed your test results and they look great. Your blood pressure is well controlled.',
            time: '2:30 PM',
            isOwn: false
        },
        {
            id: 2,
            sender: 'You',
            text: 'That\'s wonderful news! Thank you for letting me know. Should I continue with my current medication?',
            time: '2:32 PM',
            isOwn: true
        },
        {
            id: 3,
            sender: 'Dr. Johnson',
            text: 'Yes, please continue with the current dose. I\'d like to see you for a follow-up in 3 months. I\'ll send you a booking link.',
            time: '2:35 PM',
            isOwn: false
        },
        {
            id: 4,
            sender: 'Dr. Johnson',
            text: '📄 Test_Results_John_Smith_Feb2024.pdf (2.1 MB)',
            time: '2:36 PM',
            isOwn: false,
            isFile: true
        },
        {
            id: 5,
            sender: 'You',
            text: 'Perfect! Thank you so much for the quick turnaround on the results. I\'ll book the follow-up appointment.',
            time: '2:38 PM',
            isOwn: true
        }
    ];

    return (
        <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[600px] flex">
                {/* Conversation List */}
                <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
                    <div className="p-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Messages</h3>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {conversations.map((conv, index) => (
                            <div
                                key={conv.id}
                                onClick={() => setSelectedChat(index)}
                                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                                    selectedChat === index
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white hover:bg-gray-100'
                                }`}
                            >
                                <div className="flex items-center space-x-3 mb-2">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm relative">
                                        {conv.avatar}
                                        {conv.online && (
                                            <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                                        )}
                                    </div>
                                    <h4 className={`font-medium text-sm ${selectedChat === index ? 'text-white' : 'text-gray-900'}`}>
                                        {conv.name}
                                    </h4>
                                </div>
                                <p className={`text-xs truncate mb-1 ${selectedChat === index ? 'text-blue-100' : 'text-gray-600'}`}>
                                    {conv.lastMessage}
                                </p>
                                <p className={`text-xs ${selectedChat === index ? 'text-blue-200' : 'text-gray-500'}`}>
                                    {conv.time}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Interface */}
                <div className="flex-1 flex flex-col">
                    {/* Chat Header */}
                    <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                                👨‍⚕️
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Dr. Sarah Johnson</h3>
                                <p className="text-sm text-green-600">● Online</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center space-x-2">
                                <Video className="h-4 w-4" />
                                <span>Video Call</span>
                            </button>
                            <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center space-x-2">
                                <FileText className="h-4 w-4" />
                                <span>Share File</span>
                            </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 p-4 bg-gray-50 overflow-y-auto space-y-4">
                        {messages.map(message => (
                            <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                                    message.isOwn 
                                        ? 'bg-blue-600 text-white' 
                                        : 'bg-gray-200 text-gray-900'
                                }`}>
                                    {message.isFile ? (
                                        <div>
                                            <p className="font-medium mb-2">{message.text}</p>
                                            <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors">
                                                Download
                                            </button>
                                        </div>
                                    ) : (
                                        <p className="text-sm">{message.text}</p>
                                    )}
                                    <small className={`block mt-2 text-xs ${
                                        message.isOwn ? 'text-blue-200' : 'text-gray-600'
                                    }`}>
                                        {message.sender} - {message.time}
                                    </small>
                                </div>
                            </div>
                        ))}
                        
                        <div className="text-center text-sm text-gray-500">
                            Dr. Johnson is typing...
                        </div>
                    </div>

                    {/* Message Input */}
                    <div className="p-4 bg-white border-t border-gray-200">
                        <div className="flex items-end space-x-3">
                            <button className="p-2 text-gray-500 hover:text-gray-700">
                                <Paperclip className="h-5 w-5" />
                            </button>
                            <div className="flex-1 relative">
                                <textarea
                                    value={messageText}
                                    onChange={(e) => setMessageText(e.target.value)}
                                    placeholder="Type your message..."
                                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    rows={1}
                                />
                                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                                    <Smile className="h-5 w-5" />
                                </button>
                            </div>
                            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
                                <Send className="h-4 w-4" />
                                <span>Send</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;