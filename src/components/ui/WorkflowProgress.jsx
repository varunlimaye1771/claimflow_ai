import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const WorkflowProgress = () => {
  const location = useLocation();

  const workflowSteps = [
    { 
      label: 'FNOL Intake', 
      path: '/fnol-intake-form',
      icon: 'FileText',
      description: 'Initial claim details'
    },
    { 
      label: 'Processing', 
      path: '/multi-agent-processing',
      icon: 'Cpu',
      description: 'AI analysis in progress'
    },
    { 
      label: 'Assessment', 
      path: '/damage-assessment-result',
      icon: 'Search',
      description: 'Damage evaluation'
    },
    { 
      label: 'Verification', 
      path: '/fraud-eligibility-result',
      icon: 'ShieldCheck',
      description: 'Fraud & eligibility check'
    },
    { 
      label: 'Settlement', 
      path: '/auto-settlement-summary',
      icon: 'CheckCircle2',
      description: 'Final settlement'
    }
  ];

  const currentStepIndex = workflowSteps?.findIndex(step => step?.path === location?.pathname);
  const isWorkflowActive = currentStepIndex !== -1;

  if (!isWorkflowActive || location?.pathname === '/claims-adjuster-dashboard') {
    return null;
  }

  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="hidden md:flex items-center justify-between gap-4">
          {workflowSteps?.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const isUpcoming = index > currentStepIndex;

            return (
              <React.Fragment key={step?.path}>
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      transition-smooth
                      ${isCompleted 
                        ? 'bg-success text-success-foreground' 
                        : isCurrent 
                        ? 'bg-primary text-primary-foreground animate-pulse-subtle' 
                        : 'bg-muted text-muted-foreground'
                      }
                    `}
                    aria-label={`Step ${index + 1}: ${step?.label}`}
                  >
                    {isCompleted ? (
                      <Icon name="Check" size={20} strokeWidth={2.5} />
                    ) : (
                      <Icon name={step?.icon} size={20} strokeWidth={2} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className={`
                        text-sm font-medium transition-smooth
                        ${isCurrent ? 'text-primary' : isCompleted ? 'text-success' : 'text-muted-foreground'}
                      `}
                    >
                      {step?.label}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {step?.description}
                    </div>
                  </div>
                </div>
                {index < workflowSteps?.length - 1 && (
                  <div
                    className={`
                      h-0.5 w-12 transition-smooth
                      ${isCompleted ? 'bg-success' : 'bg-border'}
                    `}
                    aria-hidden="true"
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div className="md:hidden space-y-3">
          {workflowSteps?.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;

            return (
              <div
                key={step?.path}
                className={`
                  flex items-center gap-3 p-3 rounded-lg transition-smooth
                  ${isCurrent ? 'bg-primary/5 border border-primary' : 'bg-card'}
                `}
              >
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                    transition-smooth
                    ${isCompleted 
                      ? 'bg-success text-success-foreground' 
                      : isCurrent 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                    }
                  `}
                >
                  {isCompleted ? (
                    <Icon name="Check" size={16} strokeWidth={2.5} />
                  ) : (
                    <Icon name={step?.icon} size={16} strokeWidth={2} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className={`
                      text-sm font-medium transition-smooth
                      ${isCurrent ? 'text-primary' : isCompleted ? 'text-success' : 'text-muted-foreground'}
                    `}
                  >
                    {step?.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {step?.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkflowProgress;