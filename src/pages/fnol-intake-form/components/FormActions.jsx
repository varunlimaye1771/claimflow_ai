import React from 'react';
import Button from '../../../components/ui/Button';
import { AlertCircle } from 'lucide-react';

const FormActions = ({ onSubmit, isSubmitting, isValid }) => {
  return (
    <div className="flex flex-col gap-4">
      {!isValid && (
        <div className="flex items-start gap-3 p-4 bg-warning/10 border border-warning/20 rounded-lg">
          <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-warning mb-1">
              Please complete all required fields
            </p>
            <p className="text-xs text-muted-foreground">
              Make sure to fill in all incident details and upload at least one damage photo
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span>All data is encrypted and secure</span>
        </div>

        <Button
          variant="default"
          size="lg"
          onClick={onSubmit}
          loading={isSubmitting}
          disabled={!isValid || isSubmitting}
          iconName="ArrowRight"
          iconPosition="right"
          className="w-full sm:w-auto"
        >
          {isSubmitting ? 'Submitting Claim...' : 'Submit Claim & Start Processing'}
        </Button>
      </div>
    </div>
  );
};

export default FormActions;