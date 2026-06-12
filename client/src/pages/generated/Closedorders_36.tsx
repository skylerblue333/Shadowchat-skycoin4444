// @ts-nocheck
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import * as __ns_lucide_react_1 from 'lucide-react';
const { Terminal } = (__ns_lucide_react_1 as any);

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: ClosedOrders


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


interface ClosedOrder {
  id: string;
  symbol: string;
  amount: number;
  price: number;
  status: string;
  closedAt: string;
}

const ClosedOrders: React.FC = () => {
  const { data, isLoading, isError, error } = useStubQuery();

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Closed Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-full mb-4" />
          <Skeleton className="h-10 w-full mb-4" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load closed orders: {error.message}
        </AlertDescription>
      </Alert>
    );
  }

  const closedOrders: ClosedOrder[] = data || [];

  return (
    <Card className="w-full bg-background text-foreground border-border shadow-lg">
      <CardHeader className="border-b border-border p-4">
        <CardTitle className="text-2xl font-bold">Crypto: Closed Orders</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {closedOrders.length === 0 ? (
          <p className="text-center text-muted-foreground">No closed orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="text-left font-medium text-muted-foreground">ID</TableHead>
                  <TableHead className="text-left font-medium text-muted-foreground">Symbol</TableHead>
                  <TableHead className="text-left font-medium text-muted-foreground">Amount</TableHead>
                  <TableHead className="text-left font-medium text-muted-foreground">Price</TableHead>
                  <TableHead className="text-left font-medium text-muted-foreground">Status</TableHead>
                  <TableHead className="text-left font-medium text-muted-foreground">Closed At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {closedOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-mono text-sm">{order.id.substring(0, 8)}...</TableCell>
                    <TableCell className="font-semibold">{order.symbol}</TableCell>
                    <TableCell>{order.amount.toFixed(4)}</TableCell>
                    <TableCell>${order.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${order.status === 'Filled' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}`}>
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(order.closedAt).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClosedOrders;
