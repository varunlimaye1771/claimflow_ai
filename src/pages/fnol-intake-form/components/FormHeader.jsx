import React from 'react';
import Icon from '../../../components/AppIcon';

const FormHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
        <Icon name="FileText" size={32} color="var(--color-primary)" strokeWidth={2} />
      </div>
      <h1 className="text-3xl font-bold text-foreground mb-2">
        First Notice of Loss (FNOL)
      </h1>
      <p className="text-muted-foreground text-base max-w-2xl mx-auto">
        Submit your vehicle damage claim details and photos to begin AI-powered processing. Our intelligent agents will analyze your claim and provide instant settlement decisions.
      </p>
    </div>
  );
};

export default FormHeader;