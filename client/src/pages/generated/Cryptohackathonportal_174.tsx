// AUTO-GENERATED DRAFT SCREEN: CryptoHackathonPortal
import React from 'react';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';
import { ThemeToggle } from './theme-toggle';
import { trpc } from '../trpc';

interface Hackathon {
  id: string;
  name: string;
  description: string;
  date: string;
  status: 'Open' | 'Closed';
}

const CryptoHackathonPortal: React.FC = () => {
  const { data, isLoading, error } = trpc.hackathons.useQuery({ limit: 5 });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-foreground text-lg">Loading hackathons...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-red-500 text-lg">Error: {error.message}</p>
      </div>
    );
  }

  const hackathons: Hackathon[] = data?.hackathons || [];

  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center border-b border-border">
        <h1 className="text-3xl font-bold">Crypto Hackathon Portal</h1>
        <ThemeToggle />
        {/* Add navigation or user auth components here */}
      </header>
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Welcome to the Hackathon!</h2>
          <p className="text-muted-foreground leading-relaxed">Join us for an exciting journey into the world of blockchain and cryptocurrency development. Build innovative solutions, collaborate with talented individuals, and compete for amazing prizes.</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {hackathons.map((hackathon) => (
            <div key={hackathon.id} className="bg-card p-6 rounded-lg shadow-md border border-border">
              <h3 className="text-xl font-bold mb-2">{hackathon.name}</h3>
              <p className="text-muted-foreground mb-2">{hackathon.description}</p>
              <p className="text-sm text-gray-500">Date: {hackathon.date}</p>
              <p className="text-sm text-gray-500">Status: {hackathon.status}</p>
            </div>
          ))}
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">How to Participate</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-lg shadow-md border border-border">
              <h3 className="text-xl font-bold mb-2">1. Register</h3>
              <p className="text-muted-foreground">Sign up for the hackathon to secure your spot.</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md border border-border">
              <h3 className="text-xl font-bold mb-2">2. Form a Team</h3>
              <p className="text-muted-foreground">Collaborate with up to 4 members or go solo.</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-md border border-border">
              <h3 className="text-xl font-bold mb-2">3. Build & Innovate</h3>
              <p className="text-muted-foreground">Develop your project during the hackathon period.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Key Dates</h2>
          <ul className="list-disc list-inside text-muted-foreground text-left mx-auto max-w-md">
            <li>Registration Opens: June 1, 2026</li>
            <li>Hackathon Starts: July 1, 2026</li>
            <li>Submission Deadline: July 15, 2026</li>
            <li>Winners Announced: July 22, 2026</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Sponsors</h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <img src="https://via.placeholder.com/150x50?text=Sponsor+A" alt="Sponsor A" className="h-12" />
            <img src="https://via.placeholder.com/150x50?text=Sponsor+B" alt="Sponsor B" className="h-12" />
            <img src="https://via.placeholder.com/150x50?text=Sponsor+C" alt="Sponsor C" className="h-12" />
          </div>
        </section>

        <section className="mt-12 text-center">
          <Button className="px-6 py-3 text-lg font-semibold">
            Register Now
          </Button>
        </section>
      </main>
      <footer className="container mx-auto px-4 py-6 text-center text-muted-foreground border-t border-border mt-12">
        <p>&copy; 2026 SKYCOIN4444. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CryptoHackathonPortal;