// AUTO-GENERATED DRAFT SCREEN: ActivityFeed
import React from 'react';
import { trpc } from '../utils/trpc';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { formatDate } from '../lib/date-utils';

const ActivityFeed: React.FC = () => {
  const { data, isLoading, error } = trpc.activity.query({ limit: 20 });

  if (isLoading) {
    return (
      <div className="container mx-auto p-4" role="status" aria-live="polite">
        <h1 className="text-2xl font-bold mb-4">Activity Feed</h1>
        <p>Loading activities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4" role="alert" aria-live="assertive">
        <h1 className="text-2xl font-bold mb-4">Activity Feed</h1>
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4" aria-label="Activity Feed">
      <h1 className="text-2xl font-bold mb-4">Activity Feed</h1>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((activity) => (
          <Card key={activity.id} className="shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{activity.user} {activity.action}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(activity.timestamp)}</p>
              {activity.details && <p className="mt-2 text-base">{activity.details}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
