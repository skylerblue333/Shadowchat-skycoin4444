// AUTO-GENERATED DRAFT SCREEN: PortfolioSimulator
import React, { useState } from 'react';
import { trpc } from '../utils/trpc';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface SimulationResult {
  labels: string[];
  datasets: { label: string; data: number[]; borderColor: string; tension: number }[];
}

const PortfolioSimulator: React.FC = () => {
  const [assets, setAssets] = useState<string>("BTC,ETH");
  const [duration, setDuration] = useState<number>(12);
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);

  const { data, isLoading, isError, error, refetch } = trpc.portfolio.getSimulationData.useQuery(
    { assets: selectedAssets, duration },
    { enabled: false } // Disable automatic fetching
  );

  const handleSimulate = () => {
    setSelectedAssets(assets.split(',').map(asset => asset.trim()));
    refetch();
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Portfolio Simulator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="assets">Assets (comma-separated)</Label>
            <Input
              id="assets"
              value={assets}
              onChange={(e) => setAssets(e.target.value)}
              placeholder="e.g., BTC, ETH, ADA"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (months)</Label>
            <Input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min={1}
              max={60}
            />
          </div>
          <div className="flex items-end">
            <Button onClick={handleSimulate} disabled={isLoading} className="w-full">
              {isLoading ? "Simulating..." : "Simulate Portfolio"}
            </Button>
          </div>
        </div>

        {isError && (
          <div className="mt-4 text-red-500">
            Error: {error?.message || "Failed to fetch simulation data."}
          </div>
        )}

        {data && !isLoading && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Simulation Results</h3>
            {/* This is where a chart would typically go. For now, we'll just display the data. */}
            <div className="bg-muted p-4 rounded-md">
              <pre className="whitespace-pre-wrap text-sm">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PortfolioSimulator;