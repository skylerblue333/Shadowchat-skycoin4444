// AUTO-GENERATED DRAFT SCREEN: CryptoInsuranceCoverage
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useQuery, useMutation } from '@tanstack/react-query'; // Placeholder for tRPC hooks
import { Loader2 } from 'lucide-react'; // For loading states
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

interface InsuranceCoverageData {
  id: string;
  policyName: string;
  coverageAmount: number;
  isActive: boolean;
  policyId: string;
  effectiveDate: string;
  nextPremiumDate: string;
  benefits: string[];
}

// Placeholder for tRPC client/hooks - replace with actual tRPC setup
const trpc = {
  insurance: {
    getCoverage: (id: string) => useQuery<InsuranceCoverageData>({ 
      queryKey: ['insuranceCoverage', id], 
      queryFn: async () => ({
        id: '1',
        policyName: 'Basic Crypto Policy',
        coverageAmount: 10000,
        isActive: true,
        policyId: 'CRYPTO-INS-2023-001',
        effectiveDate: '2023-01-01',
        nextPremiumDate: '2024-01-01',
        benefits: [
          'Theft Protection',
          'Smart Contract Vulnerability',
          'Exchange Insolvency',
        ],
      }),
    }),
    updateCoverage: () => useMutation<InsuranceCoverageData, Error, { id: string; isActive: boolean }>({ mutationFn: async (data) => data as InsuranceCoverageData }),
  },
};

const CryptoInsuranceCoverage: React.FC = () => {
  const { data, isLoading, isError, error } = trpc.insurance.getCoverage('1');
  const updateCoverageMutation = trpc.insurance.updateCoverage();

  const handleToggleCoverage = async (checked: boolean) => {
    if (data) {
      await updateCoverageMutation.mutateAsync({ id: data.id, isActive: checked });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="sr-only">Loading insurance data...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div role="alert" className="flex items-center justify-center min-h-screen dark:bg-gray-900 p-4">
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Error loading insurance data: {error?.message}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-gray-950 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <Card className="w-full max-w-md dark:bg-gray-900 dark:text-gray-50">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Crypto Insurance Coverage</CardTitle>
          <CardDescription>Manage your cryptocurrency insurance policy details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="policy-status" className="text-lg">Policy Status</Label>
              <Switch
                id="policy-status"
                checked={data?.isActive}
                onCheckedChange={handleToggleCoverage}
                aria-label="Toggle insurance policy status"
                disabled={updateCoverageMutation.isPending}
              />
            </div>
            <div className="text-lg space-y-2">
              <p className="font-medium">Policy Name: <span className="font-normal">{data?.policyName}</span></p>
              <p className="font-medium">Policy ID: <span className="font-normal">{data?.policyId}</span></p>
              <p className="font-medium">Coverage Amount: <span className="font-normal">${data?.coverageAmount?.toLocaleString()}</span></p>
              <p className="font-medium">Effective Date: <span className="font-normal">{data?.effectiveDate}</span></p>
              <p className="font-medium">Next Premium: <span className="font-normal">{data?.nextPremiumDate}</span></p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Policy Benefits</h3>
            <ul className="list-disc list-inside space-y-1">
              {data?.benefits.map((benefit, index) => (
                <li key={index} className="text-lg">{benefit}</li>
              ))}
            </ul>
          </div>

          {updateCoverageMutation.isPending && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Updating policy...</span>
            </div>
          )}
          {updateCoverageMutation.isError && (
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Update Error</AlertTitle>
              <AlertDescription>Error updating policy: {updateCoverageMutation.error?.message}</AlertDescription>
            </Alert>
          )}
          {updateCoverageMutation.isSuccess && (
            <Alert variant="default" className="bg-green-500 text-white">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Policy updated successfully!</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoInsuranceCoverage;
