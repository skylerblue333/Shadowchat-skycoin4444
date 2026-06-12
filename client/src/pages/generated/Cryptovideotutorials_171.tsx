// AUTO-GENERATED DRAFT SCREEN: CryptoVideoTutorials
import React, { useState, useMemo } from 'react';
import { trpc } from '../trpc';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription, AlertTitle } from './ui/alert'; // Assuming shadcn/ui Alert component
import { Terminal } from 'lucide-react'; // Assuming lucide-react for icons

interface VideoTutorial {
  id: string;
  title: string;
  description: string;
  url: string;
}

const CryptoVideoTutorials: React.FC = () => {
  const { data: videos, isLoading, isError, error } = trpc.getVideos.useQuery();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVideos = useMemo(() => {
    if (!videos) return [];
    return videos.filter(
      (video) =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [videos, searchTerm]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4" aria-live="polite" aria-atomic="true">
        <h1 className="text-3xl font-bold mb-6">Crypto: Video Tutorials</h1>
        <div className="mb-6">
          <Label htmlFor="search-loading">Search Videos</Label>
          <Input
            id="search-loading"
            type="text"
            placeholder="Search by title or description..."
            value={searchTerm}
            onChange={() => {}}
            disabled
            className="mt-1"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="w-full" aria-hidden="true">
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-32 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="sr-only">Loading video tutorials...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-4" role="alert">
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load video tutorials. {error?.message || 'Please try again later.'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Crypto: Video Tutorials</h1>
      <div className="mb-6">
        <Label htmlFor="search">Search Videos</Label>
        <Input
          id="search"
          type="text"
          placeholder="Search by title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-1"
          aria-label="Search video tutorials"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => (
            <Card key={video.id} className="w-full">
              <CardHeader>
                <CardTitle className="text-xl">{video.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{video.description}</p>
                <div className="aspect-video w-full bg-gray-200 dark:bg-gray-800 rounded-md overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    src={video.url}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    aria-label={`Video tutorial: ${video.title}`}
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (videos && videos.length > 0 ? (
          <p className="col-span-full text-center text-muted-foreground" aria-live="polite">No videos found matching your search criteria.</p>
        ) : (
          <p className="col-span-full text-center text-muted-foreground" aria-live="polite">No video tutorials available at the moment.</p>
        ))}
      </div>
    </div>
  );
};

export default CryptoVideoTutorials;
