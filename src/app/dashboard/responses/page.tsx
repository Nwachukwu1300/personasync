'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useToast } from '@/hooks/use-toast';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Clock, Download, Filter, Search, MessageSquare } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { surveyResponses } from '@/lib/mock-survey-data';
import { generateCSV } from '@/lib/export-utils';

// Mock response data
const responseMetrics = {
  totalResponses: surveyResponses.length,
  averageTime: '4.5 min',
  completionRate: '85%',
  responseRate: '92%'
};

const dailyResponses = [
  { date: '2024-01-01', responses: 45 },
  { date: '2024-01-02', responses: 52 },
  { date: '2024-01-03', responses: 48 },
  { date: '2024-01-04', responses: 70 },
  { date: '2024-01-05', responses: 61 },
  { date: '2024-01-06', responses: 65 },
  { date: '2024-01-07', responses: 75 }
];

export default function ResponsesPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter responses based on search term
  const filteredResponses = surveyResponses.filter(response =>
    response.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    response.surveyId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle export to CSV
  const handleExportCSV = () => {
    const headers = ['id', 'userId', 'surveyId', 'completedAt', 'xpGained'];
    const csvContent = generateCSV(filteredResponses, headers);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'survey_responses.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export Successful",
      description: "Survey responses have been exported to CSV",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Survey Responses</h1>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Responses"
            value={responseMetrics.totalResponses}
            icon={MessageSquare}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Average Time"
            value={responseMetrics.averageTime}
            icon={Clock}
            trend={{ value: -5, isPositive: false }}
          />
          <StatCard
            title="Completion Rate"
            value={responseMetrics.completionRate}
            icon={Filter}
            trend={{ value: 3, isPositive: true }}
          />
          <StatCard
            title="Response Rate"
            value={responseMetrics.responseRate}
            icon={MessageSquare}
            trend={{ value: 8, isPositive: true }}
          />
        </div>

        {/* Search and Export */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search responses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
              icon={Search}
            />
          </div>
          <Button onClick={handleExportCSV} className="bg-purple-600 hover:bg-purple-700">
            <Download className="w-4 h-4 mr-2" />
            Export to CSV
          </Button>
        </div>

        {/* Response Trend */}
        <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Response Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyResponses}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="responses" stroke="#9333ea" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Response List */}
        <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Recent Responses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {filteredResponses.slice(0, 10).map((response, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/30 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-purple-100">
                      <MessageSquare className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Survey {response.surveyId}</h3>
                      <p className="text-sm text-gray-600">User: {response.userId}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{response.xpGained} XP</p>
                    <p className="text-sm text-gray-600">{response.completedAt}</p>
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