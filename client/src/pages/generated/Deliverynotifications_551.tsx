// AUTO-GENERATED DRAFT SCREEN: DeliveryNotifications
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { BellRing, Package, XCircle } from 'lucide-react';

type Notification = {
  id: string;
  type: 'delivery' | 'update' | 'alert';
  message: string;
  timestamp: string;
  read: boolean;
};

// Mock tRPC hook for fetching notifications
const useNotifications = () => {
  const [data, setData] = useState<Notification[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMockData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockNotifications: Notification[] = [
          {
            id: '1',
            type: 'delivery',
            message: 'Your order #12345 has been delivered!',
            timestamp: '2023-10-26T10:00:00Z',
            read: false,
          },
          {
            id: '2',
            type: 'update',
            message: 'Order #12346 is out for delivery.',
            timestamp: '2023-10-26T09:30:00Z',
            read: true,
          },
          {
            id: '3',
            type: 'alert',
            message: 'Delivery for #12347 might be delayed due to weather.',
            timestamp: '2023-10-26T08:00:00Z',
            read: false,
          },
        ];
        setData(mockNotifications);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMockData();
  }, []);

  return { data, isLoading, isError };
};

const DeliveryNotifications: React.FC = () => {
  const { data: notifications, isLoading, isError } = useNotifications();
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const filteredNotifications = notifications?.filter(notification =>
    showUnreadOnly ? !notification.read : true
  );

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
    document.documentElement.classList.toggle('dark');
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading notifications...</div>;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-500">
        <XCircle className="w-12 h-12 mb-4" />
        <p>Error loading notifications. Please try again later.</p>
        <Button onClick={() => window.location.reload()} className="mt-4">Retry</Button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-8 ${isDarkTheme ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold flex items-center">
            <BellRing className="w-8 h-8 mr-2" /> Delivery Notifications
          </h1>
          <div className="flex items-center space-x-2">
            <Switch
              id="dark-mode"
              checked={isDarkTheme}
              onCheckedChange={toggleTheme}
              aria-label="Toggle dark mode"
            />
            <Label htmlFor="dark-mode">Dark Mode</Label>
          </div>
        </div>

        <div className="flex justify-end mb-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="show-unread"
              checked={showUnreadOnly}
              onCheckedChange={setShowUnreadOnly}
              aria-label="Show unread notifications only"
            />
            <Label htmlFor="show-unread">Show Unread Only</Label>
          </div>
        </div>

        <div className="space-y-4">
          {filteredNotifications && filteredNotifications.length > 0 ? (
            filteredNotifications.map(notification => (
              <Card key={notification.id} className={notification.read ? 'opacity-70' : 'border-blue-500'}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="w-5 h-5 mr-2" />
                    {notification.type === 'delivery' && 'Order Delivered'}
                    {notification.type === 'update' && 'Order Update'}
                    {notification.type === 'alert' && 'Important Alert'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(notification.timestamp).toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-600">No notifications to display.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryNotifications;
