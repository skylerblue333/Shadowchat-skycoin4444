// AUTO-GENERATED DRAFT SCREEN: PlayerProfile
import React from 'react';
import { trpc } from '../utils/trpc';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';

interface PlayerProfileProps {
  playerId: string;
}

const PlayerProfile: React.FC<PlayerProfileProps> = ({ playerId }) => {
  const { data: player, isLoading, isError, error } = trpc.player.getProfile.useQuery({ playerId });

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading player profile...</div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error.message}</div>;
  }

  if (!player) {
    return <div className="flex justify-center items-center h-screen">No player data found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-3xl mx-auto shadow-lg">
        <CardHeader className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={player.avatar} alt={`${player.username}'s avatar`} />
            <AvatarFallback>{player.username.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl font-bold">{player.username}</CardTitle>
          <p className="text-sm text-muted-foreground">Player ID: {player.id}</p>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">Level: {player.level}</span>
            <Badge variant="secondary" className="text-lg">{player.rank}</Badge>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Experience: {player.experience}</p>
            <Progress value={(player.experience % 1000) / 10} className="w-full" />
          </div>
          <Separator />
          <div>
            <h3 className="text-xl font-semibold mb-2">Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Games Played</p>
                <p className="text-lg font-medium">{player.stats.gamesPlayed}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Wins</p>
                <p className="text-lg font-medium">{player.stats.wins}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Losses</p>
                <p className="text-lg font-medium">{player.stats.losses}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Win Rate</p>
                <p className="text-lg font-medium">{(player.stats.winRate * 100).toFixed(2)}%</p>
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="text-xl font-semibold mb-2">Achievements</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {player.achievements.map((achievement) => (
                <Card key={achievement.id} className="p-3">
                  <p className="font-medium">{achievement.name}</p>
                  <p className="text-xs text-muted-foreground">{achievement.date}</p>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlayerProfile;
