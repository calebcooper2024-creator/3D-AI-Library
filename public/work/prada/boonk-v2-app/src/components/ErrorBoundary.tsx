import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<any, any> {
  public state: any;
  public props: any;

  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if ((this.state as any).hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-12">
          <div className="max-w-md w-full space-y-8 text-center">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-serif italic text-white tracking-tight">System Interruption.</h1>
              <p className="text-white/40 text-sm leading-relaxed">
                An unexpected anomaly has occurred within the neural mapping process. 
                The current state has been preserved for diagnostic analysis.
              </p>
              {(this.state as any).error && (
                <div className="p-4 bg-white/5 border border-white/10 rounded-sm text-left">
                  <p className="text-[10px] uppercase tracking-widest text-white/20 mb-2">Error Signature</p>
                  <p className="text-xs font-mono text-red-400/80 break-all">{(this.state as any).error.message}</p>
                </div>
              )}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="luxury-button inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Re-initialize System
            </button>
          </div>
        </div>
      );
    }

    return (this.props as any).children;
  }
}

export default ErrorBoundary;
