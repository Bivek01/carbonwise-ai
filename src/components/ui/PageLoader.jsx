import { Loader2 } from 'lucide-react';

const PageLoader = () => (
  <div className="w-full h-[60vh] flex flex-col items-center justify-center" role="status" aria-live="polite">
    <Loader2 className="w-10 h-10 text-forest-500 animate-spin mb-4" aria-hidden="true" />
    <p className="text-slate-500 font-medium animate-pulse">Loading CarbonWise...</p>
  </div>
);

export default PageLoader;
