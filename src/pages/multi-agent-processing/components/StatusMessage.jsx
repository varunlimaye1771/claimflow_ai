import React from 'react';
import Icon from '../../../components/AppIcon';

const StatusMessage = ({ message, type = 'info' }) => {
  const iconMap = {
    info: 'Info',
    success: 'CheckCircle2',
    processing: 'Loader2',
    warning: 'AlertTriangle'
  };

  const colorMap = {
    info: 'text-primary',
    success: 'text-success',
    processing: 'text-primary',
    warning: 'text-warning'
  };

  return (
    <div className="flex items-center justify-center gap-3 p-4 bg-card rounded-lg border border-border">
      <Icon 
        name={iconMap?.[type]} 
        size={20} 
        strokeWidth={2} 
        className={`${colorMap?.[type]} ${type === 'processing' ? 'animate-spin' : ''}`}
      />
      <p className="text-sm font-medium text-foreground">
        {message}
      </p>
    </div>
  );
};

export default StatusMessage;