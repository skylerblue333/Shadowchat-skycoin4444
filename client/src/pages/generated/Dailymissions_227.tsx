// AUTO-GENERATED DRAFT SCREEN: DailyMissions
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Moon, Sun, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface Mission {
  id: string;
  name: string;
  description: string;
  reward: number;
  completed: boolean;
}

interface DailyMissionsProps {
  userId: string;
}

const DailyMissions: React.FC<DailyMissionsProps> = ({ userId }) => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Simulate tRPC hook for fetching daily missions
  const fetchDailyMissions = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      const response = await new Promise<Mission[]>((resolve) =>
        setTimeout(() => {
          if (userId === 'errorUser') {
            throw new Error('Failed to fetch missions');
          }
          resolve([
            { id: '1', name: 'Trade 100 USDT', description: 'Complete a spot trade of 100 USDT or more.', reward: 5, completed: false },
            { id: '2', name: 'Stake 0.1 ETH', description: 'Stake at least 0.1 ETH in any staking pool.', reward: 10, completed: true },
            { id: '3', name: 'Invite a Friend', description: 'Invite a new user who completes KYC.', reward: 20, completed: false },
          ]);
        }, 1500)
      );
      setMissions(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDailyMissions();
  }, [userId]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.documentElement.classList.toggle('dark');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
        <Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="Loading missions" />
        <span className="sr-only">Loading daily missions...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900 text-red-500">
        <XCircle className="h-6 w-6 mr-2" aria-hidden="true" />
        <p role="alert">Error: {error}</p>
        <Button onClick={fetchDailyMissions} className="ml-4">Retry</Button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-8 ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">Daily Missions</h1>
          <div className="flex items-center space-x-2">
            <Sun className="h-5 w-5" aria-hidden="true" />
            <Switch
              checked={isDarkMode}
              onCheckedChange={toggleDarkMode}
              id="dark-mode-toggle"
              aria-label="Toggle dark mode"
            />
            <Label htmlFor="dark-mode-toggle" className="sr-only">Toggle dark mode</Label>
            <Moon className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {missions.map((mission) => (
            <Card key={mission.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center">
                  {mission.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" aria-hidden="true" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 mr-2" aria-hidden="true" />
                  )}
                  {mission.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{mission.description}</p>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-lg font-semibold">Reward: {mission.reward} SKY</span>
                  {!mission.completed && (
                    <Button variant="secondary" disabled aria-disabled="true">
                      Complete Mission
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyMissions;
