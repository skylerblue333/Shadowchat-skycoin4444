// AUTO-GENERATED DRAFT SCREEN: MarketplaceBookingCalendar

import React, { useState, useEffect, Suspense } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery, useMutation } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc';
import { format, addDays, isSameDay, isBefore, startOfDay } from 'date-fns';
import { CalendarIcon, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookingSlot {
  id: string;
  date: Date;
  time: string;
  available: boolean;
}

interface Booking {
  id: string;
  slotId: string;
  userId: string;
}

const MarketplaceBookingCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // Simulate dark theme toggle based on system preference or user setting
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkTheme(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsDarkTheme(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const { data: availableSlots, isLoading: isLoadingSlots, error: slotsError } = trpc.booking.getAvailableSlots.useQuery(
    { date: selectedDate?.toISOString() },
    { enabled: !!selectedDate }
  );

  const bookSlotMutation = trpc.booking.bookSlot.useMutation();

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime(undefined);
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) return;
    const slotToBook = availableSlots?.find(
      (slot) => format(slot.date, 'HH:mm') === selectedTime && isSameDay(slot.date, selectedDate)
    );

    if (slotToBook) {
      try {
        await bookSlotMutation.mutateAsync({ slotId: slotToBook.id });
        alert('Booking successful!');
        // Invalidate queries to refetch available slots
        // queryClient.invalidateQueries(['booking.getAvailableSlots']);
      } catch (error) {
        alert('Booking failed: ' + (error as Error).message);
      }
    }
  };

  const today = startOfDay(new Date());

  if (slotsError) {
    return (
      <div role="alert" aria-live="assertive" className="p-4 bg-red-100 text-red-700 rounded-md flex items-center space-x-2">
        <AlertCircle className="h-5 w-5" />
        <span>Error loading slots: {slotsError.message}</span>
      </div>
    );
  }

  return (
    <div className={cn("p-6 max-w-md mx-auto rounded-lg shadow-lg", isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900')} role="region" aria-labelledby="booking-calendar-title">
      <h2 id="booking-calendar-title" className="text-2xl font-bold mb-4 text-center">Book Your Slot</h2>

      <div className="mb-4">
        <label htmlFor="date-picker" className="block text-sm font-medium mb-2">Select Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !selectedDate && "text-muted-foreground"
              )}
              id="date-picker"
              aria-label="Select a booking date"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              initialFocus
              disabled={(date) => isBefore(date, today)}
              aria-label="Calendar for booking dates"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="mb-6">
        <label htmlFor="time-slot-select" className="block text-sm font-medium mb-2">Select Time</label>
        <Select onValueChange={setSelectedTime} value={selectedTime} disabled={isLoadingSlots || !selectedDate}>
          <SelectTrigger className="w-full" id="time-slot-select" aria-label="Select a booking time slot">
            <Suspense fallback={<span className="flex items-center"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...</span>}>
              <SelectValue placeholder={isLoadingSlots ? "Loading slots..." : "Select a time"} />
            </Suspense>
          </SelectTrigger>
          <SelectContent>
            {isLoadingSlots ? (
              <SelectItem value="loading" disabled>
                <span className="flex items-center"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading slots...</span>
              </SelectItem>
            ) : availableSlots && availableSlots.length > 0 ? (
              availableSlots
                .filter(slot => isSameDay(slot.date, selectedDate || new Date()) && slot.available && !isBefore(slot.date, new Date()))
                .map((slot) => (
                  <SelectItem key={slot.id} value={format(slot.date, 'HH:mm')}>
                    {format(slot.date, 'HH:mm')}
                  </SelectItem>
                ))
            ) : (
              <SelectItem value="no-slots" disabled>No slots available</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={handleBooking}
        className="w-full"
        disabled={!selectedDate || !selectedTime || bookSlotMutation.isLoading}
        aria-live="polite"
      >
        {bookSlotMutation.isLoading ? (
          <span className="flex items-center"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Booking...</span>
        ) : (
          "Confirm Booking"
        )}
      </Button>

      {bookSlotMutation.isError && (
        <div role="alert" aria-live="assertive" className="mt-4 p-3 bg-red-100 text-red-700 rounded-md flex items-center space-x-2">
          <AlertCircle className="h-5 w-5" />
          <span>Booking failed: {bookSlotMutation.error?.message || 'Unknown error'}</span>
        </div>
      )}
      {bookSlotMutation.isSuccess && (
        <div role="status" aria-live="polite" className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
          <span>Booking successful!</span>
        </div>
      )}
    </div>
  );
};

export default MarketplaceBookingCalendar;
