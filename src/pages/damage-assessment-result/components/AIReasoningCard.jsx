import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AIReasoningCard = ({ reasoning }) => {
  const [expandedFactors, setExpandedFactors] = useState({});

  const toggleFactor = (factorId) => {
    setExpandedFactors(prev => ({
      ...prev,
      [factorId]: !prev?.[factorId]
    }));
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Icon name="Brain" size={20} color="var(--color-primary)" strokeWidth={2} />
          <h3 className="text-lg font-semibold text-foreground">AI Analysis Reasoning</h3>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Icon name="Lightbulb" size={20} color="var(--color-primary)" strokeWidth={2} className="flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-foreground mb-1">Analysis Summary</div>
              <div className="text-sm text-muted-foreground">{reasoning?.summary}</div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Icon name="Layers" size={16} strokeWidth={2} />
            Key Decision Factors
          </div>
          {reasoning?.factors?.map((factor, index) => (
            <div key={index} className="border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFactor(`factor-${index}`)}
                className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-smooth"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={factor?.icon} size={16} color="var(--color-primary)" strokeWidth={2} />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-foreground">{factor?.title}</div>
                    <div className="text-sm text-muted-foreground">{factor?.weight}% weight</div>
                  </div>
                </div>
                <Icon
                  name={expandedFactors?.[`factor-${index}`] ? "ChevronUp" : "ChevronDown"}
                  size={20}
                  strokeWidth={2}
                />
              </button>
              {expandedFactors?.[`factor-${index}`] && (
                <div className="p-4 bg-muted/20 border-t border-border">
                  <div className="text-sm text-foreground mb-3">{factor?.explanation}</div>
                  {factor?.dataPoints && factor?.dataPoints?.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-muted-foreground">Supporting Data</div>
                      {factor?.dataPoints?.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <Icon name="Check" size={14} color="var(--color-success)" strokeWidth={2} className="flex-shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-border">
          <div className="text-sm font-semibold text-foreground mb-3">Model Information</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-muted/30 rounded-lg p-3">
              <div className="text-xs text-muted-foreground mb-1">AI Model</div>
              <div className="text-sm font-medium text-foreground">{reasoning?.modelInfo?.name}</div>
            </div>
            <div className="bg-muted/30 rounded-lg p-3">
              <div className="text-xs text-muted-foreground mb-1">Version</div>
              <div className="text-sm font-medium text-foreground">{reasoning?.modelInfo?.version}</div>
            </div>
            <div className="bg-muted/30 rounded-lg p-3">
              <div className="text-xs text-muted-foreground mb-1">Training Data</div>
              <div className="text-sm font-medium text-foreground">{reasoning?.modelInfo?.trainingData}</div>
            </div>
            <div className="bg-muted/30 rounded-lg p-3">
              <div className="text-xs text-muted-foreground mb-1">Accuracy Rate</div>
              <div className="text-sm font-medium text-foreground">{reasoning?.modelInfo?.accuracy}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIReasoningCard;