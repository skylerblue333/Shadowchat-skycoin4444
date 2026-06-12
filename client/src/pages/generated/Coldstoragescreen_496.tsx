// AUTO-GENERATED DRAFT SCREEN: ColdStorageScreen
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface ColdStorageData {
  address: string;
  balance: number;
  lastUpdated: string;
}

interface ColdStorageScreenProps {
  userId: string;
}

const fetchColdStorageData = async (userId: string): Promise<ColdStorageData> => {
  // Simulate tRPC hook or API call
  return new Promise((resolve) => {
    setTimeout(() => {
      if (userId === 'SKYCOIN4444') {
        resolve({
          address: '0xAbc123Def456Ghi789Jkl012Mno345Pqr678Stu901',
          balance: 123.456,
          lastUpdated: new Date().toLocaleString(),
        });
      } else {
        throw new Error('User not found');
      }
    }, 1500);
  });
};

const ColdStorageScreen: React.FC<ColdStorageScreenProps> = ({ userId }) => {
  const [data, setData] = useState<ColdStorageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchColdStorageData(userId);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [userId]);

  const handleRefresh = () => {
    // Re-fetch data on refresh
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchColdStorageData(userId);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p className="text-lg">Loading cold storage data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 p-4">
        <p className="text-lg font-bold">Error: {error}</p>
        <Button onClick={handleRefresh} className="mt-4">Try Again</Button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p className="text-lg">No data available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8 space-y-6">
      <h1 className="text-4xl font-bold text-center mb-8">Crypto: Cold Storage</h1>

      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 space-y-4 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <p className="text-gray-600 dark:text-gray-300 font-medium">User ID:</p>
          <p className="font-mono text-blue-600 dark:text-blue-400 break-all">{userId}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-600 dark:text-gray-300 font-medium">Wallet Address:</p>
          <p className="font-mono text-green-600 dark:text-green-400 break-all">{data.address}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-600 dark:text-gray-300 font-medium">Current Balance:</p>
          <p className="font-bold text-xl text-purple-600 dark:text-purple-400">{data.balance.toFixed(6)} BTC</p>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <p>Last Updated:</p>
          <p>{data.lastUpdated}</p>
        </div>
        <div className="flex justify-center pt-4">
          <Button onClick={handleRefresh} className="w-full md:w-auto">Refresh Data</Button>
        </div>
      </div>

      <footer className="text-center text-gray-500 dark:text-gray-400 text-sm mt-10">
        <p>&copy; {new Date().getFullYear()} SKYCOIN4444. All rights reserved.</p>
        <p>Data provided for informational purposes only.</p>
      </footer>
    </div>
  );
};

export default ColdStorageScreen;
