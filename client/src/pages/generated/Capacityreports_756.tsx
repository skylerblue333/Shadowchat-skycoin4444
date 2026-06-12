// AUTO-GENERATED DRAFT SCREEN: CapacityReports
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { trpc } from '@/utils/trpc';

interface CapacityReportsProps {
  // Define props here if needed
}

const CapacityReports: React.FC<CapacityReportsProps> = () => {
  const { data: capacityData, isLoading: isLoadingCapacity, error: errorCapacity } = trpc.reports.getCapacityData.useQuery();
  const { data: recentActivity, isLoading: isLoadingActivity, error: errorActivity } = trpc.reports.getRecentActivity.useQuery();
  const { data: capacityOverview, isLoading: isLoadingOverview, error: errorOverview } = trpc.reports.getCapacityOverview.useQuery();

  if (isLoadingCapacity || isLoadingActivity || isLoadingOverview) {
    return <div className="p-6 text-center">Loading reports...</div>;
  }

  if (errorCapacity || errorActivity || errorOverview) {
    return <div className="p-6 text-center text-red-500">Error loading reports. Please try again later.</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">SKYCOIN4444 Capacity Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Overall Usage</CardTitle>
            <CardDescription>Monthly usage vs. capacity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%" aria-label="Monthly usage versus capacity report line chart">
                <LineChart data={capacityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="usage" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="capacity" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Last 7 days activity</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivity?.map((activity, index) => (
                  <TableRow key={index}>
                    <TableCell>{activity.date}</TableCell>
                    <TableCell>{activity.usage}</TableCell>
                    <TableCell>{activity.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Capacity Overview</CardTitle>
            <CardDescription>Key capacity metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>Total Capacity:</span>
              <span className="font-semibold">{capacityOverview?.totalCapacity}</span>
            </div>
            <div className="flex justify-between">
              <span>Current Usage:</span>
              <span className="font-semibold">{capacityOverview?.currentUsage}</span>
            </div>
            <div className="flex justify-between">
              <span>Remaining Capacity:</span>
              <span className="font-semibold">{capacityOverview?.remainingCapacity}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CapacityReports;
