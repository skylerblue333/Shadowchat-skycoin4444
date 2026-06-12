// AUTO-GENERATED DRAFT SCREEN: GameDetailScreen

import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'; // Simulating tRPC with react-query
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react'; // Example icon

// Mock tRPC-like API call
const fetchGameDetails = async (gameId: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (gameId === 'error-game') {
        reject(new Error('Failed to load game details.'));
      } else if (gameId === 'loading-game') {
        // Simulate long loading
      } else {
        resolve({
          id: gameId,
          title: `Game Title ${gameId}`,
          description: `This is a detailed description for Game Title ${gameId}. It's an exciting adventure game with stunning graphics and immersive gameplay. Explore vast worlds, battle formidable foes, and uncover ancient mysteries.`,
          genre: 'Adventure',
          releaseDate: '2024-01-15',
          developer: 'Awesome Games Studio',
          rating: 4.8,
          platforms: ['PC', 'PlayStation', 'Xbox'],
          imageUrl: `https://via.placeholder.com/600x400?text=Game+${gameId}`,
        });
      }
    }, 1500);
  });
};

type GameDetail = {
  id: string;
  title: string;
  description: string;
  genre: string;
  releaseDate: string;
  developer: string;
  rating: number;
  platforms: string[];
  imageUrl: string;
};

const GameDetailScreen: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();

  // Simulate tRPC hook with react-query
  const { data: game, isLoading, isError, error } = useQuery<GameDetail, Error>(
    ['gameDetails', gameId],
    () => fetchGameDetails(gameId || ''),
    { enabled: !!gameId }
  );

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 md:p-8">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-[400px] w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-24" />
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-4 md:p-8">
        <Alert variant="destructive" className="w-full max-w-4xl mx-auto">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error?.message || 'An unknown error occurred while fetching game details.'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="container mx-auto p-4 md:p-8">
        <Alert className="w-full max-w-4xl mx-auto">
          <AlertTitle>Game Not Found</AlertTitle>
          <AlertDescription>
            The game details could not be loaded. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 dark:bg-gray-900 dark:text-gray-50 min-h-screen">
      <Card className="w-full max-w-4xl mx-auto shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-900 dark:text-gray-50">{game.title}</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">Developed by {game.developer} | Released: {game.releaseDate}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <img src={game.imageUrl} alt={game.title} className="w-full h-auto object-cover rounded-md shadow-md" />
          
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">About This Game</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{game.description}</p>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <Badge variant="secondary" className="dark:bg-gray-700 dark:text-gray-50">Genre: {game.genre}</Badge>
            <Badge variant="secondary" className="dark:bg-gray-700 dark:text-gray-50">Rating: {game.rating} / 5</Badge>
            <div className="flex gap-1">
              {game.platforms.map((platform) => (
                <Badge key={platform} variant="outline" className="dark:border-gray-600 dark:text-gray-200">{platform}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white">Add to Wishlist</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GameDetailScreen;
