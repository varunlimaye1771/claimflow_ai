import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import WorkflowProgress from '../../components/ui/WorkflowProgress';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import RiskScoreCard from './components/RiskScoreCard';
import PolicyValidationCard from './components/PolicyValidationCard';
import FraudRulesPanel from './components/FraudRulesPanel';
import HistoricalClaimsPanel from './components/HistoricalClaimsPanel';
import VerificationResultsPanel from './components/VerificationResultsPanel';
import AIReasoningPanel from './components/AIReasoningPanel';

const FraudEligibilityResult = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fraudAssessment = {
    riskLevel: "low",
    score: 18,
    reasoning: "Comprehensive analysis of claim patterns, policy history, and incident details indicates minimal fraud indicators. All verification checks passed successfully with high confidence scores across multiple validation parameters."
  };

  const policyValidation = {
    status: "active",
    policyLimit: "₹5,00,000",
    coverageDetails: "Comprehensive Coverage",
    eligibilityConfirmed: true
  };

  const fraudRules = [
    {
      id: 1,
      name: "Claim Frequency Analysis",
      status: "Passed",
      severity: "low",
      description: "Evaluated claim submission frequency against policy tenure. Current claim falls within normal distribution patterns with no suspicious timing indicators detected.",
      confidence: 94
    },
    {
      id: 2,
      name: "Damage Consistency Check",
      status: "Passed",
      severity: "low",
      description: "Cross-referenced reported damage with photographic evidence and incident description. All elements demonstrate logical consistency with no contradictory information identified.",
      confidence: 91
    },
    {
      id: 3,
      name: "Location Verification",
      status: "Passed",
      severity: "medium",
      description: "Validated incident location against policyholder address history and typical travel patterns. Location matches expected geographical zones with reasonable proximity to registered addresses.",
      confidence: 87
    },
    {
      id: 4,
      name: "Third-Party Cross-Reference",
      status: "Passed",
      severity: "low",
      description: "Checked claim details against external databases for duplicate submissions or conflicting reports. No matching incidents found in fraud detection networks.",
      confidence: 96
    }
  ];

  const claimHistory = {
    totalClaims: 3,
    approvedClaims: 2,
    averageAmount: "₹18,500",
    recentClaims: [
      {
        id: 1,
        type: "Minor Collision Damage",
        date: "12/03/2024",
        status: "Approved",
        amount: "₹12,400"
      },
      {
        id: 2,
        type: "Windshield Replacement",
        date: "28/08/2023",
        status: "Approved",
        amount: "₹8,200"
      },
      {
        id: 3,
        type: "Scratch Repair",
        date: "15/01/2023",
        status: "Rejected",
        amount: "₹4,100"
      }
    ]
  };

  const verificationResults = [
    {
      id: 1,
      name: "Policy Status Verification",
      status: "verified",
      confidence: 100,
      details: "Active policy confirmed with premium payments up to date. No lapses or pending renewals detected in system records."
    },
    {
      id: 2,
      name: "Coverage Limit Validation",
      status: "verified",
      confidence: 100,
      details: "Claim amount falls within policy coverage limits. Comprehensive coverage active with ₹5,00,000 maximum claim limit verified."
    },
    {
      id: 3,
      name: "Deductible Calculation",
      status: "verified",
      confidence: 98,
      details: "Standard deductible of ₹2,000 applies to this claim type. Amount calculated based on policy terms and claim category."
    },
    {
      id: 4,
      name: "Exclusion Check",
      status: "verified",
      confidence: 95,
      details: "Reviewed policy exclusions and limitations. Current claim does not fall under any excluded categories or restricted scenarios."
    },
    {
      id: 5,
      name: "Identity Verification",
      status: "verified",
      confidence: 97,
      details: "Policyholder identity confirmed through multiple authentication factors. All provided credentials match registered account information."
    }
  ];

  const reasoningFactors = [
    {
      id: 1,
      title: "Clean Claims History",
      weight: 35,
      explanation: "Policyholder demonstrates responsible claim behavior with only 3 claims over 2 years of policy tenure. Approval rate of 67% indicates legitimate claim patterns without excessive submissions. Historical claim amounts remain within reasonable ranges for reported incident types.",
      dataPoints: ["2-year policy tenure", "3 total claims", "67% approval rate", "Average claim: ₹18,500"]
    },
    {
      id: 2,
      title: "Incident Consistency",
      weight: 30,
      explanation: "Reported incident details align perfectly with photographic evidence and damage assessment findings. Timeline of events follows logical sequence with no contradictory statements. Location data matches expected travel patterns and registered addresses.",
      dataPoints: ["Photo-description match", "Logical timeline", "Location verified", "No contradictions"]
    },
    {
      id: 3,
      title: "Policy Compliance",
      weight: 20,
      explanation: "Active policy with all premium payments current and no coverage gaps. Claim submitted within required timeframe following incident occurrence. All mandatory documentation provided at time of submission.",
      dataPoints: ["Active coverage", "Timely submission", "Complete documentation", "No payment lapses"]
    },
    {
      id: 4,
      title: "External Validation",
      weight: 15,
      explanation: "Cross-reference checks against fraud detection databases returned no matches or suspicious patterns. No duplicate claims found in industry-wide systems. Policyholder identity verified through multiple authentication channels.",
      dataPoints: ["No fraud database matches", "Unique claim", "Identity verified", "Clean external records"]
    }
  ];

  const handleProceedToSettlement = () => {
    navigate('/auto-settlement-summary');
  };

  const handleBackToDamageAssessment = () => {
    navigate('/damage-assessment-result');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WorkflowProgress />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-primary/10 text-primary w-12 h-12 rounded-full flex items-center justify-center">
                <Icon name="ShieldCheck" size={24} strokeWidth={2} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Fraud & Eligibility Screening</h1>
                <p className="text-muted-foreground mt-1">Comprehensive risk assessment and policy validation results</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <RiskScoreCard 
              riskLevel={fraudAssessment?.riskLevel}
              score={fraudAssessment?.score}
              reasoning={fraudAssessment?.reasoning}
            />
            <PolicyValidationCard 
              status={policyValidation?.status}
              policyLimit={policyValidation?.policyLimit}
              coverageDetails={policyValidation?.coverageDetails}
              eligibilityConfirmed={policyValidation?.eligibilityConfirmed}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <FraudRulesPanel rules={fraudRules} />
            <HistoricalClaimsPanel claimHistory={claimHistory} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <VerificationResultsPanel verifications={verificationResults} />
            <AIReasoningPanel reasoningFactors={reasoningFactors} />
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="bg-success/10 text-success w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="CheckCircle2" size={20} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Screening Complete</h3>
                  <p className="text-sm text-muted-foreground">
                    All fraud detection and eligibility checks passed successfully. Claim approved for settlement processing.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Button
                  variant="outline"
                  onClick={handleBackToDamageAssessment}
                  iconName="ArrowLeft"
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  Back to Assessment
                </Button>
                <Button
                  variant="default"
                  onClick={handleProceedToSettlement}
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="w-full sm:w-auto"
                >
                  Proceed to Settlement
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FraudEligibilityResult;