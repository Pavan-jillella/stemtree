import React, { useState, useCallback } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { TopNavbar } from '../components/layout/TopNavbar';
import { ChatInterface } from '../components/chat/ChatInterface';
import { ChatSession } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { 
  History, 
  Bookmark, 
  FileText, 
  Settings, 
  MessageSquare,
  Download,
  Share2,
  Upload,
  Tag,
  Moon,
  Sun,
  Globe,
  Trash2 // Add this import
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';

export const UserDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('chat');
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [chatSessions, setChatSessions] = useLocalStorage<ChatSession[]>('chat_sessions', []);
  const [bookmarkedMessages] = useLocalStorage<string[]>('bookmarked_messages', []);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [userSettings, setUserSettings] = useLocalStorage('user_settings', {
    name: 'John Doe',
    nickname: 'Johnny',
    chatbotName: 'STEM Assistant',
    theme: 'light',
    language: 'en',
    notifications: true
  });

  const startNewChat = () => {
    const newSession: ChatSession = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setCurrentSession(newSession);
    setChatSessions(prev => [newSession, ...prev]);
    setActiveSection('chat');
  };

  const updateSession = (updatedSession: ChatSession) => {
    // Update title based on first message
    if (updatedSession.messages.length > 0 && updatedSession.title === 'New Chat') {
      updatedSession.title = updatedSession.messages[0].content.substring(0, 50) + '...';
    }
    
    setCurrentSession(updatedSession);
    setChatSessions(prev => 
      prev.map(session => 
        session.id === updatedSession.id ? updatedSession : session
      )
    );
  };

  const handleSessionClick = useCallback((session: ChatSession) => {
    try {
      setCurrentSession(session);
      setActiveSection('chat');
    } catch (error) {
      console.error('Error switching to session:', error);
    }
  }, []);

  const handleDeleteSession = useCallback((e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation(); // Prevent triggering the onClick of parent div
    try {
      setChatSessions(prev => prev.filter(session => session.id !== sessionId));
      if (currentSession?.id === sessionId) {
        setCurrentSession(null);
      }
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  }, [currentSession]);

  const handleStartNewChat = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const newSession: ChatSession = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setCurrentSession(newSession);
    setChatSessions(prev => [newSession, ...prev]);
    setActiveSection('chat');
  }, []);

  const renderWelcomeScreen = () => (
    <div className="p-8 flex flex-col items-center justify-center min-h-[400px]">
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Welcome to STEM Chat</h2>
        <p className="text-gray-600">Ask me anything about STEM topics.</p>
      </div>
      <button 
        onClick={handleStartNewChat}
        className="inline-flex items-center justify-center p-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        aria-label="Start new chat"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" />
        </svg>
      </button>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'chat':
        return (
          <ChatInterface
            currentSession={currentSession}
            onUpdateSession={updateSession}
          />
        );

      case 'history':
        return (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Chat History</h2>
              <Button 
                onClick={startNewChat} 
                size="lg"
                className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Start New Chat
              </Button>
            </div>
            
            <div className="space-y-4">
              {Array.isArray(chatSessions) && chatSessions.length > 0 ? (
                chatSessions.map(session => (
                  <div
                    key={session.id}
                    className="group bg-white/60 backdrop-blur-md rounded-lg border border-gray-200 p-4 
                             hover:shadow-lg transition-all cursor-pointer relative"
                    onClick={() => handleSessionClick(session)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900 truncate flex-1 mr-4">
                        {session.title || 'Untitled Chat'}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {new Date(session.updatedAt).toLocaleDateString()}
                        </span>
                        <button
                          onClick={(e) => handleDeleteSession(e, session.id)}
                          className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-50 
                                   rounded-lg transition-all duration-200"
                          title="Delete chat"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{session.messages?.length || 0} messages</span>
                      <span>{new Date(session.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-white/60 backdrop-blur-md rounded-lg border border-gray-200">
                  <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">No chat history yet</p>
                  <p className="text-gray-400 text-sm mt-1">Start a new chat to begin</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'bookmarks':
        const bookmarkedChats = chatSessions.filter(session =>
          session.messages.some(msg => bookmarkedMessages.includes(msg.id))
        );

        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Bookmarked Messages</h2>
            
            <div className="space-y-4">
              {bookmarkedChats.map(session => {
                const bookmarkedInSession = session.messages.filter(msg => 
                  bookmarkedMessages.includes(msg.id)
                );
                
                return bookmarkedInSession.map(message => (
                  <div
                    key={message.id}
                    className="bg-white rounded-lg border border-gray-200 p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Bookmark className="w-3 h-3 mr-1" />
                        Bookmarked
                      </span>
                      <span className="text-sm text-gray-500">
                        {message.timestamp.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-900 mb-2">{message.content}</p>
                    <div className="text-xs text-gray-500">
                      From: {session.title}
                    </div>
                  </div>
                ));
              })}
              
              {bookmarkedMessages.length === 0 && (
                <div className="text-center py-12">
                  <Bookmark className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No bookmarked messages yet</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'files':
        return (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">My Files</h2>
              <Button className="flex items-center">
                <Upload className="w-4 h-4 mr-2" />
                Upload File
              </Button>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">No files uploaded yet</p>
              <p className="text-sm text-gray-400">Drag and drop files here or click upload</p>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
            
            <div className="max-w-2xl space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Settings</h3>
                <div className="space-y-4">
                  <Input
                    label="Full Name"
                    value={userSettings.name}
                    onChange={(e) => setUserSettings(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <Input
                    label="Nickname (What should we call you?)"
                    value={userSettings.nickname}
                    onChange={(e) => setUserSettings(prev => ({ ...prev, nickname: e.target.value }))}
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Chat Settings</h3>
                <div className="space-y-4">
                  <Input
                    label="Chatbot Name"
                    value={userSettings.chatbotName}
                    onChange={(e) => setUserSettings(prev => ({ ...prev, chatbotName: e.target.value }))}
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Theme
                    </label>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => setUserSettings(prev => ({ ...prev, theme: 'light' }))}
                        className={`flex items-center px-4 py-2 rounded-lg border ${
                          userSettings.theme === 'light' 
                            ? 'border-blue-500 bg-blue-50 text-blue-700' 
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <Sun className="w-4 h-4 mr-2" />
                        Light
                      </button>
                      <button
                        onClick={() => setUserSettings(prev => ({ ...prev, theme: 'dark' }))}
                        className={`flex items-center px-4 py-2 rounded-lg border ${
                          userSettings.theme === 'dark' 
                            ? 'border-blue-500 bg-blue-50 text-blue-700' 
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <Moon className="w-4 h-4 mr-2" />
                        Dark
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Export & Share</h3>
                <div className="flex space-x-4">
                  <Button 
                    variant="secondary"
                    onClick={() => setShowExportModal(true)}
                    className="flex items-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Chats
                  </Button>
                  <Button 
                    variant="secondary"
                    className="flex items-center"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Session
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div className="p-6">Section not found</div>;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <TopNavbar />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          userRole="user"
        />
        
        <main className="flex-1 flex flex-col overflow-y-auto">
          {(activeSection === 'chat' && !currentSession) ? renderWelcomeScreen() : renderContent()}
        </main>
      </div>

      {/* Export Modal */}
      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export Chats"
      >
        <div className="space-y-4">
          <p className="text-gray-600">Choose export format for your chat history:</p>
          <div className="space-y-2">
            <Button className="w-full justify-start" variant="secondary">
              <Download className="w-4 h-4 mr-2" />
              Export as PDF
            </Button>
            <Button className="w-full justify-start" variant="secondary">
              <Download className="w-4 h-4 mr-2" />
              Export as Word Document
            </Button>
            <Button className="w-full justify-start" variant="secondary">
              <Download className="w-4 h-4 mr-2" />
              Export as Text File
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};