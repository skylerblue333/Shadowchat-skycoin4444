// AUTO-GENERATED DRAFT SCREEN: CryptoInvoiceDownloadScreen
import React, { useState, useEffect } from 'react';
import { useQuery } from '@trpc/react-query'; // Assuming tRPC integration
import { Button } from '@/components/ui/button'; // shadcn/ui button
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // shadcn/ui card
import { Skeleton } from '@/components/ui/skeleton'; // shadcn/ui skeleton for loading
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'; // shadcn/ui alert for errors
import { DownloadIcon } from '@radix-ui/react-icons'; // Example icon

interface Invoice {
  id: string;
  amount: number;
  currency: string;
  date: string;
  status: string;
  downloadUrl: string;
}

interface CryptoInvoiceDownloadScreenProps {
  invoiceId: string;
}

const CryptoInvoiceDownloadScreen: React.FC<CryptoInvoiceDownloadScreenProps> = ({ invoiceId }) => {
  const { data: invoice, isLoading, isError, error } = useQuery(['invoice', invoiceId], async () => {
    // Simulate tRPC call to fetch invoice details
    // In a real app, this would be `trpc.invoice.get.useQuery({ id: invoiceId })`
    return new Promise<Invoice>((resolve, reject) => {
      setTimeout(() => {
        if (invoiceId === 'valid-invoice-123') {
          resolve({
            id: invoiceId,
            amount: 123.45,
            currency: 'SKY',
            date: '2026-06-11',
            status: 'Paid',
            downloadUrl: `/api/invoices/${invoiceId}/download`,
          });
        } else {
          reject(new Error('Invoice not found or invalid.'));
        }
      }, 1000);
    });
  });

  const handleDownload = () => {
    if (invoice?.downloadUrl) {
      window.open(invoice.downloadUrl, '_blank');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background text-foreground p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Loading Invoice...</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background text-foreground p-4">
        <Alert variant="destructive" role="alert" aria-live="assertive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load invoice: {error?.message || 'An unknown error occurred.'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background text-foreground p-4">
        <Alert role="alert" aria-live="polite">
          <AlertTitle>No Invoice</AlertTitle>
          <AlertDescription>
            No invoice data available for ID: {invoiceId}.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-background text-foreground p-4 dark">
      <Card className="w-full max-w-md" aria-labelledby="invoice-title">
        <CardHeader>
          <CardTitle id="invoice-title" className="text-2xl font-bold">Invoice Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg">
            <span className="font-semibold">Invoice ID:</span> {invoice.id}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Amount:</span> {invoice.amount} {invoice.currency}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Date:</span> {invoice.date}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Status:</span> {invoice.status}
          </p>
          <Button
            onClick={handleDownload}
            className="w-full flex items-center gap-2"
            disabled={!invoice.downloadUrl}
            aria-label="Download Invoice"
          >
            <DownloadIcon className="h-5 w-5" />
            Download Invoice
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoInvoiceDownloadScreen;
