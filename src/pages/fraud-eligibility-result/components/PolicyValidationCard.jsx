import React from 'react';
import Icon from '../../../components/AppIcon';

const PolicyValidationCard = ({ status, policyLimit, coverageDetails, eligibilityConfirmed }) => {
  const getStatusConfig = (status) => {
    return status === 'active' 
      ? { color: 'text-success', bgColor: 'bg-success/10', icon: 'CheckCircle2', label: 'Active Coverage' }
      : { color: 'text-error', bgColor: 'bg-error/10', icon: 'XCircle', label: 'Inactive Coverage' };
  };

  const statusConfig = getStatusConfig(status);

  return (
    <div className="bg-card border border-border rounded-lg p-6 transition-smooth hover:shadow-elevated">
      <div className="flex items-center gap-3 mb-4">
        <div className={`${statusConfig?.bgColor} ${statusConfig?.color} w-10 h-10 rounded-full flex items-center justify-center`}>
          <Icon name={statusConfig?.icon} size={20} strokeWidth={2} />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Policy Validation</h3>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
          <span className="text-sm text-muted-foreground">Coverage Status</span>
          <span className={`text-sm font-medium ${statusConfig?.color}`}>{statusConfig?.label}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
          <span className="text-sm text-muted-foreground">Policy Limit</span>
          <span className="text-sm font-semibold text-foreground">{policyLimit}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
          <span className="text-sm text-muted-foreground">Coverage Type</span>
          <span className="text-sm font-medium text-foreground">{coverageDetails}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-success/10 rounded-md border border-success/20">
          <span className="text-sm text-muted-foreground">Eligibility Status</span>
          <div className="flex items-center gap-2">
            <Icon name="CheckCircle2" size={16} color="var(--color-success)" strokeWidth={2} />
            <span className="text-sm font-medium text-success">
              {eligibilityConfirmed ? 'Confirmed' : 'Pending'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyValidationCard;