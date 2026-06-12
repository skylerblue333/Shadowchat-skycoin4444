// AUTO-GENERATED DRAFT SCREEN: ContentModeration
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Moon, Sun } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { trpc } from './trpcClient';

interface ModerationItem {
  id: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  type: 'comment' | 'post' | 'user';
}

const ContentModeration: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newMode;
    });
  };

  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const { data: items, isLoading, isError, error, refetch } = trpc.getModerationItems.useQuery({ filter: filter === 'all' ? undefined : filter });
  const updateStatusMutation = trpc.updateModerationItemStatus.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const handleApprove = (id: string) => {
    updateStatusMutation.mutate({ id, status: 'approved' });
  };

  const handleReject = (id: string) => {
    updateStatusMutation.mutate({ id, status: 'rejected' });
  };

  if (isLoading) {
    return <div className="min-h-screen bg-background text-foreground p-4 md:p-8">Loading moderation items...</div>;
  }

  if (isError) {
    return <div className="min-h-screen bg-background text-foreground p-4 md:p-8">Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Content Moderation Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Button onClick={() => setFilter('all')} variant={filter === 'all' ? 'default' : 'outline'} aria-label="Show all moderation items">All</Button>
        <Button onClick={() => setFilter('pending')} variant={filter === 'pending' ? 'default' : 'outline'} aria-label="Show pending moderation items">Pending</Button>
        <Button onClick={() => setFilter('approved')} variant={filter === 'approved' ? 'default' : 'outline'} aria-label="Show approved moderation items">Approved</Button>
        <Button onClick={() => setFilter('rejected')} variant={filter === 'rejected' ? 'default' : 'outline'} aria-label="Show rejected moderation items">Rejected</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items && items.length === 0 ? (
          <p className="col-span-full text-center text-muted-foreground">No items to display for this filter.</p>
        ) : (
          items?.map(item => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle className="capitalize">{item.type} - {item.status}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{item.content}</p>
                <div className="flex gap-2">
                  {item.status === 'pending' && (
                    <>
                      <Button onClick={() => handleApprove(item.id)} variant="success" aria-label="Approve item">Approve</Button>
                      <Button onClick={() => handleReject(item.id)} variant="destructive" aria-label="Reject item">Reject</Button>
                    </>
                  )}
                  {item.status === 'approved' && (
                    <Button variant="outline" disabled aria-label="Item already approved">Approved</Button>
                  )}
                  {item.status === 'rejected' && (
                    <Button variant="outline" disabled aria-label="Item already rejected">Rejected</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ContentModeration;
