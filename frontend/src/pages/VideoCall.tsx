import React, { useState } from 'react';
import { Mic, MicOff, Video as VideoIcon, VideoOff, Monitor, MessageCircle, Phone } from 'lucide-react';
import { AppScreen } from '../contexts/NavigationContext';

interface VideoCallProps {
    onNavigate: (screen: AppScreen, data?: any) => void;
}

const VideoCall: React.FC<VideoCallProps> = ({ onNavigate }) => {
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [showChat, setShowChat] = useState(false);

    const chatMessages = [
        {
            id: 1,
            sender: 'Dr. Johnson',
            text: 'Hello John, how are you feeling today?',
            time: '10:02 AM'
        },
        {
            id: 2,
            sender: 'You',
            text: 'I\'m doing well, thank you. Ready for my health review.',
            time: '10:03 AM'
        }
    ];

    return (
        <div className="p-6">
            <div className="bg-gray-900 rounded-lg overflow-hidden" style={{ height: '600px' }}>
                <div className="h-full flex">
                    {/* Main Video Area */}
                    <div className="flex-1 relative">
                        {/* Main Video Screen */}
                        <div className="h-full flex items-center justify-center bg-gray-800 relative">
                            <div className="text-center text-white">
                                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto">
                                    👨‍⚕️
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Dr. Sarah Johnson</h3>
                                <p className="text-gray-300 mb-2">Occupational Health Physician</p>
                                <p className="text-sm text-gray-400">Connected - 05:23</p>
                            </div>
                        </div>

                        {/* Self Video (Picture-in-Picture) */}
                        <div className="absolute top-4 right-4 w-32 h-24 bg-gray-700 rounded-lg border-2 border-white overflow-hidden">
                            <div className="h-full flex items-center justify-center text-white">
                                <div className="text-center">
                                    <div className="w-8 h-8 bg-green-600 rounded-full mx-auto mb-1 flex items-center justify-center">
                                        👤
                                    </div>
                                    <p className="text-xs">You</p>
                                </div>
                            </div>
                        </div>

                        {/* Chat Notification */}
                        <div className="absolute bottom-20 right-4 bg-gray-800 bg-opacity-90 rounded-lg px-3 py-2 text-white text-sm">
                            💬 New message
                        </div>

                        {/* Video Controls */}
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
                            <button
                                onClick={() => setIsMuted(!isMuted)}
                                className={`w-12 h-12 rounded-full flex items-center justify-center text-white transition-colors ${
                                    isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'
                                }`}
                            >
                                {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                            </button>
                            
                            <button
                                onClick={() => setIsVideoOn(!isVideoOn)}
                                className={`w-12 h-12 rounded-full flex items-center justify-center text-white transition-colors ${
                                    !isVideoOn ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'
                                }`}
                            >
                                {isVideoOn ? <VideoIcon className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                            </button>
                            
                            <button className="w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white">
                                <Monitor className="h-5 w-5" />
                            </button>
                            
                            <button
                                onClick={() => setShowChat(!showChat)}
                                className={`w-12 h-12 rounded-full flex items-center justify-center text-white transition-colors ${
                                    showChat ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'
                                }`}
                            >
                                <MessageCircle className="h-5 w-5" />
                            </button>
                            
                            <button className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center text-white">
                                <Phone className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Chat Panel (conditionally shown) */}
                    {showChat && (
                        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
                            <div className="p-4 border-b border-gray-200">
                                <h4 className="font-semibold text-gray-900">Chat</h4>
                            </div>
                            
                            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                                {chatMessages.map(message => (
                                    <div key={message.id} className={`${
                                        message.sender === 'You' ? 'text-right' : 'text-left'
                                    }`}>
                                        <div className={`inline-block px-3 py-2 rounded-lg max-w-xs ${
                                            message.sender === 'You'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-200 text-gray-900'
                                        }`}>
                                            <p className="text-sm">{message.text}</p>
                                            <small className={`block mt-1 text-xs ${
                                                message.sender === 'You' ? 'text-blue-200' : 'text-gray-600'
                                            }`}>
                                                {message.sender} - {message.time}
                                            </small>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="p-4 border-t border-gray-200">
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        placeholder="Type a message..."
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoCall;