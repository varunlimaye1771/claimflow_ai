import React from 'react';
import Icon from '../../../components/AppIcon';

const ClaimMetricsCard = ({ icon, label, value, subtext, trend, iconColor }) => {
  return (
    <div className="bg-card rounded-lg p-6 border border-border transition-smooth hover:shadow-elevated">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconColor}`}>
          <Icon name={icon} size={24} strokeWidth={2} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-medium ${trend?.isPositive ? 'text-success' : 'text-error'}`}>
            <Icon name={trend?.isPositive ? 'TrendingUp' : 'TrendingDown'} size={16} strokeWidth={2} />
            <span>{trend?.value}</span>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-3xl font-semibold text-foreground">{value}</p>
        {subtext && <p className="text-xs text-muted-foreground">{subtext}</p>}
      </div>
    </div>
  );
};

export default ClaimMetricsCard;