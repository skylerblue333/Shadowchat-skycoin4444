// AUTO-GENERATED DRAFT SCREEN: CryptoLevelUpScreen
import React, { useState } from 'react';
import { trpc } from '@/utils/trpc';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Trophy, Star, ArrowUpCircle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CryptoLevelUpScreenProps {
  userId: string;
  className?: string;
}

export const CryptoLevelUpScreen: React.FC<CryptoLevelUpScreenProps> = ({ userId, className }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Fetch user level data
  const { data: levelData, isLoading, error, refetch } = trpc.user.getLevelData.useQuery(
    { userId },
    { retry: 2, refetchOnWindowFocus: false }
  );

  // Level up mutation
  const levelUpMutation = trpc.user.levelUp.useMutation({
    onSuccess: () => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 3000);
      refetch();
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-8">
        <div className="flex flex-col items-center space-y-4 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm font-medium animate-pulse">Loading level data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-4 max-w-md mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error Loading Data</AlertTitle>
        <AlertDescription className="mt-2 flex flex-col gap-3">
          <p>{error.message || 'Failed to load your progression data. Please try again.'}</p>
          <Button variant="outline" size="sm" onClick={() => refetch()} className="w-fit">
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!levelData) return null;

  const { currentLevel, currentXp, nextLevelXp, perks, canLevelUp } = levelData;
  const progressPercentage = Math.min(100, Math.max(0, (currentXp / nextLevelXp) * 100));

  const handleLevelUp = async () => {
    if (!canLevelUp || levelUpMutation.isPending) return;
    try {
      await levelUpMutation.mutateAsync({ userId });
    } catch (err) {
      console.error('Level up failed:', err);
    }
  };

  return (
    <div className={cn("container mx-auto max-w-2xl p-4 md:p-6", className)}>
      <Card className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm shadow-xl dark:shadow-primary/5">
        {/* Background decorative elements */}
        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

        <CardHeader className="text-center space-y-4 pb-8">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 ring-4 ring-primary/20 relative">
            {isAnimating ? (
              <ArrowUpCircle className="h-12 w-12 text-primary animate-bounce" />
            ) : (
              <Trophy className="h-12 w-12 text-primary" />
            )}
            {canLevelUp && !isAnimating && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-primary"></span>
              </span>
            )}
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold tracking-tight">
              Level {currentLevel}
            </CardTitle>
            <CardDescription className="text-base">
              SKYCOIN4444 VIP Tier
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Progress Section */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-muted-foreground">Progress to Level {currentLevel + 1}</span>
              <span className="text-primary">{currentXp.toLocaleString()} / {nextLevelXp.toLocaleString()} XP</span>
            </div>
            <Progress 
              value={progressPercentage} 
              className="h-3 bg-secondary/30" 
              indicatorClassName={cn(
                "bg-gradient-to-r from-primary to-primary/80 transition-all duration-1000",
                canLevelUp && "animate-pulse"
              )}
            />
            {canLevelUp && (
              <p className="text-xs text-center text-primary font-medium mt-2">
                Ready to level up!
              </p>
            )}
          </div>

          {/* Perks Section */}
          <div className="space-y-4 bg-muted/30 rounded-xl p-5 border border-border/50">
            <h3 className="font-semibold flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
              <Star className="h-4 w-4" />
              Current Perks
            </h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {perks.map((perk: string, index: number) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-foreground/80">{perk}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Error Alert for Mutation */}
          {levelUpMutation.error && (
            <Alert variant="destructive" className="animate-in fade-in slide-in-from-bottom-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Action Failed</AlertTitle>
              <AlertDescription>
                {levelUpMutation.error.message || 'Could not process level up. Please try again.'}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>

        <CardFooter className="pt-4 pb-8 flex justify-center">
          <Button
            size="lg"
            className={cn(
              "w-full sm:w-2/3 transition-all duration-300",
              canLevelUp ? "shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5" : "opacity-90"
            )}
            disabled={!canLevelUp || levelUpMutation.isPending || isAnimating}
            onClick={handleLevelUp}
          >
            {levelUpMutation.isPending || isAnimating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : canLevelUp ? (
              <>
                <ArrowUpCircle className="mr-2 h-5 w-5" />
                Level Up Now
              </>
            ) : (
              'Earn more XP to Level Up'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CryptoLevelUpScreen;