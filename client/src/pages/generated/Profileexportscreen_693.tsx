// AUTO-GENERATED DRAFT SCREEN: ProfileExportScreen
import React, { useState } from 'react';
import { Button } from './ui/button'; // Assuming shadcn/ui button
import { useMutation } from '@tanstack/react-query'; // Simulating tRPC hook with react-query
import { toast } from 'sonner'; // Assuming shadcn/ui toast for notifications

interface ProfileExportScreenProps {
  userId: string;
}

// Simulate tRPC client for export functionality
const trpc = {
  profile: {
    exportData: (userId: string, format: 'json' | 'csv' | 'pdf') =>
      new Promise<string>((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.1) { // Simulate success 90% of the time
            resolve(`Export successful for user ${userId} in ${format} format.`);
          } else {
            reject(new Error('Failed to export profile data.'));
          }
        }, 1500);
      }),
  },
};

export const ProfileExportScreen: React.FC<ProfileExportScreenProps> = ({ userId }) => {
  const [exportFormat, setExportFormat] = useState<'json' | 'csv' | 'pdf'>('json');

  const exportMutation = useMutation({
    mutationFn: (format: 'json' | 'csv' | 'pdf') => trpc.profile.exportData(userId, format),
    onSuccess: (message) => {
      toast.success(message);
    },
    onError: (error) => {
      toast.error(`Export failed: ${error.message}`);
    },
  });

  const handleExport = () => {
    exportMutation.mutate(exportFormat);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8 dark:bg-gray-900 dark:text-gray-50">
      <div className="max-w-2xl mx-auto bg-card p-6 rounded-lg shadow-lg dark:bg-gray-800">
        <h1 className="text-3xl font-bold mb-4">Profile Export</h1>
        <p className="text-muted-foreground mb-6">
          Select the desired format to export your profile data. This will download a file
          containing all your personal information.
        </p>

        <div className="mb-6">
          <label htmlFor="export-format" className="block text-sm font-medium mb-2">
            Choose Export Format:
          </label>
          <select
            id="export-format"
            className="block w-full p-2 border border-input rounded-md bg-background dark:bg-gray-700 dark:border-gray-600"
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value as 'json' | 'csv' | 'pdf')}
            aria-label="Select export format"
          >
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
            <option value="pdf">PDF</option>
          </select>
        </div>

        <Button
          onClick={handleExport}
          disabled={exportMutation.isPending}
          className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          {exportMutation.isPending ? 'Exporting...' : 'Export Profile'}
        </Button>

        {exportMutation.isError && (
          <p className="text-destructive mt-4 text-sm" role="alert">
            Error: {exportMutation.error?.message || 'An unknown error occurred.'}
          </p>
        )}
        {exportMutation.isSuccess && (
          <p className="text-green-500 mt-4 text-sm">
            Export initiated successfully. Check your downloads.
          </p>
        )}
      </div>
    </div>
  );
};

// Example usage (for demonstration, not part of the component itself)
// <ProfileExportScreen userId="SKYCOIN4444" />


export default ProfileExportScreen;
