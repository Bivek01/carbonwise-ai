import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Leaf, TrendingDown, Target, Activity, Loader2 } from 'lucide-react';
import Card from '../components/ui/Card';
import { WEEKLY_DATA, MONTHLY_DATA, BREAKDOWN_DATA, CHART_COLORS } from '../lib/constants';

const WeeklyTrendChart = lazy(() => import('../components/charts/WeeklyTrendChart'));
const MonthlyTrendChart = lazy(() => import('../components/charts/MonthlyTrendChart'));
const EmissionBreakdownChart = lazy(() => import('../components/charts/EmissionBreakdownChart'));

const ChartLoader = () => (
  <div className="w-full h-full flex items-center justify-center bg-slate-50/50 rounded-xl">
    <Loader2 className="w-8 h-8 text-forest-500 animate-spin" aria-hidden="true" />
  </div>
);

const Dashboard = React.memo(() => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-end"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Your Carbon Dashboard</h1>
          <p className="text-slate-500 mt-1">Track your progress and analyze your impact.</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card delay={0.1} className="md:col-span-2 relative overflow-hidden bg-gradient-to-br from-forest-600 to-leaf text-white border-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-10 -mt-10"></div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center h-full relative z-10">
            <div>
              <p className="text-forest-100 font-medium mb-1">Total Carbon Footprint Score</p>
              <div className="text-5xl font-bold flex items-baseline">
                4,250 <span className="text-2xl font-normal ml-2 text-forest-200">kg CO₂e / yr</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
              <div className="flex items-center text-emerald-100 font-medium mb-1">
                <TrendingDown className="w-4 h-4 mr-1" aria-hidden="true" /> 12% lower
              </div>
              <p className="text-sm text-forest-100">than national average</p>
            </div>
          </div>
        </Card>

        <Card delay={0.2} className="flex flex-col justify-center">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-slate-600 font-medium">Monthly Goal</h3>
            <div className="p-2 bg-emerald-50 rounded-lg"><Target className="w-4 h-4 text-emerald-600" aria-hidden="true" /></div>
          </div>
          <div className="text-3xl font-bold text-slate-800 mb-2">350 <span className="text-lg text-slate-500 font-normal">kg</span></div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden" aria-label="Monthly goal progress">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }}></div>
          </div>
          <p className="text-xs text-slate-500 mt-2">85% of monthly limit reached</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card delay={0.3} className="h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-800 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-forest-500" aria-hidden="true" /> Weekly Trend
            </h3>
            <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">Last 7 Days</span>
          </div>
          <div className="flex-grow" role="region" aria-label="Line chart showing weekly carbon score trend">
            <Suspense fallback={<ChartLoader />}>
              <WeeklyTrendChart data={WEEKLY_DATA} />
            </Suspense>
          </div>
        </Card>

        <Card delay={0.4} className="h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-800 flex items-center">
              <TrendingDown className="w-5 h-5 mr-2 text-blue-500" aria-hidden="true" /> Monthly Trend
            </h3>
            <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">Year to Date</span>
          </div>
          <div className="flex-grow" role="region" aria-label="Bar chart showing monthly carbon score trend">
            <Suspense fallback={<ChartLoader />}>
              <MonthlyTrendChart data={MONTHLY_DATA} />
            </Suspense>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1">
        <Card delay={0.5} className="flex flex-col md:flex-row items-center p-8">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <h3 className="text-2xl font-bold text-slate-800 mb-2 flex items-center">
              <Leaf className="w-6 h-6 mr-2 text-amber-500" aria-hidden="true" /> Emission Breakdown
            </h3>
            <p className="text-slate-500 mb-6 max-w-sm">
              Discover which areas of your lifestyle contribute the most to your overall carbon footprint.
            </p>
            <div className="space-y-4">
              {BREAKDOWN_DATA.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded mr-3" style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}></div>
                    <span className="font-medium text-slate-700">{item.name}</span>
                  </div>
                  <span className="font-bold text-slate-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-full md:w-1/2 h-[300px]" role="region" aria-label="Pie chart showing emission breakdown by category">
            <Suspense fallback={<ChartLoader />}>
              <EmissionBreakdownChart data={BREAKDOWN_DATA} colors={CHART_COLORS} />
            </Suspense>
          </div>
        </Card>
      </div>
    </div>
  );
});

Dashboard.displayName = 'Dashboard';
export default Dashboard;
