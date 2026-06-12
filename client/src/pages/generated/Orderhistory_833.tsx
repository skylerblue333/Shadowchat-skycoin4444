// AUTO-GENERATED DRAFT SCREEN: OrderHistory
import React from 'react';
import { useQuery } from '@tanstack/react-query'; // Assuming tRPC integrates with react-query
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Placeholder for shadcn/ui Card
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'; // Placeholder for shadcn/ui Table
import { Skeleton } from '@/components/ui/skeleton'; // Placeholder for shadcn/ui Skeleton
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'; // Placeholder for shadcn/ui Alert
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'; // Placeholder for an icon

// Define types for order data
interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  items: OrderItem[];
}

// Mock tRPC-like hook for fetching order history
// In a real application, this would interact with your tRPC client
const useOrderHistory = () => {
  return useQuery<Order[], Error>({
    queryKey: ['orderHistory'],
    queryFn: async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Simulate a successful response
      if (Math.random() > 0.1) { // 90% chance of success
        return [
          {
            id: 'ORD001',
            date: '2023-01-15',
            total: 120.50,
            status: 'Completed',
            items: [
              { id: 'ITEM001', name: 'SKYCOIN Token', quantity: 10, price: 10.00 },
              { id: 'ITEM002', name: 'Premium Feature Access', quantity: 1, price: 20.50 },
            ],
          },
          {
            id: 'ORD002',
            date: '2023-01-20',
            total: 50.00,
            status: 'Pending',
            items: [
              { id: 'ITEM003', name: 'SKYCOIN NFT', quantity: 1, price: 50.00 },
            ],
          },
        ];
      } else { // 10% chance of error
        throw new Error('Failed to fetch order history. Please try again later.');
      }
    },
  });
};

const OrderHistory: React.FC = () => {
  const { data: orders, isLoading, isError, error } = useOrderHistory();

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 dark:bg-gray-900 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Order History</h1>
        <Card className="w-full dark:bg-gray-800 dark:text-white">
          <CardHeader>
            <CardTitle>Loading Orders...</CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-3/4 mb-4 dark:bg-gray-700" />
            <Skeleton className="h-8 w-full mb-4 dark:bg-gray-700" />
            <Skeleton className="h-8 w-full mb-4 dark:bg-gray-700" />
            <Skeleton className="h-8 w-2/3 dark:bg-gray-700" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-4 dark:bg-gray-900 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Order History</h1>
        <Alert variant="destructive" className="dark:bg-red-900 dark:text-white">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error?.message || 'An unknown error occurred while fetching order history.'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 min-h-screen" aria-label="Order History Page">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white" tabIndex={0}>Your Order History</h1>

      {orders && orders.length === 0 ? (
        <Alert className="dark:bg-gray-800 dark:text-white">
          <AlertTitle>No Orders Found</AlertTitle>
          <AlertDescription>It looks like you haven't placed any orders yet.</AlertDescription>
        </Alert>
      ) : (
        <div className="space-y-6">
          {orders?.map((order) => (
            <Card key={order.id} className="w-full dark:bg-gray-800 dark:text-white shadow-lg rounded-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-medium" tabIndex={0}>Order ID: {order.id}</CardTitle>
                <div className="text-sm text-gray-500 dark:text-gray-400" tabIndex={0}>Date: {order.date}</div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex justify-between items-center">
                  <p className="text-lg font-semibold" tabIndex={0}>Total: ${order.total.toFixed(2)}</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  }`} tabIndex={0}>
                    {order.status}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2" tabIndex={0}>Items:</h3>
                <Table className="dark:bg-gray-700 rounded-md overflow-hidden">
                  <TableHeader>
                    <TableRow className="dark:bg-gray-600">
                      <TableHead className="w-[100px] dark:text-gray-200">ID</TableHead>
                      <TableHead className="dark:text-gray-200">Name</TableHead>
                      <TableHead className="text-right dark:text-gray-200">Quantity</TableHead>
                      <TableHead className="text-right dark:text-gray-200">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.items.map((item) => (
                      <TableRow key={item.id} className="dark:hover:bg-gray-600">
                        <TableCell className="font-medium dark:text-gray-100">{item.id}</TableCell>
                        <TableCell className="dark:text-gray-100">{item.name}</TableCell>
                        <TableCell className="text-right dark:text-gray-100">{item.quantity}</TableCell>
                        <TableCell className="text-right dark:text-gray-100">${item.price.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
