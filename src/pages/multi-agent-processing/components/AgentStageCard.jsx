import React from 'react';
import Icon from '../../../components/AppIcon';

const AgentStageCard = ({ agent, isActive, isCompleted, isUpcoming }) => {
  return (
    <div
      className={`
        relative p-6 rounded-xl border-2 transition-all duration-500
        ${isActive 
          ? 'bg-primary/5 border-primary shadow-elevated animate-pulse-subtle' 
          : isCompleted 
          ? 'bg-success/5 border-success' :'bg-card border-border opacity-60'
        }
      `}
    >
      <div className="flex items-start gap-4">
        <div
          className={`
            w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0
            transition-all duration-500
            ${isActive 
              ? 'bg-primary text-primary-foreground animate-pulse' 
              : isCompleted 
              ? 'bg-success text-success-foreground' 
              : 'bg-muted text-muted-foreground'
            }
          `}
        >
          {isCompleted ? (
            <Icon name="CheckCircle2" size={28} strokeWidth={2.5} />
          ) : (
            <Icon name={agent?.icon} size={28} strokeWidth={2} />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3
              className={`
                text-lg font-semibold transition-colors
                ${isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-muted-foreground'}
              `}
            >
              {agent?.name}
            </h3>
            {isActive && (
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
          </div>

          <p className="text-sm text-muted-foreground mb-3">
            {agent?.description}
          </p>

          {isActive && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Icon name="Activity" size={16} strokeWidth={2} className="text-primary" />
                <span className="font-medium">{agent?.currentAction}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-1000 ease-linear"
                  style={{ width: `${agent?.progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{Math.round(agent?.progress || 0)}% complete</span>
                <span className="flex items-center gap-1">
                  <Icon name="Clock" size={12} strokeWidth={2} />
                  {agent?.estimatedTime}
                </span>
              </div>
            </div>
          )}

          {isCompleted && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-success">
                <Icon name="CheckCircle2" size={16} strokeWidth={2} />
                <span className="font-medium">Processing completed</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {agent?.completionSummary}
              </p>
            </div>
          )}

          {isUpcoming && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Clock" size={16} strokeWidth={2} />
              <span>Waiting for previous stage...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentStageCard;