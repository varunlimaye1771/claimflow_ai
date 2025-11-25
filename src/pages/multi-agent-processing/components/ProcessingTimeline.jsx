import React from 'react';
import Icon from '../../../components/AppIcon';

const ProcessingTimeline = ({ agents, currentStage }) => {
  return (
    <div className="hidden lg:flex items-center justify-between gap-4 mb-8">
      {agents?.map((agent, index) => {
        const isCompleted = index < currentStage;
        const isCurrent = index === currentStage;
        const isUpcoming = index > currentStage;

        return (
          <React.Fragment key={agent?.id}>
            <div className="flex flex-col items-center gap-2 flex-1">
              <div
                className={`
                  w-16 h-16 rounded-full flex items-center justify-center
                  transition-all duration-500
                  ${isCompleted 
                    ? 'bg-success text-success-foreground' 
                    : isCurrent 
                    ? 'bg-primary text-primary-foreground animate-pulse' 
                    : 'bg-muted text-muted-foreground'
                  }
                `}
              >
                {isCompleted ? (
                  <Icon name="Check" size={32} strokeWidth={2.5} />
                ) : (
                  <Icon name={agent?.icon} size={32} strokeWidth={2} />
                )}
              </div>
              <div className="text-center">
                <div
                  className={`
                    text-sm font-medium transition-colors
                    ${isCurrent ? 'text-primary' : isCompleted ? 'text-success' : 'text-muted-foreground'}
                  `}
                >
                  {agent?.shortName}
                </div>
                {isCurrent && (
                  <div className="text-xs text-muted-foreground mt-1">
                    {agent?.estimatedTime}
                  </div>
                )}
              </div>
            </div>
            {index < agents?.length - 1 && (
              <div
                className={`
                  h-1 flex-1 transition-all duration-500
                  ${isCompleted ? 'bg-success' : 'bg-border'}
                `}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ProcessingTimeline;