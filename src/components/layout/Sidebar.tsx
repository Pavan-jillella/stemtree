import React from 'react';
import { 
  MessageSquare, 
  Bookmark, 
  History, 
  Settings, 
  Plus,
  Users,
  FileText,
  Bot,
  Mail,
  BarChart3,
  Shield,
  Activity,
  Database,
  Globe,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  userRole: UserRole;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  onSectionChange, 
  userRole 
}) => {
  const { logout } = useAuth();

  const getUserSections = () => {
    switch (userRole) {
      case 'user':
        return [
          { id: 'chat', label: 'New Chat', icon: Plus },
          { id: 'history', label: 'History', icon: History },
          { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
          { id: 'files', label: 'My Files', icon: FileText },
          { id: 'settings', label: 'Settings', icon: Settings },
        ];
      case 'admin':
        return [
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'users', label: 'Users', icon: Users },
          { id: 'documents', label: 'Documents', icon: FileText },
          { id: 'chatbot', label: 'Test Bot', icon: Bot },
          { id: 'messages', label: 'Messages', icon: Mail },
          { id: 'settings', label: 'Settings', icon: Settings },
        ];
      case 'superadmin':
        return [
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'users', label: 'Users', icon: Users },
          { id: 'admins', label: 'Admins', icon: Shield },
          { id: 'documents', label: 'Documents', icon: FileText },
          { id: 'analytics', label: 'Analytics', icon: Activity },
          { id: 'activity', label: 'Activity Log', icon: History },
          { id: 'audit', label: 'Audit Log', icon: Database },
          { id: 'platform', label: 'Platform', icon: Globe },
          { id: 'settings', label: 'Settings', icon: Settings },
        ];
      default:
        return [];
    }
  };

  const sections = getUserSections();

  return (
    <div className="bg-white border-r border-gray-200 w-64 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          {userRole === 'user' ? 'STEMTREE Chat' : 
           userRole === 'admin' ? 'Admin Panel' : 
           'Superadmin Console'}
        </h2>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <li key={section.id}>
                <button
                  onClick={() => onSectionChange(section.id)}
                  className={`
                    w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors
                    ${activeSection === section.id
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {section.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="w-full flex items-center px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  );
};