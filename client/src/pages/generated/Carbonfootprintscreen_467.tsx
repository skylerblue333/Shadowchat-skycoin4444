// AUTO-GENERATED DRAFT SCREEN: CarbonFootprintScreen
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Leaf, AlertCircle, Activity, Zap, Server, ArrowRightLeft } from "lucide-react";

// Types
interface BreakdownItem {
  category: string;
  value: number;
  icon: string;
  percentage: number;
}

interface CarbonMetrics {
  totalEmissions: number;
  unit: string;
  lastUpdated: string;
  breakdown: BreakdownItem[];
  sustainabilityScore: number;
  equivalentTrees: number;
}

// Mock tRPC hook
const trpc = {
  carbonFootprint: {
    getMetrics: {
      useQuery: () => {
        const [data, setData] = React.useState<CarbonMetrics | undefined>(undefined);
        const [isLoading, setIsLoading] = React.useState(true);
        const [isError, setIsError] = React.useState(false);

        const fetchData = React.useCallback(() => {
          setIsLoading(true);
          setIsError(false);
          setTimeout(() => {
            // Simulate 5% chance of error for robustness testing
            if (Math.random() < 0.05) {
              setIsError(true);
              setIsLoading(false);
              return;
            }
            setData({
              totalEmissions: 12450.5,
              unit: 'kg CO2e',
              lastUpdated: new Date().toISOString(),
              breakdown: [
                { category: 'Network Consensus', value: 8500.2, icon: 'server', percentage: 68 },
                { category: 'Transaction Processing', value: 2100.3, icon: 'activity', percentage: 17 },
                { category: 'Smart Contract Execution', value: 1200.0, icon: 'zap', percentage: 10 },
                { category: 'Cross-chain Bridges', value: 650.0, icon: 'arrow-right-left', percentage: 5 },
              ],
              sustainabilityScore: 85,
              equivalentTrees: 520,
            });
            setIsLoading(false);
          }, 1500);
        }, []);

        React.useEffect(() => {
          fetchData();
        }, [fetchData]);

        return { data, isLoading, isError, error: null, refetch: fetchData };
      }
    }
  }
};

export default function CarbonFootprintScreen() {
  const { data, isLoading, isError, refetch } = trpc.carbonFootprint.getMetrics.useQuery();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'server': return <Server className="h-5 w-5 text-blue-500" aria-hidden="true" />;
      case 'activity': return <Activity className="h-5 w-5 text-green-500" aria-hidden="true" />;
      case 'zap': return <Zap className="h-5 w-5 text-yellow-500" aria-hidden="true" />;
      case 'arrow-right-left': return <ArrowRightLeft className="h-5 w-5 text-purple-500" aria-hidden="true" />;
      default: return <Leaf className="h-5 w-5 text-emerald-500" aria-hidden="true" />;
    }
  };

  if (isError) {
    return (
      <div className="p-6 max-w-4xl mx-auto w-full">
        <Alert variant="destructive" role="alert">
          <AlertCircle className="h-4 w-4" aria-hidden="true" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="flex flex-col gap-3 mt-2">
            <p>Failed to load carbon footprint data. Please check your connection and try again.</p>
            <button 
              onClick={() => refetch()}
              className="w-fit px-4 py-2 bg-destructive/10 hover:bg-destructive/20 text-destructive font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Retry loading data"
            >
              Retry Connection
            </button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6 bg-background text-foreground min-h-screen w-full">
      <header className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <Leaf className="h-8 w-8 text-emerald-500" aria-hidden="true" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Carbon Footprint</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Real-time environmental impact metrics for SKYCOIN4444 network operations.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Total Emissions Card */}
        <Card className="lg:col-span-2 border-border/50 shadow-sm dark:bg-card/50 overflow-hidden">
          <CardHeader className="bg-muted/30 pb-4">
            <CardTitle className="text-xl font-medium">Total Network Emissions</CardTitle>
            <CardDescription>Cumulative carbon footprint across all nodes</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {isLoading ? (
              <div className="space-y-3" aria-busy="true" aria-label="Loading total emissions">
                <Skeleton className="h-14 w-2/3 max-w-[300px]" />
                <Skeleton className="h-5 w-1/3 max-w-[200px]" />
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-5xl md:text-6xl font-bold tracking-tighter text-foreground">
                    {data?.totalEmissions.toLocaleString()}
                  </span>
                  <span className="text-2xl text-muted-foreground font-medium">
                    {data?.unit}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1.5">
                  <Activity className="h-3.5 w-3.5" aria-hidden="true" />
                  Last updated: {data?.lastUpdated ? new Date(data.lastUpdated).toLocaleString() : 'Unknown'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sustainability Score Card */}
        <Card className="border-border/50 shadow-sm dark:bg-card/50">
          <CardHeader className="bg-muted/30 pb-4">
            <CardTitle className="text-xl font-medium">Sustainability Score</CardTitle>
            <CardDescription>Network efficiency rating</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-8">
            {isLoading ? (
              <Skeleton className="h-32 w-32 rounded-full" aria-busy="true" aria-label="Loading score" />
            ) : (
              <div className="relative flex items-center justify-center">
                <svg className="w-36 h-36 transform -rotate-90" aria-hidden="true">
                  <circle
                    cx="72"
                    cy="72"
                    r="64"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    className="text-muted/20"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r="64"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={402.12}
                    strokeDashoffset={402.12 - (402.12 * (data?.sustainabilityScore || 0)) / 100}
                    className="text-emerald-500 transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-4xl font-bold text-foreground">{data?.sustainabilityScore}</span>
                  <span className="text-sm font-medium text-muted-foreground">/ 100</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Breakdown Section */}
      <Card className="border-border/50 shadow-sm dark:bg-card/50">
        <CardHeader className="bg-muted/30 pb-4">
          <CardTitle className="text-xl font-semibold">Emissions Breakdown</CardTitle>
          <CardDescription>Detailed analysis by network activity sector</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="space-y-8" aria-busy="true" aria-label="Loading breakdown">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-md" />
                      <Skeleton className="h-5 w-32 md:w-48" />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  </div>
                  <Skeleton className="h-2.5 w-full rounded-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {data?.breakdown.map((item, index) => (
                <div key={index} className="space-y-3 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-muted rounded-md group-hover:bg-muted/80 transition-colors">
                        {getIcon(item.icon)}
                      </div>
                      <span className="font-medium text-base">{item.category}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-semibold text-foreground">
                        {item.value.toLocaleString()} <span className="text-muted-foreground font-normal text-sm">{data.unit}</span>
                      </span>
                      <span className="text-sm font-medium text-muted-foreground">{item.percentage}%</span>
                    </div>
                  </div>
                  <Progress 
                    value={item.percentage} 
                    className="h-2.5 bg-muted" 
                    aria-label={`${item.category} accounts for ${item.percentage} percent of emissions`} 
                  />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Impact Equivalent */}
      <Card className="bg-emerald-500/10 border-emerald-500/20 dark:bg-emerald-950/30 dark:border-emerald-900/40 overflow-hidden relative">
        <div className="absolute -right-10 -top-10 opacity-10 pointer-events-none">
          <Leaf className="w-48 h-48 text-emerald-500" />
        </div>
        <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-5 relative z-10">
          <div className="p-4 bg-emerald-500/20 rounded-full shrink-0">
            <Leaf className="h-10 w-10 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          </div>
          <div className="space-y-1.5">
            {isLoading ? (
              <div className="space-y-3" aria-busy="true" aria-label="Loading impact equivalent">
                <Skeleton className="h-7 w-56 bg-emerald-500/20" />
                <Skeleton className="h-5 w-full max-w-[400px] bg-emerald-500/20" />
              </div>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-300">
                  Environmental Impact Equivalent
                </h3>
                <p className="text-emerald-800 dark:text-emerald-400/90 text-base md:text-lg leading-relaxed">
                  It would take approximately <strong className="font-bold text-emerald-950 dark:text-emerald-200 text-xl">{data?.equivalentTrees.toLocaleString()} mature trees</strong> a full year to absorb these network emissions.
                </p>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}