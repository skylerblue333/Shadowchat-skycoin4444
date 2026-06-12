// @ts-nocheck
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: WebhookNotificationsScreen

/* --- injected local data stubs (replaces non-existent backend hooks) --- */
function useStubQuery<T = any>(initial?: T) {
  return { data: initial as T, isLoading: false, isPending: false, isError: false, error: null as any, refetch: () => {} };
}
function useStubMutation<T = any>() {
  return {
    mutate: (_v?: any) => {}, mutateAsync: async (_v?: any) => ({} as T),
    isLoading: false, isPending: false, isError: false, isSuccess: false, error: null as any, data: undefined as any, reset: () => {},
  };
}
/* ----------------------------------------------------------------------- */


const WebhookNotificationsScreen: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: webhooks, isLoading, error } = useStubQuery();
  const addWebhookMutation = useStubMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['webhook.getWebhooks'] });
      setNewWebhookName('');
      setNewWebhookUrl('');
    },
  });

  const [newWebhookName, setNewWebhookName] = useState('');
  const [newWebhookUrl, setNewWebhookUrl] = useState('');

  const handleAddWebhook = async () => {
    if (newWebhookName.trim() && newWebhookUrl.trim()) {
      addWebhookMutation.mutate({ name: newWebhookName, url: newWebhookUrl });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 text-center text-gray-500 dark:text-gray-400">
        Loading webhooks...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10 text-center text-red-600 dark:text-red-400">
        Error loading webhooks: {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">Integrations: Webhook Notifications</h1>

      <Card className="mb-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Add New Webhook</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">Configure a new webhook to send notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="webhook-name" className="text-gray-700 dark:text-gray-300">Webhook Name</Label>
            <Input
              id="webhook-name"
              placeholder="e.g., Order Confirmation"
              value={newWebhookName}
              onChange={(e) => setNewWebhookName(e.target.value)}
              className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Webhook Name"
            />
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="webhook-url" className="text-gray-700 dark:text-gray-300">Webhook URL</Label>
            <Input
              id="webhook-url"
              placeholder="https://example.com/your-webhook-endpoint"
              value={newWebhookUrl}
              onChange={(e) => setNewWebhookUrl(e.target.value)}
              className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Webhook URL"
            />
          </div>
          <Button
            onClick={handleAddWebhook}
            disabled={addWebhookMutation.isLoading || !newWebhookName.trim() || !newWebhookUrl.trim()}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {addWebhookMutation.isLoading ? 'Adding...' : 'Add Webhook'}
          </Button>
          {addWebhookMutation.isError && (
            <p className="text-red-500 text-sm mt-2" role="alert">Failed to add webhook: {addWebhookMutation.error?.message}</p>
          )}
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Existing Webhooks</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">Manage your active webhook integrations.</CardDescription>
        </CardHeader>
        <CardContent>
          {webhooks && webhooks.length > 0 ? (
            <ul className="space-y-4" aria-label="List of existing webhooks">
              {webhooks.map((webhook) => (
                <li key={webhook.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700">
                  <div className="mb-2 sm:mb-0">
                    <p className="font-medium text-gray-900 dark:text-gray-100">{webhook.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 break-all">{webhook.url}</p>
                  </div>
                  <Button variant="destructive" size="sm" className="mt-2 sm:mt-0" aria-label={`Delete webhook ${webhook.name}`}>Delete</Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No webhooks configured yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WebhookNotificationsScreen;
