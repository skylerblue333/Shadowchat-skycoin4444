// AUTO-GENERATED DRAFT SCREEN: DeliveryStatusScreen
import React from 'react';
import { useQuery } from '@tanstack/react-query'; // Placeholder for tRPC hook
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // shadcn/ui Card
import { Skeleton } from '@/components/ui/skeleton'; // shadcn/ui Skeleton for loading states
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'; // shadcn/ui Alert for error handling
import { TruckIcon, PackageIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react'; // Icons

interface DeliveryStatus {
  orderId: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  estimatedDelivery: string;
  currentLocation: string;
  trackingNumber: string;
}

// Placeholder for tRPC client setup
// const trpc = createTRPCReact<AppRouter>();

const fetchDeliveryStatus = async (orderId: string): Promise<DeliveryStatus> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      if (orderId === 'ORDER-ERROR') {
        throw new Error('Failed to fetch delivery status');
      }
      resolve({
        orderId,
        status: 'shipped',
        estimatedDelivery: 'June 20, 2026',
        currentLocation: 'Warehouse B, New York',
        trackingNumber: 'TRK123456789',
      });
    }, 1500);
  });
};

interface DeliveryStatusScreenProps {
  orderId: string;
}

const DeliveryStatusScreen: React.FC<DeliveryStatusScreenProps> = ({ orderId }) => {
  // In a real application, this would be a tRPC hook like trpc.delivery.getStatus.useQuery
  const { data, isLoading, isError, error } = useQuery<DeliveryStatus, Error>(
    ['deliveryStatus', orderId],
    () => fetchDeliveryStatus(orderId)
  );

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="m-4">
        <XCircleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Error fetching delivery status: {error?.message}</AlertDescription>
      </Alert>
    );
  }

  if (!data) {
    return (
      <Alert className="m-4">
        <AlertTitle>No Data</AlertTitle>
        <AlertDescription>No delivery status found for order ID: {orderId}</AlertDescription>
      </Alert>
    );
  }

  const getStatusIcon = (status: DeliveryStatus['status']) => {
    switch (status) {
      case 'pending':
      case 'processing':
        return <PackageIcon className="h-5 w-5 text-blue-500" />;
      case 'shipped':
        return <TruckIcon className="h-5 w-5 text-yellow-500" />;
      case 'delivered':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: DeliveryStatus['status']) => {
    switch (status) {
      case 'pending':
      case 'processing':
        return 'text-blue-600 dark:text-blue-400';
      case 'shipped':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'delivered':
        return 'text-green-600 dark:text-green-400';
      case 'cancelled':
        return 'text-red-600 dark:text-red-400';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-lg rounded-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Delivery Status</CardTitle>
          {getStatusIcon(data.status)}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">Order ID:</p>
            <p className="text-base font-semibold">{data.orderId}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">Status:</p>
            <p className={`text-base font-semibold ${getStatusColor(data.status)}`}>
              {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">Estimated Delivery:</p>
            <p className="text-base font-semibold">{data.estimatedDelivery}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">Current Location:</p>
            <p className="text-base font-semibold">{data.currentLocation}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">Tracking Number:</p>
            <p className="text-base font-semibold">{data.trackingNumber}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliveryStatusScreen;
