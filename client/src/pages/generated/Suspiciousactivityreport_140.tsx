// AUTO-GENERATED DRAFT SCREEN: SuspiciousActivityReport
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { trpc } from '../trpc';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

const reportSchema = z.object({
  activityType: z.string().min(1, { message: 'Activity type is required.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  cryptoAddress: z.string().optional(),
  transactionId: z.string().optional(),
});

type ReportFormValues = z.infer<typeof reportSchema>;

const SuspiciousActivityReport: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      activityType: '',
      description: '',
      cryptoAddress: '',
      transactionId: '',
    },
  });

  const reportActivityMutation = trpc.reportActivity.useMutation();
  const { data: activities, isLoading: isLoadingActivities, error: activitiesError } = trpc.getActivities.useQuery();

  const onSubmit = async (data: ReportFormValues) => {
    try {
      await reportActivityMutation.mutateAsync(data);
      toast.success('Activity reported successfully!');
      reset();
    } catch (error) {
      toast.error('Failed to report activity.');
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-center">Crypto: Suspicious Activity Report</h1>

      <Card>
        <CardHeader>
          <CardTitle>Report New Suspicious Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="activityType">Activity Type</Label>
              <Input id="activityType" {...register("activityType")} />
              {errors.activityType && <p className="text-red-500 text-sm mt-1">{errors.activityType.message}</p>}
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register("description")} rows={4} />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>
            <div>
              <Label htmlFor="cryptoAddress">Crypto Address (Optional)</Label>
              <Input id="cryptoAddress" {...register("cryptoAddress")} />
            </div>
            <div>
              <Label htmlFor="transactionId">Transaction ID (Optional)</Label>
              <Input id="transactionId" {...register("transactionId")} />
            </div>
            <Button type="submit" disabled={reportActivityMutation.isLoading}>
              {reportActivityMutation.isLoading ? 'Submitting...' : 'Submit Report'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Suspicious Activities</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingActivities && <p>Loading activities...</p>}
          {activitiesError && <p className="text-red-500">Error loading activities: {activitiesError.message}</p>}
          {!isLoadingActivities && !activitiesError && activities && activities.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Activity Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>{activity.id}</TableCell>
                    <TableCell>{activity.activityType}</TableCell>
                    <TableCell>{activity.description}</TableCell>
                    <TableCell>{activity.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            !isLoadingActivities && !activitiesError && <p>No suspicious activities reported yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SuspiciousActivityReport;