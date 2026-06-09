import { Loader2 } from 'lucide-react';

const PageLoader = () => (
  <div className="w-full h-[60vh] flex flex-col items-center justify-center" role="status" aria-live="polite">
    <div className="relative flex items-center justify-center mb-6">
      <div className="absolute inset-0 bg-forest-500 rounded-full animate-ping opacity-20 w-16 h-16"></div>
      <div className="bg-forest-100 p-4 rounded-full relative z-10">
        <Loader2 className="w-8 h-8 text-forest-600 animate-spin" aria-hidden="true" />
      </div>
    </div>
    <p className="text-slate-600 font-medium animate-pulse">Loading CarbonWise...</p>
  </div>
);

export default PageLoader;
