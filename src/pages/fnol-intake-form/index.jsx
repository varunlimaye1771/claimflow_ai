import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import WorkflowProgress from '../../components/ui/WorkflowProgress';
import FormHeader from './components/FormHeader';
import PhotoUploadZone from './components/PhotoUploadZone';
import IncidentDetailsForm from './components/IncidentDetailsForm';
import FormActions from './components/FormActions';
import { AlertCircle } from 'lucide-react';

const FNOLIntakeForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [formData, setFormData] = useState({
    incidentDate: '',
    incidentTime: '',
    description: '',
    location: '',
    policyId: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedData = localStorage.getItem('fnolFormData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed?.formData || formData);
        if (parsed?.photos && parsed?.photos?.length > 0) {
          setPhotos(parsed?.photos?.map(p => ({
            ...p,
            uploading: false
          })));
        }
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    }
  }, []);

  useEffect(() => {
    const dataToSave = {
      formData,
      photos: photos?.map(p => ({
        id: p?.id,
        name: p?.name,
        size: p?.size,
        preview: p?.preview
      }))
    };
    localStorage.setItem('fnolFormData', JSON.stringify(dataToSave));
  }, [formData, photos]);

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.incidentDate) {
      newErrors.incidentDate = 'Incident date is required';
    }

    if (!formData?.incidentTime) {
      newErrors.incidentTime = 'Incident time is required';
    }

    if (!formData?.description || formData?.description?.trim()?.length < 5) {
      newErrors.description = 'Description must be at least 5 characters';
    }

    if (!formData?.location || formData?.location?.trim()?.length < 5) {
      newErrors.location = 'Please provide a valid location';
    }

    if (!formData?.policyId) {
      newErrors.policyId = 'Policy ID is required';
    } else if (!/^POL-\d{4}-[A-Z]{2}-\d{6}$/?.test(formData?.policyId)) {
      newErrors.policyId = 'Invalid policy ID format (e.g., POL-2024-IN-123456)';
    }

    if (photos?.length === 0) {
      newErrors.photos = 'At least one damage photo is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)?.[0];
      if (firstErrorField) {
        const element = document.querySelector(`[name="${firstErrorField}"]`);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    const claimData = {
      claimId: `CLM-${Date.now()}-${Math.random()?.toString(36)?.substr(2, 9)?.toUpperCase()}`,
      submittedAt: new Date()?.toISOString(),
      ...formData,
      photos: photos?.map(p => ({
        id: p?.id,
        name: p?.name,
        size: p?.size,
        preview: p?.preview
      }))
    };

    localStorage.setItem('currentClaim', JSON.stringify(claimData));

    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/multi-agent-processing');
    }, 2000);
  };

  const isFormValid = () => {
    return (formData?.incidentDate &&
    formData?.incidentTime &&
    formData?.description?.trim()?.length >= 5 &&
    formData?.location?.trim()?.length >= 5 &&
    formData?.policyId &&
    /^POL-\d{4}-[A-Z]{2}-\d{6}$/?.test(formData?.policyId) && photos?.length > 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WorkflowProgress />
      <main className="pt-[136px]">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <FormHeader />

          {/* AI Guidance Banner */}
          <div className="mb-6 bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-foreground">
              <span className="font-semibold">Upload the damage photo and sit back</span> — our AI agents will autonomously assess your claim end-to-end.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl shadow-elevated p-8">
            <div className="space-y-8">
              <PhotoUploadZone
                photos={photos}
                onPhotosChange={setPhotos}
                error={errors?.photos}
              />

              <div className="border-t border-border" />

              <IncidentDetailsForm
                formData={formData}
                errors={errors}
                onChange={handleFormChange}
              />

              <FormActions
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                isValid={isFormValid()}
              />
            </div>
          </div>

          {/* Agentic System Explainer */}
          <div className="mt-6 bg-card/50 border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground leading-relaxed text-center">
              Once you submit, <span className="font-semibold text-foreground">ClaimFlow's agentic system automatically analyzes damage, validates coverage, checks for inconsistencies, and generates an instant settlement</span> — no manual steps required.
            </p>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-success" />
              <span>Secure</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-success" />
              <span>Encrypted</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-success" />
              <span>AI-Powered</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FNOLIntakeForm;