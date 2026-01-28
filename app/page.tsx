'use client';

import { useEffect, useState } from 'react';
import { useJobs } from '@/lib/hooks/useJobs';
import { useApplications } from '@/lib/hooks/useApplication';
import { JobQueue } from '@/components/jobs/JobQueue';
import { StatsCard } from '@/components/analytics/StatsCard';
import { Briefcase, Send, CheckCircle, Clock } from 'lucide-react';

export default function DashboardPage() {
  const { data: jobs, isLoading: jobsLoading } = useJobs({ status: 'scored' });
  const { data: applications, isLoading: appsLoading } = useApplications();

  const stats = {
    jobsDiscovered: jobs?.length || 0,
    applicationsSubmitted: applications?.filter(a => a.status === 'submitted').length || 0,
    emailsSent: applications?.filter(a => a.emailSent).length || 0,
    pendingApprovals: applications?.filter(a => a.status === 'pending_approval').length || 0,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Job Agent Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">
            Your AI-powered job application assistant
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Jobs Discovered"
            value={stats.jobsDiscovered}
            icon={<Briefcase className="w-5 h-5" />}
            color="blue"
          />
          <StatsCard
            title="Applications Submitted"
            value={stats.applicationsSubmitted}
            icon={<Send className="w-5 h-5" />}
            color="green"
          />
          <StatsCard
            title="Emails Sent"
            value={stats.emailsSent}
            icon={<CheckCircle className="w-5 h-5" />}
            color="purple"
          />
          <StatsCard
            title="Pending Approvals"
            value={stats.pendingApprovals}
            icon={<Clock className="w-5 h-5" />}
            color="orange"
          />
        </div>

        {/* Job Queue */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Available Jobs</h2>
            <p className="text-sm text-gray-600 mt-1">
              High-scoring jobs ready for application
            </p>
          </div>
          <div className="p-6">
            {jobsLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <JobQueue jobs={jobs || []} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}