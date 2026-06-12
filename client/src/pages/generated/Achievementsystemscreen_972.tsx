// AUTO-GENERATED DRAFT SCREEN: AchievementSystemScreen
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'; // Assuming shadcn/ui card component
import { Button } from './ui/button'; // Assuming shadcn/ui button component
import { Progress } from './ui/progress'; // Assuming shadcn/ui progress component

interface Achievement {
  id: string;
  name: string;
  description: string;
  progress: number; // 0-100
  unlocked: boolean;
}

interface AchievementSystemScreenProps {
  // Props for potential external data fetching or user context
}

const AchievementSystemScreen: React.FC<AchievementSystemScreenProps> = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate tRPC hook for fetching achievements
  useEffect(() => {
    const fetchAchievements = async () => {
      setLoading(true);
      setError(null);
      try {
        // In a real application, this would be a tRPC call:
        // const data = await trpc.achievements.getAchievements.useQuery();
        // For now, simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
        const mockAchievements: Achievement[] = [
          {
            id: '1',
            name: 'First Step',
            description: 'Complete your first task.',
            progress: 100,
            unlocked: true,
          },
          {
            id: '2',
            name: 'Explorer',
            description: 'Visit 10 different modules.',
            progress: 70,
            unlocked: false,
          },
          {
            id: '3',
            name: 'Master Crafter',
            description: 'Craft 50 unique items.',
            progress: 25,
            unlocked: false,
          },
          {
            id: '4',
            name: 'Social Butterfly',
            description: 'Add 5 friends.',
            progress: 100,
            unlocked: true,
          },
        ];
        setAchievements(mockAchievements);
      } catch (err) {
        setError('Failed to load achievements. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground dark:bg-gray-900 dark:text-gray-100">
        <p className="text-lg">Loading achievements...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground dark:bg-gray-900 dark:text-gray-100 p-8">
        <p className="text-lg text-red-500 mb-4">Error: {error}</p>
        <Button onClick={() => window.location.reload()} aria-label="Reload page to try again">Retry</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-gray-900 dark:text-gray-100 p-8 sm:p-12 lg:p-16">
      <header className="mb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary dark:text-primary-light mb-4" tabIndex={0}>Achievement System</h1>
        <p className="text-lg sm:text-xl text-muted-foreground dark:text-gray-300" tabIndex={0}>
          Track your progress and unlock exciting rewards!
        </p>
      </header>

      <section aria-labelledby="unlocked-achievements-heading" className="mb-10">
        <h2 id="unlocked-achievements-heading" className="text-3xl font-bold mb-6 text-green-600 dark:text-green-400" tabIndex={0}>Unlocked Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.filter(a => a.unlocked).map(achievement => (
            <Card key={achievement.id} className="bg-card dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300" tabIndex={0}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-card-foreground dark:text-gray-50">✅ {achievement.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground dark:text-gray-300">{achievement.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="locked-achievements-heading">
        <h2 id="locked-achievements-heading" className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400" tabIndex={0}>Progress Towards Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.filter(a => !a.unlocked).map(achievement => (
            <Card key={achievement.id} className="bg-card dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300" tabIndex={0}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-card-foreground dark:text-gray-50">⏳ {achievement.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground dark:text-gray-300 mb-3">{achievement.description}</p>
                <div className="flex items-center gap-2">
                  <Progress value={achievement.progress} className="w-full" aria-label={`${achievement.name} progress`} />
                  <span className="text-sm font-medium text-card-foreground dark:text-gray-50">{achievement.progress}%</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AchievementSystemScreen;
