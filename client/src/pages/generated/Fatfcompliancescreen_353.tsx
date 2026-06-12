// @ts-nocheck
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: FatfComplianceScreen


/* --- injected local data stubs (replaces non-existent backend hooks) --- */
function useStubQuery<T = any>(initial?: T) {
  return { data: initial as T, isLoading: false, isPending: false, isError: false, error: null as any, refetch: () => {} };
}
function useStubMutation<T = any>() {
  return {
    mutate: (_v?: any) => {}, mutateAsync: async (_v?: any) => ({} as T),
    isLoading: false, isPending: false, isError: false, isSuccess: false, error: null as any, data: undefined as any, reset: () => {},
  };
}
/* ----------------------------------------------------------------------- */


// Mock tRPC client for demonstration purposes
// In a real application, this would be configured to connect to your tRPC backend

interface Recommendation {
  id: number;
  description: string;
  status: 'Completed' | 'Pending' | 'In Progress';
}

interface ComplianceData {
  status: string;
  lastAudit: string;
  nextAudit: string;
  riskLevel: string;
  recommendations: Recommendation[];
}

const FatfComplianceScreen: React.FC = () => {
  const { data, isLoading, isError, error } = useStubQuery();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 dark:bg-gray-900">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>FATF Compliance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 dark:bg-gray-900">
        <Alert variant="destructive" className="w-full max-w-2xl">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load FATF compliance data: {error?.message || 'Unknown error'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const complianceData = data as ComplianceData;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center">FATF Compliance Dashboard</h1>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Overall Compliance Status</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
              <Badge
                className={`text-lg px-3 py-1 ${
                  complianceData.status === 'Compliant' ? 'bg-green-500 dark:bg-green-600' : 'bg-red-500 dark:bg-red-600'
                }`}
              >
                {complianceData.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Risk Level</p>
              <Badge
                className={`text-lg px-3 py-1 ${
                  complianceData.riskLevel === 'Low' ? 'bg-blue-500 dark:bg-blue-600' : 'bg-orange-500 dark:bg-orange-600'
                }`}
              >
                {complianceData.riskLevel}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Last Audit</p>
              <p className="text-lg font-medium">{complianceData.lastAudit}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Next Audit</p>
              <p className="text-lg font-medium">{complianceData.nextAudit}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            {complianceData.recommendations.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {complianceData.recommendations.map((rec) => (
                    <TableRow key={rec.id}>
                      <TableCell className="font-medium">{rec.id}</TableCell>
                      <TableCell>{rec.description}</TableCell>
                      <TableCell className="text-right">
                        <Badge
                          className={`${
                            rec.status === 'Completed' ? 'bg-green-500 dark:bg-green-600'
                            : rec.status === 'Pending' ? 'bg-yellow-500 dark:bg-yellow-600'
                            : 'bg-blue-500 dark:bg-blue-600'
                          }`}
                        >
                          {rec.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400">No recommendations found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FatfComplianceScreen;
