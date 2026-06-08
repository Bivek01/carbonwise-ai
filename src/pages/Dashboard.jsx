import { motion } from 'framer-motion';
import { 
  LineChart, Line, 
  BarChart, Bar, 
  PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { Leaf, TrendingDown, Target, Activity } from 'lucide-react';
import Card from '../components/ui/Card';

const weeklyData = [
  { day: 'Mon', score: 14 },
  { day: 'Tue', score: 12 },
  { day: 'Wed', score: 15 },
  { day: 'Thu', score: 11 },
  { day: 'Fri', score: 13 },
  { day: 'Sat', score: 18 },
  { day: 'Sun', score: 10 },
];

const monthlyData = [
  { month: 'Jan', score: 420 },
  { month: 'Feb', score: 380 },
  { month: 'Mar', score: 410 },
  { month: 'Apr', score: 350 },
  { month: 'May', score: 320 },
  { month: 'Jun', score: 300 },
];

const breakdownData = [
  { name: 'Transport', value: 45 },
  { name: 'Electricity', value: 30 },
  { name: 'Food', value: 15 },
  { name: 'Water', value: 10 },
];

const COLORS = ['#3ba466', '#14b8a6', '#f59e0b', '#3b82f6'];

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header section */}
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

      {/* Top Stats Row */}
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
                <TrendingDown className="w-4 h-4 mr-1" /> 12% lower
              </div>
              <p className="text-sm text-forest-100">than national average</p>
            </div>
          </div>
        </Card>

        <Card delay={0.2} className="flex flex-col justify-center">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-slate-600 font-medium">Monthly Goal</h3>
            <div className="p-2 bg-emerald-50 rounded-lg"><Target className="w-4 h-4 text-emerald-600" /></div>
          </div>
          <div className="text-3xl font-bold text-slate-800 mb-2">350 <span className="text-lg text-slate-500 font-normal">kg</span></div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }}></div>
          </div>
          <p className="text-xs text-slate-500 mt-2">85% of monthly limit reached</p>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Line Chart: Weekly Trend */}
        <Card delay={0.3} className="h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-800 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-forest-500" /> Weekly Trend
            </h3>
            <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">Last 7 Days</span>
          </div>
          <div className="flex-grow" role="region" aria-label="Line chart showing weekly carbon score trend">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#3ba466', fontWeight: 'bold' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#3ba466" 
                  strokeWidth={3} 
                  dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} 
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Bar Chart: Monthly Trend */}
        <Card delay={0.4} className="h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-800 flex items-center">
              <TrendingDown className="w-5 h-5 mr-2 text-blue-500" /> Monthly Trend
            </h3>
            <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">Year to Date</span>
          </div>
          <div className="flex-grow" role="region" aria-label="Bar chart showing monthly carbon score trend">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

      </div>

      {/* Breakdown Row */}
      <div className="grid grid-cols-1">
        <Card delay={0.5} className="flex flex-col md:flex-row items-center p-8">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <h3 className="text-2xl font-bold text-slate-800 mb-2 flex items-center">
              <Leaf className="w-6 h-6 mr-2 text-amber-500" /> Emission Breakdown
            </h3>
            <p className="text-slate-500 mb-6 max-w-sm">
              Discover which areas of your lifestyle contribute the most to your overall carbon footprint.
            </p>
            <div className="space-y-4">
              {breakdownData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded mr-3" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="font-medium text-slate-700">{item.name}</span>
                  </div>
                  <span className="font-bold text-slate-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-full md:w-1/2 h-[300px]" role="region" aria-label="Pie chart showing emission breakdown by category">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={breakdownData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {breakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Share']}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

    </div>
  );
};

export default Dashboard;
