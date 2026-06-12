// AUTO-GENERATED DRAFT SCREEN: CryptoDataExportWizard
import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface ExportOptions {
  format: 'csv' | 'json';
  includeHistoricalData: boolean;
  startDate?: string;
  endDate?: string;
}

const CryptoDataExportWizard: React.FC = () => {
  const [options, setOptions] = useState<ExportOptions>({
    format: 'csv',
    includeHistoricalData: false,
  });

  const exportDataMutation = trpc.crypto.exportData.useMutation({
    onSuccess: (data) => {
      toast.success('Data export initiated successfully!');
      // In a real app, 'data' would likely contain a download URL or job ID
      console.log('Export data:', data);
    },
    onError: (error) => {
      toast.error(`Export failed: ${error.message}`);
    },
  });

  const handleExport = () => {
    exportDataMutation.mutate(options);
  };

  const isLoading = exportDataMutation.isLoading;

  return (
    <div className="min-h-screen bg-background text-foreground p-4 dark">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Crypto Data Export Wizard</CardTitle>
          <CardDescription>Export your SKYCOIN4444 crypto data.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="format">Export Format</Label>
            <div className="flex items-center space-x-2">
              <Button
                variant={options.format === 'csv' ? 'default' : 'outline'}
                onClick={() => setOptions({ ...options, format: 'csv' })}
                disabled={isLoading}
              >
                CSV
              </Button>
              <Button
                variant={options.format === 'json' ? 'default' : 'outline'}
                onClick={() => setOptions({ ...options, format: 'json' })}
                disabled={isLoading}
              >
                JSON
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="historical-data">Include Historical Data</Label>
            <Switch
              id="historical-data"
              checked={options.includeHistoricalData}
              onCheckedChange={(checked) => setOptions({ ...options, includeHistoricalData: checked })}
              disabled={isLoading}
            />
          </div>
          {options.includeHistoricalData && (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={options.startDate || ''}
                  onChange={(e) => setOptions({ ...options, startDate: e.target.value })}
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={options.endDate || ''}
                  onChange={(e) => setOptions({ ...options, endDate: e.target.value })}
                  disabled={isLoading}
                />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleExport}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Exporting...' : 'Export Data'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CryptoDataExportWizard;
