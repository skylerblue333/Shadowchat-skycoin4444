// AUTO-GENERATED DRAFT SCREEN: StreakTracker
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RocketIcon, CheckCircleIcon, XCircleIcon, Loader2 } from 'lucide-react';

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastUpdated: string;
  goal: number;
}

interface StreakTrackerProps {
  userId: string;
}

const fetchStreakData = async (userId: string): Promise<StreakData> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        currentStreak: Math.floor(Math.random() * 30) + 1,
        longestStreak: Math.floor(Math.random() * 50) + 30,
        lastUpdated: new Date().toISOString(),
        goal: 100,
      });
    }, 1000);
  });
};

const updateStreak = async (userId: string): Promise<StreakData> => {
  // Simulate API call for updating streak
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        currentStreak: Math.floor(Math.random() * 30) + 1,
        longestStreak: Math.floor(Math.random() * 50) + 30,
        lastUpdated: new Date().toISOString(),
        goal: 100,
      });
    }, 1000);
  });
};

export const StreakTracker: React.FC<StreakTrackerProps> = ({ userId }) => {
  const [streakData, setStreakData] = useState<StreakData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<boolean>(false);

  useEffect(() => {
    const loadStreakData = async () => {
      try {
        const data = await fetchStreakData(userId);
        setStreakData(data);
      } catch (err) {
        setError('Failed to fetch streak data.');
      }
      setLoading(false);
    };
    loadStreakData();
  }, [userId]);

  const handleUpdateStreak = async () => {
    setUpdating(true);
    setError(null);
    try {
      const data = await updateStreak(userId);
      setStreakData(data);
    } catch (err) {
      setError('Failed to update streak.');
    }
    setUpdating(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-gray-700 dark:text-gray-300">Loading streak data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <Alert variant="destructive">
          <XCircleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!streakData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <Alert>
          <AlertTitle>No Data</AlertTitle>
          <AlertDescription>No streak data available.</AlertDescription>
        </Alert>
      </div>
    );
  }

  const progressValue = (streakData.currentStreak / streakData.goal) * 100;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg dark:bg-gray-800 dark:text-gray-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Crypto: Streak Tracker</CardTitle>
          <RocketIcon className="h-6 w-6 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Last Updated: {new Date(streakData.lastUpdated).toLocaleString()}
          </div>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">Current Streak:</span>
              <span className="text-2xl font-extrabold text-primary">{streakData.currentStreak} days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">Longest Streak:</span>
              <span className="text-xl font-semibold">{streakData.longestStreak} days</span>
            </div>
            <div className="mt-4">
              <h3 className="text-md font-medium mb-2">Progress to Goal ({streakData.goal} days)</h3>
              <Progress value={progressValue} className="w-full" />
              <div className="text-right text-sm text-gray-500 dark:text-gray-400 mt-1">
                {Math.round(progressValue)}% Complete
              </div>
            </div>
            <Button 
              onClick={handleUpdateStreak} 
              disabled={updating} 
              className="w-full mt-6"
            >
              {updating ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...</>
              ) : (
                <><CheckCircleIcon className="mr-2 h-4 w-4" /> Update Streak</>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StreakTracker;