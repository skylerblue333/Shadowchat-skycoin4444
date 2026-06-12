// AUTO-GENERATED DRAFT SCREEN: CryptoRoadmapTracker
import React, { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle2, Clock, Calendar, RefreshCw, Moon, Sun } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// --- Types ---
export type RoadmapStatus = 'planned' | 'in-progress' | 'completed' | 'delayed';
export type RoadmapCategory = 'core' | 'marketing' | 'community' | 'exchange';

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: RoadmapStatus;
  category: RoadmapCategory;
  progress: number; // 0-100
  dueDate?: string;
}

export interface CryptoRoadmapTrackerProps {
  className?: string;
  initialTheme?: 'light' | 'dark';
}

// --- Mock Data / Fallback ---
const MOCK_DATA: RoadmapItem[] = [
  {
    id: '1',
    title: 'Mainnet Launch v1.0',
    description: 'Official launch of the SKYCOIN4444 mainnet with full node support and initial validator set.',
    status: 'completed',
    category: 'core',
    progress: 100,
    dueDate: '2024-06-30',
  },
  {
    id: '2',
    title: 'Tier 1 Exchange Listing',
    description: 'Securing listing on top-tier centralized exchanges to increase liquidity and accessibility.',
    status: 'in-progress',
    category: 'exchange',
    progress: 65,
    dueDate: '2024-12-31',
  },
  {
    id: '3',
    title: 'Global Marketing Campaign',
    description: 'Comprehensive marketing push across major crypto media outlets and social platforms.',
    status: 'planned',
    category: 'marketing',
    progress: 10,
    dueDate: '2025-03-15',
  },
  {
    id: '4',
    title: 'Governance DAO Implementation',
    description: 'Transitioning protocol control to the community via decentralized autonomous organization.',
    status: 'delayed',
    category: 'community',
    progress: 30,
    dueDate: '2024-11-30',
  },
];

// --- Helper Components ---
const StatusIcon = ({ status }: { status: RoadmapStatus }) => {
  switch (status) {
    case 'completed': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    case 'in-progress': return <Clock className="w-4 h-4 text-blue-500" />;
    case 'delayed': return <AlertCircle className="w-4 h-4 text-red-500" />;
    case 'planned':
    default: return <Calendar className="w-4 h-4 text-slate-500" />;
  }
};

const StatusBadge = ({ status }: { status: RoadmapStatus }) => {
  const variants: Record<RoadmapStatus, string> = {
    completed: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    delayed: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    planned: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400',
  };
  return (
    <Badge variant="outline" className={cn('capitalize border-none font-medium', variants[status])}>
      {status.replace('-', ' ')}
    </Badge>
  );
};

// --- Main Component ---
export const CryptoRoadmapTracker: React.FC<CryptoRoadmapTrackerProps> = ({
  className,
  initialTheme = 'dark',
}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(initialTheme);
  const [activeTab, setActiveTab] = useState<string>('all');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['skycoin4444.roadmap'],
    queryFn: async () => {
      try {
        if (trpc?.roadmap?.getRoadmap?.query) {
          return await trpc.roadmap.getRoadmap.query();
        }
        await new Promise((resolve) => setTimeout(resolve, 1500));
        return MOCK_DATA;
      } catch (e) {
        console.warn('tRPC fetch failed, using mock data', e);
        return MOCK_DATA;
      }
    },
    staleTime: 1000 * 60 * 5,
  });

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (activeTab === 'all') return data;
    return data.filter((item: RoadmapItem) => item.status === activeTab);
  }, [data, activeTab]);

  if (isLoading) {
    return (
      <div className={cn('w-full max-w-6xl mx-auto p-6 space-y-6', className)} aria-busy="true">
        <Skeleton className="h-10 w-full mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-2 w-full mb-4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={cn('w-full max-w-2xl mx-auto p-6', className)}>
        <Alert variant="destructive" className="bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-900">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle className="text-lg font-semibold">Failed to load roadmap</AlertTitle>
          <AlertDescription className="mt-2 flex flex-col gap-4">
            <p className="text-sm opacity-90">
              {error instanceof Error ? error.message : 'An unexpected error occurred while fetching the SKYCOIN4444 roadmap data.'}
            </p>
            <Button onClick={() => refetch()} variant="outline" className="w-fit bg-white/50 hover:bg-white/80 dark:bg-black/50 dark:hover:bg-black/80">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className={cn('w-full min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300', className)}>
      <div className="max-w-7xl mx-auto p-6 lg:p-8 space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
              SKYCOIN4444 Roadmap
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl">
              Track our progress, upcoming features, and strategic milestones.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" onClick={toggleTheme} aria-label="Toggle theme" className="rounded-full">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button onClick={() => refetch()} variant="secondary" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
          </div>
        </header>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-4 mb-8 bg-slate-200/50 dark:bg-slate-800/50">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="in-progress">Active</TabsTrigger>
            <TabsTrigger value="planned">Planned</TabsTrigger>
            <TabsTrigger value="completed">Done</TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredData?.map((item: RoadmapItem) => (
              <Card 
                key={item.id} 
                className="flex flex-col h-full border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <Badge variant="secondary" className="uppercase text-[10px] tracking-wider font-bold">
                      {item.category}
                    </Badge>
                    <StatusBadge status={item.status} />
                  </div>
                  <CardTitle className="text-xl font-bold leading-tight flex items-center gap-2">
                    <StatusIcon status={item.status} />
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-sm mt-2 line-clamp-2 text-slate-600 dark:text-slate-400">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Progress</span>
                      <span>{item.progress}%</span>
                    </div>
                    <Progress value={item.progress} className="h-2" />
                  </div>
                </CardContent>

                <CardFooter className="pt-4 border-t border-slate-100 dark:border-slate-800/50 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {item.dueDate ? `Target: ${new Date(item.dueDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}` : 'TBD'}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredData?.length === 0 && (
            <div className="text-center py-20 px-4 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800">
              <Calendar className="mx-auto h-12 w-12 text-slate-400 mb-4 opacity-50" />
              <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">No roadmap items found</h3>
              <p className="mt-1 text-slate-500 dark:text-slate-400">
                There are currently no items matching the selected filter.
              </p>
              <Button onClick={() => setActiveTab('all')} variant="outline" className="mt-6">
                View All Items
              </Button>
            </div>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default CryptoRoadmapTracker;
