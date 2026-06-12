// AUTO-GENERATED DRAFT SCREEN: CohortAnalysisScreen
import React, { useState } from 'react';
import { trpc } from '../utils/trpc';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { format } from 'date-fns';
import { CalendarIcon } from '@radix-ui/react-icons';
import { cn } from '../lib/utils';

interface CohortData {
  cohortName: string;
  startDate: string;
  metrics: { [key: string]: number };
}

const CohortAnalysisScreen: React.FC = () => {
  const [cohortName, setCohortName] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [cohorts, setCohorts] = useState<CohortData[]>([]);

  // Mock tRPC query for fetching cohort data
  const { data, isLoading, error } = trpc.hello.useQuery({ text: 'cohort data' });

  const handleAddCohort = () => {
    if (cohortName && startDate) {
      setCohorts([
        ...cohorts,
        {
          cohortName,
          startDate: format(startDate, 'yyyy-MM-dd'),
          metrics: { 'Day 0': 100, 'Day 7': 80, 'Day 14': 60 }, // Mock metrics
        },
      ]);
      setCohortName('');
      setStartDate(undefined);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-3xl font-bold">Cohort Analysis</h1>

      <Card>
        <CardHeader>
          <CardTitle>Define New Cohort</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="cohortName">Cohort Name</Label>
            <Input
              id="cohortName"
              placeholder="e.g., Jan 2023 Signups"
              value={cohortName}
              onChange={(e) => setCohortName(e.target.value)}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="startDate">Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button onClick={handleAddCohort}>Add Cohort</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cohort Data</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && <p>Loading cohort data...</p>}
          {error && <p className="text-red-500">Error: {error.message}</p>}
          {data && <p>tRPC says: {data.greeting}</p>}

          {cohorts.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cohort Name</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Day 0</TableHead>
                  <TableHead>Day 7</TableHead>
                  <TableHead>Day 14</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cohorts.map((cohort, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{cohort.cohortName}</TableCell>
                    <TableCell>{cohort.startDate}</TableCell>
                    <TableCell>{cohort.metrics["Day 0"]}%</TableCell>
                    <TableCell>{cohort.metrics["Day 7"]}%</TableCell>
                    <TableCell>{cohort.metrics["Day 14"]}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No cohorts defined yet. Add a new cohort above.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CohortAnalysisScreen;
