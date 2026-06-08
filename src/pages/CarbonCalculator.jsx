import { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Zap, Utensils, Droplets, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const CarbonCalculator = () => {
  const [formData, setFormData] = useState({
    vehicleType: 'gasoline',
    distance: '',
    electricity: '',
    food: 'mixed',
    water: ''
  });

  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateFootprint = (e) => {
    e.preventDefault();
    setError(null);
    
    // Convert inputs to numbers
    const distancePerDay = parseFloat(formData.distance) || 0;
    const electricityPerMonth = parseFloat(formData.electricity) || 0;
    const waterPerDay = parseFloat(formData.water) || 0;

    // Strict Input Validation
    if (distancePerDay < 0 || distancePerDay > 100000) {
      setError("Distance must be between 0 and 100,000 km");
      return;
    }
    if (electricityPerMonth < 0 || electricityPerMonth > 100000) {
      setError("Electricity consumption must be between 0 and 100,000 kWh");
      return;
    }
    if (waterPerDay < 0 || waterPerDay > 100000) {
      setError("Water consumption must be between 0 and 100,000 Liters");
      return;
    }

    // Formulas (Estimates for kg CO2e per year)
    
    // 1. Transportation
    // Emission factors approx (kg CO2 per km)
    const transportFactors = {
      gasoline: 0.192,
      diesel: 0.171,
      electric: 0.053,
      transit: 0.041,
      none: 0
    };
    const transportEmissions = (distancePerDay * 365) * transportFactors[formData.vehicleType];

    // 2. Electricity
    // Approx 0.4 kg CO2 per kWh
    const electricityEmissions = (electricityPerMonth * 12) * 0.4;

    // 3. Food
    // Approx annual emissions in kg
    const foodFactors = {
      vegan: 1500,
      vegetarian: 1700,
      mixed: 2500,
      non_vegetarian: 3300
    };
    const foodEmissions = foodFactors[formData.food];

    // 4. Water
    // Approx 0.001 kg CO2 per Liter
    const waterEmissions = (waterPerDay * 365) * 0.001;

    const totalEmissions = transportEmissions + electricityEmissions + foodEmissions + waterEmissions;

    // Categorize impact
    let impactLevel = '';
    let impactColor = '';
    let impactIcon = null;

    if (totalEmissions < 4000) {
      impactLevel = 'Low Impact';
      impactColor = 'text-emerald-500';
      impactIcon = <CheckCircle className="w-8 h-8 text-emerald-500" />;
    } else if (totalEmissions < 8000) {
      impactLevel = 'Medium Impact';
      impactColor = 'text-amber-500';
      impactIcon = <Info className="w-8 h-8 text-amber-500" />;
    } else {
      impactLevel = 'High Impact';
      impactColor = 'text-rose-500';
      impactIcon = <AlertTriangle className="w-8 h-8 text-rose-500" />;
    }

    setResults({
      total: totalEmissions.toFixed(0),
      breakdown: {
        transport: transportEmissions.toFixed(0),
        electricity: electricityEmissions.toFixed(0),
        food: foodEmissions.toFixed(0),
        water: waterEmissions.toFixed(0)
      },
      impactLevel,
      impactColor,
      impactIcon
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Carbon Footprint Calculator</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Enter your daily and monthly habits below to calculate your estimated annual carbon footprint.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calculator Form */}
        <Card className="h-full">
          <form onSubmit={calculateFootprint} className="space-y-6" noValidate>
            
            {/* Transportation */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center border-b border-slate-100 pb-2">
                <Car className="w-5 h-5 mr-2 text-forest-600" /> Transportation
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="vehicleType" className="block text-sm font-medium text-slate-700 mb-1">Vehicle Type</label>
                  <select 
                    id="vehicleType"
                    name="vehicleType" 
                    value={formData.vehicleType}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500"
                  >
                    <option value="gasoline">Gasoline Car</option>
                    <option value="diesel">Diesel Car</option>
                    <option value="electric">Electric Car</option>
                    <option value="transit">Public Transit</option>
                    <option value="none">Bicycle / Walking</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="distance" className="block text-sm font-medium text-slate-700 mb-1">Distance / Day (km)</label>
                  <input 
                    id="distance"
                    type="number" 
                    name="distance"
                    value={formData.distance}
                    onChange={handleInputChange}
                    placeholder="e.g. 20" 
                    required
                    min="0"
                    max="100000"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500" 
                  />
                </div>
              </div>
            </div>

            {/* Electricity */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center border-b border-slate-100 pb-2">
                <Zap className="w-5 h-5 mr-2 text-amber-500" /> Electricity
              </h3>
              <div>
                <label htmlFor="electricity" className="block text-sm font-medium text-slate-700 mb-1">Monthly Consumption (kWh)</label>
                <input 
                  id="electricity"
                  type="number" 
                  name="electricity"
                  value={formData.electricity}
                  onChange={handleInputChange}
                  placeholder="e.g. 300" 
                  required
                  min="0"
                  max="100000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500" 
                />
              </div>
            </div>

            {/* Food */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center border-b border-slate-100 pb-2">
                <Utensils className="w-5 h-5 mr-2 text-rose-500" /> Food Diet
              </h3>
              <div>
                <label htmlFor="food" className="block text-sm font-medium text-slate-700 mb-1">Diet Type</label>
                <select 
                  id="food"
                  name="food"
                  value={formData.food}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500"
                >
                  <option value="vegan">Vegan</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="mixed">Mixed (Average Meat)</option>
                  <option value="non_vegetarian">Non-Vegetarian (Heavy Meat)</option>
                </select>
              </div>
            </div>

            {/* Water */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center border-b border-slate-100 pb-2">
                <Droplets className="w-5 h-5 mr-2 text-blue-500" /> Water
              </h3>
              <div>
                <label htmlFor="water" className="block text-sm font-medium text-slate-700 mb-1">Daily Consumption (Liters)</label>
                <input 
                  id="water"
                  type="number" 
                  name="water"
                  value={formData.water}
                  onChange={handleInputChange}
                  placeholder="e.g. 150" 
                  required
                  min="0"
                  max="100000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500" 
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-sm flex items-center" role="alert">
                <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
                {error}
              </div>
            )}
            <div className="pt-4">
              <Button type="submit" variant="primary" className="w-full py-4 text-lg">
                Calculate Impact
              </Button>
            </div>
          </form>
        </Card>

        {/* Results Section */}
        <div aria-live="polite" aria-atomic="true">
          {results ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="h-full space-y-6"
            >
              {/* Total Score Card */}
              <Card className="text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-forest-50 to-transparent -z-10" />
                <h3 className="text-slate-500 font-medium uppercase tracking-wider text-sm mb-2">Your Annual Carbon Score</h3>
                <div className="text-6xl font-bold text-slate-900 mb-2">
                  {Number(results.total).toLocaleString()} <span className="text-2xl text-slate-500 font-normal">kg CO₂e</span>
                </div>
                
                <div className="flex items-center justify-center space-x-2 mt-6 p-4 bg-white rounded-xl border border-slate-100 shadow-sm inline-flex">
                  {results.impactIcon}
                  <span className={`text-xl font-bold ${results.impactColor}`}>
                    {results.impactLevel}
                  </span>
                </div>
              </Card>

              {/* Breakdown Cards */}
              <h4 className="font-bold text-slate-800 text-lg mt-8 mb-4">Impact Breakdown</h4>
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4" hover>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-forest-50 rounded-lg"><Car className="w-4 h-4 text-forest-600" /></div>
                    <span className="text-sm font-medium text-slate-600">Transport</span>
                  </div>
                  <div className="text-xl font-bold text-slate-800">{Number(results.breakdown.transport).toLocaleString()} <span className="text-xs text-slate-500 font-normal">kg</span></div>
                </Card>
                
                <Card className="p-4" hover>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-amber-50 rounded-lg"><Zap className="w-4 h-4 text-amber-500" /></div>
                    <span className="text-sm font-medium text-slate-600">Electricity</span>
                  </div>
                  <div className="text-xl font-bold text-slate-800">{Number(results.breakdown.electricity).toLocaleString()} <span className="text-xs text-slate-500 font-normal">kg</span></div>
                </Card>

                <Card className="p-4" hover>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-rose-50 rounded-lg"><Utensils className="w-4 h-4 text-rose-500" /></div>
                    <span className="text-sm font-medium text-slate-600">Food</span>
                  </div>
                  <div className="text-xl font-bold text-slate-800">{Number(results.breakdown.food).toLocaleString()} <span className="text-xs text-slate-500 font-normal">kg</span></div>
                </Card>

                <Card className="p-4" hover>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-blue-50 rounded-lg"><Droplets className="w-4 h-4 text-blue-500" /></div>
                    <span className="text-sm font-medium text-slate-600">Water</span>
                  </div>
                  <div className="text-xl font-bold text-slate-800">{Number(results.breakdown.water).toLocaleString()} <span className="text-xs text-slate-500 font-normal">kg</span></div>
                </Card>
              </div>

              <div className="mt-8">
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-emerald-500 font-medium">Low (&lt; 4k)</span>
                  <span className="text-amber-500 font-medium">Medium (4k - 8k)</span>
                  <span className="text-rose-500 font-medium">High (&gt; 8k)</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                  <div className="h-full bg-emerald-400 w-1/3"></div>
                  <div className="h-full bg-amber-400 w-1/3"></div>
                  <div className="h-full bg-rose-400 w-1/3"></div>
                </div>
              </div>

            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">Waiting for Input</h3>
              <p className="text-slate-500">Fill out the form and hit calculate to see your personalized carbon footprint score.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarbonCalculator;
