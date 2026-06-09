import { 
  Code, Shield, Zap, TestTube, Accessibility, Target, 
  ArrowUpRight 
} from 'lucide-react';

// --- Carbon Calculator Constants ---
export const TRANSPORT_FACTORS = {
  gasoline: 0.192,
  diesel: 0.171,
  electric: 0.053,
  transit: 0.041,
  none: 0
};

export const FOOD_FACTORS = {
  vegan: 1500,
  vegetarian: 1700,
  mixed: 2500,
  non_vegetarian: 3300
};

// --- Eco Challenges Constants ---
export const DAILY_TASKS = [
  "Take a 5-minute shower to save water.",
  "Use public transport or carpool today.",
  "Unplug all unused electronics before sleeping.",
  "Bring a reusable bag for any shopping today.",
  "Eat a fully plant-based meal today.",
  "Avoid all single-use plastics today.",
  "Turn off lights when leaving a room."
];

export const INITIAL_LONG_TERM_CHALLENGES = [
  { id: 1, title: "Zero Waste Week", description: "Produce zero non-recyclable or non-compostable waste for 7 consecutive days.", points: 500, progress: 7, total: 7, status: "completed" },
  { id: 2, title: "Commuter Champion", description: "Use public transport, walk, or bike to work for 10 days in a month.", points: 300, progress: 4, total: 10, status: "active" },
  { id: 3, title: "Plant-Powered", description: "Eat entirely plant-based meals for 5 consecutive days.", points: 250, progress: 2, total: 5, status: "active" },
  { id: 4, title: "Energy Saver", description: "Keep your daily home energy usage below your personal average for 14 days.", points: 400, progress: 0, total: 14, status: "available" },
  { id: 5, title: "Local Locavore", description: "Buy only locally sourced groceries for your meals over the weekend.", points: 150, progress: 0, total: 2, status: "available" },
  { id: 6, title: "Vampire Slayer", description: "Unplug all unused electronics overnight for a full week.", points: 200, progress: 0, total: 7, status: "available" }
];

// --- Dashboard Constants ---
export const WEEKLY_DATA = [
  { day: 'Mon', score: 14 }, { day: 'Tue', score: 12 }, { day: 'Wed', score: 15 },
  { day: 'Thu', score: 11 }, { day: 'Fri', score: 13 }, { day: 'Sat', score: 18 }, { day: 'Sun', score: 10 },
];

export const MONTHLY_DATA = [
  { month: 'Jan', score: 420 }, { month: 'Feb', score: 380 }, { month: 'Mar', score: 410 },
  { month: 'Apr', score: 350 }, { month: 'May', score: 320 }, { month: 'Jun', score: 300 },
];

export const BREAKDOWN_DATA = [
  { name: 'Transport', value: 45 }, { name: 'Electricity', value: 30 },
  { name: 'Food', value: 15 }, { name: 'Water', value: 10 },
];

export const CHART_COLORS = ['#3ba466', '#14b8a6', '#f59e0b', '#3b82f6'];

// --- AI Evaluation Dashboard Constants ---
export const EVAL_PERFORMANCE_TREND = [
  { month: 'Jan', score: 75 }, { month: 'Feb', score: 82 }, { month: 'Mar', score: 88 },
  { month: 'Apr', score: 85 }, { month: 'May', score: 92 }, { month: 'Jun', score: 94 },
];

export const EVAL_CATEGORY_SCORES = [
  { name: 'Code Quality', value: 95, color: '#3b82f6', icon: Code },
  { name: 'Security', value: 98, color: '#10b981', icon: Shield },
  { name: 'Efficiency', value: 88, color: '#f59e0b', icon: Zap },
  { name: 'Testing', value: 92, color: '#8b5cf6', icon: TestTube },
  { name: 'Accessibility', value: 90, color: '#ec4899', icon: Accessibility },
  { name: 'Alignment', value: 96, color: '#06b6d4', icon: Target },
];

export const EVAL_SUGGESTIONS = [
  { title: 'Bundle Optimization', desc: 'Implement route-based code splitting to reduce main chunk size by 45%.', priority: 'High', type: 'performance', icon: Zap },
  { title: 'Accessibility Improvements', desc: 'Add missing aria-labels to navigation elements.', priority: 'Medium', type: 'accessibility', icon: Accessibility },
  { title: 'Lazy Loading', desc: 'Lazy load heavy charting libraries (Recharts) to improve TTI.', priority: 'High', type: 'performance', icon: ArrowUpRight },
  { title: 'Security Updates', desc: 'Update 3 minor dependencies with known low-severity CVEs.', priority: 'Low', type: 'security', icon: Shield },
];
