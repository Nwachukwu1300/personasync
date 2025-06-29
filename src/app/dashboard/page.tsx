'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/dashboard/StatCard';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
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
  LineChart,
  Line,
  Legend,
  Area,
  AreaChart
} from 'recharts';
import {
  Users,
  Brain,
  Trophy,
  Globe,
  Download,
  FileSpreadsheet,
  Copy,
  TrendingUp,
  Clock,
  Target,
  Award
} from 'lucide-react';
import {
  surveyResponses,
  responseDistributions,
  personaRankings,
  questionAnalytics,
  insights,
  dailyCompletions
} from '@/lib/mock-survey-data';
import { generateBusinessReport, generateCSV } from '@/lib/export-utils';

// Calculate dashboard stats
const dashboardStats = {
  totalResponses: surveyResponses.length,
  topPersona: personaRankings[0],
  averageXp: Math.round(surveyResponses.reduce((acc, curr) => acc + curr.xpGained, 0) / surveyResponses.length),
  topRegion: "Europe"
};

// Colors for charts
const COLORS = ['#9333ea', '#db2777', '#4f46e5', '#0891b2'];

export default function DashboardPage() {
  const { toast } = useToast();

  // Handle export to CSV
  const handleExportCSV = () => {
    const headers = ['id', 'userId', 'surveyId', 'completedAt', 'xpGained'];
    const csvContent = generateCSV(surveyResponses, headers);
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

  // Handle export to PDF/Report
  const handleExportReport = () => {
    const report = generateBusinessReport();
    const blob = new Blob([report], { type: 'text/markdown;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'business_report.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Report Generated",
      description: "Business report has been generated and downloaded",
    });
  };

  // Handle share insights
  const handleShareInsights = async () => {
    const shareData = {
      title: 'PersnaSync Insights',
      text: 'Check out our latest survey insights!',
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast({
          title: "Shared Successfully",
          description: "Insights have been shared",
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link Copied",
          description: "Dashboard link has been copied to clipboard",
        });
      }
    } catch (err) {
      toast({
        title: "Share Failed",
        description: "Unable to share insights. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Survey Responses"
            value={dashboardStats.totalResponses}
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Top Persona"
            value={dashboardStats.topPersona.persona}
            icon={Brain}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Average XP Earned"
            value={dashboardStats.averageXp}
            icon={Trophy}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Top Region"
            value={dashboardStats.topRegion}
            icon={Globe}
            trend={{ value: 3, isPositive: true }}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <Button onClick={handleExportCSV} className="bg-purple-600 hover:bg-purple-700">
            <Download className="w-4 h-4 mr-2" />
            Export to CSV
          </Button>
          <Button onClick={handleExportReport} className="bg-pink-600 hover:bg-pink-700">
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
          <Button onClick={handleShareInsights} className="bg-blue-600 hover:bg-blue-700">
            <Copy className="w-4 h-4 mr-2" />
            Share Insights
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Response Distribution Bar Chart */}
          <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Response Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={responseDistributions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="response" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#9333ea" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Persona Distribution Pie Chart */}
          <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Persona Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={personaRankings}
                      dataKey="count"
                      nameKey="persona"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {personaRankings.map((entry, index) => (
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

          {/* Daily Completions Line Chart */}
          <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Daily Completions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dailyCompletions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="completions" fill="#4f46e5" stroke="#4f46e5" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Question Analytics */}
          <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Question Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={questionAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="question" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="engagement" stroke="#9333ea" />
                    <Line type="monotone" dataKey="completion" stroke="#db2777" />
                  </LineChart>
                </ResponsiveContainer>
                </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Insights */}
        <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {insights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-white/30">
                  <div className="p-2 rounded-full bg-purple-100">
                    {index === 0 ? <TrendingUp className="w-5 h-5 text-purple-600" /> :
                     index === 1 ? <Target className="w-5 h-5 text-pink-600" /> :
                     <Award className="w-5 h-5 text-blue-600" />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{insight.title}</h4>
                    <p className="text-sm text-gray-600">{insight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </DashboardLayout>
  );
} 