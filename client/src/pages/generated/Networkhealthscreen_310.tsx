// AUTO-GENERATED DRAFT SCREEN: NetworkHealthScreen
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'; // Assuming shadcn/ui components are in './ui'
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { TriangleAlertIcon, Loader2 } from 'lucide-react'; // Assuming lucide-react for icons

// Simulate tRPC hook for network health data
interface NetworkHealthData {
  status: 'healthy' | 'degraded' | 'unhealthy';
  activeNodes: number;
  totalNodes: number;
  latency: number; // ms
  blockHeight: number;
  lastUpdated: string;
}

interface UseNetworkHealthResult {
  data: NetworkHealthData | undefined;
  isLoading: boolean;
  isError: boolean;
}

const useNetworkHealth = (): UseNetworkHealthResult => {
  // In a real application, this would fetch data using tRPC
  const [data, setData] = React.useState<NetworkHealthData | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        const mockData: NetworkHealthData = {
          status: 'healthy',
          activeNodes: 95,
          totalNodes: 100,
          latency: 50,
          blockHeight: 1234567,
          lastUpdated: new Date().toLocaleString(),
        };
        setData(mockData);
      } catch (error) {
        console.error('Failed to fetch network health:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, isLoading, isError };
};

const NetworkHealthScreen: React.FC = () => {
  const { data, isLoading, isError } = useNetworkHealth();

  const getStatusBadgeVariant = (status: NetworkHealthData['status']) => {
    switch (status) {
      case 'healthy': return 'default';
      case 'degraded': return 'warning'; // Assuming a 'warning' variant exists or can be styled
      case 'unhealthy': return 'destructive';
      default: return 'secondary';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <Loader2 className="h-8 w-8 animate-spin" aria-label="Loading network health data" />
        <span className="ml-2">Loading network health...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground p-4">
        <Alert variant="destructive" className="max-w-md">
          <TriangleAlertIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to load network health data. Please try again later.</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground p-4">
        <Alert className="max-w-md">
          <AlertTitle>No Data</AlertTitle>
          <AlertDescription>No network health data available.</AlertDescription>
        </Alert>
      </div>
    );
  }

  const nodeHealthPercentage = (data.activeNodes / data.totalNodes) * 100;

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8 space-y-6" aria-live="polite" aria-atomic="true">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Crypto: Network Health</h1>

      <div className="flex items-center space-x-2">
        <span className="text-lg font-medium">Overall Status:</span>
        <Badge variant={getStatusBadgeVariant(data.status)} className="text-base capitalize">
          {data.status}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Active Nodes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.activeNodes} / {data.totalNodes}</p>
            <Progress value={nodeHealthPercentage} className="mt-2" aria-label={`${nodeHealthPercentage}% of nodes are active`} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Network Latency</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.latency} ms</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Block Height</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.blockHeight}</p>
          </CardContent>
        </Card>
      </div>

      <p className="text-sm text-muted-foreground">Last Updated: {data.lastUpdated}</p>
    </div>
  );
};

export default NetworkHealthScreen;
