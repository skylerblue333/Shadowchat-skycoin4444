// AUTO-GENERATED DRAFT SCREEN: SecuritySettings
import React from 'react';
import { trpc } from './trpc/client';
import { Switch } from './components/ui/switch'; // Assuming shadcn/ui switch component
import { Label } from './components/ui/label'; // Assuming shadcn/ui label component

const SecuritySettings: React.FC = () => {
  const { data, isLoading, error } = trpc.security.query({ text: 'Security Settings' });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-lg text-gray-700 dark:text-gray-300">Loading security settings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-lg text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg mt-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Security Settings</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">{data?.greeting}</p>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-md dark:border-gray-700">
          <Label htmlFor="2fa-mode" className="text-lg font-medium text-gray-800 dark:text-gray-200">
            Enable Two-Factor Authentication
          </Label>
          <Switch id="2fa-mode" aria-label="Toggle two-factor authentication" />
        </div>

        <div className="flex items-center justify-between p-4 border rounded-md dark:border-gray-700">
          <Label htmlFor="email-alerts" className="text-lg font-medium text-gray-800 dark:text-gray-200">
            Email Security Alerts
          </Label>
          <Switch id="email-alerts" aria-label="Toggle email security alerts" defaultChecked />
        </div>

        <div className="flex items-center justify-between p-4 border rounded-md dark:border-gray-700">
          <Label htmlFor="session-timeout" className="text-lg font-medium text-gray-800 dark:text-gray-200">
            Auto Logout after Inactivity
          </Label>
          <Switch id="session-timeout" aria-label="Toggle automatic logout after inactivity" />
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
