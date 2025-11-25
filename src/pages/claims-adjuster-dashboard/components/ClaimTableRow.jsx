import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ClaimTableRow = ({ claim }) => {
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
    <>
      <tr className="border-b border-border hover:bg-muted/50 transition-smooth">
        <td className="px-6 py-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-muted rounded transition-smooth"
            aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
          >
            <Icon 
              name={isExpanded ? 'ChevronDown' : 'ChevronRight'} 
              size={20} 
              strokeWidth={2} 
            />
          </button>
        </td>
        <td className="px-6 py-4">
          <div className="space-y-1">
            <p className="font-medium text-foreground">{claim?.claimId}</p>
            <p className="text-xs text-muted-foreground">{claim?.policyId}</p>
          </div>
        </td>
        <td className="px-6 py-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(claim?.status)}`}>
            <Icon 
              name={claim?.status === 'Approved' ? 'CheckCircle2' : claim?.status === 'Pending' ? 'Clock' : 'XCircle'} 
              size={14} 
              strokeWidth={2} 
            />
            {claim?.status}
          </span>
        </td>
        <td className="px-6 py-4">
          <p className="font-semibold text-foreground">{claim?.payoutAmount}</p>
        </td>
        <td className="px-6 py-4">
          <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-medium ${getRiskBadgeColor(claim?.fraudRisk)}`}>
            {claim?.fraudRisk} Risk
          </span>
        </td>
        <td className="px-6 py-4">
          <div className="space-y-1">
            <p className="text-sm text-foreground">{claim?.processedDate}</p>
            <p className="text-xs text-muted-foreground">{claim?.processedTime}</p>
          </div>
        </td>
        <td className="px-6 py-4">
          <p className="text-sm text-muted-foreground">{claim?.processingDuration}</p>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Eye"
              iconPosition="left"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              View
            </Button>
            <Button
              variant="ghost"
              size="sm"
              disabled
              iconName="Edit"
              title="Override functionality disabled in prototype"
            />
          </div>
        </td>
      </tr>
      {isExpanded && (
        <tr className="border-b border-border bg-muted/30">
          <td colSpan="8" className="px-6 py-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Icon name="FileText" size={18} strokeWidth={2} />
                    Damage Summary
                  </h4>
                  <div className="bg-card rounded-lg p-4 border border-border space-y-3">
                    {claim?.damageSummary?.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium text-foreground">{item?.component}</p>
                          <p className="text-xs text-muted-foreground">{item?.damage}</p>
                          <div className="flex items-center gap-4 text-xs">
                            <span className="text-muted-foreground">Severity: <span className="font-medium text-foreground">{item?.severity}</span></span>
                            <span className="text-muted-foreground">Cost: <span className="font-medium text-foreground">{item?.estimatedCost}</span></span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Icon name="ShieldCheck" size={18} strokeWidth={2} />
                    Fraud & Eligibility Check
                  </h4>
                  <div className="bg-card rounded-lg p-4 border border-border space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Fraud Risk Score</span>
                      <span className={`text-sm font-semibold ${getRiskBadgeColor(claim?.fraudRisk)}`}>
                        {claim?.fraudDetails?.riskScore}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Coverage Status</span>
                      <span className="text-sm font-medium text-success">{claim?.fraudDetails?.coverageStatus}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Policy Limit</span>
                      <span className="text-sm font-medium text-foreground">{claim?.fraudDetails?.policyLimit}</span>
                    </div>
                    <div className="pt-3 border-t border-border">
                      <p className="text-xs text-muted-foreground mb-2">Key Findings:</p>
                      <ul className="space-y-1.5">
                        {claim?.fraudDetails?.findings?.map((finding, index) => (
                          <li key={index} className="text-xs text-foreground flex items-start gap-2">
                            <Icon name="Check" size={14} strokeWidth={2} className="text-success mt-0.5 flex-shrink-0" />
                            <span>{finding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Icon name="Activity" size={18} strokeWidth={2} />
                  Agent Action Timeline
                </h4>
                <div className="bg-card rounded-lg p-4 border border-border">
                  <div className="space-y-4">
                    {claim?.agentTimeline?.map((action, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${action?.status === 'completed' ? 'bg-success text-success-foreground' : 'bg-primary text-primary-foreground'}`}>
                            <Icon name={action?.icon} size={16} strokeWidth={2} />
                          </div>
                          {index < claim?.agentTimeline?.length - 1 && (
                            <div className="w-0.5 h-12 bg-border mt-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-start justify-between mb-1">
                            <p className="text-sm font-medium text-foreground">{action?.agent}</p>
                            <span className="text-xs text-muted-foreground">{action?.timestamp}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{action?.action}</p>
                          <div className="bg-muted/50 rounded-md p-3 space-y-2">
                            <p className="text-xs font-medium text-foreground">Decision Reasoning:</p>
                            <p className="text-xs text-muted-foreground">{action?.reasoning}</p>
                            {action?.confidence && (
                              <div className="flex items-center gap-2 pt-2">
                                <span className="text-xs text-muted-foreground">Confidence:</span>
                                <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-success rounded-full transition-smooth"
                                    style={{ width: action?.confidence }}
                                  />
                                </div>
                                <span className="text-xs font-medium text-foreground">{action?.confidence}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {claim?.damagePhotos && claim?.damagePhotos?.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Icon name="Image" size={18} strokeWidth={2} />
                    Damage Evidence Photos
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {claim?.damagePhotos?.map((photo, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-border group">
                        <Image
                          src={photo?.url}
                          alt={photo?.alt}
                          className="w-full h-full object-cover transition-smooth group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-smooth" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default ClaimTableRow;