// AUTO-GENERATED DRAFT SCREEN: NotificationsAnalytics
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface NotificationData {
  id: string;
  type: string;
  timestamp: string;
  status: string;
  user: string;
}

const mockNotificationData: NotificationData[] = [
  { id: '1', type: 'Email', timestamp: '2023-01-01 10:00', status: 'Sent', user: 'user1' },
  { id: '2', type: 'SMS', timestamp: '2023-01-01 10:05', status: 'Delivered', user: 'user2' },
  { id: '3', type: 'Push', timestamp: '2023-01-01 10:10', status: 'Failed', user: 'user3' },
  { id: '4', type: 'Email', timestamp: '2023-01-02 11:00', status: 'Opened', user: 'user1' },
  { id: '5', type: 'Push', timestamp: '2023-01-02 11:15', status: 'Delivered', user: 'user4' },
];

// Simulate tRPC hook
const useNotifications = () => {
  const [data, setData] = useState<NotificationData[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Simulate an error for demonstration
        // if (Math.random() > 0.8) throw new Error('Failed to fetch notifications');
        setData(mockNotificationData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, isLoading, error };
};

const NotificationsAnalytics: React.FC = () => {
  const { data: notifications, isLoading, error } = useNotifications();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  const filteredNotifications = notifications?.filter(notification =>
    notification.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notification.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notification.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="flex justify-center items-center h-full text-lg">Loading analytics...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-full text-red-500 text-lg">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Notifications Analytics</h1>
        <div className="flex items-center space-x-2">
          <Switch
            id="dark-mode-switch"
            checked={isDarkTheme}
            onCheckedChange={setIsDarkTheme}
            aria-label="Toggle dark mode"
          />
          <Label htmlFor="dark-mode-switch">Dark Mode</Label>
        </div>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 dark:text-gray-400">Summary of notification activities.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="p-4 border rounded-md dark:border-gray-700">
              <h3 className="text-lg font-semibold">Total Notifications</h3>
              <p className="text-2xl font-bold">{notifications?.length}</p>
            </div>
            <div className="p-4 border rounded-md dark:border-gray-700">
              <h3 className="text-lg font-semibold">Successful</h3>
              <p className="text-2xl font-bold">{notifications?.filter(n => n.status === 'Sent' || n.status === 'Delivered' || n.status === 'Opened').length}</p>
            </div>
            <div className="p-4 border rounded-md dark:border-gray-700">
              <h3 className="text-lg font-semibold">Failed</h3>
              <p className="text-2xl font-bold">{notifications?.filter(n => n.status === 'Failed').length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Notification Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter notifications..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="max-w-sm"
              aria-label="Search notifications"
            />
          </div>
          <div className="rounded-md border dark:border-gray-700">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>User</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNotifications && filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell className="font-medium">{notification.id}</TableCell>
                      <TableCell>{notification.type}</TableCell>
                      <TableCell>{notification.timestamp}</TableCell>
                      <TableCell>{notification.status}</TableCell>
                      <TableCell>{notification.user}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsAnalytics;
