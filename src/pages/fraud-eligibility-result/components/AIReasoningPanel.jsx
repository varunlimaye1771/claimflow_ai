import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AIReasoningPanel = ({ reasoningFactors }) => {
  const [expandedFactors, setExpandedFactors] = useState([]);

  const toggleFactor = (factorId) => {
    setExpandedFactors(prev => 
      prev?.includes(factorId) 
        ? prev?.filter(id => id !== factorId)
        : [...prev, factorId]
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-primary/10 text-primary w-10 h-10 rounded-full flex items-center justify-center">
          <Icon name="Brain" size={20} strokeWidth={2} />
        </div>
        <h3 className="text-lg font-semibold text-foreground">AI Decision Reasoning</h3>
      </div>
      <div className="space-y-3">
        {reasoningFactors?.map((factor) => {
          const isExpanded = expandedFactors?.includes(factor?.id);

          return (
            <div 
              key={factor?.id}
              className="border border-border rounded-lg overflow-hidden transition-smooth hover:shadow-subtle"
            >
              <button
                onClick={() => toggleFactor(factor?.id)}
                className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-smooth text-left"
                aria-expanded={isExpanded}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Lightbulb" size={16} strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground">{factor?.title}</div>
                    <div className="text-xs text-muted-foreground">Weight: {factor?.weight}%</div>
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
                    {factor?.explanation}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {factor?.dataPoints?.map((point, index) => (
                      <span 
                        key={index}
                        className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground"
                      >
                        {point}
                      </span>
                    ))}
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

export default AIReasoningPanel;