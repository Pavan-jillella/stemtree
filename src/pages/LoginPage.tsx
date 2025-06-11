import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useToast } from '../components/ui/Toast';
import { Mail, Lock, Eye, EyeOff, TreePine } from 'lucide-react';
import { UserRole } from '../types';
import styles from './LoginPage.module.css';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('user');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const { showToast, ToastContainer } = useToast();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      const success = await login(email, password, role);
      if (success) {
        showToast('Login successful!', 'success');
        // Navigate based on role
        switch (role) {
          case 'superadmin':
            navigate('/superadmin');
            break;
          case 'admin':
            navigate('/admin');
            break;
          default:
            navigate('/dashboard');
        }
      } else {
        showToast('Invalid credentials. Please try again.', 'error');
      }
    } catch (error) {
      showToast('Login failed. Please try again.', 'error');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ToastContainer />
      
      {/* Full Background Image */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/src/assets/images/background.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          transform: 'scale(1.02)', // Slight scale to prevent white edges
          filter: 'brightness(0.65) saturate(1.1)',
          width: '100vw',
          height: '100vh'
        }}
      />

      {/* Improved Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-purple-900/75 to-slate-900/85" 
        style={{ mixBlendMode: 'multiply' }}
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen">
        {/* Right Panel - Login Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="flex items-center justify-center mb-8">
              <TreePine className="w-12 h-12 text-green-400 mr-3" />
              <h1 className="text-3xl font-bold text-white">
                STEM<span className="text-green-400">TREE</span>
              </h1>
            </div>

            {/* Glassmorphism Login Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-gray-300">Sign in to your STEMTREE account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                  icon={<Mail className="w-5 h-5 text-gray-400" />}
                  className="bg-white/10 border-white/20 text-white placeholder-gray-300"
                />

                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                    icon={<Lock className="w-5 h-5 text-gray-400" />}
                    className="bg-white/10 border-white/20 text-white placeholder-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Role Selector for Demo */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Demo Role (Choose your dashboard)
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="user" className="bg-gray-800">User (Chat Interface)</option>
                    <option value="admin" className="bg-gray-800">Admin (Management)</option>
                    <option value="superadmin" className="bg-gray-800">Superadmin (Full Control)</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  isLoading={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  size="lg"
                >
                  Sign In
                </Button>
              </form>

              <div className="mt-6 text-center space-y-4">
                <a href="#" className="text-blue-400 hover:text-blue-300 text-sm">
                  Forgot your password?
                </a>
                <div className="text-gray-400 text-sm">
                  Don't have an account?{' '}
                  <a href="#" className="text-blue-400 hover:text-blue-300">
                    Sign up
                  </a>
                </div>
              </div>
            </div>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
              <p className="text-gray-300 text-sm text-center">
                <strong>Demo:</strong> Use any email/password (min 6 chars) with your preferred role
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};