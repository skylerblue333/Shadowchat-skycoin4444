// AUTO-GENERATED DRAFT SCREEN: NotificationsCenter
import React, { useState, useEffect } from 'react';
import { BellRing, Check, Loader2, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

// Define the Notification type
interface Notification {
  id: string;
  title: string;
  read: boolean;
  timestamp: string;
}

// Mock tRPC-like hooks for demonstration
// In a real application, these would interact with a tRPC backend
const useNotifications = () => {
  const [data, setData] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setIsLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        const mockNotifications: Notification[] = [
          { id: '1', title: 'Your flight has been delayed.', read: false, timestamp: '2026-06-11T10:00:00Z' },
          { id: '2', title: 'You have a new message from John Doe.', read: true, timestamp: '2026-06-11T09:30:00Z' },
          { id: '3', title: 'Your subscription is expiring soon!', read: false, timestamp: '2026-06-10T18:00:00Z' },
          { id: '4', title: 'New product features are available!', read: false, timestamp: '2026-06-10T12:00:00Z' },
        ];
        setData(mockNotifications);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  return { data, isLoading, error };
};

interface NotificationsCenterProps extends React.ComponentProps<typeof Card> {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

export function NotificationsCenter({ className, toggleDarkMode, isDarkMode, ...props }: NotificationsCenterProps) {
  const { data: notifications, isLoading, error } = useNotifications();
  const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(true);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllAsRead = () => {
    // In a real app, this would be a tRPC mutation
    console.log('Mark all as read action triggered');
    // Optimistically update UI or refetch
  };

  if (isLoading) {
    return (
      <Card className={cn('w-[380px]', className)} {...props}>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Loading your messages...</CardDescription>
        </CardHeader>
        <CardContent className="grid place-items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={cn('w-[380px]', className)} {...props}>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Error loading notifications.</CardDescription>
        </CardHeader>
        <CardContent className="grid place-items-center h-40 text-red-500">
          <p>Failed to fetch notifications: {error.message}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('w-[380px]', className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="grid gap-1">
          <CardTitle>Notifications</CardTitle>
          <CardDescription>You have {unreadCount} unread messages.</CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={toggleDarkMode} aria-label="Toggle dark mode">
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <BellRing className="h-5 w-5" />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Push Notifications</p>
            <p className="text-sm text-muted-foreground">Send notifications to device.</p>
          </div>
          <Switch
            checked={pushNotificationsEnabled}
            onCheckedChange={setPushNotificationsEnabled}
            aria-label="Toggle push notifications"
          />
        </div>
        <div>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div
                key={notification.id}
                className={cn(
                  "mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0",
                  !notification.read && "font-semibold"
                )}
              >
                <span
                  className={cn("flex h-2 w-2 translate-y-1 rounded-full",
                    notification.read ? "bg-gray-400" : "bg-sky-500"
                  )}
                />
                <div className="space-y-1">
                  <p className="text-sm leading-none">
                    {notification.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(notification.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground">No notifications to display.</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleMarkAllAsRead} className="w-full" disabled={unreadCount === 0}>
          <Check className="mr-2 h-4 w-4" /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function Notificationscenter_818() { return null; }
