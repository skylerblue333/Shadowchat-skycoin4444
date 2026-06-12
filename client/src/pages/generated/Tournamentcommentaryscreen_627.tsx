// AUTO-GENERATED DRAFT SCREEN: TournamentCommentaryScreen
import React from 'react';
import { trpc } from './trpc';

const TournamentCommentaryScreen: React.FC = () => {
  const { data, isLoading, error } = trpc.getTournamentData.useQuery({ tournamentId: 'SKYCOIN4444_ARCADE_TOURNAMENT' });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="text-xl">Loading tournament data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="text-xl text-destructive">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="container mx-auto py-4 border-b border-border">
        <h1 className="text-3xl font-bold">Arcade: Tournament Commentary</h1>
      </header>
      <main className="container mx-auto py-8">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {/* Main video player or live stream area */}
            <div className="aspect-video bg-muted flex items-center justify-center rounded-lg" role="region" aria-label="Live Stream Video Player">
              <p className="text-muted-foreground">Live Stream / Video Player (URL: {data?.liveStreamUrl})</p>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-semibold">Tournament Details: {data?.name}</h2>
              <p className="text-muted-foreground">Status: {data?.status}</p>
            </div>
          </div>
          <aside className="md:col-span-1">
            {/* Commentary section */}
            <div className="bg-card p-4 rounded-lg shadow-sm" role="region" aria-live="polite">
              <h2 className="text-xl font-semibold mb-4">Live Commentary</h2>
              <div className="space-y-4">
                {data?.commentary.map((comment, index) => (
                  <div key={index} className="border-b border-border pb-2 last:border-b-0">
                    <p className="text-sm">{comment}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Chat or social feed */}
            <div className="bg-card p-4 rounded-lg shadow-sm mt-8" role="region" aria-live="polite">
              <h2 className="text-xl font-semibold mb-4">Live Chat</h2>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Chat messages will appear here.</p>
              </div>
            </div>
          </aside>
        </section>
      </main>
      <footer className="container mx-auto py-4 border-t border-border text-center text-muted-foreground">
        <p>&copy; 2026 SKYCOIN4444. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TournamentCommentaryScreen;
