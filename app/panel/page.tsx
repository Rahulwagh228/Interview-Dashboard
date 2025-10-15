'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from "@/components/sidebar/Sidebar";
import { useAuth } from "@/lib/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction, Clock, Wrench } from "lucide-react";

const PanelPage = () => {
  const router = useRouter();
  const { getUserRole, hasValidToken, isLoading } = useAuth();

  // Check authentication and authorization
  useEffect(() => {
    if (!isLoading && !hasValidToken()) {
      router.push('/login');
      return;
    }

    // Check if user has permission to access panel (only panelist and ta_admin)
    const userRole = getUserRole();
    if (!isLoading && hasValidToken() && !['panelist', 'ta_admin'].includes(userRole)) {
      router.push('/dashboard');
      return;
    }
  }, [isLoading, hasValidToken, getUserRole, router]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!hasValidToken()) {
    return null;
  }

  // Check authorization
  const userRole = getUserRole();
  if (!['panelist', 'ta_admin'].includes(userRole)) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-0 lg:ml-64">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Panel</h1>
            <p className="text-gray-600">
              Interview management and scheduling dashboard
            </p>
          </div>

          {/* Coming Soon Card */}
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-orange-100 rounded-full w-fit">
                  <Construction className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
                  Work in Progress
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  The interview panel feature is currently under development
                </CardDescription>
              </CardHeader>
              
              <CardContent className="text-center space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="h-5 w-5 text-yellow-600 mr-2" />
                    <span className="font-semibold text-yellow-800">Coming Soon</span>
                  </div>
                  <p className="text-yellow-700 text-sm">
                    This feature will include interview scheduling, candidate management, 
                    and evaluation tools for panelists.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <Wrench className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-blue-800 mb-1">Planned Features</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Interview Scheduling</li>
                      <li>• Candidate Profiles</li>
                      <li>• Evaluation Forms</li>
                      <li>• Panel Management</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <Clock className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-green-800 mb-1">Current Status</h3>
                    <div className="text-sm text-green-700 space-y-1">
                      <div>Design Phase: ✓</div>
                      <div>Development: 🔄</div>
                      <div>Testing: ⏳</div>
                      <div>Deployment: ⏳</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                  <p className="text-gray-600 text-sm">
                    <strong>Note:</strong> This page is accessible only to Panelists and TA Admins. 
                    For now, you can use other available features in the dashboard.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelPage;