import React from 'react';
import Icon from '../../../components/AppIcon';

const HistoricalClaimsPanel = ({ claimHistory }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-secondary/10 text-secondary w-10 h-10 rounded-full flex items-center justify-center">
          <Icon name="History" size={20} strokeWidth={2} />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Historical Claim Patterns</h3>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-foreground mb-1">{claimHistory?.totalClaims}</div>
            <div className="text-xs text-muted-foreground">Total Claims</div>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-foreground mb-1">{claimHistory?.approvedClaims}</div>
            <div className="text-xs text-muted-foreground">Approved Claims</div>
          </div>
        </div>

        <div className="space-y-3">
          {claimHistory?.recentClaims?.map((claim) => (
            <div 
              key={claim?.id}
              className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth"
            >
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground mb-1">{claim?.type}</div>
                <div className="text-xs text-muted-foreground">{claim?.date}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  claim?.status === 'Approved' ?'bg-success/10 text-success' 
                    : claim?.status === 'Rejected' ?'bg-error/10 text-error' :'bg-warning/10 text-warning'
                }`}>
                  {claim?.status}
                </span>
                <span className="text-sm font-semibold text-foreground">{claim?.amount}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Average Claim Amount</span>
            <span className="font-semibold text-foreground">{claimHistory?.averageAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalClaimsPanel;