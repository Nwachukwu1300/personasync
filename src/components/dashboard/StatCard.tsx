import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatCard({ title, value, description, icon: Icon, trend }: StatCardProps) {
  return (
    <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {description && (
              <p className="text-sm text-gray-600">{description}</p>
            )}
            {trend && (
              <div className={`flex items-center text-sm ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                <span className="font-medium">
                  {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                </span>
                <span className="ml-1 text-gray-600">vs last week</span>
              </div>
            )}
          </div>
          <div className="p-3 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl">
            <Icon className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 