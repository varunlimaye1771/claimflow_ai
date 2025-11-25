import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AcceptanceModal = ({ isOpen, onClose, onConfirm, amount }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative bg-background rounded-lg shadow-elevated max-w-md w-full p-6 animate-scale-in">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 mb-4">
            <Icon name="CheckCircle2" size={32} color="var(--color-success)" strokeWidth={2.5} />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Confirm Settlement Acceptance</h2>
          <p className="text-sm text-muted-foreground">
            You are about to accept the settlement amount of <span className="font-semibold text-primary">₹{amount?.toLocaleString('en-IN')}</span>
          </p>
        </div>
        
        <div className="bg-muted rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={18} color="var(--color-primary)" strokeWidth={2} className="flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              By accepting this settlement, you agree to the terms and conditions. The amount will be processed within 3-5 business days.
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            fullWidth
          >
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={onConfirm}
            iconName="Check"
            iconPosition="left"
            fullWidth
          >
            Accept Settlement
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AcceptanceModal;