// AUTO-GENERATED DRAFT SCREEN: PointsHistory
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';
import { Button } from './components/ui/button';
import { trpc } from './trpc';

interface PointEntry {
  id: string;
  date: string;
  activity: string;
  points: number;
}

const PointsHistory: React.FC = () => {
  const { data, isLoading, isError, error } = trpc.pointsHistory.getPointsHistory.useQuery({ limit: 5 });

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Points History</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Loading points history...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Points History</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-500">Error: {error.message}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const pointsHistory: PointEntry[] = data || [];

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Points History</CardTitle>
        </CardHeader>
        <CardContent>
          {pointsHistory.length === 0 ? (
            <p>No points history available.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead className="text-right">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pointsHistory.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.date}</TableCell>
                    <TableCell>{entry.activity}</TableCell>
                    <TableCell className="text-right">{entry.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <div className="flex justify-center mt-4">
            <Button>Load More</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};


export default PointsHistory;
