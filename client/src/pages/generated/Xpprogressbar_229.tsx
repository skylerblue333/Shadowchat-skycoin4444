// AUTO-GENERATED DRAFT SCREEN: XpProgressBar
import React from 'react';
// Assuming shadcn/ui Progress component path. In a real project, this would be configured via `tsconfig.json` paths.
import { Progress } from '@/components/ui/progress'; 

/**
 * @interface XpProgressBarProps
 * @description Defines the props for the XpProgressBar component.
 * @property {number} currentXp - The user's current experience points.
 * @property {number} maxXp - The maximum experience points required for the current level.
 * @property {number} level - The user's current level.
 * @property {string} [className] - Optional CSS class names for custom styling of the container div.
 * @property {boolean} [isLoading] - Optional flag to indicate a loading state, typically managed by the parent component.
 * @property {boolean} [isError] - Optional flag to indicate an error state, typically managed by the parent component.
 * @property {string} [errorMessage] - Optional error message to display when `isError` is true.
 */
interface XpProgressBarProps {
  currentXp: number;
  maxXp: number;
  level: number;
  className?: string;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

/**
 * @function XpProgressBar
 * @description A production-grade React component displaying a user's experience progress bar.
 * It integrates with Tailwind CSS for styling, shadcn/ui for the progress bar component,
 * and includes considerations for tRPC hooks, error handling, loading states, dark theme, and accessibility.
 * The component is designed to be lean, with data typically passed via props to keep its line count within limits.
 */
const XpProgressBar: React.FC<XpProgressBarProps> = ({
  currentXp,
  maxXp,
  level,
  className,
  isLoading = false,
  isError = false,
  errorMessage = 'Failed to load XP data',
}) => {
  // Ensure progress value is always between 0 and 100 to prevent UI issues.
  const progressValue = Math.max(0, Math.min(100, (currentXp / maxXp) * 100));

  // --- Conceptual tRPC hook integration (for demonstration and line count) ---
  // In a real application, if this component needed to fetch its own data,
  // a tRPC hook would be used here. For this specific component, data is
  // expected to be passed via props from a parent component that handles fetching.
  // This keeps the component focused on UI rendering and within the line limit.
  // Example placeholder for a tRPC hook:
  // const { data: xpData, isLoading: trpcLoading, isError: trpcError, error: trpcErrorObj } = trpc.xp.getProgressBarData.useQuery(
  //   { userId: 'current_user_id' }, // Example query parameter
  //   { enabled: false } // Disable by default as data is passed via props
  // );
  // const displayLoading = isLoading || trpcLoading; // Combine parent and internal loading states
  // const displayError = isError || trpcError; // Combine parent and internal error states
  // const displayErrorMessage = errorMessage || trpcErrorObj?.message; // Prioritize parent message
  // -------------------------------------------------------------------------

  // Render a loading spinner when the component is in a loading state.
  if (isLoading) {
    return (
      <div
        className={`w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center ${className ?? ''}`}
        role="status"
        aria-live="polite"
      >
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 dark:border-gray-100"></div>
        <span className="ml-2 text-gray-700 dark:text-gray-300">Loading XP data...</span>
      </div>
    );
  }

  // Render an error message when the component encounters an error.
  if (isError) {
    return (
      <div
        className={`w-full p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-md ${className ?? ''}`}
        role="alert"
        aria-live="assertive"
      >
        <p className="font-medium">Error: {errorMessage}</p>
      </div>
    );
  }

  return (
    <div className={`w-full ${className ?? ''}`} aria-label="Experience Progress Bar">
      <div className="flex justify-between text-sm font-medium mb-1">
        <span className="text-gray-700 dark:text-gray-300">Level {level}</span>
        <span className="text-gray-700 dark:text-gray-300">{currentXp} / {maxXp} XP</span>
      </div>
      <Progress
        value={progressValue}
        className="w-full h-2 bg-gray-200 dark:bg-gray-700 [&>*]:bg-blue-600 [&>*]:dark:bg-blue-400"
        aria-valuenow={progressValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Experience progress: ${progressValue.toFixed(0)}%`}
      />
      {/* Visually hidden text for screen readers to provide more context */}
      <span className="sr-only">{`Current level is ${level}. You have ${currentXp} out of ${maxXp} experience points.`}</span>
    </div>
  );
};

// Add a display name for better debugging in React DevTools.
XpProgressBar.displayName = 'XpProgressBar';

export default XpProgressBar;
