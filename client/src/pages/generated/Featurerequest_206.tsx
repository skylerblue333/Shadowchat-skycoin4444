// AUTO-GENERATED DRAFT SCREEN: FeatureRequest
import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { trpc } from '../utils/trpc'; // Assuming tRPC setup
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes'; // For dark theme

interface FeatureRequestForm {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  anonymous: boolean;
}

const FeatureRequest: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [form, setForm] = React.useState<FeatureRequestForm>({
    title: '',
    description: '',
    priority: 'medium',
    anonymous: false,
  });

  const { data, isLoading, isError, error } = trpc.featureRequest.getRequests.useQuery();
  const addFeatureRequest = trpc.featureRequest.addRequest.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addFeatureRequest.mutateAsync(form);
      setForm({ title: '', description: '', priority: 'medium', anonymous: false });
      alert('Feature request submitted successfully!');
    } catch (err) {
      alert('Failed to submit feature request.');
      console.error(err);
    }
  };

  if (isLoading) return <div className="flex items-center justify-center h-screen">Loading feature requests...</div>;
  if (isError) return <div className="flex items-center justify-center h-screen text-red-500">Error: {error?.message}</div>;

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Submit a Feature Request</h1>

      <div className="flex justify-end mb-4">
        <Label htmlFor="dark-mode" className="mr-2">Dark Mode</Label>
        <Switch
          id="dark-mode"
          checked={theme === 'dark'}
          onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
          aria-label="Toggle dark mode"
        />
      </div>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <Label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Title</Label>
          <Input
            id="title"
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Short, descriptive title"
            className="mt-1 block w-full"
            required
            aria-required="true"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Description</Label>
          <Textarea
            id="description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Detailed description of the feature"
            className="mt-1 block w-full"
            rows={5}
            required
            aria-required="true"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Priority</Label>
          <select
            id="priority"
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value as 'low' | 'medium' | 'high' })}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            aria-label="Feature priority"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="mb-6 flex items-center">
          <Switch
            id="anonymous"
            checked={form.anonymous}
            onCheckedChange={(checked) => setForm({ ...form, anonymous: checked })}
            aria-labelledby="anonymous-label"
          />
          <Label htmlFor="anonymous" id="anonymous-label" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-200">Submit Anonymously</Label>
        </div>

        <Button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Submit Request
        </Button>
      </form>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Existing Feature Requests</h2>
        {data && data.length > 0 ? (
          <ul className="space-y-4">
            {data.map((request: any) => (
              <li key={request.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold dark:text-white">{request.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">{request.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Priority: {request.priority}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Submitted by: {request.anonymous ? 'Anonymous' : request.user}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-300">No feature requests yet. Be the first to submit one!</p>
        )}
      </div>
    </div>
  );
};

export default FeatureRequest;
