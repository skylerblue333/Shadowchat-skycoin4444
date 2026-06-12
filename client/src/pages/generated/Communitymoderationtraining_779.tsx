// AUTO-GENERATED DRAFT SCREEN: CommunityModerationTraining
import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

interface TrainingModule {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const fetchModules = (): Promise<TrainingModule[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate a random error for demonstration
      if (Math.random() < 0.1) {
        reject(new Error('Failed to fetch training modules. Please try again.'));
      } else {
        resolve([
          {
            id: 'module-1',
            title: 'Understanding Community Guidelines',
            description: 'Learn the core principles and rules that govern the SKYCOIN4444 community. This module covers acceptable behavior, content policies, and reporting procedures.',
            completed: false,
          },
          {
            id: 'module-2',
            title: 'Effective Communication for Moderators',
            description: 'Develop skills in clear, concise, and empathetic communication. Learn how to de-escalate conflicts, provide constructive feedback, and maintain a professional tone.',
            completed: false,
          },
          {
            id: 'module-3',
            title: 'Handling Sensitive Content and Disputes',
            description: 'Understand best practices for managing sensitive topics, resolving disputes fairly, and protecting user privacy. This includes identifying and addressing hate speech, harassment, and misinformation.',
            completed: false,
          },
          {
            id: 'module-4',
            title: 'Utilizing Moderation Tools and Features',
            description: 'Familiarize yourself with the platform\'s moderation tools, including reporting systems, ban/mute functionalities, and content filtering. Learn how to efficiently use these tools to maintain community standards.',
            completed: false,
          },
        ]);
      }
    }, 1500); // Simulate network delay
  });
};

const CommunityModerationTraining: React.FC = () => {
  const [modules, setModules] = useState<TrainingModule[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadModules = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchModules();
        setModules(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    };
    loadModules();
  }, []);

  const toggleModuleCompletion = (id: string) => {
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === id ? { ...module, completed: !module.completed } : module
      )
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="ml-2 text-lg">Loading training modules...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] text-destructive">
        <p className="text-lg font-semibold mb-2">Error: {error}</p>
        <Button onClick={() => window.location.reload()} variant="destructive">
          Retry Loading
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-extrabold mb-8 text-center">Community Moderation Training</h1>
      <p className="text-lg text-center mb-12 max-w-3xl mx-auto text-muted-foreground">
        Welcome to the SKYCOIN4444 Community Moderation Training module. This comprehensive training program is designed to equip you with the essential skills and knowledge required to effectively moderate our community, fostering a safe, inclusive, and positive environment for all members.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {modules.map((module) => (
          <div
            key={module.id}
            className={cn(
              "bg-card text-card-foreground rounded-lg shadow-lg p-6 border",
              module.completed && "border-green-500 ring-2 ring-green-500"
            )}
          >
            <h2 className="text-2xl font-semibold mb-3">{module.title}</h2>
            <p className="text-muted-foreground mb-4">{module.description}</p>
            <Button
              variant={module.completed ? "secondary" : "default"}
              onClick={() => toggleModuleCompletion(module.id)}
              className="w-full"
            >
              {module.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to become a SKYCOIN4444 Moderator?</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Complete all modules to unlock your moderator certification and join our dedicated team.
        </p>
        <Button size="lg" disabled={modules.some(m => !m.completed)}>
          Get Certified
        </Button>
      </div>
    </div>
  );
};

export default CommunityModerationTraining;
