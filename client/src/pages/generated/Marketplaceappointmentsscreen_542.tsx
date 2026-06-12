// AUTO-GENERATED DRAFT SCREEN: MarketplaceAppointmentsScreen
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from './utils/trpc'; // Assuming tRPC setup
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Calendar } from './components/ui/calendar';
import { Label } from './components/ui/label';
import { Switch } from './components/ui/switch';
import { cn } from './lib/utils'; // Utility for conditional classnames

interface Appointment {
  id: string;
  date: Date;
  time: string;
  service: string;
}

const MarketplaceAppointmentsScreen: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const { data: appointments, isLoading, isError, error } = trpc.appointments.getAppointments.useQuery(
    { date: selectedDate?.toISOString() },
    { enabled: !!selectedDate }
  );

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen dark:bg-gray-900">Loading appointments...</div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center h-screen dark:bg-gray-900 text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className={cn("min-h-screen p-8", isDarkTheme ? "dark bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900")}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Marketplace Appointments</h1>
          <div className="flex items-center space-x-2">
            <Switch
              id="dark-mode"
              checked={isDarkTheme}
              onCheckedChange={setIsDarkTheme}
              aria-label="Toggle dark mode"
            />
            <Label htmlFor="dark-mode">Dark Mode</Label>
          </div>
        </div>

        <Card className="mb-6 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border shadow dark:border-gray-700"
            />
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle>Available Appointments for {selectedDate?.toDateString()}</CardTitle>
          </CardHeader>
          <CardContent>
            {appointments && appointments.length > 0 ? (
              <ul className="space-y-4">
                {appointments.map((appointment) => (
                  <li key={appointment.id} className="flex justify-between items-center p-4 border rounded-md dark:border-gray-700 dark:bg-gray-700">
                    <div>
                      <p className="font-semibold">{appointment.service}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{appointment.time}</p>
                    </div>
                    <Button variant="outline" className="dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">Book Now</Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-300">No appointments available for this date.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketplaceAppointmentsScreen;
