export type UserRole = 'user' | 'admin' | 'superadmin';

export interface User {
  id: string;
  email: string;
  name: string;
  nickname?: string;
  role: UserRole;
  status: 'active' | 'inactive';
  createdAt: Date;
  lastLogin?: Date;
  center?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isBookmarked?: boolean;
  feedback?: 'up' | 'down';
  sourceDocument?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Array<{
    id: string;
    content: string;
    timestamp: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
  isDeleted?: boolean; // Add this field
}

export interface Document {
  id: string;
  name: string;
  category: string;
  type: string;
  size: number;
  uploadedBy: string;
  uploadedAt: Date;
  url: string;
}

export interface KPICard {
  title: string;
  value: string | number;
  change?: string;
  icon: string;
  trend?: 'up' | 'down';
}

export interface ActivityLogEntry {
  id: string;
  action: string;
  actor: string;
  description: string;
  timestamp: Date;
  type: 'create' | 'edit' | 'delete' | 'upload' | 'login';
}

export interface PlatformSettings {
  multilingual: boolean;
  maxFileSize: number;
  llmModel: 'gpt-4' | 'claude' | 'gemini';
  defaultTheme: 'light' | 'dark';
  allowRegistration: boolean;
}