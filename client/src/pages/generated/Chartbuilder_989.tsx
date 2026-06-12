// AUTO-GENERATED DRAFT SCREEN: ChartBuilder
import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Loader2 } from 'lucide-react';

// Mock tRPC hook for data fetching
const useChartData = (params: { type: string; range: number }) => {
  return useQuery({
    queryKey: ['chartData', params.type, params.range],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (Math.random() < 0.1) {
        throw new Error('Failed to fetch chart data.');
      }
      const data = Array.from({ length: params.range }, (_, i) => ({
        name: `Point ${i + 1}`,
        value: Math.floor(Math.random() * 5000) + 1000,
      }));
      return data;
    },
  });
};

interface ChartBuilderProps {
  initialChartType?: string;
  initialDataRange?: number;
  initialDarkMode?: boolean;
}

const ChartBuilder: React.FC<ChartBuilderProps> = ({
  initialChartType = 'line',
  initialDataRange = 20,
  initialDarkMode = false,
}) => {
  const [chartType, setChartType] = useState(initialChartType);
  const [dataRange, setDataRange] = useState(initialDataRange);
  const [darkMode, setDarkMode] = useState(initialDarkMode);

  const { data, isLoading, isError, error, refetch } = useChartData({
    type: chartType,
    range: dataRange,
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <div className={`min-h-screen p-8 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Card className={`w-full max-w-4xl mx-auto ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
        <CardHeader>
          <CardTitle className={darkMode ? 'text-white' : ''}>Chart Builder</CardTitle>
          <CardDescription className={darkMode ? 'text-gray-400' : ''}>
            Customize and visualize your data with interactive charts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <Label htmlFor="chart-type" className={darkMode ? 'text-gray-300' : ''}>Chart Type</Label>
              <Select value={chartType} onValueChange={setChartType}>
                <SelectTrigger id="chart-type" className={darkMode ? 'bg-gray-700 text-white border-gray-600' : ''}>
                  <SelectValue placeholder="Select a chart type" />
                </SelectTrigger>
                <SelectContent className={darkMode ? 'bg-gray-700 text-white border-gray-600' : ''}>
                  <SelectItem value="line">Line Chart</SelectItem>
                  <SelectItem value="bar">Bar Chart</SelectItem>
                  <SelectItem value="area">Area Chart</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="data-range" className={darkMode ? 'text-gray-300' : ''}>Data Range ({dataRange} points)</Label>
              <Slider
                id="data-range"
                min={5}
                max={50}
                step={1}
                value={[dataRange]}
                onValueChange={(val) => setDataRange(val[0])}
                className="w-full"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
                className={darkMode ? 'data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-600' : ''}
              />
              <Label htmlFor="dark-mode" className={darkMode ? 'text-gray-300' : ''}>Dark Mode</Label>
            </div>
            <div>
              <Button onClick={handleRefresh} disabled={isLoading} className={darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Refresh Data
              </Button>
            </div>
          </div>

          {isError && (
            <Alert variant="destructive" className="mb-4">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error?.message || 'An unknown error occurred.'}</AlertDescription>
            </Alert>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <span className="ml-2 text-lg">Loading Chart Data...</span>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={data}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#4B5563' : '#E5E7EB'} />
                <XAxis dataKey="name" stroke={darkMode ? '#9CA3AF' : '#6B7280'} />
                <YAxis stroke={darkMode ? '#9CA3AF' : '#6B7280'} />
                <Tooltip
                  contentStyle={{ backgroundColor: darkMode ? '#374151' : '#FFFFFF', borderColor: darkMode ? '#4B5563' : '#E5E7EB', color: darkMode ? '#FFFFFF' : '#000000' }}
                  itemStyle={{ color: darkMode ? '#FFFFFF' : '#000000' }}
                />
                <Legend />
                <Line type="monotone" dataKey="value" stroke={darkMode ? '#60A5FA' : '#8884d8'} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartBuilder;
