// AUTO-GENERATED DRAFT SCREEN: IntegrationsNotificationRouting
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'; // Placeholder for tRPC/react-query
import { Button } from '@/components/ui/button'; // Assuming shadcn/ui button
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'; // Assuming shadcn/ui card
import { Switch } from '@/components/ui/switch'; // Assuming shadcn/ui switch
import { Label } from '@/components/ui/label'; // Assuming shadcn/ui label
import { Input } from '@/components/ui/input'; // Assuming shadcn/ui input
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Assuming shadcn/ui select

interface NotificationRule {
  id: string;
  name: string;
  integration: string;
  event: string;
  enabled: boolean;
}

// Placeholder for tRPC hook
const useNotificationRules = () => {
  return useQuery<NotificationRule[]>({ queryKey: ['notificationRules'], queryFn: async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
      { id: '1', name: 'New User Signup', integration: 'slack', event: 'user.created', enabled: true },
      { id: '2', name: 'Payment Failed', integration: 'email', event: 'payment.failed', enabled: false },
    ];
  }});
};

const IntegrationsNotificationRouting: React.FC = () => {
  const { data: rules, isLoading, isError, error } = useNotificationRules();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // Simulate dark theme toggle
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <p className="text-lg text-gray-700 dark:text-gray-300">Loading notification rules...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <p className="text-lg text-red-500">Error loading notification rules: {error?.message}</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-background text-foreground p-8 ${isDarkTheme ? 'dark' : ''}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6" tabIndex={0}>Integrations: Notification Routing</h1>
        <p className="text-lg text-muted-foreground mb-8" tabIndex={0}>Manage how notifications are routed to different integrations based on events.</p>

        <div className="flex justify-end mb-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="dark-mode"
              checked={isDarkTheme}
              onCheckedChange={setIsDarkTheme}
              aria-label="Toggle dark mode"
            />
            <Label htmlFor="dark-mode">Dark Mode</Label>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle tabIndex={0}>Add New Notification Rule</CardTitle>
            <CardDescription tabIndex={0}>Define a new rule to route notifications.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="rule-name">Rule Name</Label>
              <Input id="rule-name" placeholder="e.g., Critical Alert to Slack" aria-label="Rule Name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="integration-type">Integration</Label>
              <Select>
                <SelectTrigger id="integration-type" aria-label="Select Integration Type">
                  <SelectValue placeholder="Select an integration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="slack">Slack</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="webhook">Webhook</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-type">Event</Label>
              <Input id="event-type" placeholder="e.g., order.created" aria-label="Event Type" />
            </div>
            <div className="flex items-center space-x-2 mt-6">
              <Button aria-label="Create Rule">Create Rule</Button>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-3xl font-bold mb-4" tabIndex={0}>Existing Rules</h2>
        <div className="grid gap-4">
          {rules?.map((rule) => (
            <Card key={rule.id} className="flex items-center justify-between p-4">
              <div>
                <CardTitle tabIndex={0}>{rule.name}</CardTitle>
                <CardDescription tabIndex={0}>Integration: {rule.integration} | Event: {rule.event}</CardDescription>
              </div>
              <Switch
                checked={rule.enabled}
                onCheckedChange={() => console.log(`Toggle rule ${rule.id}`)} // Placeholder for update logic
                aria-label={`Toggle ${rule.name} rule`}
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntegrationsNotificationRouting;
