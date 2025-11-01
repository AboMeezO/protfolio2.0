import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console for debugging
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // Check if it's a Three.js geometry error
    if (error.message && error.message.includes("NaN")) {
      console.warn("Detected NaN geometry error, attempting to recover...");
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="w-full h-full flex items-center justify-center bg-primary">
          <div className="text-center">
            <h2 className="text-white text-xl mb-2">Something went wrong</h2>
            <p className="text-gray-300 text-sm mb-4">
              The 3D component encountered an error and couldn't load properly.
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-4 py-2 bg-[#915EFF] text-white rounded-md hover:bg-[#7c4dff] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
