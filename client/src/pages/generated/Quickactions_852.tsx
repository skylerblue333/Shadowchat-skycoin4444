// AUTO-GENERATED DRAFT SCREEN: QuickActions
import React from 'react';
import { trpc } from '../../trpc';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface QuickActionItem {
  id: string;
  name: string;
  icon: string; // Placeholder for icon names, consider using a specific icon component or enum
}

const QuickActions: React.FC = () => {
  const { data, isLoading, isError, error } = trpc.quickActions.useQuery();

  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto" aria-live="polite" aria-atomic="true">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" aria-hidden="true" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-full max-w-md mx-auto border-red-500" role="alert">
        <CardHeader>
          <CardTitle className="text-red-500">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Failed to load quick actions: {error?.message}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {data?.map((action: QuickActionItem) => (
          <Button key={action.id} className="w-full" aria-label={`Perform ${action.name}`}>
            {/* Placeholder for icon, replace with actual icon component */}
            {action.name}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default QuickActions;
