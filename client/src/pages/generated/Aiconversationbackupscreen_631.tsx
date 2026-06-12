// AUTO-GENERATED DRAFT SCREEN: AiConversationBackupScreen
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { trpc } from './utils/trpc'; // Assuming tRPC setup
import { Button } from './components/ui/button'; // shadcn/ui button
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'; // shadcn/ui card
import { Input } from './components/ui/input'; // shadcn/ui input
import { Label } from './components/ui/label'; // shadcn/ui label
import { Switch } from './components/ui/switch'; // shadcn/ui switch
import { ScrollArea } from './components/ui/scroll-area'; // shadcn/ui scroll-area
import { useTheme } from './context/theme-provider'; // Assuming a theme provider for dark mode

interface Conversation {
  id: string;
  title: string;
  lastModified: string;
  contentPreview: string;
}

const AiConversationBackupScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { theme, setTheme } = useTheme();

  const { data: conversations, isLoading, isError, error } = trpc.conversation.list.useQuery();
  const backupConversationMutation = trpc.conversation.backup.useMutation();

  const handleBackup = (conversationId: string) => {
    backupConversationMutation.mutate({ conversationId });
  };

  const filteredConversations = conversations?.filter(conversation =>
    conversation.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-lg text-gray-700 dark:text-gray-300">Loading conversations...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-lg text-red-600">Error loading conversations: {error?.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-6">
      <Card className="w-full max-w-4xl mx-auto shadow-lg rounded-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-3xl font-bold">AI Conversation Backup</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 mt-1">Manage and backup your AI conversations securely.</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="dark-mode-switch">Dark Mode</Label>
            <Switch
              id="dark-mode-switch"
              checked={theme === 'dark'}
              onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle dark mode"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              aria-label="Search conversations"
            />
          </div>
          <ScrollArea className="h-[400px] w-full rounded-md border dark:border-gray-700 p-4">
            {filteredConversations && filteredConversations.length > 0 ? (
              filteredConversations.map((conversation) => (
                <div key={conversation.id} className="flex items-center justify-between p-4 mb-3 bg-gray-100 dark:bg-gray-800 rounded-md shadow-sm">
                  <div>
                    <h3 className="text-lg font-semibold">{conversation.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{conversation.contentPreview}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">Last Modified: {new Date(conversation.lastModified).toLocaleDateString()}</p>
                  </div>
                  <Button
                    onClick={() => handleBackup(conversation.id)}
                    disabled={backupConversationMutation.isLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
                  >
                    {backupConversationMutation.isLoading ? 'Backing up...' : 'Backup'}
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400">No conversations found.</p>
            )}
          </ScrollArea>
          {backupConversationMutation.isSuccess && (
            <p className="text-green-600 dark:text-green-400 mt-4 text-center">Conversation backed up successfully!</p>
          )}
          {backupConversationMutation.isError && (
            <p className="text-red-600 dark:text-red-400 mt-4 text-center">Error backing up conversation: {backupConversationMutation.error?.message}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AiConversationBackupScreen;
