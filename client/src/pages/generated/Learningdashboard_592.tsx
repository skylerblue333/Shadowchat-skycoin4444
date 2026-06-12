// AUTO-GENERATED DRAFT SCREEN: LearningDashboard
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface Course {
  id: string;
  title: string;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed';
}

interface LearningDashboardProps {
  userId: string;
}

const mockCourses: Course[] = [
  { id: '1', title: 'Introduction to React', progress: 75, status: 'in-progress' },
  { id: '2', title: 'Advanced TypeScript', progress: 100, status: 'completed' },
  { id: '3', title: 'Tailwind CSS Fundamentals', progress: 30, status: 'in-progress' },
  { id: '4', title: 'tRPC for Beginners', progress: 0, status: 'not-started' },
];

const LearningDashboard: React.FC<LearningDashboardProps> = ({ userId }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Simulate fetching data with tRPC (or a similar async operation)
    const fetchCourses = async () => {
      try {
        setLoading(true);
        // In a real app, this would be a tRPC call like: api.courses.getByUser.useQuery({ userId });
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
        if (userId === 'errorUser') {
          throw new Error('Failed to load courses.');
        }
        setCourses(mockCourses);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [userId]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
    document.documentElement.classList.toggle('dark');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
        <p className="text-lg text-gray-700 dark:text-gray-300">Loading learning dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
        <Card className="w-[350px] dark:bg-gray-800 dark:text-gray-100">
          <CardHeader>
            <CardTitle className="text-red-500">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-8 ${isDarkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Learning Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Switch
            id="dark-mode-toggle"
            checked={isDarkMode}
            onCheckedChange={toggleDarkMode}
            aria-label="Toggle dark mode"
          />
          <Label htmlFor="dark-mode-toggle">Dark Mode</Label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="dark:bg-gray-800 dark:text-gray-100">
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">Progress:</p>
                <span className="text-sm font-medium">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="w-full" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">Status: {course.status}</p>
              <Button className="mt-4 w-full">View Course</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LearningDashboard;
