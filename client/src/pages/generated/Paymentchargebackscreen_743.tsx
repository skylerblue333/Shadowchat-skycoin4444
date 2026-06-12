// AUTO-GENERATED DRAFT SCREEN: PaymentChargebackScreen
import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { trpc } from '../utils/trpc'; // Assuming tRPC client setup
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

interface ChargebackDetails {
  id: string;
  transactionId: string;
  reason: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

const PaymentChargebackScreen: React.FC = () => {
  const [chargebackId, setChargebackId] = useState('');

  const { data, isLoading, isError, error, refetch } = trpc.chargeback.getChargebackDetails.useQuery(
    { id: chargebackId },
    { enabled: !!chargebackId }
  );

  const approveChargebackMutation = trpc.chargeback.approveChargeback.useMutation({
    onSuccess: () => {
      toast({
        title: 'Chargeback Approved',
        description: `Chargeback ${chargebackId} has been approved.`, 
      });
      refetch();
    },
    onError: (err) => {
      toast({
        title: 'Error',
        description: `Failed to approve chargeback: ${err.message}`, 
        variant: 'destructive',
      });
    },
  });

  const rejectChargebackMutation = trpc.chargeback.rejectChargeback.useMutation({
    onSuccess: () => {
      toast({
        title: 'Chargeback Rejected',
        description: `Chargeback ${chargebackId} has been rejected.`, 
      });
      refetch();
    },
    onError: (err) => {
      toast({
        title: 'Error',
        description: `Failed to reject chargeback: ${err.message}`, 
        variant: 'destructive',
      });
    },
  });

  const handleApprove = () => {
    if (chargebackId) {
      approveChargebackMutation.mutate({ id: chargebackId });
    }
  };

  const handleReject = () => {
    if (chargebackId) {
      rejectChargebackMutation.mutate({ id: chargebackId });
    }
  };

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Payment Chargeback Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="chargebackId">Chargeback ID</Label>
              <Input
                id="chargebackId"
                placeholder="Enter Chargeback ID"
                value={chargebackId}
                onChange={(e) => setChargebackId(e.target.value)}
                className="dark:bg-gray-800 dark:text-gray-50 dark:border-gray-700"
              />
            </div>
            <Button
              onClick={() => refetch()}
              disabled={!chargebackId || isLoading}
              className="w-full dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
            >
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Fetch Chargeback Details
            </Button>
          </div>

          {isError && (
            <p className="text-red-500 mt-4">Error: {error?.message || 'Failed to fetch chargeback details.'}</p>
          )}

          {data && (
            <div className="mt-6 space-y-4">
              <h3 className="text-xl font-semibold">Chargeback Details</h3>
              <p><strong>Transaction ID:</strong> {data.transactionId}</p>
              <p><strong>Reason:</strong> {data.reason}</p>
              <p><strong>Amount:</strong> ${data.amount.toFixed(2)}</p>
              <p><strong>Status:</strong> {data.status}</p>
              <p><strong>Created At:</strong> {new Date(data.createdAt).toLocaleString()}</p>

              <div className="flex gap-4 mt-4">
                <Button
                  onClick={handleApprove}
                  disabled={approveChargebackMutation.isLoading || data.status !== 'pending'}
                  className="dark:bg-green-600 dark:hover:bg-green-700 dark:text-white"
                >
                  {approveChargebackMutation.isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Approve
                </Button>
                <Button
                  onClick={handleReject}
                  disabled={rejectChargebackMutation.isLoading || data.status !== 'pending'}
                  variant="destructive"
                  className="dark:bg-red-600 dark:hover:bg-red-700 dark:text-white"
                >
                  {rejectChargebackMutation.isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Reject
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentChargebackScreen;
