// AUTO-GENERATED DRAFT SCREEN: CryptoInterestRateModel
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { useQuery, useMutation } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc';
import { useState } from 'react';

type InterestRateModelProps = {
  // Add any props if needed
};

const CryptoInterestRateModel: React.FC<InterestRateModelProps> = () => {
  const [asset, setAsset] = useState<string>('ETH');
  const [collateral, setCollateral] = useState<string>('USDC');
  const [amount, setAmount] = useState<number>(1000);

  // Example tRPC query
  const { data: interestRateData, isLoading, isError } = trpc.crypto.getInterestRate.useQuery({
    asset, collateral, amount
  });

  // Example tRPC mutation
  const { mutate: updateModel, isLoading: isUpdating } = trpc.crypto.updateInterestRateModel.useMutation();

  const handleUpdate = () => {
    updateModel({ asset, collateral, amount });
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading interest rate data...</div>;
  }

  if (isError) {
    return <div className="flex items-center justify-center h-screen text-red-500">Error loading interest rate data.</div>;
  }

  return (
    <div className="min-h-screen bg-background p-4 dark:bg-gray-900">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Crypto: Interest Rate Model</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="asset">Asset</Label>
            <Input id="asset" value={asset} onChange={(e) => setAsset(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="collateral">Collateral</Label>
            <Input id="collateral" value={collateral} onChange={(e) => setCollateral(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="amount">Amount ({amount})</Label>
            <Slider
              id="amount"
              min={100}
              max={10000}
              step={100}
              value={[amount]}
              onValueChange={(val) => setAmount(val[0])}
              className="mt-1"
            />
          </div>
          <Button onClick={handleUpdate} disabled={isUpdating} className="w-full">
            {isUpdating ? 'Updating...' : 'Update Model'}
          </Button>
          {interestRateData && (
            <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
              <h3 className="font-semibold">Current Interest Rate:</h3>
              <p className="text-lg">{interestRateData.rate}%</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoInterestRateModel;
