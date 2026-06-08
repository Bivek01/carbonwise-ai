import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Star, CheckCircle, Clock, Calendar, Leaf, Shield, Zap } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const dailyTasks = [
  "Take a 5-minute shower to save water.",
  "Use public transport or carpool today.",
  "Unplug all unused electronics before sleeping.",
  "Bring a reusable bag for any shopping today.",
  "Eat a fully plant-based meal today.",
  "Avoid all single-use plastics today.",
  "Turn off lights when leaving a room."
];

const initialLongTermChallenges = [
  {
    id: 1,
    title: "Zero Waste Week",
    description: "Produce zero non-recyclable or non-compostable waste for 7 consecutive days.",
    points: 500,
    progress: 7,
    total: 7,
    status: "completed"
  },
  {
    id: 2,
    title: "Commuter Champion",
    description: "Use public transport, walk, or bike to work for 10 days in a month.",
    points: 300,
    progress: 4,
    total: 10,
    status: "active"
  },
  {
    id: 3,
    title: "Plant-Powered",
    description: "Eat entirely plant-based meals for 5 consecutive days.",
    points: 250,
    progress: 2,
    total: 5,
    status: "active"
  },
  {
    id: 4,
    title: "Energy Saver",
    description: "Keep your daily home energy usage below your personal average for 14 days.",
    points: 400,
    progress: 0,
    total: 14,
    status: "available"
  },
  {
    id: 5,
    title: "Local Locavore",
    description: "Buy only locally sourced groceries for your meals over the weekend.",
    points: 150,
    progress: 0,
    total: 2,
    status: "available"
  },
  {
    id: 6,
    title: "Vampire Slayer",
    description: "Unplug all unused electronics overnight for a full week.",
    points: 200,
    progress: 0,
    total: 7,
    status: "available"
  }
];

const ChallengeCard = ({ id, title, description, points, progress, total, status, delay, onAction }) => {
  const percentage = Math.min(100, Math.round((progress / total) * 100));
  
  return (
    <Card delay={delay} hover className="relative flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${
          status === 'completed' ? 'bg-amber-100 text-amber-600' :
          status === 'active' ? 'bg-forest-100 text-forest-600' :
          'bg-slate-100 text-slate-500'
        }`}>
          {status === 'completed' ? <Award className="w-6 h-6" aria-hidden="true" /> : 
           status === 'active' ? <Clock className="w-6 h-6" aria-hidden="true" /> : 
           <Star className="w-6 h-6" aria-hidden="true" />}
        </div>
        <div className="flex items-center space-x-1 font-bold text-slate-700 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
          <Star className="w-4 h-4 text-amber-400 fill-current" aria-hidden="true" />
          <span>{points} pts</span>
        </div>
      </div>
      
      <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm mb-6 flex-grow">{description}</p>
      
      <div className="mt-auto">
        <div className="flex justify-between items-end mb-2 text-sm">
          <span className="font-medium text-slate-700">Progress</span>
          <span className="text-slate-500">{progress} / {total} days</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ease-out ${
              status === 'completed' ? 'bg-amber-400' : 'bg-forest-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        <div className="mt-6">
          {status === 'completed' ? (
            <Button variant="outline" className="w-full" disabled>
              <CheckCircle className="w-4 h-4 mr-2" aria-hidden="true" /> Completed
            </Button>
          ) : status === 'active' ? (
            <Button variant="primary" className="w-full" onClick={() => onAction(id, 'update')}>
              Update Progress (+1 Day)
            </Button>
          ) : (
            <Button variant="secondary" className="w-full" onClick={() => onAction(id, 'start')}>
              Start Challenge
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

const getGamificationInfo = (points) => {
  if (points >= 1000) return { level: Math.floor(points / 500) + 1, badge: "Carbon Champion", icon: Award, color: "text-amber-500", bg: "bg-amber-100", border: "border-amber-200", nextTierPts: null };
  if (points >= 300) return { level: Math.floor(points / 150) + 1, badge: "Green Warrior", icon: Zap, color: "text-emerald-500", bg: "bg-emerald-100", border: "border-emerald-200", nextTierPts: 1000 };
  return { level: Math.floor(points / 100) + 1, badge: "Eco Beginner", icon: Shield, color: "text-blue-500", bg: "bg-blue-100", border: "border-blue-200", nextTierPts: 300 };
};

const EcoChallenges = () => {
  const [dailyTask, setDailyTask] = useState("");
  const [isDailyCompleted, setIsDailyCompleted] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [challenges, setChallenges] = useState([]);

  // Initialize state from local storage on mount
  useEffect(() => {
    // 1. Daily Task Logic
    const todayStr = new Date().toLocaleDateString('en-CA');
    const taskIndex = todayStr.split('-').reduce((acc, val) => acc + parseInt(val, 10), 0) % dailyTasks.length;
    setDailyTask(dailyTasks[taskIndex]);

    try {
      const storedDaily = JSON.parse(localStorage.getItem('carbonwise_daily_challenge'));
      if (storedDaily && storedDaily.date === todayStr) {
        setIsDailyCompleted(storedDaily.completed);
      } else {
        setIsDailyCompleted(false);
        localStorage.setItem('carbonwise_daily_challenge', JSON.stringify({ date: todayStr, completed: false }));
      }

      // 2. Points Logic
      const storedPoints = parseInt(localStorage.getItem('carbonwise_total_points'), 10);
      if (!isNaN(storedPoints)) {
        setTotalPoints(storedPoints);
      } else {
        // Base points from mock data completed tasks (500)
        setTotalPoints(500); 
        localStorage.setItem('carbonwise_total_points', 500);
      }

      // 3. Long Term Challenges Logic
      const storedChallenges = JSON.parse(localStorage.getItem('carbonwise_challenges'));
      if (storedChallenges && storedChallenges.length > 0) {
        setChallenges(storedChallenges);
      } else {
        setChallenges(initialLongTermChallenges);
        localStorage.setItem('carbonwise_challenges', JSON.stringify(initialLongTermChallenges));
      }

    } catch (e) {
      console.error("Error reading local storage", e);
      setChallenges(initialLongTermChallenges);
      setTotalPoints(500);
    }
  }, []);

  const addPoints = (points) => {
    const newTotal = totalPoints + points;
    setTotalPoints(newTotal);
    localStorage.setItem('carbonwise_total_points', newTotal.toString());
  };

  const completeDailyChallenge = () => {
    setIsDailyCompleted(true);
    const todayStr = new Date().toLocaleDateString('en-CA');
    localStorage.setItem('carbonwise_daily_challenge', JSON.stringify({ date: todayStr, completed: true }));
    addPoints(20); // Give 20 points for daily challenge
  };

  const handleChallengeAction = (id, actionType) => {
    const updatedChallenges = challenges.map(challenge => {
      if (challenge.id === id) {
        if (actionType === 'start') {
          return { ...challenge, status: 'active' };
        } else if (actionType === 'update') {
          const newProgress = challenge.progress + 1;
          if (newProgress >= challenge.total) {
            addPoints(challenge.points);
            return { ...challenge, progress: challenge.total, status: 'completed' };
          }
          return { ...challenge, progress: newProgress };
        }
      }
      return challenge;
    });

    setChallenges(updatedChallenges);
    localStorage.setItem('carbonwise_challenges', JSON.stringify(updatedChallenges));
  };

  const gamification = getGamificationInfo(totalPoints);
  const BadgeIcon = gamification.icon;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header and Gamification Profile */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-2"
          >
            Eco Challenges
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600"
          >
            Turn sustainability into a game. Earn points, level up, and unlock badges.
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 w-full md:w-auto"
        >
          {/* Badge & Level */}
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-xl border ${gamification.bg} ${gamification.border}`}>
              <BadgeIcon className={`w-8 h-8 ${gamification.color}`} aria-hidden="true" />
            </div>
            <div>
              <p className={`text-sm font-bold uppercase tracking-wide ${gamification.color}`}>{gamification.badge}</p>
              <p className="text-slate-800 font-bold">Level {gamification.level}</p>
            </div>
          </div>
          
          <div className="hidden sm:block w-px h-12 bg-slate-200"></div>
          
          {/* Points */}
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 hidden sm:block">
              <Star className="w-8 h-8 text-amber-500 fill-amber-500" aria-hidden="true" />
            </div>
            <div className="flex-grow">
              <p className="text-sm text-slate-500 font-medium">Eco Points</p>
              <p className="text-2xl font-bold text-slate-800 flex items-baseline">
                {totalPoints.toLocaleString()}
                {gamification.nextTierPts && (
                  <span className="text-xs font-normal text-slate-400 ml-2">/ {gamification.nextTierPts} for next badge</span>
                )}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Daily Challenge Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <Card className={`relative overflow-hidden border-2 ${isDailyCompleted ? 'border-emerald-200 bg-emerald-50/30' : 'border-forest-200 bg-gradient-to-r from-forest-50 to-white'}`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex items-start md:items-center space-x-4">
              <div className={`p-4 rounded-full flex-shrink-0 ${isDailyCompleted ? 'bg-emerald-100' : 'bg-forest-100'}`}>
                {isDailyCompleted ? <CheckCircle className="w-8 h-8 text-emerald-600" aria-hidden="true" /> : <Calendar className="w-8 h-8 text-forest-600" aria-hidden="true" />}
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-xl font-bold text-slate-800">Daily Eco Challenge</h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-bold ${isDailyCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {isDailyCompleted ? 'Completed' : 'Pending'}
                  </span>
                </div>
                <p className="text-slate-600 text-lg font-medium">{dailyTask}</p>
              </div>
            </div>
            
            <div className="w-full md:w-auto flex-shrink-0">
              {isDailyCompleted ? (
                <div className="flex items-center justify-center md:justify-start text-emerald-600 font-bold px-6 py-3 bg-emerald-50 rounded-full border border-emerald-100">
                  <CheckCircle className="w-5 h-5 mr-2" aria-hidden="true" /> Task Completed (+20 pts)
                </div>
              ) : (
                <Button onClick={completeDailyChallenge} className="w-full md:w-auto" icon={Leaf}>
                  Mark Completed (+20 pts)
                </Button>
              )}
            </div>
          </div>
          {!isDailyCompleted && <div className="absolute right-0 top-0 w-64 h-64 bg-forest-200 opacity-20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>}
        </Card>
      </motion.div>

      {/* Long-Term Challenges Grid */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Long-Term Goals</h2>
        <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{challenges.filter(c => c.status === 'completed').length} / {challenges.length} Completed</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge, index) => (
          <ChallengeCard 
            key={challenge.id} 
            {...challenge} 
            delay={index * 0.1 + 0.3} 
            onAction={handleChallengeAction}
          />
        ))}
      </div>
    </div>
  );
};

export default EcoChallenges;
