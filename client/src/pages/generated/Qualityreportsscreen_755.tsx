// AUTO-GENERATED DRAFT SCREEN: QualityReportsScreen
import React from 'react';
import { trpc } from '../lib/trpc';
import { useQuery } from '@tanstack/react-query';

interface Report {
  id: string;
  reportName: string;
  status: string;
  date: string;
}

const QualityReportsScreen: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["qualityReports"],
    queryFn: () => trpc.qualityReports.query(),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-lg text-gray-700 dark:text-gray-300">Loading quality reports...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-lg text-red-600 dark:text-red-400">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Quality Reports</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-200 dark:bg-gray-600">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-200 uppercase tracking-wider">Report ID</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-200 uppercase tracking-wider">Report Name</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-200 uppercase tracking-wider">Status</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-200 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {data?.map((report: Report) => (
              <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-300">{report.id}</td>
                <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-300">{report.reportName}</td>
                <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-300">{report.status}</td>
                <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-300">{report.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QualityReportsScreen;
