'use client';

import { JobCard } from './JobCard';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  url: string;
  score: number;
  status: string;
  description: string;
  requirements: string[];
  metadata: {
    remote: boolean;
    salary?: {
      min: number;
      max: number;
      currency: string;
    };
  };
}

interface JobQueueProps {
  jobs: Job[];
}

export function JobQueue({ jobs }: JobQueueProps) {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No jobs available yet.</p>
        <p className="text-sm text-gray-400 mt-2">
          The agent will discover new jobs during the next scheduled run.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
}