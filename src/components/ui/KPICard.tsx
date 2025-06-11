import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { KPICard as KPICardType } from '../../types';

interface KPICardProps {
  kpi: KPICardType;
  className?: string;
}

export const KPICard: React.FC<KPICardProps> = ({ kpi, className = '' }) => {
  // Safely get the icon component
  const IconComponent = (LucideIcons as any)[kpi.icon] || LucideIcons.Activity;

  return (
    <div className={`
      bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl 
      transition-all duration-300 border border-gray-100
      ${className}
    `}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
          {kpi.change && (
            <div className="flex items-center mt-1">
              {kpi.trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm ${
                kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {kpi.change}
              </span>
            </div>
          )}
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          <IconComponent className="w-6 h-6 text-blue-600" />
        </div>
      </div>
    </div>
  );
};