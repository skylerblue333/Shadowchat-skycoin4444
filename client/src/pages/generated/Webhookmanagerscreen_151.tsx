// @ts-nocheck
import React from 'react';
import * as __ns_react_hook_form_1 from 'react-hook-form';
const { useForm } = (__ns_react_hook_form_1 as any);
import * as __ns__hookform_resolvers_zod_2 from '@hookform/resolvers/zod';
const { zodResolver } = (__ns__hookform_resolvers_zod_2 as any);
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: WebhookManagerScreen

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


// Mock tRPC hooks for demonstration. In a real app, these would come from your tRPC client setup.
const api = {
  webhooks: {
    list: {
      useQuery: () => ({
        data: [
          { id: '1', url: 'https://example.com/webhook1', events: ['order.created'], isActive: true },
          { id: '2', url: 'https://example.com/webhook2', events: ['payment.failed', 'user.updated'], isActive: false },
        ],
        isLoading: false,
        isError: false,
        error: null,
        refetch: () => {},
      }),
    },
    create: {
      useMutation: () => ({
        mutateAsync: async (data: any) => { console.log('Creating webhook:', data); return { id: Date.now().toString(), ...data }; },
        isLoading: false,
        isError: false,
      }),
    },
    update: {
      useMutation: () => ({
        mutateAsync: async (data: any) => { console.log('Updating webhook:', data); return data; },
        isLoading: false,
        isError: false,
      }),
    },
    delete: {
      useMutation: () => ({
        mutateAsync: async (data: any) => { console.log('Deleting webhook:', data); return data; },
        isLoading: false,
        isError: false,
      }),
    },
  },
};

const webhookSchema = z.object({
  id: z.string().optional(),
  url: z.string().url({ message: 'Invalid URL' }),
  events: z.string().min(1, { message: 'At least one event is required' }), // Changed to string for easier form handling
  isActive: z.boolean(),
});

type Webhook = z.infer<typeof webhookSchema> & { events: string[] }; // Adjust type for actual usage

const WebhookManagerScreen: React.FC = () => {
  const [editingWebhook, setEditingWebhook] = React.useState<Webhook | null>(null);

  const { data: webhooks, isLoading, isError, error, refetch } = api.webhooks.list.useStubQuery();
  const createWebhookMutation = api.webhooks.create.useStubMutation();
  const updateWebhookMutation = api.webhooks.update.useStubMutation();
  const deleteWebhookMutation = api.webhooks.delete.useStubMutation();

  const form = useForm<z.infer<typeof webhookSchema>>({
    resolver: zodResolver(webhookSchema),
    defaultValues: {
      url: '',
      events: '',
      isActive: true,
    },
  });

  React.useEffect(() => {
    if (editingWebhook) {
      form.reset({ ...editingWebhook, events: editingWebhook.events.join(', ') });
    } else {
      form.reset({
        url: '',
        events: '',
        isActive: true,
      });
    }
  }, [editingWebhook, form]);

  const onSubmit = async (values: z.infer<typeof webhookSchema>) => {
    try {
      const webhookData = { ...values, events: values.events.split(',').map(s => s.trim()).filter(Boolean) };
      if (editingWebhook?.id) {
        await updateWebhookMutation.mutateAsync({ id: editingWebhook.id, ...webhookData });
      } else {
        await createWebhookMutation.mutateAsync(webhookData);
      }
      setEditingWebhook(null);
      refetch();
    } catch (err: any) {
      console.error('Form submission error:', err);
      form.setError('url', { message: err.message || 'Failed to save webhook' });
    }
  };

  const handleEdit = (webhook: Webhook) => {
    setEditingWebhook(webhook);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteWebhookMutation.mutateAsync({ id });
      refetch();
    } catch (err: any) {
      console.error('Delete error:', err);
      alert(err.message || 'Failed to delete webhook');
    }
  };

  if (isLoading) {
    return <div className="p-4 text-center text-gray-500 dark:text-gray-400">Loading webhooks...</div>;
  }

  if (isError) {
    return <div className="p-4 text-center text-red-500 dark:text-red-400">Error: {error?.message || 'Failed to load webhooks'}</div>;
  }

  return (
    <div className="p-4 space-y-6 bg-background text-foreground min-h-screen">
      <h1 className="text-3xl font-bold text-center">Webhook Manager</h1>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{editingWebhook ? 'Edit Webhook' : 'Create New Webhook'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="url">URL</Label>
              <Input id="url" {...form.register('url')} aria-invalid={form.formState.errors.url ? "true" : "false"} />
              {form.formState.errors.url && <p className="text-red-500 text-sm mt-1" role="alert">{form.formState.errors.url.message}</p>}
            </div>
            <div>
              <Label htmlFor="events">Events (comma-separated)</Label>
              <Input id="events" {...form.register('events')} aria-invalid={form.formState.errors.events ? "true" : "false"} />
              {form.formState.errors.events && <p className="text-red-500 text-sm mt-1" role="alert">{form.formState.errors.events.message}</p>}
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="isActive" checked={form.watch('isActive')} onCheckedChange={(checked) => form.setValue('isActive', checked)} />
              <Label htmlFor="isActive">Active</Label>
            </div>
            <div className="flex justify-end space-x-2">
              {editingWebhook && (
                <Button type="button" variant="outline" onClick={() => setEditingWebhook(null)}>
                  Cancel Edit
                </Button>
              )}
              <Button type="submit" disabled={createWebhookMutation.isLoading || updateWebhookMutation.isLoading}>
                {editingWebhook ? 'Update Webhook' : 'Create Webhook'}
              </Button>
            </div>
            {(createWebhookMutation.isError || updateWebhookMutation.isError) && (
              <p className="text-red-500 text-sm mt-2 text-right" role="alert">Error saving webhook.</p>
            )}
          </form>
        </CardContent>
      </Card>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Existing Webhooks</CardTitle>
        </CardHeader>
        <CardContent>
          {webhooks && webhooks.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>URL</TableHead>
                  <TableHead>Events</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {webhooks.map((webhook) => (
                  <TableRow key={webhook.id}>
                    <TableCell className="font-medium">{webhook.url}</TableCell>
                    <TableCell>{webhook.events.join(', ')}</TableCell>
                    <TableCell>{webhook.isActive ? 'Active' : 'Inactive'}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(webhook)}>Edit</Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(webhook.id || '')} className="text-red-500">Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">No webhooks found. Create one above!</p>
          )}
          {deleteWebhookMutation.isError && (
            <p className="text-red-500 text-sm mt-2 text-center" role="alert">Error deleting webhook.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WebhookManagerScreen;
