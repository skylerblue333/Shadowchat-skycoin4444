// AUTO-GENERATED DRAFT SCREEN: MigrationToolsScreen
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '../utils/trpc'; // Assuming tRPC client setup
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes'; // For dark theme toggle

interface MigrationData {
  id: string;
  name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  progress: number;
}

const MigrationToolsScreen: React.FC = () => {
  const [sourceSystem, setSourceSystem] = useState('');
  const [targetSystem, setTargetSystem] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Local state for theme toggle
  const { setTheme, theme } = useTheme(); // Assuming next-themes for dark mode

  // Simulate fetching migration data with tRPC
  const { data, isLoading, isError, error } = trpc.migration.getMigrations.useQuery();

  const handleMigrate = () => {
    // Implement migration logic here
    console.log(`Migrating from ${sourceSystem} to ${targetSystem}`);
    // Example: trpc.migration.startMigration.mutate({ source: sourceSystem, target: targetSystem });
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    setIsDarkTheme(newTheme === 'dark');
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading migration data...</div>;
  }

  if (isError) {
    return <div className="flex items-center justify-center h-screen text-red-500">Error: {error?.message}</div>;
  }

  return (
    <div className="min-h-screen bg-background p-8 dark:bg-gray-900 text-foreground">
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Migration Tools</CardTitle>
          <CardDescription>Manage your data migration processes.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode-toggle">Dark Mode</Label>
            <Switch
              id="dark-mode-toggle"
              checked={isDarkTheme}
              onCheckedChange={toggleTheme}
              aria-label="Toggle dark mode"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="source-system">Source System</Label>
              <Input
                id="source-system"
                placeholder="e.g., Old CRM"
                value={sourceSystem}
                onChange={(e) => setSourceSystem(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="target-system">Target System</Label>
              <Input
                id="target-system"
                placeholder="e.g., New ERP"
                value={targetSystem}
                onChange={(e) => setTargetSystem(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <Button onClick={handleMigrate} className="w-full">
            Start Migration
          </Button>

          <h3 className="text-2xl font-semibold mt-8">Current Migrations</h3>
          {data && data.length > 0 ? (
            <div className="space-y-4">
              {data.map((migration) => (
                <Card key={migration.id} className="p-4">
                  <p className="font-medium">{migration.name}</p>
                  <p>Status: {migration.status}</p>
                  <p>Progress: {migration.progress}%</p>
                </Card>
              ))}
            </div>
          ) : (
            <p>No active migrations.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MigrationToolsScreen;
