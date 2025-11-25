import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const IncidentDetailsForm = ({ formData, errors, onChange }) => {
  const handleChange = (field) => (e) => {
    onChange(field, e?.target?.value);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Incident Date"
          type="date"
          value={formData?.incidentDate}
          onChange={handleChange('incidentDate')}
          error={errors?.incidentDate}
          required
          max={new Date()?.toISOString()?.split('T')?.[0]}
          description="When did the incident occur?"
        />

        <Input
          label="Incident Time"
          type="time"
          value={formData?.incidentTime}
          onChange={handleChange('incidentTime')}
          error={errors?.incidentTime}
          required
          description="Approximate time of incident"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Incident Description <span className="text-error">*</span>
        </label>
        <textarea
          value={formData?.description}
          onChange={handleChange('description')}
          placeholder="Provide a brief description of what happened (e.g., rear-end collision at traffic signal, vehicle hit by falling tree branch, etc.)"
          rows={4}
          className={`
            w-full px-4 py-3 rounded-lg border transition-smooth
            bg-input text-foreground placeholder:text-muted-foreground
            focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
            disabled:opacity-50 disabled:cursor-not-allowed
            ${errors?.description ? 'border-error' : 'border-border'}
          `}
        />
        {errors?.description && (
          <p className="mt-2 text-sm text-error flex items-center gap-2">
            <Icon name="AlertCircle" size={16} strokeWidth={2} />
            {errors?.description}
          </p>
        )}
        <p className="mt-2 text-xs text-muted-foreground">
          Minimum 20 characters required
        </p>
      </div>
      <Input
        label="Incident Location"
        type="text"
        value={formData?.location}
        onChange={handleChange('location')}
        placeholder="e.g., MG Road, Bangalore or Highway NH-48 near Gurgaon"
        error={errors?.location}
        required
        description="Street address or landmark where incident occurred"
      />
      <div>
        <Input
          label="Policy ID"
          type="text"
          value={formData?.policyId}
          onChange={handleChange('policyId')}
          placeholder="e.g., POL-2024-IN-123456"
          error={errors?.policyId}
          required
          description="Your insurance policy identification number"
          pattern="^POL-\d{4}-[A-Z]{2}-\d{6}$"
        />
        <div className="mt-2 flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
          <Icon name="Info" size={16} color="var(--color-primary)" strokeWidth={2} className="flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            Format: POL-YYYY-CC-NNNNNN (e.g., POL-2024-IN-123456)
          </p>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetailsForm;