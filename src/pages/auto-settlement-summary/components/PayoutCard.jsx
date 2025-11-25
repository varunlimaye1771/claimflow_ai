import React from 'react';
import Icon from '../../../components/AppIcon';

const PayoutCard = ({ amount, settlementType, confidence }) => {
  return (
    <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-8 border-2 border-primary shadow-elevated">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Icon name="IndianRupee" size={32} color="var(--color-primary)" strokeWidth={2.5} />
        </div>
        
        <div className="mb-2">
          <div className="text-sm text-muted-foreground mb-1">Approved Settlement Amount</div>
          <div className="text-5xl font-bold text-primary mb-2">₹{amount?.toLocaleString('en-IN')}</div>
        </div>
        
        <div className="flex items-center justify-center gap-6 pt-4 border-t border-border/50">
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">Settlement Type</div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Icon name="Zap" size={14} strokeWidth={2.5} />
              <span>{settlementType}</span>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">Confidence Score</div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-success/10 text-success text-sm font-medium">
              <Icon name="TrendingUp" size={14} strokeWidth={2.5} />
              <span>{confidence}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayoutCard;