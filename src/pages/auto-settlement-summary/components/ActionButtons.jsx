import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const ActionButtons = ({ onAcceptSettlement, onViewTimeline }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-card rounded-lg p-6 border border-border shadow-subtle">
      <div className="space-y-4">
        <Button
          variant="default"
          size="lg"
          onClick={onAcceptSettlement}
          iconName="CheckCircle2"
          iconPosition="left"
          fullWidth
        >
          Accept Settlement
        </Button>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={onViewTimeline}
            iconName="Activity"
            iconPosition="left"
            fullWidth
          >
            View Agentic Timeline
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => navigate('/fraud-eligibility-result')}
            iconName="ArrowLeft"
            iconPosition="left"
            fullWidth
          >
            Review Previous Stage
          </Button>
        </div>
        
        <div className="pt-4 border-t border-border">
          <div className="text-xs text-muted-foreground text-center">
            Need assistance? Contact our support team at support@claimflow.ai
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionButtons;