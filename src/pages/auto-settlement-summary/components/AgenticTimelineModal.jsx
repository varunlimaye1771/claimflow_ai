import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AgenticTimelineModal = ({ isOpen, onClose, agentDecisions }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
      <div 
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative bg-background rounded-lg shadow-elevated max-w-3xl w-full my-8 animate-scale-in">
        <div className="sticky top-0 bg-background border-b border-border rounded-t-lg p-6 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="GitBranch" size={20} color="var(--color-primary)" strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Complete Agentic Timeline</h2>
                <p className="text-sm text-muted-foreground">Transparent AI decision-making process</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition-smooth"
              aria-label="Close timeline"
            >
              <Icon name="X" size={20} strokeWidth={2} />
            </button>
          </div>
        </div>
        
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-6">
            {agentDecisions?.map((decision, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    decision?.status === 'completed' ? 'bg-success text-success-foreground' : 'bg-primary text-primary-foreground'
                  }`}>
                    <Icon name={decision?.icon} size={20} strokeWidth={2.5} />
                  </div>
                  {index < agentDecisions?.length - 1 && (
                    <div className="w-0.5 flex-1 bg-border min-h-[40px] mt-2" />
                  )}
                </div>
                
                <div className="flex-1 pb-6">
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-base font-semibold text-foreground">{decision?.agent}</div>
                      <div className="text-xs text-muted-foreground">{decision?.timestamp}</div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground mb-3">{decision?.action}</div>
                    
                    <div className="space-y-2">
                      {decision?.findings?.map((finding, fIndex) => (
                        <div key={fIndex} className="flex items-start gap-2 text-sm">
                          <Icon name="ChevronRight" size={16} color="var(--color-primary)" strokeWidth={2} className="flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">{finding}</span>
                        </div>
                      ))}
                    </div>
                    
                    {decision?.confidence && (
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
                        <Icon name="Target" size={14} color="var(--color-success)" strokeWidth={2} />
                        <span className="text-xs text-success font-medium">Confidence: {decision?.confidence}%</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="sticky bottom-0 bg-background border-t border-border rounded-b-lg p-6">
          <Button
            variant="outline"
            onClick={onClose}
            fullWidth
          >
            Close Timeline
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AgenticTimelineModal;