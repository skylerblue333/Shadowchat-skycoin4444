// AUTO-GENERATED DRAFT SCREEN: NotificationsBatching
import React, { useState } from 'react';
import { useTheme } from '../context/theme-provider';
import { Button } from './ui/button';

// Dummy tRPC context and hooks for demonstration
const trpc = {
  notification: {
    getNotifications: {
      useQuery: () => {
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState<Error | null>(null);
        const [data, setData] = useState<string[] | null>(null);

        React.useEffect(() => {
          const timer = setTimeout(() => {
            if (Math.random() > 0.8) {
              setError(new Error("Failed to fetch notifications."));
              setIsLoading(false);
            } else {
              setData(["Notification 1", "Notification 2", "Notification 3"]);
              setIsLoading(false);
            }
          }, 1500);
          return () => clearTimeout(timer);
        }, []);

        return { isLoading, error, data };
      },
    },
  },
};

const NotificationsBatching: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { isLoading, error, data: notifications } = trpc.notification.getNotifications.useQuery();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground p-4 flex items-center justify-center">
        <p>Loading notifications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground p-4 flex items-center justify-center text-red-500">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Notifications: Notification Batching</h1>
        <Button onClick={toggleTheme} variant="outline">
          Toggle Theme ({theme === 'light' ? 'Dark' : 'Light'})
        </Button>
      </div>

      <div className="space-y-2">
        {notifications?.map((notification, index) => (
          <div key={index} className="p-3 border rounded-md bg-card text-card-foreground">
            {notification}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsBatching;
