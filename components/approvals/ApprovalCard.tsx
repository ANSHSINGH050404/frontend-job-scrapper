'use client';

import { formatDistanceToNow } from 'date-fns';
import { Mail, FileText, Eye, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ApprovalCardProps {
  approval: {
    _id: string;
    type: 'email' | 'form_submission' | 'application';
    entityData: any;
    requestedAt: string;
    status: string;
  };
  onPreview: () => void;
  onApprove: () => void;
  onReject: () => void;
}

export function ApprovalCard({ approval, onPreview, onApprove, onReject }: ApprovalCardProps) {
  const getIcon = () => {
    switch (approval.type) {
      case 'email':
        return <Mail className="w-5 h-5 text-blue-600" />;
      case 'application':
        return <FileText className="w-5 h-5 text-purple-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTitle = () => {
    if (approval.type === 'email') {
      return `Email to ${approval.entityData.recipient.name}`;
    }
    return 'Application Approval';
  };

  const getSubtitle = () => {
    if (approval.type === 'email') {
      return approval.entityData.subject;
    }
    return approval.entityData.coverLetter?.subject || 'Application materials';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <div className="p-2 bg-gray-50 rounded-lg">
            {getIcon()}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {getTitle()}
            </h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {getSubtitle()}
            </p>
            
            {approval.type === 'email' && (
              <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                <span>To: {approval.entityData.recipient.email}</span>
                <span>•</span>
                <span>{approval.entityData.recipient.role}</span>
              </div>
            )}

            <div className="flex items-center space-x-2 mt-2">
              <span className="text-xs text-gray-400">
                Requested {formatDistanceToNow(new Date(approval.requestedAt))} ago
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 ml-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onPreview}
          >
            <Eye className="w-4 h-4 mr-1" />
            Preview
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onReject}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <XCircle className="w-4 h-4 mr-1" />
            Reject
          </Button>
          <Button
            size="sm"
            onClick={onApprove}
            className="bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="w-4 h-4 mr-1" />
            Approve
          </Button>
        </div>
      </div>
    </div>
  );
}