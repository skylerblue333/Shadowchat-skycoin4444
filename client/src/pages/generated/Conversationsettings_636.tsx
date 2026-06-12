// AUTO-GENERATED DRAFT SCREEN: ConversationSettings

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'; // Assuming shadcn/ui path
import { Switch } from './ui/switch'; // Assuming shadcn/ui path
import { Label } from './ui/label'; // Assuming shadcn/ui path
import { Button } from './ui/button'; // Assuming shadcn/ui path

// Placeholder for tRPC hooks - in a real app, these would be generated
const trpc = {
  settings: {
    get: () => ({ data: { enableAI: true, responseLength: 'medium' }, isLoading: false, error: null }),
    update: (data: any) => new Promise(resolve => setTimeout(() => resolve({ success: true }), 500)),
  },
};

interface ConversationSettingsProps {
  // Define any props if needed
}

const ConversationSettings: React.FC<ConversationSettingsProps> = () => {
  const [enableAI, setEnableAI] = useState(false);
  const [responseLength, setResponseLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        const { data, error: fetchError } = trpc.settings.get();
        if (fetchError) throw new Error(fetchError.message);
        setEnableAI(data.enableAI);
        setResponseLength(data.responseLength);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch settings.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await trpc.settings.update({ enableAI, responseLength });
      alert('Settings saved successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to save settings.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div role="status" aria-live="polite" className="flex justify-center items-center h-screen dark:bg-gray-900 text-gray-100">Loading settings...</div>;
  }

  if (error) {
    return <div role="alert" aria-live="assertive" className="flex justify-center items-center h-screen text-red-500 dark:bg-gray-900">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md dark:bg-gray-900 dark:text-gray-100 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">AI Conversation Settings</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">Manage your AI conversation preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="enable-ai" className="text-lg">Enable AI Assistant</Label>
            <Switch
              id="enable-ai"
              checked={enableAI}
              onCheckedChange={setEnableAI}
              aria-label="Toggle AI Assistant"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="response-length" className="text-lg">Response Length</Label>
            <div className="flex space-x-2">
              <Button
                variant={responseLength === 'short' ? 'default' : 'outline'}
                onClick={() => setResponseLength('short')}
                className="dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                Short
              </Button>
              <Button
                variant={responseLength === 'medium' ? 'default' : 'outline'}
                onClick={() => setResponseLength('medium')}
                className="dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                Medium
              </Button>
              <Button
                variant={responseLength === 'long' ? 'default' : 'outline'}
                onClick={() => setResponseLength('long')}
                className="dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                Long
              </Button>
            </div>
          </div>

          <Button onClick={handleSave} disabled={isLoading} className="w-full dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white">
            {isLoading ? 'Saving...' : 'Save Settings'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversationSettings;
