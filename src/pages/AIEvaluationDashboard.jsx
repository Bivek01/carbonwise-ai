import { motion } from 'framer-motion';
import { 
  Code, Shield, Zap, TestTube, Accessibility, Target, 
  Download, Share2, Award, ArrowUpRight, TrendingUp, AlertTriangle, CheckCircle2 
} from 'lucide-react';
import { 
  LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import GlassCard from '../components/ui/GlassCard';
import CircularProgress from '../components/ui/CircularProgress';
import Button from '../components/ui/Button';

// Mock Data
const performanceTrend = [
  { month: 'Jan', score: 75 },
  { month: 'Feb', score: 82 },
  { month: 'Mar', score: 88 },
  { month: 'Apr', score: 85 },
  { month: 'May', score: 92 },
  { month: 'Jun', score: 94 },
];

const categoryScores = [
  { name: 'Code Quality', value: 95, color: '#3b82f6', icon: Code },
  { name: 'Security', value: 98, color: '#10b981', icon: Shield },
  { name: 'Efficiency', value: 88, color: '#f59e0b', icon: Zap },
  { name: 'Testing', value: 92, color: '#8b5cf6', icon: TestTube },
  { name: 'Accessibility', value: 90, color: '#ec4899', icon: Accessibility },
  { name: 'Alignment', value: 96, color: '#06b6d4', icon: Target },
];

const suggestions = [
  { title: 'Bundle Optimization', desc: 'Implement route-based code splitting to reduce main chunk size by 45%.', priority: 'High', type: 'performance', icon: Zap },
  { title: 'Accessibility Improvements', desc: 'Add missing aria-labels to navigation elements.', priority: 'Medium', type: 'accessibility', icon: Accessibility },
  { title: 'Lazy Loading', desc: 'Lazy load heavy charting libraries (Recharts) to improve TTI.', priority: 'High', type: 'performance', icon: ArrowUpRight },
  { title: 'Security Updates', desc: 'Update 3 minor dependencies with known low-severity CVEs.', priority: 'Low', type: 'security', icon: Shield },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const AIEvaluationDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20 selection:bg-emerald-500/30">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-emerald-600/20 blur-[120px]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-indigo-600/20 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 relative z-10 space-y-12">
        
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-blue-400 to-indigo-400 mb-2">
              AI Code Evaluation
            </h1>
            <p className="text-slate-400 font-medium">Enterprise Analytics & Health Overview</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-3"
          >
            <Button variant="outline" icon={Download} className="bg-white/5 border-white/10 hover:bg-white/10 text-white">
              PDF Report
            </Button>
            <Button variant="outline" icon={Download} className="bg-white/5 border-white/10 hover:bg-white/10 text-white hidden sm:flex">
              JSON
            </Button>
            <Button variant="primary" icon={Share2} className="bg-gradient-to-r from-emerald-500 to-blue-500 border-none hover:from-emerald-400 hover:to-blue-400">
              Share
            </Button>
          </motion.div>
        </div>

        {/* Hero Score Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <GlassCard className="lg:col-span-1 flex flex-col items-center justify-center py-10" hover>
            <CircularProgress value={94} max={100} size={220} label="Overall Rating" />
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-6 flex items-center space-x-2 bg-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full border border-emerald-500/30"
            >
              <Award className="w-4 h-4" />
              <span className="font-bold text-sm uppercase tracking-wider">Excellent</span>
            </motion.div>
          </GlassCard>

          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: 'Total Score', val: '94/100', icon: Target },
              { label: 'Global Rank', val: 'Top 1%', icon: Award },
              { label: 'AI Confidence', val: '99.2%', icon: Zap },
              { label: 'Security Level', val: 'A+', icon: Shield },
              { label: 'Performance', val: '92ms', icon: TrendingUp },
              { label: 'Success Rate', val: '100%', icon: CheckCircle2 },
            ].map((stat, i) => (
              <GlassCard key={i} delay={0.1 * i} hover className="flex flex-col justify-center">
                <div className="flex items-center text-slate-400 mb-2">
                  <stat.icon className="w-4 h-4 mr-2" />
                  <span className="text-sm font-semibold">{stat.label}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white">{stat.val}</div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Detailed Score Breakdown */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center text-white">
            <TestTube className="w-6 h-6 mr-3 text-blue-400" />
            Category Breakdown
          </h2>
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {categoryScores.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div key={i} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                  <GlassCard hover className="h-full">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10" style={{ color: cat.color }}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-md ${
                        cat.value >= 90 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        cat.value >= 80 ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                        'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {cat.value >= 90 ? 'Excellent' : cat.value >= 80 ? 'Good' : 'Average'}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{cat.name}</h3>
                    <div className="flex items-end justify-between mb-2">
                      <span className="text-3xl font-black text-white">{cat.value}<span className="text-sm text-slate-500">/100</span></span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.value}%` }}
                        transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Analytics & Suggestions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <GlassCard delay={0.6} className="h-[450px] flex flex-col">
            <h3 className="text-xl font-bold mb-6 flex items-center text-white">
              <TrendingUp className="w-5 h-5 mr-3 text-emerald-400" />
              Performance Trend
            </h3>
            <div className="flex-grow w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="month" stroke="#ffffff50" tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                  <YAxis stroke="#ffffff50" tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} domain={[60, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff20', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#10b981" 
                    strokeWidth={4}
                    dot={{ fill: '#0f172a', stroke: '#10b981', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#10b981', stroke: '#fff' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <GlassCard delay={0.7} className="h-[450px] flex flex-col">
            <h3 className="text-xl font-bold mb-6 flex items-center text-white">
              <Zap className="w-5 h-5 mr-3 text-amber-400" />
              AI Recommendations
            </h3>
            <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-grow">
              {suggestions.map((sug, i) => {
                const Icon = sug.icon;
                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + (i * 0.1) }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className="p-2 bg-slate-800 rounded-lg text-slate-400 group-hover:text-white transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-200 mb-1">{sug.title}</h4>
                          <p className="text-sm text-slate-400 leading-relaxed">{sug.desc}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-bold rounded-md whitespace-nowrap ml-4 ${
                        sug.priority === 'High' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                        sug.priority === 'Medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                        {sug.priority}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </GlassCard>

        </div>
      </div>
    </div>
  );
};

export default AIEvaluationDashboard;
