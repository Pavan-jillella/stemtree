import React, { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { TopNavbar } from '../components/layout/TopNavbar';
import { KPICard } from '../components/ui/KPICard';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { 
  Users, 
  Shield, 
  FileText, 
  Activity, 
  Globe,
  Plus,
  Search,
  Filter,
  Edit,
  Trash,
  Eye,
  Download,
  Settings,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Database
} from 'lucide-react';
import { User, ActivityLogEntry, KPICard as KPIType, PlatformSettings } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const SuperadminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [showUserModal, setShowUserModal] = useState(false);
  const [showPlatformModal, setShowPlatformModal] = useState(false);
  
  const [users, setUsers] = useLocalStorage<User[]>('superadmin_users', [
    {
      id: '1',
      email: 'admin1@stemtree.com',
      name: 'John Admin',
      role: 'admin',
      status: 'active',
      createdAt: new Date('2024-01-10'),
      center: 'Center A'
    },
    {
      id: '2',
      email: 'admin2@stemtree.com',
      name: 'Jane Admin',
      role: 'admin',
      status: 'active',
      createdAt: new Date('2024-01-15'),
      center: 'Center B'
    }
  ]);

  const [activityLog] = useLocalStorage<ActivityLogEntry[]>('activity_log', [
    {
      id: '1',
      action: 'User Created',
      actor: 'admin@stemtree.com',
      description: 'Created new user: student@example.com',
      timestamp: new Date(),
      type: 'create'
    },
    {
      id: '2',
      action: 'Document Uploaded',
      actor: 'admin@stemtree.com',
      description: 'Uploaded Physics_Chapter_6.pdf',
      timestamp: new Date(Date.now() - 3600000),
      type: 'upload'
    }
  ]);

  const [platformSettings, setPlatformSettings] = useLocalStorage<PlatformSettings>('platform_settings', {
    multilingual: true,
    maxFileSize: 50,
    llmModel: 'gpt-4',
    defaultTheme: 'light',
    allowRegistration: true
  });

  const superadminKPIs: KPIType[] = [
    {
      title: 'Total Users',
      value: '1,247',
      change: '+8.2%',
      trend: 'up',
      icon: 'Users'
    },
    {
      title: 'Active Admins',
      value: users.filter(u => u.role === 'admin' && u.status === 'active').length,
      change: '+2%',
      trend: 'up',
      icon: 'Shield'
    },
    {
      title: 'Global Documents',
      value: '3,456',
      change: '+12%',
      trend: 'up',
      icon: 'FileText'
    },
    {
      title: 'System Uptime',
      value: '99.9%',
      change: 'Stable',
      icon: 'Activity'
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Superadmin Overview</h2>
              <div className="flex space-x-2">
                <Button variant="secondary" className="flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  System Report
                </Button>
                <Button onClick={() => setShowPlatformModal(true)} className="flex items-center">
                  <Settings className="w-4 h-4 mr-2" />
                  Platform Settings
                </Button>
              </div>
            </div>

            {/* Global KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {superadminKPIs.map((kpi, index) => (
                <KPICard key={index} kpi={kpi} />
              ))}
            </div>

            {/* Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage by Center</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Center A</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      <span className="text-sm font-medium">432 users</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Center B</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                      <span className="text-sm font-medium">345 users</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Center C</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                      <span className="text-sm font-medium">278 users</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      <span className="text-gray-600">Database</span>
                    </div>
                    <span className="text-green-600 font-medium">Healthy</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      <span className="text-gray-600">API Services</span>
                    </div>
                    <span className="text-green-600 font-medium">Operational</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
                      <span className="text-gray-600">Cache Layer</span>
                    </div>
                    <span className="text-yellow-600 font-medium">Warning</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'users':
      case 'admins':
        const filteredUsers = activeSection === 'admins' 
          ? users.filter(user => user.role === 'admin' || user.role === 'superadmin')
          : users;

        return (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {activeSection === 'admins' ? 'Admin Management' : 'User Management'}
              </h2>
              <Button onClick={() => setShowUserModal(true)} className="flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Add {activeSection === 'admins' ? 'Admin' : 'User'}
              </Button>
            </div>

            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Input
                      placeholder={`Search ${activeSection}...`}
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
                        Center/Franchise
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
                    {filteredUsers.map(user => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                            user.role === 'superadmin' ? 'bg-red-100 text-red-800' :
                            user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {user.role === 'superadmin' && <Shield className="w-3 h-3 mr-1" />}
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
                            <button className="text-green-600 hover:text-green-900">
                              <Eye className="w-4 h-4" />
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

      case 'analytics':
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Global Analytics</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Questions</h3>
                <div className="space-y-3">
                  {[
                    'What is photosynthesis?',
                    'How do electric circuits work?',
                    'Explain Newton\'s laws',
                    'What is DNA structure?',
                    'How does gravity work?'
                  ].map((question, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-600 text-sm">{question}</span>
                      <span className="text-xs text-gray-500">{Math.floor(Math.random() * 100) + 50} asks</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Trends</h3>
                <div className="space-y-3">
                  {[
                    { category: 'Physics', count: 234, trend: 'up' },
                    { category: 'Chemistry', count: 189, trend: 'up' },
                    { category: 'Biology', count: 156, trend: 'down' },
                    { category: 'Mathematics', count: 298, trend: 'up' },
                    { category: 'Engineering', count: 145, trend: 'up' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-600">{item.category}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{item.count}</span>
                        <TrendingUp className={`w-4 h-4 ${
                          item.trend === 'up' ? 'text-green-500' : 'text-red-500'
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'activity':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Activity Log</h2>
            
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search activities..."
                      icon={<Search className="w-4 h-4 text-gray-400" />}
                    />
                  </div>
                  <Button variant="secondary" className="flex items-center">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter by Type
                  </Button>
                </div>
              </div>

              <div className="p-4 space-y-4">
                {activityLog.map(activity => (
                  <div key={activity.id} className="flex items-start space-x-4 p-4 border border-gray-100 rounded-lg">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'create' ? 'bg-green-100 text-green-600' :
                      activity.type === 'edit' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'delete' ? 'bg-red-100 text-red-600' :
                      activity.type === 'upload' ? 'bg-purple-100 text-purple-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {activity.type === 'create' && <Plus className="w-4 h-4" />}
                      {activity.type === 'edit' && <Edit className="w-4 h-4" />}
                      {activity.type === 'delete' && <Trash className="w-4 h-4" />}
                      {activity.type === 'upload' && <FileText className="w-4 h-4" />}
                      {activity.type === 'login' && <Users className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">{activity.action}</h4>
                        <span className="text-sm text-gray-500">
                          {activity.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{activity.description}</p>
                      <p className="text-gray-500 text-xs mt-1">by {activity.actor}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'audit':
        return (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Audit Log</h2>
              <Button variant="secondary" className="flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Export to CSV
              </Button>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Timestamp
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        IP Address
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {activityLog.map(log => (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {log.timestamp.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {log.actor}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            log.type === 'create' ? 'bg-green-100 text-green-800' :
                            log.type === 'edit' ? 'bg-blue-100 text-blue-800' :
                            log.type === 'delete' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {log.action}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                          {log.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          192.168.1.{Math.floor(Math.random() * 255)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'platform':
        return (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Platform Settings</h2>
              <Button onClick={() => setShowPlatformModal(true)} className="flex items-center">
                <Settings className="w-4 h-4 mr-2" />
                Configure
              </Button>
            </div>
            
            <div className="max-w-4xl space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Multilingual Support
                    </label>
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full mr-2 ${
                        platformSettings.multilingual ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <span>{platformSettings.multilingual ? 'Enabled' : 'Disabled'}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max File Size
                    </label>
                    <span className="text-gray-900">{platformSettings.maxFileSize} MB</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LLM Model
                    </label>
                    <span className="text-gray-900 capitalize">{platformSettings.llmModel}</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Default Theme
                    </label>
                    <span className="text-gray-900 capitalize">{platformSettings.defaultTheme}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Database Connection</span>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-green-600">Connected</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">External APIs</span>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-green-600">All Active</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">File Storage</span>
                    <div className="flex items-center">
                      <AlertTriangle className="w-4 h-4 text-yellow-500 mr-2" />
                      <span className="text-yellow-600">78% Used</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Superadmin Settings</h2>
            
            <div className="max-w-2xl space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Settings</h3>
                <div className="space-y-4">
                  <Input label="Name" defaultValue="Super Admin" />
                  <Input label="Email" defaultValue="superadmin@stemtree.com" />
                  <Button>Update Profile</Button>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Security</h3>
                <div className="space-y-4">
                  <Button variant="secondary">Change Password</Button>
                  <Button variant="secondary">Enable 2FA</Button>
                  <Button variant="secondary">View Login History</Button>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Theme Preferences</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Personal Theme
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Light</option>
                      <option>Dark</option>
                      <option>Auto</option>
                    </select>
                  </div>
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
          userRole="superadmin"
        />
        
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>

      {/* Create User/Admin Modal */}
      <Modal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        title="Create New User/Admin"
        className="max-w-lg"
      >
        <form className="space-y-4">
          <Input label="Name" required />
          <Input label="Email" type="email" required />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Superadmin</option>
            </select>
          </div>
          <Input label="Center/Franchise" />
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="secondary" onClick={() => setShowUserModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Create User</Button>
          </div>
        </form>
      </Modal>

      {/* Platform Settings Modal */}
      <Modal
        isOpen={showPlatformModal}
        onClose={() => setShowPlatformModal(false)}
        title="Platform Configuration"
        className="max-w-2xl"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={platformSettings.multilingual}
                  onChange={(e) => setPlatformSettings(prev => ({ ...prev, multilingual: e.target.checked }))}
                  className="mr-2"
                />
                Multilingual Support
              </label>
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={platformSettings.allowRegistration}
                  onChange={(e) => setPlatformSettings(prev => ({ ...prev, allowRegistration: e.target.checked }))}
                  className="mr-2"
                />
                Allow Registration
              </label>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max File Size (MB)
              </label>
              <input
                type="number"
                value={platformSettings.maxFileSize}
                onChange={(e) => setPlatformSettings(prev => ({ ...prev, maxFileSize: Number(e.target.value) }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LLM Model
              </label>
              <select
                value={platformSettings.llmModel}
                onChange={(e) => setPlatformSettings(prev => ({ ...prev, llmModel: e.target.value as any }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="gpt-4">GPT-4</option>
                <option value="claude">Claude</option>
                <option value="gemini">Gemini</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="secondary" onClick={() => setShowPlatformModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowPlatformModal(false)}>
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};