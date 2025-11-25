import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const MobileClaimCard = ({ claim }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'rejected':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getRiskBadgeColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case 'low':
        return 'bg-success/10 text-success';
      case 'medium':
        return 'bg-warning/10 text-warning';
      case 'high':
        return 'bg-error/10 text-error';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-4 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="font-semibold text-foreground">{claim?.claimId}</p>
            <p className="text-xs text-muted-foreground">{claim?.policyId}</p>
          </div>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(claim?.status)}`}>
            <Icon 
              name={claim?.status === 'Approved' ? 'CheckCircle2' : claim?.status === 'Pending' ? 'Clock' : 'XCircle'} 
              size={14} 
              strokeWidth={2} 
            />
            {claim?.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Payout Amount</p>
            <p className="text-lg font-semibold text-foreground">{claim?.payoutAmount}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Fraud Risk</p>
            <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-medium ${getRiskBadgeColor(claim?.fraudRisk)}`}>
              {claim?.fraudRisk} Risk
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Processed</p>
            <p className="text-sm text-foreground">{claim?.processedDate}</p>
            <p className="text-xs text-muted-foreground">{claim?.processedTime}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Duration</p>
            <p className="text-sm text-foreground">{claim?.processingDuration}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-3 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
            iconPosition="right"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Hide Details' : 'View Details'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            disabled
            iconName="Edit"
            title="Override functionality disabled in prototype"
          />
        </div>
      </div>
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-border bg-muted/30">
          <div className="pt-4 space-y-3">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Icon name="FileText" size={16} strokeWidth={2} />
              Damage Summary
            </h4>
            <div className="space-y-3">
              {claim?.damageSummary?.map((item, index) => (
                <div key={index} className="bg-card rounded-lg p-3 border border-border space-y-2">
                  <p className="text-sm font-medium text-foreground">{item?.component}</p>
                  <p className="text-xs text-muted-foreground">{item?.damage}</p>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-muted-foreground">Severity: <span className="font-medium text-foreground">{item?.severity}</span></span>
                    <span className="text-muted-foreground">Cost: <span className="font-medium text-foreground">{item?.estimatedCost}</span></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Icon name="ShieldCheck" size={16} strokeWidth={2} />
              Fraud & Eligibility
            </h4>
            <div className="bg-card rounded-lg p-3 border border-border space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Risk Score</span>
                <span className={`font-semibold ${getRiskBadgeColor(claim?.fraudRisk)}`}>
                  {claim?.fraudDetails?.riskScore}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Coverage</span>
                <span className="font-medium text-success">{claim?.fraudDetails?.coverageStatus}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Policy Limit</span>
                <span className="font-medium text-foreground">{claim?.fraudDetails?.policyLimit}</span>
              </div>
            </div>
          </div>

          {claim?.damagePhotos && claim?.damagePhotos?.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Icon name="Image" size={16} strokeWidth={2} />
                Evidence Photos
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {claim?.damagePhotos?.map((photo, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-border">
                    <Image
                      src={photo?.url}
                      alt={photo?.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileClaimCard;