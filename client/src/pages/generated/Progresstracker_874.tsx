// AUTO-GENERATED DRAFT SCREEN: ProgressTracker
import React from 'react';
import { trpc } from '../trpc';
import { Button } from './ui/button';

interface ModuleProgress {
  id: string;
  name: string;
  progress: number;
  completed: boolean;
}

const ProgressTracker: React.FC = () => {
  const { data, isLoading, isError, error } = trpc.getLearningProgress.useQuery({ userId: 'user123' });

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen text-lg">Loading progress...</div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center h-screen text-red-500 text-lg">Error: {error.message}</div>;
  }

  const { modules, overallProgress } = data || { modules: [], overallProgress: 0 };

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800 dark:text-gray-50">Learning Module: Progress Tracker</h1>

      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Overall Progress</h2>
        <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
        <p className="text-right text-gray-600 dark:text-gray-300 mt-2">{overallProgress.toFixed(2)}% Completed</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module: ModuleProgress) => (
          <div key={module.id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">{module.name}</h3>
            <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700 mb-2">
              <div
                className="bg-green-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${module.progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Progress: {module.progress}%</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Status: {module.completed ? 'Completed' : 'In Progress'}</p>
            <Button className="mt-4 w-full">View Module</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;