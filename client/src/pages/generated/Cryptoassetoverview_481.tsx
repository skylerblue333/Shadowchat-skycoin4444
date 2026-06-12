// AUTO-GENERATED DRAFT SCREEN: CryptoAssetOverview
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useCryptoAsset } from '@/hooks/useCryptoAsset';
import { ArrowUpRight, ArrowDownRight, DollarSign, Percent, BarChart2 } from 'lucide-react';

interface CryptoAssetOverviewProps {
  assetId: string;
}

const CryptoAssetOverview: React.FC<CryptoAssetOverviewProps> = ({ assetId }) => {
  const { data: assetData, isLoading, isError, error, refetch } = useCryptoAsset(assetId);

  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto dark:bg-gray-800 dark:text-white" aria-live="polite" aria-atomic="true">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Loading Asset...</CardTitle>
          <CardDescription>Fetching the latest cryptocurrency data.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-8 w-1/3" />
        </CardFooter>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-full max-w-md mx-auto border-red-500 dark:bg-gray-800 dark:text-white" role="alert">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-red-500">Error</CardTitle>
          <CardDescription>Could not load asset data.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-red-500 text-sm">{error}</p>
          <Button onClick={refetch} className="mt-4 w-full">Retry Data Fetch</Button>
        </CardContent>
      </Card>
    );
  }

  if (!assetData) {
    return (
      <Card className="w-full max-w-md mx-auto dark:bg-gray-800 dark:text-white" aria-live="polite" aria-atomic="true">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">No Data</CardTitle>
          <CardDescription>No asset data available for {assetId}.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 dark:text-gray-400">Please ensure the asset ID is correct and try again.</p>
          <Button onClick={refetch} className="mt-4 w-full">Reload Data</Button>
        </CardContent>
      </Card>
    );
  }

  const isPositiveChange = assetData.priceChange24h >= 0;
  const ChangeIcon = isPositiveChange ? ArrowUpRight : ArrowDownRight;

  return (
    <Card className="w-full max-w-md mx-auto dark:bg-gray-800 dark:text-white shadow-lg rounded-lg overflow-hidden" aria-labelledby="asset-overview-title">
      <CardHeader className="bg-gray-50 dark:bg-gray-700 p-6 border-b border-gray-200 dark:border-gray-600">
        <CardTitle id="asset-overview-title" className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
          <BarChart2 className="h-7 w-7 text-blue-500" />
          {assetData.assetName} Overview
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-300 mt-1">Real-time data and key metrics for {assetData.assetName}.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-700">
          <span className="text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-500" /> Current Price:
          </span>
          <span className="text-3xl font-bold text-gray-900 dark:text-white" aria-label={`Current price: ${assetData.currentPrice.toFixed(4)} US dollars`}>
            ${assetData.currentPrice.toFixed(4)}
          </span>
        </div>
        <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-700">
          <span className="text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
            <Percent className="h-5 w-5 text-purple-500" /> 24h Change:
          </span>
          <span className={`text-2xl font-bold flex items-center gap-1 ${isPositiveChange ? 'text-green-500' : 'text-red-500'}`} aria-label={`24 hour change: ${isPositiveChange ? 'up' : 'down'} ${Math.abs(assetData.priceChange24h).toFixed(2)} percent`}>
            <ChangeIcon className="h-5 w-5" />
            {isPositiveChange ? '+' : ''}{assetData.priceChange24h.toFixed(2)}%
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-orange-500" /> Market Cap:
          </span>
          <span className="text-2xl font-bold text-gray-900 dark:text-white" aria-label={`Market capitalization: ${assetData.marketCap.toLocaleString()} US dollars`}>
            ${assetData.marketCap.toLocaleString()}
          </span>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 dark:bg-gray-700 p-6 border-t border-gray-200 dark:border-gray-600 flex justify-end">
        <Button className="w-full sm:w-auto px-6 py-3 text-lg" aria-label="View detailed information about this asset">
          View Full Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CryptoAssetOverview;
