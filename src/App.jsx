import { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const CarbonCalculator = lazy(() => import('./pages/CarbonCalculator'));
const AIInsights = lazy(() => import('./pages/AIInsights'));
const EcoChallenges = lazy(() => import('./pages/EcoChallenges'));
const ProgressTracker = lazy(() => import('./pages/ProgressTracker'));
const GeminiTest = lazy(() => import('./pages/GeminiTest'));
const AIEvaluationDashboard = lazy(() => import('./pages/AIEvaluationDashboard'));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="calculator" element={<CarbonCalculator />} />
          <Route path="insights" element={<AIInsights />} />
          <Route path="challenges" element={<EcoChallenges />} />
          <Route path="progress" element={<ProgressTracker />} />
          <Route path="test" element={<GeminiTest />} />
          <Route path="evaluation" element={<AIEvaluationDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
