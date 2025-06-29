'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserSession } from '@/lib/user-session';
import { Button } from '@/components/ui/button';
import { User, UserPlus, LogOut, Settings } from 'lucide-react';

interface UserProfile {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  age: number;
  gender: string;
  location?: string;
  bio?: string;
  personalityGoals?: string[];
  profileVisibility: 'public' | 'private';
  xp: number;
  createdAt: string;
}

export default function UserNav() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for current user on mount
    const user = UserSession.getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    UserSession.logout();
    setCurrentUser(null);
    window.location.href = '/';
  };

  if (loading) {
    return <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>;
  }

  if (!currentUser) {
    // Not logged in - show signup link
    return (
      <Link 
        href="/signup" 
        className="flex items-center space-x-1 text-gray-600 hover:text-purple-600 transition-colors"
      >
        <UserPlus className="w-4 h-4" />
        <span className="text-sm font-medium">Sign Up</span>
      </Link>
    );
  }

  // Logged in - show user menu
  const currentLevel = Math.floor(currentUser.xp / 100) + 1;
  
  return (
    <div className="flex items-center space-x-4">
      {/* Profile Link */}
      <Link 
        href={`/profile/${currentUser.username}`}
        className="flex items-center space-x-1 text-gray-600 hover:text-purple-600 transition-colors"
      >
        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
          <span className="text-sm font-semibold text-purple-600">
            {currentUser.firstName.charAt(0).toUpperCase()}
          </span>
        </div>
        <span className="text-sm font-medium hidden sm:inline">
          {currentUser.firstName}
        </span>
      </Link>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center space-x-1 text-gray-400 hover:text-red-500 transition-colors p-1"
        title="Logout"
      >
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  );
} 