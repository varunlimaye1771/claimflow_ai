import React from 'react';
import Icon from '../../../components/AppIcon';

const VerificationResultsPanel = ({ verifications }) => {
  const getVerificationIcon = (status) => {
    return status === 'verified' ? 'CheckCircle2' : status === 'failed' ? 'XCircle' : 'Clock';
  };

  const getVerificationColor = (status) => {
    return status === 'verified' 
      ? 'text-success' 
      : status === 'failed' ?'text-error' :'text-warning';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-accent/10 text-accent w-10 h-10 rounded-full flex items-center justify-center">
          <Icon name="ClipboardCheck" size={20} strokeWidth={2} />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Automated Verification Results</h3>
      </div>
      <div className="space-y-3">
        {verifications?.map((verification) => {
          const iconName = getVerificationIcon(verification?.status);
          const colorClass = getVerificationColor(verification?.status);

          return (
            <div 
              key={verification?.id}
              className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth"
            >
              <div className={`${colorClass} flex-shrink-0 mt-0.5`}>
                <Icon name={iconName} size={20} strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{verification?.name}</span>
                  <span className="text-xs text-muted-foreground">{verification?.confidence}% confidence</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {verification?.details}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VerificationResultsPanel;