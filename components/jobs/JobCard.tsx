'use client';

import { useState } from 'react';
import { ExternalLink, MapPin, DollarSign, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface JobCardProps {
  job: {
    _id: string;
    title: string;
    company: string;
    location: string;
    url: string;
    score: number;
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
  };
}

export function JobCard({ job }: JobCardProps) {
  const [expanded, setExpanded] = useState(false);

  const handleApply = async () => {
    // TODO: Trigger application creation
    console.log('Apply to job:', job._id);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{job.company}</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            Score: {job.score}
          </div>
        </div>
      </div>

      {/* Meta Info */}
      <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          {job.location}
        </div>
        {job.metadata.remote && (
          <div className="flex items-center">
            <Home className="w-4 h-4 mr-1" />
            Remote
          </div>
        )}
        {job.metadata.salary && (
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 mr-1" />
            {job.metadata.salary.min}k - {job.metadata.salary.max}k
          </div>
        )}
      </div>

      {/* Requirements */}
      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          {job.requirements.slice(0, 5).map((req, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium"
            >
              {req}
            </span>
          ))}
          {job.requirements.length > 5 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
              +{job.requirements.length - 5} more
            </span>
          )}
        </div>
      </div>

      {/* Description (collapsible) */}
      {expanded && (
        <div className="mt-4 text-sm text-gray-600 border-t border-gray-100 pt-4">
          {job.description.substring(0, 300)}...
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center space-x-3 mt-4">
        <Button onClick={handleApply} className="bg-blue-600 hover:bg-blue-700">
          Apply Now
        </Button>
        <Button variant="outline" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Less Details' : 'More Details'}
        </Button>
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm text-blue-600 hover:text-blue-700"
        >
          <ExternalLink className="w-4 h-4 mr-1" />
          View Original
        </a>
      </div>
    </div>
  );
}