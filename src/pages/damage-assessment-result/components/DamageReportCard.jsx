import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const DamageReportCard = ({ report }) => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev?.[sectionId]
    }));
  };

  const getSeverityColor = (severity) => {
    const colors = {
      critical: 'bg-error text-error-foreground',
      high: 'bg-warning text-warning-foreground',
      moderate: 'bg-accent text-accent-foreground',
      low: 'bg-success text-success-foreground'
    };
    return colors?.[severity?.toLowerCase()] || colors?.moderate;
  };

  const getSeverityIcon = (severity) => {
    const icons = {
      critical: 'AlertTriangle',
      high: 'AlertCircle',
      moderate: 'Info',
      low: 'CheckCircle2'
    };
    return icons?.[severity?.toLowerCase()] || 'Info';
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-3">
          <Icon name="FileText" size={20} color="var(--color-primary)" strokeWidth={2} />
          <h3 className="text-lg font-semibold text-foreground">Damage Assessment Report</h3>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <Icon name="Calendar" size={16} color="var(--color-muted-foreground)" strokeWidth={2} />
            <span className="text-muted-foreground">Analyzed: {report?.analyzedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon name="Clock" size={16} color="var(--color-muted-foreground)" strokeWidth={2} />
            <span className="text-muted-foreground">{report?.processingTime}</span>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="AlertTriangle" size={18} color="var(--color-error)" strokeWidth={2} />
              <span className="text-sm font-medium text-muted-foreground">Issues Detected</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{report?.issuesDetected}</div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="IndianRupee" size={18} color="var(--color-primary)" strokeWidth={2} />
              <span className="text-sm font-medium text-muted-foreground">Estimated Cost</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{report?.estimatedCost}</div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Target" size={18} color="var(--color-success)" strokeWidth={2} />
              <span className="text-sm font-medium text-muted-foreground">Confidence</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-foreground">{report?.overallConfidence}%</div>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-success transition-smooth"
                  style={{ width: `${report?.overallConfidence}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Icon name="List" size={16} strokeWidth={2} />
            Detected Issues
          </h4>
          {report?.detectedIssues?.map((issue, index) => (
            <div key={index} className="border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection(`issue-${index}`)}
                className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-smooth"
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className={`px-2 py-1 rounded-md text-xs font-semibold ${getSeverityColor(issue?.severity)}`}>
                    {issue?.severity}
                  </span>
                  <div className="text-left">
                    <div className="font-medium text-foreground">{issue?.component}</div>
                    <div className="text-sm text-muted-foreground">{issue?.issue}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-semibold text-foreground">{issue?.cost}</div>
                    <div className="text-xs text-muted-foreground">{issue?.confidence}% confidence</div>
                  </div>
                  <Icon
                    name={expandedSections?.[`issue-${index}`] ? "ChevronUp" : "ChevronDown"}
                    size={20}
                    strokeWidth={2}
                  />
                </div>
              </button>
              {expandedSections?.[`issue-${index}`] && (
                <div className="p-4 bg-muted/20 border-t border-border space-y-3">
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground mb-1">Description</div>
                    <div className="text-sm text-foreground">{issue?.description}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground mb-1">Recommended Action</div>
                    <div className="text-sm text-foreground">{issue?.recommendedAction}</div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon name="Zap" size={14} strokeWidth={2} />
                    <span>AI Detection Method: {issue?.detectionMethod}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DamageReportCard;