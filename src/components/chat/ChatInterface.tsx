import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, ThumbsUp, ThumbsDown, Bookmark, Copy, Share2, BookmarkCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { ChatMessage, ChatSession } from '../../types';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface ChatInterfaceProps {
  currentSession: ChatSession | null;
  onUpdateSession: (session: ChatSession) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  currentSession,
  onUpdateSession
}) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [bookmarkedMessages, setBookmarkedMessages] = useLocalStorage<string[]>('bookmarked_messages', []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages]);

  const handleSendMessage = async () => {
    if (!message.trim() || !currentSession) return;

    const userMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      content: message,
      sender: 'user',
      timestamp: new Date()
    };

    const updatedSession = {
      ...currentSession,
      messages: [...currentSession.messages, userMessage],
      updatedAt: new Date()
    };

    onUpdateSession(updatedSession);
    setMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: Math.random().toString(36).substr(2, 9),
        content: generateBotResponse(message),
        sender: 'bot',
        timestamp: new Date(),
        sourceDocument: 'Physics_Chapter_5.pdf'
      };

      const finalSession = {
        ...updatedSession,
        messages: [...updatedSession.messages, botMessage],
        updatedAt: new Date()
      };

      onUpdateSession(finalSession);
      setIsTyping(false);
    }, 2000);
  };

  const generateBotResponse = (userMessage: string) => {
    const responses = [
      "Great question! Let me break this down for you. Based on the latest research in STEM education, this concept is fundamental to understanding...",
      "I can help you with that! According to the document I found, this relates to several key principles we should explore together...",
      "Excellent inquiry! This is a common area where students seek clarification. Let me provide you with a comprehensive explanation...",
      "That's an interesting problem! Let me walk you through the solution step by step, drawing from multiple educational resources..."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleFeedback = (messageId: string, feedback: 'up' | 'down') => {
    if (!currentSession) return;
    
    const updatedMessages = currentSession.messages.map(msg =>
      msg.id === messageId ? { ...msg, feedback } : msg
    );
    
    onUpdateSession({
      ...currentSession,
      messages: updatedMessages,
      updatedAt: new Date()
    });
  };

  const handleBookmark = (messageId: string) => {
    const isBookmarked = bookmarkedMessages.includes(messageId);
    
    if (isBookmarked) {
      setBookmarkedMessages(prev => prev.filter(id => id !== messageId));
    } else {
      setBookmarkedMessages(prev => [...prev, messageId]);
    }

    if (!currentSession) return;
    
    const updatedMessages = currentSession.messages.map(msg =>
      msg.id === messageId ? { ...msg, isBookmarked: !isBookmarked } : msg
    );
    
    onUpdateSession({
      ...currentSession,
      messages: updatedMessages,
      updatedAt: new Date()
    });
  };

  if (!currentSession) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Start a New Conversation</h3>
          <p className="text-gray-600">Ask me anything about STEM topics!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {currentSession.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`
              max-w-3xl rounded-2xl px-4 py-3 ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/80 backdrop-blur-sm text-gray-900 shadow-sm border border-gray-200'
              }
            `}>
              <p className="whitespace-pre-wrap">{msg.content}</p>
              
              {msg.sender === 'bot' && (
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleFeedback(msg.id, 'up')}
                      className={`p-1 rounded hover:bg-gray-100 transition-colors ${
                        msg.feedback === 'up' ? 'text-green-600' : 'text-gray-400'
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleFeedback(msg.id, 'down')}
                      className={`p-1 rounded hover:bg-gray-100 transition-colors ${
                        msg.feedback === 'down' ? 'text-red-600' : 'text-gray-400'
                      }`}
                    >
                      <ThumbsDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleBookmark(msg.id)}
                      className={`p-1 rounded hover:bg-gray-100 transition-colors ${
                        bookmarkedMessages.includes(msg.id) ? 'text-yellow-600' : 'text-gray-400'
                      }`}
                    >
                      {bookmarkedMessages.includes(msg.id) ? (
                        <BookmarkCheck className="w-4 h-4" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                    <button className="p-1 rounded hover:bg-gray-100 transition-colors text-gray-400">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button className="p-1 rounded hover:bg-gray-100 transition-colors text-gray-400">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                  {msg.sourceDocument && (
                    <span className="text-xs text-gray-500">
                      Source: {msg.sourceDocument}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-sm border border-gray-200">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-end space-x-2">
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          <div className="flex-1 min-h-[44px] max-h-32 bg-gray-50 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Ask me anything about STEM..."
              className="w-full h-full px-4 py-3 bg-transparent resize-none focus:outline-none"
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim() || isTyping}
            className="rounded-full p-2 h-11 w-11"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          STEMTREE can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  );
};