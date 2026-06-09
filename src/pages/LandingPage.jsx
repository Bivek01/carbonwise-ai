import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Zap, BarChart3, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const LandingPage = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Smart Tracking",
      description: "Automatically sync and track your daily activities to calculate your real-time carbon footprint."
    },
    {
      icon: Zap,
      title: "AI Insights",
      description: "Receive personalized, actionable recommendations powered by advanced AI to reduce your emissions."
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "See how your individual choices contribute to global sustainability goals."
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-forest-100/50 to-transparent -z-10" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-leaf/20 rounded-full blur-3xl -z-10" />
      <div className="absolute top-40 -left-20 w-[400px] h-[400px] bg-emerald-300/20 rounded-full blur-3xl -z-10" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-forest-200 shadow-sm mb-8"
          >
            <Leaf className="w-5 h-5 text-forest-500" />
            <span className="text-sm font-medium text-forest-800">The Future of Sustainability</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8"
          >
            Understand your impact.<br />
            <span className="text-gradient">Shape a greener tomorrow.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto"
          >
            CarbonWise AI uses advanced machine learning to analyze your lifestyle,
            providing personalized insights to seamlessly reduce your carbon footprint.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Link to="/calculator">
              <Button size="lg" icon={ArrowRight}>Calculate My Footprint</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="secondary" size="lg">View Demo Dashboard</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm border-t border-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Powered by Intelligence</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We provide the tools you need to make informed decisions for the environment, without sacrificing your lifestyle.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} hover delay={index * 0.1}>
                <div className="bg-forest-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-forest-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 relative overflow-hidden bg-slate-50">
        {/* Subtle premium gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-slate-50 to-blue-50/50 z-0" />
        
        {/* Floating background decorations */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl z-0" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl z-0" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Ready to make a difference?
          </h2>
          <p className="text-slate-600 text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of users who have already reduced their carbon footprint by an average of 15% in their first month.
          </p>
          <Link to="/calculator" className="inline-block">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-emerald-500 to-forest-600 hover:from-emerald-400 hover:to-forest-500 text-white border-none shadow-xl shadow-emerald-500/30 font-bold px-10 py-4 text-lg transition-all hover:scale-105"
            >
              Start Your Journey
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;
