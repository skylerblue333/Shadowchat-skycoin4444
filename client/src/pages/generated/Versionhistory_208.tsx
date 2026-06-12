// AUTO-GENERATED DRAFT SCREEN: VersionHistory
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './components/ui/card';
import { Button } from './components/ui/button'; // Assuming Button component from shadcn/ui
import { Switch } from './components/ui/switch'; // Assuming Switch component for dark mode
import { Label } from './components/ui/label'; // Assuming Label component

// Mock tRPC hook for version history data
interface VersionHistoryItem {
  version: string;
  date: string;
  changes: string;
  features?: string[];
  bugFixes?: string[];
}

const useVersionHistory = () => {
  const [data, setData] = useState<VersionHistoryItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500)); // Increased delay for loading state visibility
        const mockData: VersionHistoryItem[] = [
          { version: '1.0.0', date: '2023-01-15', changes: 'Initial release of the Crypto platform.', features: ['Basic trading functionality', 'Wallet creation', 'User authentication'] },
          { version: '1.0.1', date: '2023-02-01', changes: 'Minor bug fixes and performance improvements.', bugFixes: ['Fixed login redirection issue', 'Improved data loading speed'] },
          { version: '1.1.0', date: '2023-03-10', changes: 'Introduced new staking and governance features.', features: ['Staking rewards', 'Decentralized governance voting', 'New asset listings'] },
          { version: '1.1.1', date: '2023-03-20', changes: 'Critical security patch and UI enhancements.', bugFixes: ['Addressed critical vulnerability', 'Improved mobile responsiveness'], features: ['Updated dashboard UI'] },
          { version: '1.2.0', date: '2023-04-05', changes: 'Integration with new liquidity pools and advanced analytics.', features: ['Liquidity pool integration', 'Advanced portfolio analytics', 'Real-time market data'] },
          { version: '1.2.1', date: '2023-04-18', changes: 'Bug fixes related to analytics data display.', bugFixes: ['Corrected chart rendering bugs', 'Fixed data discrepancy in reports'] },
          { version: '1.3.0', date: '2023-05-01', changes: 'Enhanced security protocols and multi-factor authentication.', features: ['Hardware wallet support', 'Advanced MFA options', 'Transaction signing improvements'] },
          { version: '1.3.1', date: '2023-05-15', changes: 'Minor UI adjustments and accessibility improvements.', bugFixes: ['Screen reader compatibility fixes'], features: ['Improved keyboard navigation'] },
          { version: '1.4.0', date: '2023-06-01', changes: 'Introduced a new referral program and expanded language support.', features: ['Referral program with tiered rewards', 'Multi-language support (5 new languages)'] },
        ];
        setData(mockData);
      } catch (err) {
        setError('Failed to fetch version history');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, isLoading, error };
};

const VersionHistory: React.FC = () => {
  const { data, isLoading, error } = useVersionHistory();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold tracking-tight">Crypto: Version History</h1>
          <div className="flex items-center space-x-2">
            <Label htmlFor="dark-mode-toggle">Dark Mode</Label>
            <Switch
              id="dark-mode-toggle"
              checked={isDarkMode}
              onCheckedChange={toggleDarkMode}
              aria-label="Toggle dark mode"
            />
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl font-medium">Loading version history...</p>
          </div>
        )}
        {error && (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl font-medium text-red-500">Error: {error}</p>
          </div>
        )}

        {!isLoading && !error && data && data.length === 0 && (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl font-medium">No version history available.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((item, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">Version {item.version}</CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400">Released on {item.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 mb-2">{item.changes}</p>
                {item.features && item.features.length > 0 && (
                  <div className="mt-2">
                    <h4 className="text-lg font-medium mb-1">New Features:</h4>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                      {item.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {item.bugFixes && item.bugFixes.length > 0 && (
                  <div className="mt-2">
                    <h4 className="text-lg font-medium mb-1">Bug Fixes:</h4>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                      {item.bugFixes.map((bug, idx) => (
                        <li key={idx}>{bug}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VersionHistory;
