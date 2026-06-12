// AUTO-GENERATED DRAFT SCREEN: PerformanceReports
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface PerformanceData {
  metric: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}

interface PerformanceReportsProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const PerformanceReports: React.FC<PerformanceReportsProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);

  // Placeholder for tRPC hook or data fetching logic
  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        const data: PerformanceData[] = [
          { metric: 'Transaction Volume', value: 12345, unit: 'USD', trend: 'up' },
          { metric: 'Average Transaction Value', value: 500, unit: 'USD', trend: 'stable' },
          { metric: 'Successful Transactions', value: 98.5, unit: '%', trend: 'up' },
          { metric: 'Failed Transactions', value: 1.5, unit: '%', trend: 'down' },
        ];
        setPerformanceData(data);
      } catch (err) {
        setError('Failed to fetch performance data.');
      } finally {
        setLoading(false);
      }
    };
    fetchPerformance();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Progress value={50} className="w-[60%]" />
        <p className="ml-2">Loading performance data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-8 ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Performance Reports</h1>
        <div className="flex items-center space-x-2">
          <Switch
            id="dark-mode"
            checked={isDarkMode}
            onCheckedChange={toggleDarkMode}
            aria-label="Toggle dark mode"
          />
          <Label htmlFor="dark-mode">Dark Mode</Label>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {performanceData.map((item, index) => (
          <Card key={index} className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.metric}
              </CardTitle>
              {item.trend === 'up' && <span className="text-green-500">▲</span>}
              {item.trend === 'down' && <span className="text-red-500">▼</span>}
              {item.trend === 'stable' && <span className="text-blue-500">—</span>}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value} {item.unit}</div>
              <p className="text-xs text-gray-500">Last 30 days</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Button onClick={() => alert('Generating detailed report...')}>Generate Detailed Report</Button>
      </div>
    </div>
  );
};

export default PerformanceReports;
