// AUTO-GENERATED DRAFT SCREEN: CryptoReportBuilder
import React, { useState } from 'react';
import { trpc } from '@/utils/trpc';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2, AlertCircle, Download, FileText } from 'lucide-react';

// Types
interface ReportConfig {
  reportType: string;
  dateRange: string;
  assetId: string;
  format: string;
}

interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
}

export default function CryptoReportBuilder() {
  // State
  const [config, setConfig] = useState<ReportConfig>({
    reportType: 'portfolio_summary',
    dateRange: '30d',
    assetId: 'all',
    format: 'pdf',
  });

  // tRPC Hooks
  const { 
    data: assets, 
    isLoading: isLoadingAssets, 
    error: assetsError 
  } = trpc.crypto.getAssets.useQuery<CryptoAsset[]>();
  
  const generateReportMutation = trpc.reports.generateCryptoReport.useMutation();

  // Handlers
  const handleConfigChange = (key: keyof ReportConfig, value: string) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleGenerateReport = async () => {
    try {
      await generateReportMutation.mutateAsync(config);
    } catch (error) {
      console.error('Failed to generate report:', error);
    }
  };

  // Derived State
  const isGenerating = generateReportMutation.isPending;
  const generateError = generateReportMutation.error;
  const generateSuccess = generateReportMutation.isSuccess;

  // Render Loading State
  if (isLoadingAssets) {
    return (
      <div className="flex flex-col space-y-6 p-6 max-w-4xl mx-auto w-full dark:bg-slate-950">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Card className="dark:border-slate-800">
          <CardHeader>
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-72" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Render Error State
  if (assetsError) {
    return (
      <div className="p-6 max-w-4xl mx-auto w-full dark:bg-slate-950">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading Assets</AlertTitle>
          <AlertDescription>
            {assetsError.message || 'Failed to load crypto assets. Please try again later.'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto w-full dark:bg-slate-950 dark:text-slate-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <FileText className="h-8 w-8 text-blue-500" aria-hidden="true" />
          Crypto Report Builder
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Generate custom reports for your cryptocurrency portfolio, transactions, and tax liabilities.
        </p>
      </div>

      <Card className="dark:bg-slate-900 dark:border-slate-800 shadow-sm">
        <CardHeader>
          <CardTitle>Report Configuration</CardTitle>
          <CardDescription className="dark:text-slate-400">
            Select the parameters for your custom crypto report.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {generateError && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" aria-hidden="true" />
              <AlertTitle>Generation Failed</AlertTitle>
              <AlertDescription>{generateError.message}</AlertDescription>
            </Alert>
          )}

          {generateSuccess && (
            <Alert className="mb-6 bg-green-50 text-green-900 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900">
              <Download className="h-4 w-4" aria-hidden="true" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Your report has been generated and is ready for download.</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Report Type */}
            <div className="space-y-2">
              <Label htmlFor="report-type">Report Type</Label>
              <Select 
                value={config.reportType} 
                onValueChange={(val) => handleConfigChange('reportType', val)}
              >
                <SelectTrigger id="report-type" className="dark:bg-slate-950 dark:border-slate-800">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-900 dark:border-slate-800">
                  <SelectItem value="portfolio_summary">Portfolio Summary</SelectItem>
                  <SelectItem value="transaction_history">Transaction History</SelectItem>
                  <SelectItem value="tax_liability">Tax Liability (FIFO)</SelectItem>
                  <SelectItem value="staking_rewards">Staking Rewards</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <Label htmlFor="date-range">Date Range</Label>
              <Select 
                value={config.dateRange} 
                onValueChange={(val) => handleConfigChange('dateRange', val)}
              >
                <SelectTrigger id="date-range" className="dark:bg-slate-950 dark:border-slate-800">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-900 dark:border-slate-800">
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                  <SelectItem value="90d">Last 90 Days</SelectItem>
                  <SelectItem value="ytd">Year to Date</SelectItem>
                  <SelectItem value="1y">Last 1 Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Asset Selection */}
            <div className="space-y-2">
              <Label htmlFor="asset-id">Specific Asset</Label>
              <Select 
                value={config.assetId} 
                onValueChange={(val) => handleConfigChange('assetId', val)}
              >
                <SelectTrigger id="asset-id" className="dark:bg-slate-950 dark:border-slate-800">
                  <SelectValue placeholder="Select asset" />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-900 dark:border-slate-800">
                  <SelectItem value="all">All Assets</SelectItem>
                  {assets?.map((asset) => (
                    <SelectItem key={asset.id} value={asset.id}>
                      {asset.name} ({asset.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Export Format */}
            <div className="space-y-2">
              <Label htmlFor="format">Export Format</Label>
              <Select 
                value={config.format} 
                onValueChange={(val) => handleConfigChange('format', val)}
              >
                <SelectTrigger id="format" className="dark:bg-slate-950 dark:border-slate-800">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-900 dark:border-slate-800">
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="csv">CSV Spreadsheet</SelectItem>
                  <SelectItem value="json">JSON Data</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end border-t dark:border-slate-800 pt-6">
          <Button 
            onClick={handleGenerateReport} 
            disabled={isGenerating}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                Generating Report...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                Generate & Download
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}