// AUTO-GENERATED DRAFT SCREEN: DashboardBrowserAnalytics
import React, { useState, useEffect } from 'react';
import { cn } from './lib/utils';

// Mock tRPC-like hooks for demonstration
const useBrowserAnalytics = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        const mockData = {
          totalViews: 123456,
          uniqueVisitors: 87654,
          bounceRate: 32.5,
          topBrowsers: [
            { name: 'Chrome', value: 65 },
            { name: 'Firefox', value: 15 },
            { name: 'Safari', value: 10 },
            { name: 'Edge', value: 5 },
            { name: 'Other', value: 5 },
          ],
          geoData: [
            { country: 'USA', sessions: 40 },
            { country: 'Germany', sessions: 20 },
            { country: 'UK', sessions: 15 },
            { country: 'Canada', sessions: 10 },
            { country: 'Other', sessions: 15 },
          ],
        };
        setData(mockData);
      } catch (error) {
        console.error("Failed to fetch browser analytics:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, isLoading, isError };
};

interface DashboardBrowserAnalyticsProps {
  className?: string;
}

const DashboardBrowserAnalytics: React.FC<DashboardBrowserAnalyticsProps> = ({ className }) => {
  const { data, isLoading, isError } = useBrowserAnalytics();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Simulate dark mode toggle for accessibility
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (isLoading) {
    return (
      <div className={cn("flex items-center justify-center h-full p-4", className, isDarkMode ? 'dark' : '')}>
        <p className="text-lg text-gray-500 dark:text-gray-400">Loading browser analytics...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={cn("flex items-center justify-center h-full p-4", className, isDarkMode ? 'dark' : '')}>
        <p className="text-lg text-red-500 dark:text-red-400">Error loading analytics. Please try again.</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={cn("flex items-center justify-center h-full p-4", className, isDarkMode ? 'dark' : '')}>
        <p className="text-lg text-gray-500 dark:text-gray-400">No data available.</p>
      </div>
    );
  }

  return (
    <div className={cn(
      "container mx-auto p-6 space-y-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg",
      className,
      isDarkMode ? 'dark' : ''
    )}>
      <h1 className="text-4xl font-bold text-center mb-8">Browser Analytics Dashboard</h1>

      <section aria-labelledby="overview-heading" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <h2 id="overview-heading" className="sr-only">Overview</h2>
        <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-md flex flex-col items-center justify-center">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Views</p>
          <p className="text-3xl font-semibold mt-1">{data.totalViews.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-md flex flex-col items-center justify-center">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Unique Visitors</p>
          <p className="text-3xl font-semibold mt-1">{data.uniqueVisitors.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-md flex flex-col items-center justify-center">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Bounce Rate</p>
          <p className="text-3xl font-semibold mt-1">{data.bounceRate}%</p>
        </div>
      </section>

      <section aria-labelledby="top-browsers-heading" className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 id="top-browsers-heading" className="text-2xl font-semibold mb-4">Top Browsers</h2>
        <ul className="space-y-2">
          {data.topBrowsers.map((browser: { name: string; value: number }) => (
            <li key={browser.name} className="flex justify-between items-center">
              <span className="text-lg">{browser.name}</span>
              <span className="text-lg font-medium">{browser.value}%</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="geo-data-heading" className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 id="geo-data-heading" className="text-2xl font-semibold mb-4">Geographical Data</h2>
        <ul className="space-y-2">
          {data.geoData.map((geo: { country: string; sessions: number }) => (
            <li key={geo.country} className="flex justify-between items-center">
              <span className="text-lg">{geo.country}</span>
              <span className="text-lg font-medium">{geo.sessions}%</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default DashboardBrowserAnalytics;