import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageLoader from '../components/ui/PageLoader';
import ErrorBoundary from '../components/ui/ErrorBoundary';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-forest-200 selection:text-forest-900">
      <Navbar />
      <main className="flex-grow pt-20">
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
