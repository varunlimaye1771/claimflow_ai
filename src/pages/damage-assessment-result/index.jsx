import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import WorkflowProgress from '../../components/ui/WorkflowProgress';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import DamagePhotoViewer from './components/DamagePhotoViewer';
import DamageReportCard from './components/DamageReportCard';
import CostBreakdownCard from './components/CostBreakdownCard';
import AIReasoningCard from './components/AIReasoningCard';

const DamageAssessmentResult = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const damagePhotos = [
  {
    image: "https://images.unsplash.com/photo-1597328290883-50c5787b7c7e",
    imageAlt: "Front view of silver sedan with visible damage to front bumper and hood showing dents and scratches from collision impact",
    annotations: [
    { x: 45, y: 35, label: "Front Bumper Damage" },
    { x: 50, y: 25, label: "Hood Dent" },
    { x: 35, y: 40, label: "Headlight Crack" }]

  },
  {
    image: "https://images.unsplash.com/photo-1647569382703-a330f7c6d869",
    imageAlt: "Close-up view of damaged vehicle side panel showing deep scratches and paint damage along driver side door and fender",
    annotations: [
    { x: 50, y: 50, label: "Side Panel Scratch" },
    { x: 60, y: 45, label: "Door Dent" }]

  }];


  const damageReport = {
    analyzedDate: "24/11/2025 19:30",
    processingTime: "2.3 seconds",
    issuesDetected: 7,
    estimatedCost: "₹45,800",
    overallConfidence: 94,
    detectedIssues: [
    {
      component: "Front Bumper",
      issue: "Severe Impact Damage",
      severity: "Critical",
      cost: "₹18,500",
      confidence: 96,
      description: "Complete bumper replacement required due to structural damage from frontal collision. Multiple mounting points compromised.",
      recommendedAction: "Replace with OEM part and realign mounting brackets",
      detectionMethod: "Computer Vision + Structural Analysis"
    },
    {
      component: "Hood",
      issue: "Dent & Paint Damage",
      severity: "High",
      cost: "₹12,300",
      confidence: 92,
      description: "Significant dent on hood surface with paint chipping. Metal deformation detected requiring panel beating or replacement.",
      recommendedAction: "Panel beating and repainting, or full hood replacement if deformation exceeds 15mm",
      detectionMethod: "3D Depth Mapping + Surface Analysis"
    },
    {
      component: "Left Headlight",
      issue: "Cracked Lens",
      severity: "Moderate",
      cost: "₹6,800",
      confidence: 98,
      description: "Headlight lens cracked with internal reflector damage. Water ingress risk detected.",
      recommendedAction: "Replace complete headlight assembly",
      detectionMethod: "Image Recognition + Material Analysis"
    },
    {
      component: "Left Front Fender",
      issue: "Deep Scratches",
      severity: "Moderate",
      cost: "₹5,200",
      confidence: 89,
      description: "Multiple deep scratches penetrating primer layer. Rust formation risk if not treated.",
      recommendedAction: "Sand, fill, prime and repaint affected area",
      detectionMethod: "Surface Texture Analysis"
    },
    {
      component: "Left Side Door",
      issue: "Minor Dent",
      severity: "Low",
      cost: "₹2,100",
      confidence: 85,
      description: "Small dent on door panel without paint damage. Paintless dent repair feasible.",
      recommendedAction: "Paintless dent removal (PDR) technique",
      detectionMethod: "Contour Mapping"
    },
    {
      component: "Front Grille",
      issue: "Broken Mounting Clips",
      severity: "Low",
      cost: "₹600",
      confidence: 91,
      description: "Two mounting clips broken causing grille misalignment. Cosmetic issue only.",
      recommendedAction: "Replace mounting clips and realign grille",
      detectionMethod: "Structural Integrity Scan"
    },
    {
      component: "Paint Work",
      issue: "Color Matching Required",
      severity: "Low",
      cost: "₹300",
      confidence: 88,
      description: "Additional paint blending needed for seamless color transition across repaired panels.",
      recommendedAction: "Professional color matching and blending",
      detectionMethod: "Color Spectrum Analysis"
    }]

  };

  const costBreakdown = {
    categories: [
    { name: "Parts", amount: 28400 },
    { name: "Labor", amount: 12600 },
    { name: "Paint", amount: 3800 },
    { name: "Inspection", amount: 1000 }],

    note: "Estimated costs based on authorized service center rates. Actual costs may vary by ±10% depending on parts availability and labor rates.",
    additionalCharges: [
    { name: "GST (18%)", amount: 8244 },
    { name: "Alignment Check", amount: 500 }]

  };

  const aiReasoning = {
    summary: "Our AI damage assessment model analyzed uploaded photos using computer vision, 3D depth mapping, and structural integrity algorithms. The analysis identified 7 distinct damage points with 94% overall confidence. Cost estimation is based on OEM parts pricing, standard labor rates, and historical repair data from 50,000+ similar claims.",
    factors: [
    {
      icon: "Camera",
      title: "Visual Damage Detection",
      weight: 35,
      explanation: "Advanced computer vision algorithms analyzed photo quality, lighting conditions, and damage visibility. Multiple angles provided comprehensive damage mapping with high confidence scores.",
      dataPoints: [
      "Photo resolution: 4032x3024 pixels (optimal)",
      "Lighting quality: Good natural daylight",
      "Damage visibility: 98% of affected areas captured",
      "Image clarity score: 9.2/10"]

    },
    {
      icon: "Layers",
      title: "Structural Impact Analysis",
      weight: 30,
      explanation: "3D depth mapping and structural integrity scans assessed the extent of deformation and potential hidden damage. Critical mounting points and frame alignment were evaluated.",
      dataPoints: [
      "Maximum deformation depth: 12mm (hood area)",
      "Frame alignment: Within acceptable limits",
      "Mounting point integrity: 2 clips compromised",
      "Hidden damage probability: Low (15%)"]

    },
    {
      icon: "DollarSign",
      title: "Cost Estimation Model",
      weight: 20,
      explanation: "Pricing algorithm cross-referenced OEM parts databases, regional labor rates, and historical claim data to generate accurate cost estimates with confidence intervals.",
      dataPoints: [
      "Parts pricing: Based on 3 authorized dealers",
      "Labor rates: Regional average ₹800/hour",
      "Historical data: 50,000+ similar claims analyzed",
      "Cost accuracy: ±10% variance expected"]

    },
    {
      icon: "Shield",
      title: "Severity Classification",
      weight: 15,
      explanation: "Machine learning model trained on insurance industry standards classified each damage point by severity, considering safety implications and repair urgency.",
      dataPoints: [
      "Safety-critical issues: 1 (headlight)",
      "Structural concerns: 2 (bumper, hood)",
      "Cosmetic damage: 4 items",
      "Repair priority score: 7.8/10"]

    }],

    modelInfo: {
      name: "ClaimFlow Vision AI v3.2",
      version: "3.2.1 (Nov 2025)",
      trainingData: "2.4M vehicle damage images",
      accuracy: "94.2% (industry benchmark: 89%)"
    }
  };

  const handleProceedToFraudCheck = () => {
    navigate('/fraud-eligibility-result');
  };

  const handleBackToProcessing = () => {
    navigate('/multi-agent-processing');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WorkflowProgress />
      <main className="pt-[136px]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-6">
            <button
              onClick={handleBackToProcessing}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth mb-4">

              <Icon name="ArrowLeft" size={16} strokeWidth={2} />
              <span>Back to Processing</span>
            </button>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                <Icon name="CheckCircle2" size={24} color="var(--color-success)" strokeWidth={2} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Damage Assessment Complete</h1>
                <p className="text-muted-foreground">AI analysis identified 7 damage points with 94% confidence</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="space-y-6">
              <DamagePhotoViewer photos={damagePhotos} />
              <CostBreakdownCard breakdown={costBreakdown} />
            </div>
            <div className="space-y-6">
              <DamageReportCard report={damageReport} />
              <AIReasoningCard reasoning={aiReasoning} />
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <Icon name="Info" size={20} color="var(--color-primary)" strokeWidth={2} className="flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-foreground mb-1">Next Step: Fraud & Eligibility Verification</div>
                  <div className="text-sm text-muted-foreground">
                    Our AI will now verify policy coverage, check for fraud indicators, and validate claim eligibility.
                  </div>
                </div>
              </div>
              <Button
                variant="default"
                size="lg"
                iconName="ArrowRight"
                iconPosition="right"
                onClick={handleProceedToFraudCheck}
                className="w-full sm:w-auto">

                Proceed to Verification
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DamageAssessmentResult;