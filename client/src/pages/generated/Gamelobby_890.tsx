// AUTO-GENERATED DRAFT SCREEN: GameLobby
import React from 'react';
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Switch } from "./components/ui/switch";
import { Label } from "./components/ui/label";
import { trpc } from './trpc';

const GameLobby: React.FC = () => {
  const { data, isLoading, error } = trpc.game.getGames.useQuery({ limit: 10 });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
        <p className="text-lg">Loading games...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
        <p className="text-lg text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4" role="main">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Game Lobby</CardTitle>
          <CardDescription>Join or create a game.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="game-id">Game ID</Label>
                <Input id="game-id" placeholder="Enter game ID" />
              </div>
            </div>
          </form>
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Available Games</h3>
            {data?.games.length === 0 ? (
              <p>No games available.</p>
            ) : (
              <ul>
                {data?.games.map((game) => (
                  <li key={game.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                    <span>{game.name} ({game.players} players)</span>
                    <Button size="sm">Join</Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center space-x-2">
            <Switch id="dark-mode" onCheckedChange={(checked) => {
              document.documentElement.classList.toggle("dark", checked);
            }} />
            <Label htmlFor="dark-mode">Dark Mode</Label>
          </div>
          <div>
            <Button variant="outline" aria-label="Create New Game" className="mr-2">Create Game</Button>
            <Button aria-label="Refresh Available Games">Refresh Games</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GameLobby;