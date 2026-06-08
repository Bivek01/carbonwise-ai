import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Clock, ChevronRight, AlertCircle, RefreshCw } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { getSustainabilityInsights } from '../services/gemini';

const InsightCard = ({ title, description, impact, difficulty, category, delay }) => (
  <Card delay={delay} hover className="relative overflow-hidden group flex flex-col h-full">
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-forest-100 to-transparent rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110" />
    
    <div className="flex justify-between items-start mb-4">
      <div className="inline-flex items-center space-x-1 bg-slate-100 px-2.5 py-1 rounded-md text-xs font-medium text-slate-600">
        <span className="capitalize">{category}</span>
      </div>
      <div className={`px-2.5 py-1 rounded-md text-xs font-bold ${
        impact === 'High' ? 'bg-emerald-100 text-emerald-700' :
        impact === 'Medium' ? 'bg-amber-100 text-amber-700' :
        'bg-blue-100 text-blue-700'
      }`}>
        {impact} Impact
      </div>
    </div>
    
    <h3 className="text-xl font-bold text-slate-800 mb-2 pr-8">{title}</h3>
    <p className="text-slate-600 text-sm mb-6 flex-grow">{description}</p>
    
    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
      <div className="flex items-center text-xs text-slate-500 font-medium">
        <Clock className="w-3.5 h-3.5 mr-1" />
        {difficulty}
      </div>
      <button className="text-forest-600 hover:text-forest-700 font-medium text-sm flex items-center transition-colors">
        Take Action <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </button>
    </div>
  </Card>
);

const AIInsights = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFallback, setIsFallback] = useState(false);

  // Mock data representing the user's footprint to send to Gemini
  const mockFootprintData = {
    totalEmissionsKg: 4250,
    transport: {
      type: "Gasoline Car",
      distanceKmPerDay: 30,
      annualEmissionsKg: 2100
    },
    electricity: {
      kwhPerMonth: 400,
      annualEmissionsKg: 1920
    },
    diet: {
      type: "Mixed (Average Meat)",
      annualEmissionsKg: 2500
    }
  };

  const fetchInsights = async () => {
    setLoading(true);
    setError(null);
    setIsFallback(false);
    try {
      const data = await getSustainabilityInsights(mockFootprintData);
      
      // Strict runtime type validation to sanitize output before rendering
      if (!Array.isArray(data)) {
        throw new Error("Received invalid data structure from AI.");
      }
      
      const validatedData = data.map(item => ({
        title: String(item.title || "Recommendation"),
        description: String(item.description || "No description provided."),
        impact: ['High', 'Medium', 'Low'].includes(item.impact) ? item.impact : 'Medium',
        difficulty: ['Easy', 'Medium', 'Hard'].includes(item.difficulty) ? item.difficulty : 'Medium',
        category: String(item.category || "General")
      })).slice(0, 4); // Limit array size to prevent UI overload
      
      setInsights(validatedData);
      setIsFallback(!!data.isFallback);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-forest-400 to-leaf rounded-2xl mb-6 shadow-lg shadow-forest-500/20"
          >
            <Lightbulb className="w-8 h-8 text-white" aria-hidden="true" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 flex items-center"
          >
            AI Sustainability Coach
            <span className="ml-3 px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full uppercase tracking-wider align-middle">Beta</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 max-w-2xl text-lg"
          >
            Powered by Gemini 1.5 Flash. We've analyzed your recent footprint profile to generate these highly personalized strategies.
          </motion.p>
        </div>
        
        {!loading && !error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Button variant="outline" onClick={fetchInsights} icon={RefreshCw}>
              Refresh Insights
            </Button>
          </motion.div>
        )}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 min-h-[400px]" role="status" aria-live="polite">
          <div className="relative w-20 h-20 mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
            <div className="absolute inset-0 rounded-full border-4 border-forest-500 border-t-transparent animate-spin"></div>
            <Lightbulb className="absolute inset-0 m-auto w-8 h-8 text-forest-500 animate-pulse" aria-hidden="true" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Analyzing your footprint...</h3>
          <p className="text-slate-500 text-center max-w-sm">
            Gemini is evaluating your transport, energy, and diet habits to find the best reduction strategies.
          </p>
        </div>
      ) : error ? (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-8 text-center max-w-2xl mx-auto my-12">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" aria-hidden="true" />
          <h3 className="text-xl font-bold text-slate-900 mb-2">Unable to load insights</h3>
          <p className="text-slate-600 mb-6">{error}</p>
          <Button variant="primary" onClick={fetchInsights}>Try Again</Button>
        </div>
      ) : (
        <>
          {isFallback && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <p className="text-amber-800 text-sm font-medium">
                AI quota currently unavailable. Showing smart local recommendations.
              </p>
            </motion.div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insights.map((insight, index) => (
              <InsightCard key={index} {...insight} delay={index * 0.1} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AIInsights;
