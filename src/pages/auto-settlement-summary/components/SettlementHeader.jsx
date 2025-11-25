import React from 'react';
import Icon from '../../../components/AppIcon';

const SettlementHeader = ({ claimId, processingTime }) => {
  return (
    <div className="bg-card rounded-lg p-6 border border-border shadow-subtle">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="CheckCircle2" size={24} color="var(--color-success)" strokeWidth={2.5} />
            <h1 className="text-2xl font-semibold text-foreground">Settlement Approved</h1>
          </div>
          <p className="text-muted-foreground">
            Your claim has been processed and approved for settlement
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="text-sm text-muted-foreground">Claim ID</div>
          <div className="text-base font-semibold text-foreground">{claimId}</div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={16} strokeWidth={2} />
          <span>Total Processing Time: <span className="font-medium text-foreground">{processingTime}</span></span>
        </div>
      </div>
    </div>
  );
};

export default SettlementHeader;