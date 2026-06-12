// AUTO-GENERATED DRAFT SCREEN: CreatorDashboardScreen
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Activity, DollarSign, Users, FolderKanban, AlertCircle } from 'lucide-react';

// --- Type Definitions ---
interface CreatorStats {
  totalFollowers: number;
  totalRevenue: number;
  activeProjects: number;
}

interface ActivityItem {
  id: string;
  description: string;
  date: string;
}

interface CreatorDashboardData {
  creatorName: string;
  stats: CreatorStats;
  recentActivities: ActivityItem[];
}

// --- Simulated tRPC Hook ---
// In a real application, this would be imported from your tRPC client setup.
// e.g., import { trpc } from '@/utils/trpc';
// const { data, isLoading, error } = trpc.crypto.getCreatorDashboard.useQuery();
const useCreatorDashboardQuery = () => {
  return useQuery<CreatorDashboardData, Error>({
    queryKey: ['creatorDashboard'],
    queryFn: async () => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Simulate potential error (uncomment to test error state)
      // throw new Error('Failed to fetch dashboard data. Please try again later.');

      return {
        creatorName: 'SKYCOIN4444',
        stats: {
          totalFollowers: 12450,
          totalRevenue: 54321.50,
          activeProjects: 7,
        },
        recentActivities: [
          { id: '1', description: 'Launched new NFT collection "SkyGems"', date: '2023-10-27' },
          { id: '2', description: 'Reached 10k followers milestone', date: '2023-10-25' },
          { id: '3', description: 'Received payment for "CryptoArt" project', date: '2023-10-20' },
        ],
      };
    },
  });
};

// --- Components ---

const DashboardSkeleton = () => (
  <div className="space-y-6 p-6" aria-busy="true" aria-live="polite">
    <Skeleton className="h-10 w-1/3" />
    <div className="grid gap-4 md:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-3 w-1/4" />
          </CardContent>
        </Card>
      ))}
    </div>
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-1/4" />
      </CardHeader>
      <CardContent className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </CardContent>
    </Card>
  </div>
);

const ErrorState = ({ error }: { error: Error }) => (
  <div className="p-6" role="alert" aria-live="assertive">
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error.message || 'An unexpected error occurred while loading the dashboard.'}
      </AlertDescription>
    </Alert>
  </div>
);

export const CreatorDashboardScreen: React.FC = () => {
  const { data, isLoading, error } = useCreatorDashboardQuery();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (!data) {
    return null; // Or a generic "No data" state
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6 space-y-6 dark:bg-slate-950 dark:text-slate-50">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {data.creatorName}
        </h1>
        <p className="text-muted-foreground dark:text-slate-400">
          Here's an overview of your creator dashboard.
        </p>
      </header>

      <main className="space-y-6">
        {/* Stats Grid */}
        <section className="grid gap-4 md:grid-cols-3" aria-label="Key Statistics">
          <Card className="dark:bg-slate-900 dark:border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${data.stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground dark:text-slate-400">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="dark:bg-slate-900 dark:border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Followers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data.stats.totalFollowers.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground dark:text-slate-400">
                +180 new followers this week
              </p>
            </CardContent>
          </Card>

          <Card className="dark:bg-slate-900 dark:border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <FolderKanban className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.stats.activeProjects}</div>
              <p className="text-xs text-muted-foreground dark:text-slate-400">
                2 projects nearing completion
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Recent Activity */}
        <section aria-label="Recent Activity">
          <Card className="dark:bg-slate-900 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" aria-hidden="true" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {data.recentActivities.map((activity) => (
                  <li key={activity.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0 dark:border-slate-800">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {activity.description}
                      </p>
                      <p className="text-sm text-muted-foreground dark:text-slate-400">
                        {new Date(activity.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default CreatorDashboardScreen;