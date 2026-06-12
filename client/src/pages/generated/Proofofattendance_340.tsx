// AUTO-GENERATED DRAFT SCREEN: ProofOfAttendance
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc';
import { Loader2 } from 'lucide-react';

interface ProofOfAttendanceProps {
  eventId: string;
}

const ProofOfAttendance: React.FC<ProofOfAttendanceProps> = ({ eventId }) => {
  const { data, isLoading, isError, error } = trpc.poa.getAttendanceDetails.useQuery({
    eventId,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <Loader2 className="h-8 w-8 animate-spin" aria-label="Loading proof of attendance" />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-destructive">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Failed to load proof of attendance: {error.message}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-muted-foreground">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>No Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p>No attendance data found for this event.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 dark:bg-gray-900 dark:text-gray-100">
      <div className="container mx-auto py-12">
        <Card className="max-w-md mx-auto bg-card text-card-foreground shadow-lg rounded-lg">
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="text-3xl font-bold text-center">Proof of Attendance</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-lg font-medium">Event:</p>
              <p className="text-lg font-semibold text-primary">{data.eventName}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-lg font-medium">Attendee:</p>
              <p className="text-lg font-semibold">{data.attendeeName}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-lg font-medium">Date:</p>
              <p className="text-lg font-semibold">{new Date(data.attendanceDate).toLocaleDateString()}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-lg font-medium">Status:</p>
              <p className={`text-lg font-semibold ${data.isAttended ? 'text-green-500' : 'text-red-500'}`}>
                {data.isAttended ? 'Attended' : 'Not Attended'}
              </p>
            </div>
            {data.certificateUrl && (
              <div className="text-center pt-4">
                <a href={data.certificateUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full">View Certificate</Button>
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProofOfAttendance;
