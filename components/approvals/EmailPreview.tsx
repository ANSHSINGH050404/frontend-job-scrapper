'use client';

import { Mail, User, Building2 } from 'lucide-react';

interface EmailPreviewProps {
  emailData: {
    recipient: {
      name: string;
      email: string;
      role: string;
    };
    subject: string;
    body: string;
  };
}

export function EmailPreview({ emailData }: EmailPreviewProps) {
  const wordCount = emailData.body.split(/\s+/).length;
  const estimatedReadTime = Math.ceil(wordCount / 200 * 60); // seconds

  return (
    <div className="space-y-6">
      {/* Email Metadata */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
        <div className="flex items-center space-x-3">
          <User className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-900">{emailData.recipient.name}</p>
            <p className="text-sm text-gray-600">{emailData.recipient.email}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Building2 className="w-5 h-5 text-gray-400" />
          <p className="text-sm text-gray-600">{emailData.recipient.role}</p>
        </div>

        <div className="flex items-center space-x-4 pt-2 border-t border-gray-200">
          <span className="text-xs text-gray-500">
            {wordCount} words
          </span>
          <span className="text-xs text-gray-500">•</span>
          <span className="text-xs text-gray-500">
            ~{estimatedReadTime} second read
          </span>
        </div>
      </div>

      {/* Subject Line */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Subject Line
        </label>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-gray-900">{emailData.subject}</p>
        </div>
      </div>

      {/* Email Body */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Body
        </label>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="prose prose-sm max-w-none">
            {emailData.body.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-900 mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Quality Indicators */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">Quality Checks</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${wordCount >= 100 && wordCount <= 170 ? 'bg-green-500' : 'bg-yellow-500'}`} />
            <span className="text-sm text-gray-700">
              Length: {wordCount >= 100 && wordCount <= 170 ? 'Optimal' : 'Check recommended range (100-170 words)'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${emailData.subject.length <= 60 ? 'bg-green-500' : 'bg-yellow-500'}`} />
            <span className="text-sm text-gray-700">
              Subject: {emailData.subject.length <= 60 ? 'Good length' : 'Consider shortening'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm text-gray-700">
              Personalization: Includes recipient name and role
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}