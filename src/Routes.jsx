import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LandingPage from './pages/landing';
import FNOLIntakeForm from './pages/fnol-intake-form';
import AutoSettlementSummary from './pages/auto-settlement-summary';
import ClaimsAdjusterDashboard from './pages/claims-adjuster-dashboard';
import FraudEligibilityResult from './pages/fraud-eligibility-result';
import MultiAgentProcessing from './pages/multi-agent-processing';
import DamageAssessmentResult from './pages/damage-assessment-result';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/fnol-intake-form" element={<FNOLIntakeForm />} />
        <Route path="/auto-settlement-summary" element={<AutoSettlementSummary />} />
        <Route path="/claims-adjuster-dashboard" element={<ClaimsAdjusterDashboard />} />
        <Route path="/fraud-eligibility-result" element={<FraudEligibilityResult />} />
        <Route path="/multi-agent-processing" element={<MultiAgentProcessing />} />
        <Route path="/damage-assessment-result" element={<DamageAssessmentResult />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
