import { Leaf, Twitter, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Leaf className="w-6 h-6 text-leaf" />
              <span className="text-xl font-bold text-white tracking-tight">
                Carbon<span className="text-leaf">Wise</span> AI
              </span>
            </Link>
            <p className="text-slate-400 max-w-sm">
              Empowering individuals and businesses to understand, track, and reduce their carbon footprint through AI-driven insights.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" aria-label="Visit our Twitter page" className="text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 rounded-sm">
                <Twitter className="w-5 h-5" aria-hidden="true" />
              </a>
              <a href="#" aria-label="Visit our Github repository" className="text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 rounded-sm">
                <Github className="w-5 h-5" aria-hidden="true" />
              </a>
              <a href="#" aria-label="Visit our LinkedIn page" className="text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 rounded-sm">
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/calculator" className="hover:text-leaf transition-colors">Calculator</Link></li>
              <li><Link to="/insights" className="hover:text-leaf transition-colors">AI Insights</Link></li>
              <li><Link to="/challenges" className="hover:text-leaf transition-colors">Challenges</Link></li>
              <li><Link to="/progress" className="hover:text-leaf transition-colors">Tracking</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-leaf transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-leaf transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-leaf transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} CarbonWise AI. All rights reserved.
          </p>
          <p className="text-sm text-slate-500 mt-2 md:mt-0">
            Made with <span className="text-red-500">♥</span> for the Earth.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
