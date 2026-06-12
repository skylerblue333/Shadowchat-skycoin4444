// AUTO-GENERATED DRAFT SCREEN: SessionDurationDashboard
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';

interface SessionDurationData {
  timestamp: string;
  duration: number;
}

const fetchSessionDuration = async (interval: string): Promise<SessionDurationData[]> => {
  // In a real application, this would be an API call to your backend
  // For now, we'll simulate data
  const now = new Date();
  const data: SessionDurationData[] = [];

  for (let i = 0; i < 10; i++) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    data.push({
      timestamp: date.toISOString().split('T')[0],
      duration: Math.floor(Math.random() * 300) + 60, // 1-6 minutes
    });
  }
  return data.reverse();
};

export function SessionDurationDashboard() {
  const [interval, setInterval] = useState('daily');

  const { data, isLoading, isError, error } = useQuery<SessionDurationData[], Error>(
    ['sessionDuration', interval],
    () => fetchSessionDuration(interval)
  );

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Loading session data...</div>;
  }

  if (isError) {
    return <div className="flex items-center justify-center h-full text-red-500">Error: {error?.message}</div>;
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg dark:bg-gray-800 dark:text-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-2xl font-bold">Session Duration</CardTitle>
        <Select value={interval} onValueChange={setInterval}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select interval" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-600" />
              <XAxis dataKey="timestamp" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} label={{ value: 'Duration (seconds)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#888888' } }} />
              <Tooltip
                contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '4px' }}
                labelStyle={{ color: '#333' }}
              />
              <Line type="monotone" dataKey="duration" stroke="#8b5cf6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-end mt-4">
          <Button variant="outline" className="dark:border-gray-600 dark:text-white">View Details</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Sessiondurationdashboard_556() { return null; }
