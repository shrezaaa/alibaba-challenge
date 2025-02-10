import { faArrowLeft, faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component, ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string | null;
}

class HotelErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, errorMessage: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center p-10">
          <h2 className="text-red-500 text-2xl font-semibold">
            Something went wrong.
          </h2>
          <p className="text-gray-700">{this.state.errorMessage}</p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <Link
              to="/hotels"
              className="p-2 border border-gray-300 rounded hover:bg-gray-300 flex items-center"
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="text-gray-700 mr-2"
              />
              Back to Hotels
            </Link>

            <button
              onClick={this.handleRetry}
              className="p-2 border border-gray-300 rounded hover:bg-gray-300 flex items-center"
            >
              <FontAwesomeIcon icon={faSync} className="text-gray-700 mr-2" />
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default HotelErrorBoundary;
