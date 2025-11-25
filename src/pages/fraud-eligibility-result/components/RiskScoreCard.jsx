import React from 'react';
import Icon from '../../../components/AppIcon';

const RiskScoreCard = ({ riskLevel, score, reasoning }) => {
  const getRiskConfig = (level) => {
    const configs = {
      low: {
        color: 'text-success',
        bgColor: 'bg-success/10',
        borderColor: 'border-success/20',
        icon: 'ShieldCheck',
        label: 'Low Risk'
      },
      medium: {
        color: 'text-warning',
        bgColor: 'bg-warning/10',
        borderColor: 'border-warning/20',
        icon: 'Shield',
        label: 'Medium Risk'
      },
      high: {
        color: 'text-error',
        bgColor: 'bg-error/10',
        borderColor: 'border-error/20',
        icon: 'ShieldAlert',
        label: 'High Risk'
      }
    };
    return configs?.[level] || configs?.low;
  };

  const config = getRiskConfig(riskLevel);

  return (
    <div className={`bg-card border ${config?.borderColor} rounded-lg p-6 transition-smooth hover:shadow-elevated`}>
      <div className="flex items-start gap-4">
        <div className={`${config?.bgColor} ${config?.color} w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0`}>
          <Icon name={config?.icon} size={28} strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-foreground">Fraud Risk Assessment</h3>
            <span className={`${config?.color} text-sm font-medium px-3 py-1 ${config?.bgColor} rounded-full`}>
              {config?.label}
            </span>
          </div>
          <div className="mb-4">
            <div className="flex items-baseline gap-2 mb-1">
              <span className={`text-3xl font-bold ${config?.color}`}>{score}</span>
              <span className="text-muted-foreground text-sm">/ 100</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full ${config?.color === 'text-success' ? 'bg-success' : config?.color === 'text-warning' ? 'bg-warning' : 'bg-error'} transition-smooth`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {reasoning}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RiskScoreCard;