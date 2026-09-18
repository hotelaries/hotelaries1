import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  declare props: Props;
  declare state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in LINGERS app:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('lingers_luxury_hotel_data_v1');
    } catch {}
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF8F5] text-[#23201C] flex items-center justify-center p-6 text-center font-sans-clean">
          <div className="max-w-md bg-white border border-[#23201C]/10 rounded-2xl p-8 shadow-xl space-y-5">
            <span className="text-xs uppercase tracking-[0.3em] text-[#9E7D53] font-medium">
              LINGERS — Suites & Residence
            </span>
            <h1 className="font-serif-luxury text-3xl font-light text-[#23201C]">
              Notice & Recovery
            </h1>
            <p className="text-sm text-[#7D7468] leading-relaxed">
              We encountered a slight display disruption. Please refresh or reset to the verified default luxury presentation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2.5 bg-[#23201C] text-white text-xs uppercase tracking-wider font-medium rounded-lg hover:bg-black transition-colors"
              >
                Reload Page
              </button>
              <button
                onClick={this.handleReset}
                className="px-6 py-2.5 border border-[#9E7D53] text-[#9E7D53] text-xs uppercase tracking-wider font-medium rounded-lg hover:bg-[#9E7D53] hover:text-white transition-colors"
              >
                Reset Site Defaults
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
