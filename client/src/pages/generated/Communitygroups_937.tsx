// AUTO-GENERATED DRAFT SCREEN: CommunityGroups
import React from 'react';
import { trpc } from './lib/trpc';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';

const CommunityGroups: React.FC = () => {
  const { data, isLoading, error } = trpc.communityGroups.useQuery();

  if (isLoading) {
    return (
      <div className="container mx-auto p-4" role="status" aria-live="polite">
        Loading community groups...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-red-500" role="alert">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4" aria-labelledby="community-groups-heading">
      <div className="flex justify-between items-center mb-4">
        <h1 id="community-groups-heading" className="text-3xl font-bold">
          Community Groups
        </h1>
        <ModeToggle />
      </div>
      <p className="mb-4">{data?.message}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Dummy Community Group Card 1 */}
        <div className="bg-card p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Developers Hub</h2>
          <p className="text-muted-foreground mb-4">A place for developers to connect and collaborate.</p>
          <Button aria-label="View Developers Hub">View Group</Button>
        </div>

        {/* Dummy Community Group Card 2 */}
        <div className="bg-card p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Design Enthusiasts</h2>
          <p className="text-muted-foreground mb-4">Share your designs and get feedback from fellow designers.</p>
          <Button aria-label="View Design Enthusiasts">View Group</Button>
        </div>

        {/* Dummy Community Group Card 3 */}
        <div className="bg-card p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Gaming Guild</h2>
          <p className="text-muted-foreground mb-4">Find teammates and discuss your favorite games.</p>
          <Button aria-label="View Gaming Guild">View Group</Button>
        </div>

        {/* Dummy Community Group Card 4 */}
        <div className="bg-card p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Photography Club</h2>
          <p className="text-muted-foreground mb-4">Capture and share beautiful moments with the community.</p>
          <Button aria-label="View Photography Club">View Group</Button>
        </div>

        {/* Dummy Community Group Card 5 */}
        <div className="bg-card p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Writers Workshop</h2>
          <p className="text-muted-foreground mb-4">Improve your writing skills and get inspired.</p>
          <Button aria-label="View Writers Workshop">View Group</Button>
        </div>

        {/* Dummy Community Group Card 6 */}
        <div className="bg-card p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Fitness Fanatics</h2>
          <p className="text-muted-foreground mb-4">Stay motivated and achieve your fitness goals together.</p>
          <Button aria-label="View Fitness Fanatics">View Group</Button>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Button aria-label="Create New Group">Create New Group</Button>
      </div>
    </div>
  );
};

export default CommunityGroups;