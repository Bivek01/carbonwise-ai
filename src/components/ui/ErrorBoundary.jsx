import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import Button from './Button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-8 text-center max-w-2xl mx-auto my-12">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" aria-hidden="true" />
          <h3 className="text-xl font-bold text-slate-900 mb-2">Something went wrong</h3>
          <p className="text-slate-600 mb-6">{this.state.error?.message || "An unexpected error occurred."}</p>
          <Button 
            variant="primary" 
            onClick={() => {
              this.setState({ hasError: false, error: null });
              if (this.props.onReset) this.props.onReset();
              else window.location.reload();
            }}
            icon={RefreshCw}
          >
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
