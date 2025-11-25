import React from 'react';
import Icon from '../../../components/AppIcon';

const ReasoningCard = ({ reasoning }) => {
  return (
    <div className="bg-card rounded-lg p-6 border border-border shadow-subtle">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Brain" size={20} color="var(--color-primary)" strokeWidth={2} />
        <h2 className="text-lg font-semibold text-foreground">AI Settlement Reasoning</h2>
      </div>
      <div className="space-y-4">
        {reasoning?.map((item, index) => (
          <div key={index} className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
              <span className="text-xs font-semibold text-primary">{index + 1}</span>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground mb-1">{item?.title}</div>
              <div className="text-sm text-muted-foreground leading-relaxed">{item?.description}</div>
              {item?.confidence && (
                <div className="flex items-center gap-1.5 mt-2">
                  <Icon name="Target" size={14} color="var(--color-success)" strokeWidth={2} />
                  <span className="text-xs text-success font-medium">Confidence: {item?.confidence}%</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReasoningCard;