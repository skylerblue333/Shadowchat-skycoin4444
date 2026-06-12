// AUTO-GENERATED DRAFT SCREEN: CryptoWebinarSchedule
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

// Placeholder for tRPC types and hooks
type Webinar = {
  id: string;
  title: string;
  date: Date;
  speaker: string;
  description: string;
  link: string;
};

type GetWebinarsResponse = { webinars: Webinar[] };

// Mock tRPC hook
const useGetWebinars = () => {
  const [data, setData] = useState<GetWebinarsResponse | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockWebinars: Webinar[] = [
          {
            id: '1',
            title: 'Introduction to Crypto Trading',
            date: new Date(2026, 6, 15, 10, 0),
            speaker: 'Alice Johnson',
            description: 'Learn the basics of cryptocurrency trading.',
            link: '#',
          },
          {
            id: '2',
            title: 'Advanced Blockchain Concepts',
            date: new Date(2026, 7, 1, 14, 0),
            speaker: 'Bob Williams',
            description: 'Dive deep into the technical aspects of blockchain.',
            link: '#',
          },
          {
            id: '3',
            title: 'DeFi and Yield Farming',
            date: new Date(2026, 7, 20, 11, 30),
            speaker: 'Charlie Brown',
            description: 'Explore decentralized finance opportunities.',
            link: '#',
          },
        ];
        setData({ webinars: mockWebinars });
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, isLoading, error };
};

const CryptoWebinarSchedule: React.FC = () => {
  const { data, isLoading, error } = useGetWebinars();
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading webinars...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error.message}</div>;
  }

  const filteredWebinars = selectedDate
    ? data?.webinars.filter(webinar =>
        webinar.date.toDateString() === selectedDate.toDateString()
      )
    : data?.webinars;

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Crypto Webinar Schedule</h1>
        <div className="flex items-center space-x-2">
          <Switch
            id="dark-mode-switch"
            checked={isDarkTheme}
            onCheckedChange={setIsDarkTheme}
            aria-label="Toggle dark mode"
          />
          <Label htmlFor="dark-mode-switch">Dark Mode</Label>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filter by Date</CardTitle>
        </CardHeader>
        <CardContent>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {selectedDate && (
            <Button variant="ghost" onClick={() => setSelectedDate(undefined)} className="ml-2">
              Clear Filter
            </Button>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredWebinars && filteredWebinars.length > 0 ? (
          filteredWebinars.map((webinar) => (
            <Card key={webinar.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{webinar.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground mb-2">
                  {format(webinar.date, 'PPP p')}
                </p>
                <p className="mb-4">Speaker: {webinar.speaker}</p>
                <p className="text-sm text-muted-foreground mb-4">{webinar.description}</p>
                <Button asChild className="mt-auto">
                  <a href={webinar.link} target="_blank" rel="noopener noreferrer">
                    Join Webinar
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground">No webinars found for the selected date.</p>
        )}
      </div>
    </div>
  );
};

export default CryptoWebinarSchedule;