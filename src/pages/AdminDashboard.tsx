import React, { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { TopNavbar } from '../components/layout/TopNavbar';
import { KPICard } from '../components/ui/KPICard';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { ChatInterface } from '../components/chat/ChatInterface';
import { 
  Users, 
  FileText, 
  Upload, 
  Plus, 
  Search, 
  Filter,
  Edit,
  Trash,
  Eye,
  Mail,
  Send,
  MessageSquare,
  BarChart3,
  TrendingUp,
  Download
} from 'lucide-react';
import { User, Document, ChatSession, KPICard as KPIType } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [showUserModal, setShowUserModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [testChatSession, setTestChatSession] = useState<ChatSession | null>(null);
  const [users, setUsers] = useLocalStorage<User[]>('admin_users', [
    {
      id: '1',
      email: 'student1@example.com',
      name: 'Alice Johnson',
      role: 'user',
      status: 'active',
      createdAt: new Date('2024-01-15'),
      center: 'Center A'
    },
    {
      id: '2',
      email: 'student2@example.com',
      name: 'Bob Smith',
      role: 'user',
      status: 'active',
      createdAt: new Date('2024-01-20'),
      center: 'Center B'
    }
  ]);
  
  const [documents, setDocuments] = useLocalStorage<Document[]>('admin_documents', [
    {
      id: '1',
      name: 'Physics_Chapter_5.pdf',
      category: 'Physics',
      type: 'PDF',
      size: 2048000,
      uploadedBy: 'admin@stemtree.com',
      uploadedAt: new Date('2024-01-10'),
      url: '#'
    }
  ]);

  const kpiData: KPIType[] = [
    {
      title: 'Total Users',
      value: users.length,
      change: '+12%',
      trend: 'up',
      icon: 'Users'
    },
    {
      title: 'Documents',
      value: documents.length,
      change: '+8%',
      trend: 'up',
      icon: 'FileText'
    },
    {
      title: 'Active Sessions',
      value: '24',
      change: '+15%',
      trend: 'up',
      icon: 'Activity'
    },
    {
      title: 'Messages Today',
      value: '156',
      change: '+22%',
      trend: 'up',
      icon: 'MessageSquare'
    }
  ];

  const handleCreateUser = (userData: Partial<User>) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: userData.email!,
      name: userData.name!,
      role: userData.role!,
      status: 'active',
      createdAt: new Date(),
      center: userData.center || 'Center A'
    };
    setUsers(prev => [...prev, newUser]);
    setShowUserModal(false);
  };

  const initializeTestChat = () => {
    const testSession: ChatSession = {
      id: 'test-session',
      title: 'Chatbot Test',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setTestChatSession(testSession);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Admin Overview</h2>
              <div className="flex space-x-2">
                <Button variant="secondary" className="flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {kpiData.map((kpi, index) => (
                <KPICard key={index} kpi={kpi} />
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Users</h3>
                <div className="space-y-3">
                  {users.slice(-5).map(user => (
                    <div key={user.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {user.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Documents</h3>
                <div className="space-y-3">
                  {documents.slice(-5).map(doc => (
                    <div key={doc.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{doc.name}</p>
                        <p className="text-sm text-gray-500">{doc.category}</p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {doc.uploadedAt.toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
              <Button onClick={() => setShowUserModal(true)} className="flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>

            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search users..."
                      icon={<Search className="w-4 h-4 text-gray-400" />}
                    />
                  </div>
                  <Button variant="secondary" className="flex items-center">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Center
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map(user => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.center}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.createdAt.toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'documents':
        return (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Document Management</h2>
              <Button className="flex items-center">
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </div>

            {/* Upload Zone */}
            <div className="mb-6 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">Drag and drop files here</p>
              <p className="text-gray-500 mb-4">or click to select files</p>
              <Button>Choose Files</Button>
            </div>

            {/* Documents Table */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search documents..."
                      icon={<Search className="w-4 h-4 text-gray-400" />}
                    />
                  </div>
                  <Button variant="secondary" className="flex items-center">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter by Category
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Document
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Size
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Uploaded
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {documents.map(doc => (
                      <tr key={doc.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FileText className="w-5 h-5 text-gray-400 mr-3" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                              <div className="text-sm text-gray-500">{doc.type}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {doc.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {(doc.size / 1024 / 1024).toFixed(2)} MB
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {doc.uploadedAt.toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Download className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'chatbot':
        return (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Chatbot Tester</h2>
              {!testChatSession && (
                <Button onClick={initializeTestChat} className="flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Start Test Session
                </Button>
              )}
            </div>

            <div className="bg-white rounded-lg border border-gray-200 h-96">
              {testChatSession ? (
                <ChatInterface
                  currentSession={testChatSession}
                  onUpdateSession={setTestChatSession}
                />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Click "Start Test Session" to test the chatbot</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'messages':
        return (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Messages</h2>
              <Button onClick={() => setShowMessageModal(true)} className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Compose Message
              </Button>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-center py-12">
                <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No messages yet</p>
                <Button onClick={() => setShowMessageModal(true)}>Send First Message</Button>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Settings</h2>
            
            <div className="max-w-2xl space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Settings</h3>
                <div className="space-y-4">
                  <Input label="Name" defaultValue="Admin User" />
                  <Input label="Email" defaultValue="admin@stemtree.com" />
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">System Limits</h3>
                <div className="space-y-4">
                  <Input label="Max Upload Size (MB)" defaultValue="50" />
                  <Input label="Max Users per Center" defaultValue="100" />
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
          userRole="admin"
        />
        
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>

      {/* Create User Modal */}
      <Modal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        title="Add New User"
        className="max-w-lg"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleCreateUser({
              name: formData.get('name') as string,
              email: formData.get('email') as string,
              role: formData.get('role') as any,
              center: formData.get('center') as string
            });
          }}
          className="space-y-4"
        >
          <Input name="name" label="Name" required />
          <Input name="email" label="Email" type="email" required />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select
              name="role"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <Input name="center" label="Center" defaultValue="Center A" />
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="secondary" onClick={() => setShowUserModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Create User</Button>
          </div>
        </form>
      </Modal>

      {/* Compose Message Modal */}
      <Modal
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        title="Compose Message"
        className="max-w-lg"
      >
        <div className="space-y-4">
          <Input label="To" placeholder="Select recipients..." />
          <Input label="Subject" placeholder="Enter subject..." />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              className="w-full h-32 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
            />
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={() => setShowMessageModal(false)}>
              Cancel
            </Button>
            <Button className="flex items-center">
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};