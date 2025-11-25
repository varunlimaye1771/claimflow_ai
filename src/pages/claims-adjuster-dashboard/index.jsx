import React, { useState, useMemo } from 'react';
import Header from '../../components/ui/Header';
import WorkflowProgress from '../../components/ui/WorkflowProgress';
import Icon from '../../components/AppIcon';
import ClaimMetricsCard from './components/ClaimMetricsCard';
import FilterControls from './components/FilterControls';
import ClaimsTable from './components/ClaimsTable';
import MobileClaimCard from './components/MobileClaimCard';

const ClaimsAdjusterDashboard = () => {
  const mockClaims = [
  {
    claimId: "CLM-2024-001",
    policyId: "POL-VEH-789456",
    status: "Approved",
    payoutAmount: "₹24,500",
    payoutValue: 24500,
    fraudRisk: "Low",
    processedDate: "24/11/2025",
    processedTime: "14:23:15",
    processingDuration: "4m 32s",
    damageSummary: [
    {
      component: "Front Bumper",
      damage: "Severe impact damage with multiple cracks and deformation",
      severity: "High",
      estimatedCost: "₹12,000"
    },
    {
      component: "Right Headlight Assembly",
      damage: "Complete lens fracture requiring full replacement",
      severity: "Medium",
      estimatedCost: "₹8,500"
    },
    {
      component: "Hood Panel",
      damage: "Minor dent and paint scratches on front section",
      severity: "Low",
      estimatedCost: "₹4,000"
    }],

    fraudDetails: {
      riskScore: "12/100",
      coverageStatus: "Active & Valid",
      policyLimit: "₹5,00,000",
      findings: [
      "No prior claim history in past 12 months",
      "Incident location matches policy coverage area",
      "Damage pattern consistent with reported accident type",
      "All documentation verified and authentic"]

    },
    agentTimeline: [
    {
      agent: "FNOL Intake Agent",
      action: "Extracted incident details and created claim record",
      timestamp: "14:18:43",
      icon: "FileText",
      status: "completed",
      reasoning: "Successfully parsed all required fields from intake form including incident date (23/11/2025), location (MG Road, Bangalore), and policy ID. Created structured claim record CLM-2024-001 with complete metadata.",
      confidence: "98%"
    },
    {
      agent: "Damage Assessment Agent",
      action: "Analyzed uploaded photos and generated damage report",
      timestamp: "14:19:58",
      icon: "Search",
      status: "completed",
      reasoning: "Computer vision analysis identified three primary damage zones with high confidence. Front bumper shows severe structural compromise requiring replacement. Headlight assembly completely fractured. Hood panel has cosmetic damage only. Total estimated repair cost: ₹24,500.",
      confidence: "94%"
    },
    {
      agent: "Fraud/Eligibility Agent",
      action: "Completed fraud screening and eligibility verification",
      timestamp: "14:21:12",
      icon: "ShieldCheck",
      status: "completed",
      reasoning: "Cross-referenced claim against historical database - no suspicious patterns detected. Policy POL-VEH-789456 is active with valid coverage. Damage amount well within policy limits. Geographic and temporal data verified. Risk score: 12/100 (Low Risk).",
      confidence: "96%"
    },
    {
      agent: "Auto-Settlement Agent",
      action: "Calculated payout and approved settlement",
      timestamp: "14:23:15",
      icon: "CheckCircle2",
      status: "completed",
      reasoning: "Based on damage assessment (₹24,500), fraud risk (Low), and policy terms, approved full settlement amount. No deductible applied due to comprehensive coverage. Settlement type: Direct Payment. Recommended immediate approval for customer satisfaction.",
      confidence: "97%"
    }],

    damagePhotos: [
    {
      url: "https://images.unsplash.com/photo-1681268191517-42c3b28631d9",
      alt: "Severely damaged white car front bumper with multiple cracks and deformation after collision"
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1eab7789d-1764012917637.png",
      alt: "Broken right headlight assembly with shattered lens and exposed internal components"
    },
    {
      url: "https://images.unsplash.com/photo-1654557344531-c907d236c926",
      alt: "Minor dent and paint scratches on silver car hood panel showing cosmetic damage"
    },
    {
      url: "https://images.unsplash.com/photo-1647569382703-a330f7c6d869",
      alt: "Overall front view of damaged vehicle showing extent of collision impact"
    }]

  },
  {
    claimId: "CLM-2024-002",
    policyId: "POL-VEH-456123",
    status: "Pending",
    payoutAmount: "₹18,200",
    payoutValue: 18200,
    fraudRisk: "Medium",
    processedDate: "24/11/2025",
    processedTime: "13:45:22",
    processingDuration: "5m 18s",
    damageSummary: [
    {
      component: "Rear Bumper",
      damage: "Impact damage with paint transfer from other vehicle",
      severity: "Medium",
      estimatedCost: "₹9,500"
    },
    {
      component: "Tail Light (Left)",
      damage: "Cracked lens requiring replacement",
      severity: "Medium",
      estimatedCost: "₹5,700"
    },
    {
      component: "Trunk Lid",
      damage: "Minor dent affecting alignment",
      severity: "Low",
      estimatedCost: "₹3,000"
    }],

    fraudDetails: {
      riskScore: "42/100",
      coverageStatus: "Active & Valid",
      policyLimit: "₹3,00,000",
      findings: [
      "Second claim filed within 6 months",
      "Incident location verified and matches coverage",
      "Damage consistent with rear-end collision",
      "Awaiting additional documentation verification"]

    },
    agentTimeline: [
    {
      agent: "FNOL Intake Agent",
      action: "Processed intake form and created claim",
      timestamp: "13:40:04",
      icon: "FileText",
      status: "completed",
      reasoning: "Captured all incident details from policyholder submission. Incident date: 23/11/2025, Location: Whitefield, Bangalore. Policy verification successful.",
      confidence: "97%"
    },
    {
      agent: "Damage Assessment Agent",
      action: "Analyzed damage photos and estimated costs",
      timestamp: "13:41:35",
      icon: "Search",
      status: "completed",
      reasoning: "Identified rear-end collision damage pattern. Three components affected with total estimated cost ₹18,200. Damage severity ranges from low to medium.",
      confidence: "91%"
    },
    {
      agent: "Fraud/Eligibility Agent",
      action: "Flagged for additional review due to claim frequency",
      timestamp: "13:43:48",
      icon: "ShieldCheck",
      status: "completed",
      reasoning: "Policy shows second claim in 6 months, triggering medium risk flag. All other indicators normal. Recommended manual adjuster review before settlement approval.",
      confidence: "88%"
    },
    {
      agent: "Auto-Settlement Agent",
      action: "Settlement pending adjuster review",
      timestamp: "13:45:22",
      icon: "Clock",
      status: "pending",
      reasoning: "Calculated settlement amount ₹18,200 but holding approval pending fraud team clearance due to claim frequency pattern. Awaiting manual review.",
      confidence: "85%"
    }],

    damagePhotos: [
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_186cc00f3-1764012921049.png",
      alt: "Damaged rear bumper of red sedan showing impact marks and paint transfer"
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_17800459c-1764012918841.png",
      alt: "Cracked left tail light lens with visible internal damage"
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_121098b3a-1764012918681.png",
      alt: "Minor dent on trunk lid affecting panel alignment"
    },
    {
      url: "https://images.unsplash.com/photo-1647569382703-a330f7c6d869",
      alt: "Rear view of damaged vehicle showing overall collision impact"
    }]

  },
  {
    claimId: "CLM-2024-003",
    policyId: "POL-VEH-321789",
    status: "Approved",
    payoutAmount: "₹45,800",
    payoutValue: 45800,
    fraudRisk: "Low",
    processedDate: "24/11/2025",
    processedTime: "12:15:33",
    processingDuration: "6m 45s",
    damageSummary: [
    {
      component: "Front Left Fender",
      damage: "Severe deformation from side impact collision",
      severity: "High",
      estimatedCost: "₹18,000"
    },
    {
      component: "Driver Side Door",
      damage: "Deep dent with paint damage and alignment issues",
      severity: "High",
      estimatedCost: "₹15,500"
    },
    {
      component: "Side Mirror (Left)",
      damage: "Complete breakage requiring full replacement",
      severity: "Medium",
      estimatedCost: "₹7,300"
    },
    {
      component: "Front Left Tire",
      damage: "Sidewall damage from impact",
      severity: "Medium",
      estimatedCost: "₹5,000"
    }],

    fraudDetails: {
      riskScore: "8/100",
      coverageStatus: "Active & Valid",
      policyLimit: "₹7,50,000",
      findings: [
      "First claim on this policy",
      "Police report filed and verified",
      "Third-party witness statements available",
      "Damage consistent with reported T-bone collision"]

    },
    agentTimeline: [
    {
      agent: "FNOL Intake Agent",
      action: "Processed comprehensive intake with police report",
      timestamp: "12:08:48",
      icon: "FileText",
      status: "completed",
      reasoning: "Complete documentation received including police report FIR-2024-BLR-5678. Incident: T-bone collision at intersection, Date: 22/11/2025, Location: Koramangala, Bangalore.",
      confidence: "99%"
    },
    {
      agent: "Damage Assessment Agent",
      action: "Analyzed extensive side impact damage",
      timestamp: "12:11:22",
      icon: "Search",
      status: "completed",
      reasoning: "Identified four major damage zones from side impact. Fender and door require replacement, mirror and tire also damaged. Total repair estimate: ₹45,800. Damage pattern matches T-bone collision physics.",
      confidence: "96%"
    },
    {
      agent: "Fraud/Eligibility Agent",
      action: "Verified all documentation and cleared for settlement",
      timestamp: "12:13:55",
      icon: "ShieldCheck",
      status: "completed",
      reasoning: "Police report authentic, witness statements corroborate claim. First claim on policy with clean history. Geographic and temporal data verified. Risk score: 8/100 (Very Low Risk).",
      confidence: "98%"
    },
    {
      agent: "Auto-Settlement Agent",
      action: "Approved full settlement amount",
      timestamp: "12:15:33",
      icon: "CheckCircle2",
      status: "completed",
      reasoning: "High-confidence approval based on comprehensive documentation, low fraud risk, and clear liability. Settlement amount ₹45,800 approved for direct payment. Expedited processing recommended.",
      confidence: "99%"
    }],

    damagePhotos: [
    {
      url: "https://images.unsplash.com/photo-1712405294445-18d555b11ad5",
      alt: "Severely deformed front left fender of blue car after side impact collision"
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1cd26d0c8-1764012918304.png",
      alt: "Deep dent on driver side door with paint damage and misalignment"
    },
    {
      url: "https://images.unsplash.com/photo-1563454072917-412038a5cd0e",
      alt: "Broken left side mirror with shattered glass and damaged housing"
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1be675a92-1764012920570.png",
      alt: "Damaged front left tire showing sidewall impact damage"
    }]

  },
  {
    claimId: "CLM-2024-004",
    policyId: "POL-VEH-654987",
    status: "Approved",
    payoutAmount: "₹12,300",
    payoutValue: 12300,
    fraudRisk: "Low",
    processedDate: "23/11/2025",
    processedTime: "16:42:18",
    processingDuration: "3m 55s",
    damageSummary: [
    {
      component: "Windshield",
      damage: "Large crack spreading across driver view area",
      severity: "High",
      estimatedCost: "₹9,500"
    },
    {
      component: "Hood Paint",
      damage: "Minor stone chip damage",
      severity: "Low",
      estimatedCost: "₹2,800"
    }],

    fraudDetails: {
      riskScore: "15/100",
      coverageStatus: "Active & Valid",
      policyLimit: "₹4,00,000",
      findings: [
      "No prior windshield claims",
      "Damage consistent with road debris impact",
      "Policy includes glass coverage",
      "Standard processing approved"]

    },
    agentTimeline: [
    {
      agent: "FNOL Intake Agent",
      action: "Processed windshield damage claim",
      timestamp: "16:38:23",
      icon: "FileText",
      status: "completed",
      reasoning: "Simple windshield damage claim. Incident: Rock chip on highway, Date: 23/11/2025, Location: Outer Ring Road, Bangalore.",
      confidence: "99%"
    },
    {
      agent: "Damage Assessment Agent",
      action: "Assessed windshield and minor paint damage",
      timestamp: "16:39:45",
      icon: "Search",
      status: "completed",
      reasoning: "Primary damage: windshield crack requiring full replacement (₹9,500). Secondary: minor hood paint chips (₹2,800). Total: ₹12,300.",
      confidence: "97%"
    },
    {
      agent: "Fraud/Eligibility Agent",
      action: "Standard glass claim verification completed",
      timestamp: "16:41:02",
      icon: "ShieldCheck",
      status: "completed",
      reasoning: "Routine glass damage claim with no red flags. Policy includes comprehensive glass coverage. Risk score: 15/100 (Low Risk).",
      confidence: "98%"
    },
    {
      agent: "Auto-Settlement Agent",
      action: "Approved standard glass replacement settlement",
      timestamp: "16:42:18",
      icon: "CheckCircle2",
      status: "completed",
      reasoning: "Standard glass claim approved for ₹12,300. No deductible for windshield replacement per policy terms. Approved for immediate processing.",
      confidence: "99%"
    }],

    damagePhotos: [
    {
      url: "https://images.unsplash.com/photo-1617051270054-2bb73e0fe6f7",
      alt: "Large crack spreading across car windshield obstructing driver view"
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_133674dee-1764012919248.png",
      alt: "Minor stone chip damage on car hood paint surface"
    }]

  },
  {
    claimId: "CLM-2024-005",
    policyId: "POL-VEH-147258",
    status: "Rejected",
    payoutAmount: "₹0",
    payoutValue: 0,
    fraudRisk: "High",
    processedDate: "23/11/2025",
    processedTime: "11:28:45",
    processingDuration: "7m 12s",
    damageSummary: [
    {
      component: "Multiple Panels",
      damage: "Extensive damage claimed across vehicle",
      severity: "High",
      estimatedCost: "₹85,000"
    }],

    fraudDetails: {
      riskScore: "87/100",
      coverageStatus: "Active & Valid",
      policyLimit: "₹5,00,000",
      findings: [
      "Damage inconsistent with reported single incident",
      "Multiple impact patterns suggest separate events",
      "Photos show pre-existing damage markers",
      "Claim rejected pending investigation"]

    },
    agentTimeline: [
    {
      agent: "FNOL Intake Agent",
      action: "Processed intake for major damage claim",
      timestamp: "11:21:33",
      icon: "FileText",
      status: "completed",
      reasoning: "High-value claim received. Incident: Multiple panel damage, Date: 22/11/2025, Location: Electronic City, Bangalore.",
      confidence: "95%"
    },
    {
      agent: "Damage Assessment Agent",
      action: "Identified inconsistent damage patterns",
      timestamp: "11:24:18",
      icon: "Search",
      status: "completed",
      reasoning: "Analysis reveals damage from multiple separate incidents, not single event as claimed. Different impact angles and weathering patterns detected. Flagged for fraud investigation.",
      confidence: "92%"
    },
    {
      agent: "Fraud/Eligibility Agent",
      action: "Detected high fraud risk indicators",
      timestamp: "11:26:55",
      icon: "AlertTriangle",
      status: "completed",
      reasoning: "Multiple red flags: inconsistent damage timeline, pre-existing damage visible, claim amount suspicious. Risk score: 87/100 (High Risk). Recommended claim rejection.",
      confidence: "94%"
    },
    {
      agent: "Auto-Settlement Agent",
      action: "Rejected claim due to fraud indicators",
      timestamp: "11:28:45",
      icon: "XCircle",
      status: "completed",
      reasoning: "Based on high fraud risk score and inconsistent damage evidence, claim CLM-2024-005 rejected. Case referred to fraud investigation team for detailed review.",
      confidence: "96%"
    }],

    damagePhotos: [
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_156d1b699-1764012919066.png",
      alt: "Extensively damaged vehicle showing multiple impact zones and inconsistent damage patterns"
    },
    {
      url: "https://images.unsplash.com/photo-1647569382703-a330f7c6d869",
      alt: "Close-up of vehicle damage showing pre-existing wear and multiple collision marks"
    }]

  }];


  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    riskLevel: 'all',
    amountRange: 'all',
    dateFrom: '',
    dateTo: ''
  });

  const [sortConfig, setSortConfig] = useState({
    column: 'processedDate',
    direction: 'desc'
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      riskLevel: 'all',
      amountRange: 'all',
      dateFrom: '',
      dateTo: ''
    });
  };

  const handleSort = (column) => {
    setSortConfig((prev) => ({
      column,
      direction: prev?.column === column && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const filteredAndSortedClaims = useMemo(() => {
    let filtered = [...mockClaims];

    if (filters?.search) {
      const searchLower = filters?.search?.toLowerCase();
      filtered = filtered?.filter((claim) =>
      claim?.claimId?.toLowerCase()?.includes(searchLower) ||
      claim?.policyId?.toLowerCase()?.includes(searchLower)
      );
    }

    if (filters?.status !== 'all') {
      filtered = filtered?.filter((claim) =>
      claim?.status?.toLowerCase() === filters?.status?.toLowerCase()
      );
    }

    if (filters?.riskLevel !== 'all') {
      filtered = filtered?.filter((claim) =>
      claim?.fraudRisk?.toLowerCase() === filters?.riskLevel?.toLowerCase()
      );
    }

    if (filters?.amountRange !== 'all') {
      filtered = filtered?.filter((claim) => {
        const amount = claim?.payoutValue;
        switch (filters?.amountRange) {
          case '0-10000':
            return amount >= 0 && amount <= 10000;
          case '10000-25000':
            return amount > 10000 && amount <= 25000;
          case '25000-50000':
            return amount > 25000 && amount <= 50000;
          case '50000+':
            return amount > 50000;
          default:
            return true;
        }
      });
    }

    if (filters?.dateFrom) {
      filtered = filtered?.filter((claim) => {
        const claimDate = new Date(claim.processedDate.split('/').reverse().join('-'));
        const filterDate = new Date(filters.dateFrom);
        return claimDate >= filterDate;
      });
    }

    if (filters?.dateTo) {
      filtered = filtered?.filter((claim) => {
        const claimDate = new Date(claim.processedDate.split('/').reverse().join('-'));
        const filterDate = new Date(filters.dateTo);
        return claimDate <= filterDate;
      });
    }

    filtered?.sort((a, b) => {
      let aValue, bValue;

      switch (sortConfig?.column) {
        case 'claimId':
          aValue = a?.claimId;
          bValue = b?.claimId;
          break;
        case 'status':
          aValue = a?.status;
          bValue = b?.status;
          break;
        case 'payoutAmount':
          aValue = a?.payoutValue;
          bValue = b?.payoutValue;
          break;
        case 'fraudRisk':
          const riskOrder = { 'Low': 1, 'Medium': 2, 'High': 3 };
          aValue = riskOrder?.[a?.fraudRisk];
          bValue = riskOrder?.[b?.fraudRisk];
          break;
        case 'processedDate':
          aValue = new Date(a.processedDate.split('/').reverse().join('-'));
          bValue = new Date(b.processedDate.split('/').reverse().join('-'));
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [mockClaims, filters, sortConfig]);

  const metrics = useMemo(() => {
    const totalClaims = mockClaims?.length;
    const approvedClaims = mockClaims?.filter((c) => c?.status === 'Approved')?.length;
    const totalPayout = mockClaims?.filter((c) => c?.status === 'Approved')?.reduce((sum, c) => sum + c?.payoutValue, 0);
    const avgPayout = approvedClaims > 0 ? totalPayout / approvedClaims : 0;
    const fraudDetectionRate = mockClaims?.filter((c) => c?.fraudRisk === 'High')?.length / totalClaims * 100;
    const avgProcessingTime = "4m 52s";

    return {
      totalClaims,
      approvedClaims,
      avgPayout: `₹${avgPayout?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
      fraudDetectionRate: `${fraudDetectionRate?.toFixed(1)}%`,
      avgProcessingTime
    };
  }, [mockClaims]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WorkflowProgress />
      <main className="pt-16">
        <div className="max-w-[1600px] mx-auto px-6 py-8 space-y-8">
          <div className="flex items-start justify-between gap-6">
            <div className="space-y-2 flex-1">
              <h1 className="text-3xl font-bold text-foreground">Claims Adjuster Dashboard</h1>
              <p className="text-muted-foreground">
                Monitor AI-processed claims, review settlement decisions, and maintain oversight of autonomous claim processing
              </p>
            </div>
            
            {/* For Insurers Badge */}
            <div className="hidden lg:block bg-card border border-border rounded-lg p-4 max-w-sm">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground block mb-1">For insurers</span>
                Designed for insurance companies to reduce adjuster workload, accelerate claim cycle time, and dramatically lower fraud risk.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ClaimMetricsCard
              icon="FileText"
              label="Total Claims Processed"
              value={metrics?.totalClaims}
              subtext={`${metrics?.approvedClaims} approved`}
              iconColor="bg-primary/10 text-primary"
              trend={{ value: "+12%", isPositive: true }} />

            <ClaimMetricsCard
              icon="DollarSign"
              label="Average Settlement"
              value={metrics?.avgPayout}
              subtext="Per approved claim"
              iconColor="bg-success/10 text-success"
              trend={{ value: "+8%", isPositive: true }} />

            <ClaimMetricsCard
              icon="ShieldAlert"
              label="Fraud Detection Rate"
              value={metrics?.fraudDetectionRate}
              subtext="High-risk claims identified"
              iconColor="bg-warning/10 text-warning"
              trend={{ value: "20%", isPositive: false }} />

            <ClaimMetricsCard
              icon="Clock"
              label="Avg Processing Time"
              value={metrics?.avgProcessingTime}
              subtext="End-to-end automation"
              iconColor="bg-accent/10 text-accent"
              trend={{ value: "-15%", isPositive: true }} />

          </div>

          <FilterControls
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters} />


          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                Claims Overview
                <span className="ml-3 text-sm font-normal text-muted-foreground">
                  ({filteredAndSortedClaims?.length} {filteredAndSortedClaims?.length === 1 ? 'claim' : 'claims'})
                </span>
              </h2>
            </div>

            <div className="hidden lg:block">
              <ClaimsTable
                claims={filteredAndSortedClaims}
                sortConfig={sortConfig}
                onSort={handleSort} />

            </div>

            <div className="lg:hidden space-y-4">
              {/* Mobile For Insurers Badge */}
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground block mb-1">For insurers</span>
                  Designed for insurance companies to reduce adjuster workload, accelerate claim cycle time, and dramatically lower fraud risk.
                </p>
              </div>
              
              {filteredAndSortedClaims?.length > 0 ?
              filteredAndSortedClaims?.map((claim) =>
              <MobileClaimCard key={claim?.claimId} claim={claim} />
              ) :

              <div className="bg-card rounded-lg border border-border p-12">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                      <Icon name="Search" size={32} strokeWidth={1.5} className="text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                      No claims found matching your filters
                    </p>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </main>
    </div>);

};

export default ClaimsAdjusterDashboard;