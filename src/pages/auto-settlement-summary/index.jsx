import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/ui/Header';
import WorkflowProgress from '../../components/ui/WorkflowProgress';
import SettlementHeader from './components/SettlementHeader';
import PayoutCard from './components/PayoutCard';
import BreakdownPanel from './components/BreakdownPanel';
import ReasoningCard from './components/ReasoningCard';
import ProcessingTimeline from './components/ProcessingTimeline';
import ActionButtons from './components/ActionButtons';
import AcceptanceModal from './components/AcceptanceModal';
import AgenticTimelineModal from './components/AgenticTimelineModal';

const AutoSettlementSummary = () => {
  const navigate = useNavigate();
  const [isAcceptanceModalOpen, setIsAcceptanceModalOpen] = useState(false);
  const [isTimelineModalOpen, setIsTimelineModalOpen] = useState(false);
  const [isSettlementAccepted, setIsSettlementAccepted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const settlementData = {
    claimId: "CLM-2025-789456",
    processingTime: "4 minutes 32 seconds",
    amount: 14300,
    settlementType: "Auto-Approved",
    confidence: 96,
    breakdown: {
      repairCost: 18500,
      deductible: 5000,
      policyCoverage: 2000,
      adjustments: -1200,
      finalAmount: 14300
    }
  };

  const reasoningData = [
    {
      title: "Damage Assessment Validation",
      description: "AI analysis confirmed front bumper damage with 94% confidence. Repair cost estimate of ₹18,500 aligns with market rates for similar repairs in Mumbai region.",
      confidence: 94
    },
    {
      title: "Policy Coverage Verification",
      description: "Comprehensive insurance policy POL-2024-5678 covers collision damage with ₹5,000 deductible. Policy limits sufficient for claim amount with ₹2,000 additional coverage applied.",
      confidence: 98
    },
    {
      title: "Fraud Risk Assessment",
      description: "Low fraud risk score of 12% based on incident consistency, photo authenticity verification, and claimant history. No red flags detected in claim submission.",
      confidence: 96
    },
    {
      title: "Settlement Calculation",
      description: "Final settlement of ₹14,300 calculated after deductible application and minor adjustments for pre-existing wear. Amount approved within policy guidelines and market standards.",
      confidence: 97
    }
  ];

  const timelineData = [
    {
      agent: "FNOL Intake Agent",
      action: "Extracted incident details and created claim record",
      duration: "45 seconds",
      icon: "FileText",
      status: "completed",
      result: "Claim Created"
    },
    {
      agent: "Damage Assessment Agent",
      action: "Analyzed uploaded photos and generated damage report",
      duration: "1 min 20 sec",
      icon: "Search",
      status: "completed",
      result: "Damage Confirmed"
    },
    {
      agent: "Fraud/Eligibility Agent",
      action: "Performed fraud checks and policy validation",
      duration: "1 min 45 sec",
      icon: "ShieldCheck",
      status: "completed",
      result: "Low Risk"
    },
    {
      agent: "Auto-Settlement Agent",
      action: "Calculated payout and approved settlement",
      duration: "42 seconds",
      icon: "CheckCircle2",
      status: "completed",
      result: "Approved"
    }
  ];

  const agentDecisionsData = [
    {
      agent: "FNOL Intake Agent",
      action: "Initial claim intake and data extraction",
      timestamp: "24/11/2025, 19:25:18",
      icon: "FileText",
      status: "completed",
      findings: [
        "Incident date: 23/11/2025 at 14:30 IST",
        "Location: Andheri West, Mumbai, Maharashtra",
        "Policy ID: POL-2024-5678 validated and active",
        "Two damage photos uploaded and processed"
      ],
      confidence: 99
    },
    {
      agent: "Damage Assessment Agent",
      action: "Computer vision analysis of vehicle damage",
      timestamp: "24/11/2025, 19:26:03",
      icon: "Search",
      status: "completed",
      findings: [
        "Front bumper damage detected with 94% confidence",
        "Minor scratches on right headlight assembly",
        "No structural damage to vehicle frame",
        "Estimated repair cost: ₹18,500 based on market rates"
      ],
      confidence: 94
    },
    {
      agent: "Fraud/Eligibility Agent",
      action: "Multi-factor fraud detection and policy verification",
      timestamp: "24/11/2025, 19:27:48",
      icon: "ShieldCheck",
      status: "completed",
      findings: [
        "Photo authenticity verified - no manipulation detected",
        "Incident location matches GPS metadata",
        "Claimant history clean - no previous fraud flags",
        "Policy coverage confirmed for collision damage"
      ],
      confidence: 96
    },
    {
      agent: "Auto-Settlement Agent",
      action: "Settlement calculation and approval decision",
      timestamp: "24/11/2025, 19:29:30",
      icon: "CheckCircle2",
      status: "completed",
      findings: [
        "Base repair cost: ₹18,500",
        "Deductible applied: ₹5,000",
        "Additional coverage: ₹2,000",
        "Minor adjustments: -₹1,200",
        "Final approved amount: ₹14,300"
      ],
      confidence: 97
    }
  ];

  const handleAcceptSettlement = () => {
    setIsAcceptanceModalOpen(true);
  };

  const handleConfirmAcceptance = () => {
    setIsSettlementAccepted(true);
    setIsAcceptanceModalOpen(false);
    
    setTimeout(() => {
      navigate('/claims-adjuster-dashboard');
    }, 2000);
  };

  const handleViewTimeline = () => {
    setIsTimelineModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WorkflowProgress />
      <main className="pt-[136px]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {isSettlementAccepted && (
            <div className="mb-6 bg-success/10 border border-success rounded-lg p-4 animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-success text-success-foreground flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-success">Settlement Accepted Successfully!</div>
                  <div className="text-xs text-success/80">Your payment will be processed within 3-5 business days</div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <SettlementHeader 
              claimId={settlementData?.claimId}
              processingTime={settlementData?.processingTime}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <PayoutCard
                  amount={settlementData?.amount}
                  settlementType={settlementData?.settlementType}
                  confidence={settlementData?.confidence}
                />

                <BreakdownPanel breakdown={settlementData?.breakdown} />

                <ReasoningCard reasoning={reasoningData} />
              </div>

              <div className="space-y-6">
                <ActionButtons
                  onAcceptSettlement={handleAcceptSettlement}
                  onViewTimeline={handleViewTimeline}
                />

                <ProcessingTimeline timeline={timelineData} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <AcceptanceModal
        isOpen={isAcceptanceModalOpen}
        onClose={() => setIsAcceptanceModalOpen(false)}
        onConfirm={handleConfirmAcceptance}
        amount={settlementData?.amount}
      />

      <AgenticTimelineModal
        isOpen={isTimelineModalOpen}
        onClose={() => setIsTimelineModalOpen(false)}
        agentDecisions={agentDecisionsData}
      />
    </div>
  );
};

export default AutoSettlementSummary;