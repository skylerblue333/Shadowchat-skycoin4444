// AUTO-GENERATED DRAFT SCREEN: ConversationShortcuts
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useQuery, useMutation } from '@tanstack/react-query';
import { trpc } from '@/lib/trpc';

type Shortcut = {
  id: string;
  name: string;
  text: string;
};

// Mock tRPC hooks for demonstration purposes
const useGetShortcuts = () => {
  return useQuery<Shortcut[]>({ queryKey: ['shortcuts'], queryFn: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
      { id: '1', name: 'Greeting', text: 'Hello, how can I help you today?' },
      { id: '2', name: 'Farewell', text: 'Thank you for your time. Goodbye!' },
      { id: '3', name: 'Support', text: 'Please visit our support page for more information.' },
    ];
  } });
};

const useAddShortcut = () => {
  return useMutation<Shortcut, Error, Omit<Shortcut, 'id'>>({ mutationFn: async (newShortcut) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const id = String(Math.random());
    return { ...newShortcut, id };
  } });
};

const useDeleteShortcut = () => {
  return useMutation<string, Error, string>({ mutationFn: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return id;
  } });
};

export function ConversationShortcuts() {
  const [newShortcutName, setNewShortcutName] = useState('');
  const [newShortcutText, setNewShortcutText] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const { data: shortcuts, isLoading, isError, error } = useGetShortcuts();
  const addMutation = useAddShortcut();
  const deleteMutation = useDeleteShortcut();

  const handleAddShortcut = () => {
    if (newShortcutName.trim() && newShortcutText.trim()) {
      addMutation.mutate({ name: newShortcutName, text: newShortcutText });
      setNewShortcutName('');
      setNewShortcutText('');
    }
  };

  const handleDeleteShortcut = (id: string) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) return <div className="p-4 text-center">Loading shortcuts...</div>;
  if (isError) return <div className="p-4 text-center text-red-500">Error: {error?.message}</div>;

  return (
    <div className={`min-h-screen p-8 ${isDarkTheme ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Card className="w-full max-w-2xl mx-auto shadow-lg rounded-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">AI: Conversation Shortcuts</CardTitle>
          <div className="flex items-center space-x-2">
            <Switch
              id="dark-mode"
              checked={isDarkTheme}
              onCheckedChange={setIsDarkTheme}
              aria-label="Toggle dark mode"
            />
            <Label htmlFor="dark-mode">Dark Mode</Label>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            {shortcuts?.map((shortcut) => (
              <div key={shortcut.id} className="flex items-center justify-between p-3 border rounded-md bg-white dark:bg-gray-800 shadow-sm">
                <div>
                  <p className="font-semibold text-lg">{shortcut.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{shortcut.text}</p>
                </div>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteShortcut(shortcut.id)}>
                  Delete
                </Button>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <Input
              placeholder="New shortcut name"
              value={newShortcutName}
              onChange={(e) => setNewShortcutName(e.target.value)}
              aria-label="New shortcut name input"
            />
            <Input
              placeholder="New shortcut text"
              value={newShortcutText}
              onChange={(e) => setNewShortcutText(e.target.value)}
              aria-label="New shortcut text input"
            />
            <Button onClick={handleAddShortcut} disabled={addMutation.isPending}>
              {addMutation.isPending ? 'Adding...' : 'Add Shortcut'}
            </Button>
            {addMutation.isError && <p className="text-red-500 text-sm">Error adding shortcut: {addMutation.error?.message}</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Conversationshortcuts_638() { return null; }
