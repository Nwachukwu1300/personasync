'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Brain, TrendingUp, Users } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';

// Mock trait data (we'll replace this with real data later)
const traitData = [
  { trait: 'Analytical', count: 450, percentage: 45, trend: 5 },
  { trait: 'Creative', count: 350, percentage: 35, trend: 8 },
  { trait: 'Detail-Oriented', count: 300, percentage: 30, trend: 3 },
  { trait: 'Problem-Solver', count: 400, percentage: 40, trend: 6 }
];

const traitCategories = [
  { category: 'Personality', count: 450 },
  { category: 'Work Style', count: 350 },
  { category: 'Leadership', count: 300 },
  { category: 'Communication', count: 250 }
];

const COLORS = ['#9333ea', '#db2777', '#4f46e5', '#0891b2'];

export default function TraitsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Trait Analysis</h1>
        
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Traits Analyzed"
            value="1,500"
            icon={Brain}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Most Common Trait"
            value="Analytical"
            icon={Users}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Trait Growth"
            value="+15%"
            icon={TrendingUp}
            trend={{ value: 15, isPositive: true }}
          />
        </div>

        {/* Trait Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Trait Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={traitData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="trait" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#9333ea" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Trait Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={traitCategories}
                      dataKey="count"
                      nameKey="category"
                      cx="50%"
                      cy="50%"
                      outerRadius={150}
                      label
                    >
                      {traitCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trait Details */}
        <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Trait Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {traitData.map((trait, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/30 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-purple-100">
                      <Brain className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{trait.trait}</h3>
                      <p className="text-sm text-gray-600">{trait.percentage}% of users</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${trait.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {trait.trend > 0 ? '+' : ''}{trait.trend}%
                    </span>
                    <TrendingUp className={`w-4 h-4 ${trait.trend > 0 ? 'text-green-600' : 'text-red-600'}`} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
} 