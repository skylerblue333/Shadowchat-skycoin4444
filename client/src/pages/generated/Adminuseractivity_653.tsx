// AUTO-GENERATED DRAFT SCREEN: AdminUserActivity
import React from 'react';
import { useQuery } from '@tanstack/react-query'; // Placeholder for tRPC/react-query
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'; // Placeholder for shadcn/ui Card
import { Skeleton } from './ui/skeleton'; // Placeholder for shadcn/ui Skeleton
import { Alert, AlertDescription, AlertTitle } from './ui/alert'; // Placeholder for shadcn/ui Alert

// Define types for user activity data
interface UserActivity {
  id: string;
  userId: string;
  action: string;
  timestamp: string;
  details?: string;
}

// Placeholder for tRPC client or API utility
const api = {
  userActivity: {
    list: async (): Promise<UserActivity[]> => {
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          const activities: UserActivity[] = [
            { id: '1', userId: 'user1', action: 'Login', timestamp: new Date().toISOString() },
            { id: '2', userId: 'user2', action: 'Logout', timestamp: new Date().toISOString() },
            { id: '3', userId: 'user1', action: 'View Report', timestamp: new Date().toISOString(), details: 'Report ID: 123' },
          ];
          resolve(activities);
        }, 1000);
      });
    },
  },
};

const AdminUserActivity: React.FC = () => {
  const { data: activities, isLoading, isError, error } = useQuery<UserActivity[], Error>({
    queryKey: ['userActivities'],
    queryFn: () => api.userActivity.list(),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Admin: User Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-[250px] mb-2" />
            <Skeleton className="h-4 w-[200px] mb-2" />
            <Skeleton className="h-4 w-[300px]" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background p-8">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Admin: User Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Failed to load user activities: {error?.message}</AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Admin: User Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-semibold mb-4">User Activity Log</h2>
          {activities && activities.length > 0 ? (
            <ul className="space-y-2">
              {activities.map((activity) => (
                <li key={activity.id} className="bg-muted p-3 rounded-md">
                  <p><strong>User ID:</strong> {activity.userId}</p>
                  <p><strong>Action:</strong> {activity.action}</p>
                  <p><strong>Timestamp:</strong> {new Date(activity.timestamp).toLocaleString()}</p>
                  {activity.details && <p><strong>Details:</strong> {activity.details}</p>}
                </li>
              ))}
            </ul>
          ) : (
            <p>No user activities found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUserActivity;
