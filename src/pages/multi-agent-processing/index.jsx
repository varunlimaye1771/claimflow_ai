import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import WorkflowProgress from '../../components/ui/WorkflowProgress';
import Button from '../../components/ui/Button';
import AgentStageCard from './components/AgentStageCard';
import ProcessingTimeline from './components/ProcessingTimeline';
import AgenticTimelineModal from './components/AgenticTimelineModal';
import StatusMessage from './components/StatusMessage';

const MultiAgentProcessing = () => {
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState(0);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [processingComplete, setProcessingComplete] = useState(false);
  const [agentProgress, setAgentProgress] = useState([0, 0, 0, 0]);

  const agents = [
    {
      id: 1,
      name: "FNOL Intake Agent",
      shortName: "Intake",
      icon: "FileText",
      description: "Extracting incident details and creating claim record",
      currentAction: "Parsing uploaded photos and incident information",
      progress: agentProgress?.[0],
      estimatedTime: "Completed",
      completionSummary: "Successfully extracted claim details, policy ID VEH-2024-789456, and 2 damage photos"
    },
    {
      id: 2,
      name: "Damage Assessment Agent",
      shortName: "Assessment",
      icon: "Search",
      description: "Analyzing vehicle damage using computer vision AI",
      currentAction: "Running deep learning models on uploaded images",
      progress: agentProgress?.[1],
      estimatedTime: "~45 seconds",
      completionSummary: "Identified front bumper damage, estimated repair cost ₹14,300"
    },
    {
      id: 3,
      name: "Fraud/Eligibility Agent",
      shortName: "Verification",
      icon: "ShieldCheck",
      description: "Performing fraud detection and policy validation",
      currentAction: "Cross-referencing claim history and policy coverage",
      progress: agentProgress?.[2],
      estimatedTime: "~30 seconds",
      completionSummary: "Low fraud risk detected, policy active with comprehensive coverage"
    },
    {
      id: 4,
      name: "Auto-Settlement Agent",
      shortName: "Settlement",
      icon: "CheckCircle2",
      description: "Calculating payout and generating settlement decision",
      currentAction: "Computing settlement amount based on damage assessment",
      progress: agentProgress?.[3],
      estimatedTime: "~20 seconds",
      completionSummary: "Settlement approved for ₹14,300 with instant payout option"
    }
  ];

  const timelineData = [
    {
      id: 1,
      agentName: "FNOL Intake Agent",
      icon: "FileText",
      action: "Claim intake initiated",
      timestamp: "19:29:40",
      status: "completed",
      details: [
        "Extracted policy ID: VEH-2024-789456",
        "Parsed incident date: 24/11/2025",
        "Processed 2 damage photos",
        "Created claim record in system"
      ]
    },
    {
      id: 2,
      agentName: "Damage Assessment Agent",
      icon: "Search",
      action: "Computer vision analysis in progress",
      timestamp: "19:29:55",
      status: "active",
      details: [
        "Detected vehicle make: Honda City",
        "Identified damage location: Front bumper",
        "Severity classification: Moderate",
        "Estimated repair cost: ₹14,300"
      ]
    },
    {
      id: 3,
      agentName: "Fraud/Eligibility Agent",
      icon: "ShieldCheck",
      action: "Awaiting damage assessment completion",
      timestamp: "Pending",
      status: "pending",
      details: null
    },
    {
      id: 4,
      agentName: "Auto-Settlement Agent",
      icon: "CheckCircle2",
      action: "Awaiting fraud verification",
      timestamp: "Pending",
      status: "pending",
      details: null
    }
  ];

  useEffect(() => {
    // Stage timings - how long each agent takes to complete
    const stageTimings = [3000, 8000, 6000, 5000];
    
    // Progress animation intervals for each agent
    const progressIntervals = [];
    let cumulativeTime = 0;

    agents?.forEach((_, agentIndex) => {
      const stageDuration = stageTimings?.[agentIndex];
      const updateInterval = 50; // Update every 50ms for smooth animation
      const totalSteps = stageDuration / updateInterval;
      const incrementPerStep = 100 / totalSteps;

      // Schedule the start of this agent's progress animation
      const startTimeout = setTimeout(() => {
        let currentProgress = 0;
        
        // Animate progress from 0 to 100
        const interval = setInterval(() => {
          currentProgress += incrementPerStep;
          
          if (currentProgress >= 100) {
            currentProgress = 100;
            clearInterval(interval);
            
            // Move to next stage when progress completes
            setCurrentStage(agentIndex + 1);
            
            // Check if all agents are complete
            if (agentIndex === agents?.length - 1) {
              setProcessingComplete(true);
            }
          }
          
          // Update progress for this specific agent - ROUND TO WHOLE NUMBER
          setAgentProgress(prev => {
            const newProgress = [...prev];
            newProgress[agentIndex] = Math.round(Math.min(currentProgress, 100));
            return newProgress;
          });
        }, updateInterval);
        
        progressIntervals?.push(interval);
      }, cumulativeTime);

      progressIntervals?.push(startTimeout);
      cumulativeTime += stageDuration;
    });

    // Cleanup function
    return () => {
      progressIntervals?.forEach(timer => {
        if (typeof timer === 'number') {
          clearTimeout(timer);
        } else {
          clearInterval(timer);
        }
      });
    };
  }, []);

  const handleViewResults = () => {
    navigate('/damage-assessment-result');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WorkflowProgress />
      <main className="pt-[136px]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary">
                AI Agents Processing
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Multi-Agent Orchestration
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Watch as coordinated AI agents autonomously process your claim from intake to settlement decision
            </p>
          </div>

          <ProcessingTimeline agents={agents} currentStage={currentStage} />

          <div className="space-y-6 mb-8">
            {agents?.map((agent, index) => (
              <AgentStageCard
                key={agent?.id}
                agent={agent}
                isActive={index === currentStage}
                isCompleted={index < currentStage}
                isUpcoming={index > currentStage}
              />
            ))}
          </div>

          {currentStage === 1 && (
            <StatusMessage 
              message="Analyzing uploaded photos using advanced computer vision algorithms" 
              type="processing"
            />
          )}

          {currentStage === 2 && (
            <StatusMessage 
              message="Running fraud detection and policy validation checks" 
              type="processing"
            />
          )}

          {currentStage === 3 && (
            <StatusMessage 
              message="Calculating settlement amount based on damage assessment" 
              type="processing"
            />
          )}

          {processingComplete && (
            <StatusMessage 
              message="All agents completed processing successfully" 
              type="success"
            />
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              variant="outline"
              iconName="GitBranch"
              iconPosition="left"
              onClick={() => setIsTimelineOpen(true)}
            >
              View Agentic Timeline
            </Button>
            {processingComplete && (
              <Button
                variant="default"
                iconName="ArrowRight"
                iconPosition="right"
                onClick={handleViewResults}
              >
                View Assessment Results
              </Button>
            )}
          </div>
        </div>
      </main>
      <AgenticTimelineModal
        isOpen={isTimelineOpen}
        onClose={() => setIsTimelineOpen(false)}
        timelineData={timelineData}
      />
    </div>
  );
};

export default MultiAgentProcessing;