// AUTO-GENERATED DRAFT SCREEN: AchievementBadges
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '../utils/trpc'; // Assuming tRPC setup
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // shadcn/ui Card
import { Badge } from '@/components/ui/badge'; // shadcn/ui Badge
import { Skeleton } from '@/components/ui/skeleton'; // shadcn/ui Skeleton for loading states
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'; // shadcn/ui Alert for error handling
import { SunIcon, MoonIcon, TrophyIcon } from 'lucide-react'; // Icons for theme and badges

interface Achievement {
  id: string;
  name: string;
  description: string;
  achieved: boolean;
  icon: string; // e.g., 'TrophyIcon', 'StarIcon'
}

interface AchievementBadgesProps {
  userId: string;
}

const AchievementBadges: React.FC<AchievementBadgesProps> = ({ userId }) => {
  const { data, isLoading, isError, error } = trpc.achievements.getAchievements.useQuery({
    userId,
  });

  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="w-full">
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load achievements: {error.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Achievement Badges</h1>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((achievement: Achievement) => (
          <Card key={achievement.id} className="w-full transition-all duration-300 hover:shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium text-gray-800 dark:text-gray-100">
                {achievement.name}
              </CardTitle>
              <TrophyIcon className={`h-6 w-6 ${achievement.achieved ? 'text-yellow-500' : 'text-gray-400'}`} aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{achievement.description}</p>
              {achievement.achieved ? (
                <Badge variant="default" className="bg-green-500 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800">Achieved</Badge>
              ) : (
                <Badge variant="outline" className="text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600">Pending</Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AchievementBadges;
