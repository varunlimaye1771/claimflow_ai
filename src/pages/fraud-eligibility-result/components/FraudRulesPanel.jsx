import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FraudRulesPanel = ({ rules }) => {
  const [expandedRules, setExpandedRules] = useState([]);

  const toggleRule = (ruleId) => {
    setExpandedRules(prev => 
      prev?.includes(ruleId) 
        ? prev?.filter(id => id !== ruleId)
        : [...prev, ruleId]
    );
  };

  const getRuleSeverityConfig = (severity) => {
    const configs = {
      low: { color: 'text-success', bgColor: 'bg-success/10', icon: 'Info' },
      medium: { color: 'text-warning', bgColor: 'bg-warning/10', icon: 'AlertTriangle' },
      high: { color: 'text-error', bgColor: 'bg-error/10', icon: 'AlertCircle' }
    };
    return configs?.[severity] || configs?.low;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-primary/10 text-primary w-10 h-10 rounded-full flex items-center justify-center">
          <Icon name="FileSearch" size={20} strokeWidth={2} />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Fraud Detection Rules</h3>
      </div>
      <div className="space-y-3">
        {rules?.map((rule) => {
          const isExpanded = expandedRules?.includes(rule?.id);
          const severityConfig = getRuleSeverityConfig(rule?.severity);

          return (
            <div 
              key={rule?.id}
              className="border border-border rounded-lg overflow-hidden transition-smooth hover:shadow-subtle"
            >
              <button
                onClick={() => toggleRule(rule?.id)}
                className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-smooth text-left"
                aria-expanded={isExpanded}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`${severityConfig?.bgColor} ${severityConfig?.color} w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0`}>
                    <Icon name={severityConfig?.icon} size={16} strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">{rule?.name}</div>
                    <div className="text-xs text-muted-foreground">{rule?.status}</div>
                  </div>
                </div>
                <Icon 
                  name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
                  size={20} 
                  strokeWidth={2}
                  className="text-muted-foreground flex-shrink-0"
                />
              </button>
              {isExpanded && (
                <div className="p-4 bg-background border-t border-border">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {rule?.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Confidence:</span>
                    <span className="text-xs font-medium text-foreground">{rule?.confidence}%</span>
                    <div className="flex-1 bg-muted rounded-full h-1.5 overflow-hidden ml-2">
                      <div 
                        className="h-full bg-primary transition-smooth"
                        style={{ width: `${rule?.confidence}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FraudRulesPanel;