import React from 'react';
import Icon from '../../../components/AppIcon';

const ProcessingTimeline = ({ timeline }) => {
  return (
    <div className="bg-card rounded-lg p-6 border border-border shadow-subtle">
      <div className="flex items-center gap-2 mb-6">
        <Icon name="Activity" size={20} color="var(--color-primary)" strokeWidth={2} />
        <h2 className="text-lg font-semibold text-foreground">Processing Timeline</h2>
      </div>
      <div className="space-y-4">
        {timeline?.map((stage, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                stage?.status === 'completed' ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                <Icon name={stage?.icon} size={18} strokeWidth={2.5} />
              </div>
              {index < timeline?.length - 1 && (
                <div className="w-0.5 h-12 bg-border mt-2" />
              )}
            </div>
            
            <div className="flex-1 pb-4">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm font-semibold text-foreground">{stage?.agent}</div>
                <div className="text-xs text-muted-foreground">{stage?.duration}</div>
              </div>
              <div className="text-sm text-muted-foreground mb-2">{stage?.action}</div>
              {stage?.result && (
                <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-success/10 text-success text-xs font-medium">
                  <Icon name="Check" size={12} strokeWidth={2.5} />
                  <span>{stage?.result}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessingTimeline;