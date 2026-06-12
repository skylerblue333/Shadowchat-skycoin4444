// AUTO-GENERATED DRAFT SCREEN: OnboardingRejection
import React, { useState } from 'react';

interface OnboardingRejectionProps {
  reason?: string;
  onRetry?: () => void;
  isLoading?: boolean;
  isError?: boolean;
}

// Simulate tRPC hook for demonstration purposes
const useOnboardingRejectionMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (Math.random() > 0.8) {
        throw new Error('Simulated API error');
      }
      console.log('Mutation successful:', data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
};

const OnboardingRejection: React.FC<OnboardingRejectionProps> = ({
  reason = 'Your application could not be processed at this time.',
  onRetry,
  isLoading: propIsLoading = false,
  isError: propIsError = false,
}) => {
  const { mutate, loading: tRpcLoading, error: tRpcError } = useOnboardingRejectionMutation();

  const isLoading = propIsLoading || tRpcLoading;
  const isError = propIsError || !!tRpcError;

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      // Simulate a retry action, e.g., re-triggering a tRPC mutation
      mutate({ retry: true });
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8"
      role="alert"
      aria-live="assertive"
    >
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white dark:bg-gray-800 p-8 shadow-xl">
        <div className="text-center">
          <svg
            className="mx-auto h-16 w-16 text-red-500 dark:text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">Application Rejected</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {isError ? tRpcError : reason}
          </p>
        </div>

        {isLoading && (
          <div className="flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent dark:border-blue-400 dark:border-r-transparent"></div>
            <span className="sr-only">Loading...</span>
          </div>
        )}

        {!isLoading && onRetry && (
          <div className="flex justify-center">
            <button
              onClick={handleRetry}
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              Retry Application
            </button>
          </div>
        )}

        <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
          If you believe this is an error, please contact support.
        </p>
      </div>
    </div>
  );
};

export default OnboardingRejection;
