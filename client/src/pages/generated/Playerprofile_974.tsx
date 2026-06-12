// @ts-nocheck
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: PlayerProfile

/* --- injected local data stubs (replaces non-existent backend hooks) --- */
function useStubQuery<T = any>(initial?: T) {
  return { data: initial as T, isLoading: false, isPending: false, isError: false, error: null as any, refetch: () => {} };
}
function useStubMutation<T = any>() {
  return {
    mutate: (_v?: any) => {}, mutateAsync: async (_v?: any) => ({} as T),
    isLoading: false, isPending: false, isError: false, isSuccess: false, error: null as any, data: undefined as any, reset: () => {},
  };
}
/* ----------------------------------------------------------------------- */


interface PlayerProfileProps {
  playerId: string;
}

const PlayerProfile: React.FC<any> = ({ playerId }) => {
  const { data: player, isLoading, isError, error } = useStubQuery({ playerId });

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
