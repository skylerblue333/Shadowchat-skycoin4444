// AUTO-GENERATED DRAFT SCREEN: TranscriptionScreen
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { Switch } from './components/ui/switch';
import { Label } from './components/ui/label';

// Placeholder for tRPC client setup
// const trpc = createTRPCReact<AppRouter>();

interface TranscriptionData {
  id: string;
  text: string;
  timestamp: string;
}

const fetchTranscription = async (): Promise<TranscriptionData[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', text: 'This is the first transcribed segment.', timestamp: '00:00:05' },
        { id: '2', text: 'And this is the second part of the transcription.', timestamp: '00:00:12' },
        { id: '3', text: 'Finally, a third segment to complete the example.', timestamp: '00:00:20' },
      ]);
    }, 1000);
  });
};

const TranscriptionScreen: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading, isError, error } = useQuery<TranscriptionData[], Error>({
    queryKey: ['transcriptions'],
    queryFn: fetchTranscription,
  });

  const filteredTranscriptions = data?.filter(t =>
    t.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen text-lg">Loading transcriptions...</div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center h-screen text-red-500 text-lg">Error: {error?.message}</div>;
  }

  return (
    <div className={`min-h-screen p-8 ${isDarkTheme ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Card className="max-w-4xl mx-auto shadow-lg rounded-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-3xl font-bold">Social: Transcription</CardTitle>
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
        <CardContent className="p-6 space-y-6">
          <Input
            type="text"
            placeholder="Search transcriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            aria-label="Search transcriptions"
          />
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {filteredTranscriptions?.length === 0 ? (
              <p className="text-center text-gray-500">No transcriptions found.</p>
            ) : (
              filteredTranscriptions?.map((transcription) => (
                <Card key={transcription.id} className="p-4 bg-white dark:bg-gray-800 rounded-md shadow-sm">
                  <p className="text-sm text-gray-500 dark:text-gray-400">{transcription.timestamp}</p>
                  <p className="mt-1 text-gray-800 dark:text-gray-200">{transcription.text}</p>
                </Card>
              ))
            )}
          </div>
          <Textarea
            placeholder="New transcription segment..."
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            rows={4}
            aria-label="New transcription segment input"
          />
          <Button className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Add Transcription
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TranscriptionScreen;
