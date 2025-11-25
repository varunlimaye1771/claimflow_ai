import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AgenticTimelineModal = ({ isOpen, onClose, timelineData }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-foreground/40 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-background rounded-xl shadow-elevated max-w-3xl w-full mx-4 max-h-[80vh] overflow-hidden flex flex-col"
        onClick={(e) => e?.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="GitBranch" size={20} color="var(--color-primary)" strokeWidth={2} />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Agentic Timeline</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-muted transition-smooth"
            aria-label="Close timeline"
          >
            <Icon name="X" size={24} strokeWidth={2} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {timelineData?.map((entry, index) => (
              <div key={entry?.id} className="relative">
                {index !== timelineData?.length - 1 && (
                  <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-border" />
                )}
                <div className="flex gap-4">
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                      ${entry?.status === 'completed' 
                        ? 'bg-success text-success-foreground' 
                        : entry?.status === 'active' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground'
                      }
                    `}
                  >
                    <Icon name={entry?.icon} size={20} strokeWidth={2} />
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-semibold text-foreground">
                        {entry?.agentName}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {entry?.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {entry?.action}
                    </p>
                    {entry?.details && (
                      <div className="bg-muted/50 rounded-lg p-3 text-xs text-foreground space-y-1">
                        {entry?.details?.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Icon name="ChevronRight" size={14} strokeWidth={2} className="text-primary mt-0.5 flex-shrink-0" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-border">
          <Button variant="outline" onClick={onClose} fullWidth>
            Close Timeline
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AgenticTimelineModal;