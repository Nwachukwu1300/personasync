import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Brain, 
  MessageSquare, 
  Settings,
  Download,
  FileSpreadsheet
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Traits', href: '/dashboard/traits', icon: Brain },
  { name: 'Responses', href: '/dashboard/responses', icon: MessageSquare },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Side Navigation */}
      <nav className="fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 p-4">
        <div className="flex items-center gap-2 px-2 py-4 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">PS</span>
          </div>
          <span className="text-lg font-semibold text-gray-900">PersonaSync</span>
        </div>

        {/* Navigation Links */}
        <div className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-purple-50 text-purple-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Export Actions */}
        <div className="absolute bottom-8 left-4 right-4 space-y-2">
          <button className="w-full flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <Download className="w-5 h-5" />
            <span>Download Report</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
            <FileSpreadsheet className="w-5 h-5" />
            <span>Export CSV</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
} 