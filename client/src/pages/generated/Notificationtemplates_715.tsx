// AUTO-GENERATED DRAFT SCREEN: NotificationTemplates
import React from 'react';

interface NotificationTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

interface UseNotificationTemplatesResult {
  data: NotificationTemplate[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

// Dummy tRPC hook simulation
const useNotificationTemplates = (): UseNotificationTemplatesResult => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const [data, setData] = React.useState<NotificationTemplate[] | undefined>(undefined);

  React.useEffect(() => {
    const fetchData = setTimeout(() => {
      // Simulate loading state
      setIsLoading(false);
      // Simulate data or error
      if (Math.random() > 0.2) { // 80% chance of success
        setData([
          {
            id: '1',
            name: 'Welcome Email',
            subject: 'Welcome to SKYCOIN4444!',
            body: 'Thank you for joining our platform.',
            createdAt: '2023-01-01T10:00:00Z',
            updatedAt: '2023-01-01T10:00:00Z',
          },
          {
            id: '2',
            name: 'Password Reset',
            subject: 'Reset Your SKYCOIN4444 Password',
            body: 'Click here to reset your password.',
            createdAt: '2023-02-01T11:00:00Z',
            updatedAt: '2023-02-01T11:00:00Z',
          },
          {
            id: '3',
            name: 'Order Confirmation',
            subject: 'Your SKYCOIN4444 Order #12345 Confirmed',
            body: 'Your recent order has been confirmed.',
            createdAt: '2023-03-01T12:00:00Z',
            updatedAt: '2023-03-01T12:00:00Z',
          },
        ]);
      } else {
        setIsError(true);
        setError(new Error('Failed to fetch notification templates.'));
      }
    }, 1500); // Simulate network delay

    return () => clearTimeout(fetchData);
  }, []);

  return { data, isLoading, isError, error };
};

const NotificationTemplates: React.FC = () => {
  const { data, isLoading, isError, error } = useNotificationTemplates();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background text-foreground">
        <p>Loading notification templates...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen bg-background text-destructive">
        <p>Error: {error?.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-primary">Notification Templates</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((template) => (
          <div key={template.id} className="bg-card p-6 rounded-lg shadow-md border border-border transition-all hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-2 text-card-foreground">{template.name}</h2>
            <p className="text-muted-foreground mb-1"><strong>Subject:</strong> {template.subject}</p>
            <p className="text-muted-foreground text-sm">{template.body.substring(0, 100)}...</p>
            <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
              <p>Created: {new Date(template.createdAt).toLocaleDateString()}</p>
              <p>Updated: {new Date(template.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationTemplates;