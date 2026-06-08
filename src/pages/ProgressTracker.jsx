import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import Card from '../components/ui/Card';
import { Target, TrendingDown } from 'lucide-react';

const monthlyData = [
  { name: 'Jan', transport: 400, energy: 240, diet: 200 },
  { name: 'Feb', transport: 300, energy: 139, diet: 221 },
  { name: 'Mar', transport: 200, energy: 980, diet: 229 },
  { name: 'Apr', transport: 278, energy: 390, diet: 200 },
  { name: 'May', transport: 189, energy: 480, diet: 218 },
  { name: 'Jun', transport: 239, energy: 380, diet: 250 },
  { name: 'Jul', transport: 349, energy: 430, diet: 210 },
];

const breakdownData = [
  { name: 'Transportation', value: 45 },
  { name: 'Home Energy', value: 35 },
  { name: 'Diet', value: 15 },
  { name: 'Other', value: 5 },
];

const COLORS = ['#3ba466', '#14b8a6', '#f59e0b', '#64748b'];

const ProgressTracker = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Progress Tracker</h1>
        <p className="text-slate-600">Visualize your journey towards a smaller carbon footprint.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800">Emissions by Category</h3>
          </div>
          <div className="h-[400px]" role="region" aria-label="Bar chart showing emissions by category over months">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f1f5f9' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="transport" stackId="a" fill="#3ba466" radius={[0, 0, 4, 4]} />
                <Bar dataKey="energy" stackId="a" fill="#14b8a6" />
                <Bar dataKey="diet" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="flex flex-col">
          <h3 className="text-xl font-bold text-slate-800 mb-2">Current Breakdown</h3>
          <p className="text-sm text-slate-500 mb-6">Your footprint composition for this month</p>
          
          <div className="h-[250px] mb-6" role="region" aria-label="Pie chart showing current month footprint breakdown">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={breakdownData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {breakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`${value}%`, 'Share']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-3 mt-auto">
            {breakdownData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-sm font-medium text-slate-700">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      {/* Goals Section */}
      <Card>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold text-slate-800">Yearly Reduction Goal</h3>
          <div className="flex items-center px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold">
            <TrendingDown className="w-4 h-4 mr-1" />
            On track
          </div>
        </div>
        
        <div className="relative pt-4">
          <div className="flex justify-between mb-2">
            <div>
              <span className="text-3xl font-bold text-slate-900">4.2</span>
              <span className="text-slate-500 ml-1">Tons CO₂e current</span>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold text-forest-600">3.5</span>
              <span className="text-slate-500 ml-1">Tons goal</span>
            </div>
          </div>
          
          <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-forest-400 to-emerald-500 rounded-full"
              style={{ width: '65%' }}
            />
          </div>
          
          <div className="absolute top-0 left-[65%] -translate-x-1/2 -mt-2">
            <div className="bg-forest-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
              You are here
            </div>
            <div className="w-2 h-2 bg-forest-600 rotate-45 mx-auto -mt-1" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProgressTracker;
