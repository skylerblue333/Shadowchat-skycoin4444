// AUTO-GENERATED DRAFT SCREEN: TournamentRegistration
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useQuery, useMutation } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc'; // Assuming trpc client setup

const tournamentSchema = z.object({
  teamName: z.string().min(3, { message: 'Team name must be at least 3 characters.' }),
  game: z.string().min(1, { message: 'Please select a game.' }),
  contactEmail: z.string().email({ message: 'Invalid email address.' }),
  acceptRules: z.boolean().refine(val => val === true, { message: 'You must accept the tournament rules.' }),
});

type TournamentFormValues = z.infer<typeof tournamentSchema>;

const TournamentRegistration: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const { register, handleSubmit, formState: { errors }, control } = useForm<TournamentFormValues>({
    resolver: zodResolver(tournamentSchema),
    defaultValues: {
      teamName: '',
      game: '',
      contactEmail: '',
      acceptRules: false,
    },
  });

  // Example tRPC query for available games
  const { data: games, isLoading: isLoadingGames, error: gamesError } = trpc.getAvailableGames.useQuery();

  // Example tRPC mutation for registration
  const registerTournamentMutation = trpc.registerTournament.useMutation();

  const onSubmit = async (data: TournamentFormValues) => {
    try {
      await registerTournamentMutation.mutateAsync(data);
      alert('Registration successful!');
    } catch (error) {
      alert('Registration failed: ' + (error as Error).message);
    }
  };

  if (isLoadingGames) {
    return <div className="flex items-center justify-center min-h-screen">Loading available games...</div>;
  }

  if (gamesError) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">Error loading games: {gamesError.message}</div>;
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${isDarkTheme ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Arcade: Tournament Registration</CardTitle>
          <CardDescription>Sign up your team for the ultimate arcade challenge!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="teamName">Team Name</Label>
              <Input
                id="teamName"
                type="text"
                placeholder="Enter your team name"
                {...register("teamName")}
                aria-invalid={errors.teamName ? "true" : "false"}
              />
              {errors.teamName && <p className="text-red-500 text-sm" role="alert">{errors.teamName.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="game">Select Game</Label>
              <Select onValueChange={(value) => control.setValue("game", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a game" />
                </SelectTrigger>
                <SelectContent>
                  {games?.map((game) => (
                    <SelectItem key={game.id} value={game.id}>{game.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.game && <p className="text-red-500 text-sm" role="alert">{errors.game.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                placeholder="team@example.com"
                {...register("contactEmail")}
                aria-invalid={errors.contactEmail ? "true" : "false"}
              />
              {errors.contactEmail && <p className="text-red-500 text-sm" role="alert">{errors.contactEmail.message}</p>}
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="acceptRules"
                checked={control.watch("acceptRules")}
                onCheckedChange={(checked) => control.setValue("acceptRules", checked)}
                aria-invalid={errors.acceptRules ? "true" : "false"}
              />
              <Label htmlFor="acceptRules">I accept the tournament rules and conditions.</Label>
            </div>
            {errors.acceptRules && <p className="text-red-500 text-sm" role="alert">{errors.acceptRules.message}</p>}

            <div className="flex items-center space-x-2">
              <Switch
                id="dark-mode"
                checked={isDarkTheme}
                onCheckedChange={setIsDarkTheme}
              />
              <Label htmlFor="dark-mode">Dark Mode</Label>
            </div>

            <Button type="submit" className="w-full" disabled={registerTournamentMutation.isLoading}>
              {registerTournamentMutation.isLoading ? 'Registering...' : 'Register Team'}
            </Button>
            {registerTournamentMutation.isError && (
              <p className="text-red-500 text-sm text-center">Registration failed: {registerTournamentMutation.error?.message}</p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TournamentRegistration;
