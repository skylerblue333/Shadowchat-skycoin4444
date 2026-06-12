// AUTO-GENERATED DRAFT SCREEN: AnalyticsCurrentPages

import React from 'react';

/**
 * @typedef {Object} PageAnalyticData
 * @property {string} id - Unique identifier for the page.
 * @property {string} page - The URL path of the page.
 * @property {number} views - The number of views for the page.
 * @property {number} uniqueVisitors - The number of unique visitors for the page.
 * @property {number} bounceRate - The bounce rate percentage for the page.
 * @property {number} timeOnPage - Average time spent on the page in seconds.
 * @property {string} lastUpdated - Timestamp of when the data was last updated.
 * @property {string} region - Geographic region where the page views originated.
 * @property {string} device - Type of device used to view the page (e.g., 'Desktop', 'Mobile', 'Tablet').
 * @property {string} browser - The web browser used by the visitor (e.g., 'Chrome', 'Firefox', 'Safari').
 * @property {string} os - The operating system used by the visitor (e.g., 'Windows', 'macOS', 'Android', 'iOS').
 */
interface PageAnalyticData {
  id: string;
  page: string;
  views: number;
  uniqueVisitors: number;
  bounceRate: number;
  timeOnPage: number;
  lastUpdated: string;
  region: string;
  device: 'Desktop' | 'Mobile' | 'Tablet';
  browser: string;
  os: string;
}

interface AnalyticsCurrentPagesProps {
  /**
   * Optional title for the analytics section. Defaults to "Current Pages Analytics".
   */
  title?: string;
  /**
   * Optional description for the analytics section.
   */
  description?: string;
  /**
   * Optional prop to simulate an error state for demonstration purposes.
   * When true, the component will render an error message instead of data.
   */
  simulateError?: boolean;
  /**
   * Optional prop to simulate an empty data state for demonstration purposes.
   * When true, the component will render a no data message.
   */
  simulateEmptyData?: boolean;
}

/**
 * A simulated tRPC hook for fetching analytics data.
 * In a real application, this would interact with a tRPC backend,
 * handling data fetching, caching, and revalidation. This hook also
 * includes simulated filtering capabilities for demonstration.
 *
 * @param {boolean} simulateError - If true, the hook will simulate an error during data fetching.
 * @param {boolean} simulateEmptyData - If true, the hook will return an empty data array.
 * @param {string} filterRegion - Filters the data by geographic region.
 * @param {string} filterDevice - Filters the data by device type.
 * @returns {{ data: PageAnalyticData[] | null, isLoading: boolean, isError: boolean }}
 */
const useAnalyticsData = (simulateError: boolean = false, simulateEmptyData: boolean = false, filterRegion: string = 'All', filterDevice: string = 'All') => {
  const [data, setData] = React.useState<PageAnalyticData[] | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isError, setIsError] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchSimulatedData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        // Simulate network delay for fetching data to better represent real-world scenarios.
        await new Promise(resolve => setTimeout(resolve, 1800));

        // Simulate a random error or a forced error for demonstration purposes.
        if (simulateError || Math.random() < 0.05) { // 5% chance of random error
          throw new Error("Failed to fetch data due to a simulated network issue or API error.");
        }

        if (simulateEmptyData) {
          setData([]);
          setIsLoading(false);
          return;
        }
        
        // Generate more comprehensive simulated data including region, device, browser, and OS information.
        const allSimulatedData: PageAnalyticData[] = [
          { id: '1', page: '/dashboard', views: 1200, uniqueVisitors: 800, bounceRate: 35, timeOnPage: 120, lastUpdated: new Date().toISOString(), region: 'North America', device: 'Desktop', browser: 'Chrome', os: 'Windows' },
          { id: '2', page: '/products', views: 850, uniqueVisitors: 600, bounceRate: 42, timeOnPage: 90, lastUpdated: new Date().toISOString(), region: 'Europe', device: 'Mobile', browser: 'Safari', os: 'iOS' },
          { id: '3', page: '/about', views: 400, uniqueVisitors: 300, bounceRate: 55, timeOnPage: 60, lastUpdated: new Date().toISOString(), region: 'Asia', device: 'Tablet', browser: 'Firefox', os: 'Android' },
          { id: '4', page: '/contact', views: 250, uniqueVisitors: 180, bounceRate: 60, timeOnPage: 45, lastUpdated: new Date().toISOString(), region: 'North America', device: 'Mobile', browser: 'Chrome', os: 'Android' },
          { id: '5', page: '/blog/post-1', views: 600, uniqueVisitors: 450, bounceRate: 30, timeOnPage: 150, lastUpdated: new Date().toISOString(), region: 'Europe', device: 'Desktop', browser: 'Edge', os: 'Windows' },
          { id: '6', page: '/services', views: 720, uniqueVisitors: 500, bounceRate: 38, timeOnPage: 110, lastUpdated: new Date().toISOString(), region: 'Asia', device: 'Desktop', browser: 'Chrome', os: 'macOS' },
          { id: '7', page: '/pricing', views: 310, uniqueVisitors: 220, bounceRate: 48, timeOnPage: 70, lastUpdated: new Date().toISOString(), region: 'North America', device: 'Tablet', browser: 'Safari', os: 'iOS' },
          { id: '8', page: '/careers', views: 180, uniqueVisitors: 100, bounceRate: 70, timeOnPage: 30, lastUpdated: new Date().toISOString(), region: 'Europe', device: 'Mobile', browser: 'Firefox', os: 'Android' },
          { id: '9', page: '/support', views: 500, uniqueVisitors: 350, bounceRate: 40, timeOnPage: 80, lastUpdated: new Date().toISOString(), region: 'Asia', device: 'Desktop', browser: 'Chrome', os: 'Windows' },
          { id: '10', page: '/privacy', views: 150, uniqueVisitors: 90, bounceRate: 65, timeOnPage: 25, lastUpdated: new Date().toISOString(), region: 'North America', device: 'Desktop', browser: 'Edge', os: 'macOS' },
          { id: '11', page: '/terms', views: 100, uniqueVisitors: 70, bounceRate: 75, timeOnPage: 20, lastUpdated: new Date().toISOString(), region: 'Europe', device: 'Mobile', browser: 'Safari', os: 'iOS' },
          { id: '12', page: '/faq', views: 300, uniqueVisitors: 200, bounceRate: 45, timeOnPage: 50, lastUpdated: new Date().toISOString(), region: 'Asia', device: 'Tablet', browser: 'Chrome', os: 'Android' },
          { id: '13', page: '/docs', views: 450, uniqueVisitors: 320, bounceRate: 30, timeOnPage: 100, lastUpdated: new Date().toISOString(), region: 'North America', device: 'Desktop', browser: 'Firefox', os: 'Windows' },
          { id: '14', page: '/community', views: 280, uniqueVisitors: 190, bounceRate: 50, timeOnPage: 75, lastUpdated: new Date().toISOString(), region: 'Europe', device: 'Desktop', browser: 'Chrome', os: 'macOS' },
          { id: '15', page: '/partners', views: 190, uniqueVisitors: 130, bounceRate: 62, timeOnPage: 40, lastUpdated: new Date().toISOString(), region: 'Asia', device: 'Mobile', browser: 'Edge', os: 'Android' },
          { id: '16', page: '/downloads', views: 600, uniqueVisitors: 400, bounceRate: 28, timeOnPage: 180, lastUpdated: new Date().toISOString(), region: 'North America', device: 'Desktop', browser: 'Chrome', os: 'Windows' },
          { id: '17', page: '/features', views: 700, uniqueVisitors: 550, bounceRate: 32, timeOnPage: 130, lastUpdated: new Date().toISOString(), region: 'Europe', device: 'Desktop', browser: 'Firefox', os: 'macOS' },
          { id: '18', page: '/integrations', views: 350, uniqueVisitors: 250, bounceRate: 58, timeOnPage: 65, lastUpdated: new Date().toISOString(), region: 'Asia', device: 'Tablet', browser: 'Safari', os: 'iOS' },
        ];

        let filteredData = allSimulatedData;

        if (filterRegion !== 'All') {
          filteredData = filteredData.filter(item => item.region === filterRegion);
        }

        if (filterDevice !== 'All') {
          filteredData = filteredData.filter(item => item.device === filterDevice);
        }

        setData(filteredData);
      } catch (error) {
        console.error("Error in simulated tRPC hook:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSimulatedData();
  }, [simulateError, simulateEmptyData, filterRegion, filterDevice]); // Re-run effect if any relevant prop changes.

  return { data, isLoading, isError };
};

/**
 * AnalyticsCurrentPages Component
 *
 * This component provides a detailed overview of current page analytics for a website.
 * It includes metrics suchs as page views, unique visitors, bounce rate, average time on page,
 * geographic region, and device type. The component features robust loading states,
 * comprehensive error handling, and is designed with dark theme compatibility using Tailwind CSS.
 * Accessibility considerations are also integrated. Data fetching is simulated using a tRPC-like hook
 * for demonstration purposes. Users can filter the data by geographic region and device type.
 */
const AnalyticsCurrentPages: React.FC<AnalyticsCurrentPagesProps> = ({
  title = "Current Pages Analytics",
  description = "Overview of the most visited pages on your website, including detailed metrics and filtering options.",
  simulateError = false,
  simulateEmptyData = false,
}) => {
  const [selectedRegion, setSelectedRegion] = React.useState<string>('All');
  const [selectedDevice, setSelectedDevice] = React.useState<string>('All');
  const { data: pageData, isLoading, isError } = useAnalyticsData(simulateError, simulateEmptyData, selectedRegion, selectedDevice);

  const regions = ['All', 'North America', 'Europe', 'Asia']; // Available regions for filtering
  const devices = ['All', 'Desktop', 'Mobile', 'Tablet']; // Available devices for filtering

  // Render loading state while data is being fetched.
  if (isLoading) {
    return (
      <div
        className="flex flex-col items-center justify-center h-64 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md animate-pulse"
        role="status"
        aria-live="polite"
        aria-label="Loading analytics data"
      >
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-lg text-gray-700 dark:text-gray-300">Loading {title.toLowerCase()}...</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Please wait while we fetch the latest data.</p>
      </div>
    );
  }

  // Render error state if data fetching fails.
  if (isError) {
    return (
      <div
        className="flex flex-col items-center justify-center h-64 bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200 rounded-lg shadow-md p-4"
        role="alert"
        aria-live="assertive"
        aria-label="Error loading analytics data"
      >
        <svg className="w-12 h-12 mb-3 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <p className="text-xl font-semibold text-red-700 dark:text-red-300">Error loading {title.toLowerCase()}.</p>
        <p className="text-base mt-2">We encountered an issue while trying to retrieve the analytics data.</p>
        <p className="text-sm mt-1">Please check your internet connection or try refreshing the page. If the problem persists, please contact support.</p>
      </div>
    );
  }

  // Render empty data state if no data is available.
  if (!pageData || pageData.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center h-64 bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 rounded-lg shadow-md p-4"
        role="status"
        aria-live="polite"
        aria-label="No analytics data available"
      >
        <svg className="w-12 h-12 mb-3 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <p className="text-xl font-semibold text-yellow-700 dark:text-yellow-300">No data available for {title.toLowerCase()}.</p>
        <p className="text-base mt-2">There is no analytics data to display based on the current filters.</p>
        <p className="text-sm mt-1">Try adjusting your filters or check back later.</p>
      </div>
    );
  }

  // Render the analytics data once successfully loaded.
  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <label htmlFor="region-filter" className="text-gray-700 dark:text-gray-300 text-sm font-medium">Filter by Region:</label>
          <select
            id="region-filter"
            className="block w-auto px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            aria-label="Select region to filter analytics data"
          >
            {regions.map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label htmlFor="device-filter" className="text-gray-700 dark:text-gray-300 text-sm font-medium">Filter by Device:</label>
          <select
            id="device-filter"
            className="block w-auto px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            value={selectedDevice}
            onChange={(e) => setSelectedDevice(e.target.value)}
            aria-label="Select device type to filter analytics data"
          >
            {devices.map((device) => (
              <option key={device} value={device}>{device}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto mb-6">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Page
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Views
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Unique Visitors
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Bounce Rate
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Time on Page (s)
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Region
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Device
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Browser
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                OS
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {pageData?.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {item.page}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {item.views.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {item.uniqueVisitors.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {item.bounceRate}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {item.timeOnPage}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {item.region}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {item.device}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {item.browser}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {item.os}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
        Data last updated: {new Date(pageData?.[0]?.lastUpdated || Date.now()).toLocaleDateString()} at {new Date(pageData?.[0]?.lastUpdated || Date.now()).toLocaleTimeString()}.
        <span className="block mt-1">All times are in your local timezone.</span>
      </p>
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500 text-blue-700 dark:text-blue-300 text-sm rounded">
        <p><strong>Note:</strong> This data is simulated and for demonstration purposes only. In a real application, this would be fetched from a live analytics service using actual tRPC calls.</p>
        <p className="mt-1">Consider integrating with a robust analytics backend for production environments for real-time and accurate data.</p>
      </div>
    </div>
  );
};

export default AnalyticsCurrentPages;
