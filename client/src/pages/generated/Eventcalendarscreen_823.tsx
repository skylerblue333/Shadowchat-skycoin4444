// AUTO-GENERATED DRAFT SCREEN: EventCalendarScreen
import React, { useState, useEffect, createContext, useContext } from 'react';
import { Calendar } from '@/components/ui/calendar'; // Assuming shadcn/ui calendar component
import { Button } from '@/components/ui/button'; // Assuming shadcn/ui button component
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Assuming shadcn/ui card components
import { Input } from '@/components/ui/input'; // Assuming shadcn/ui input component
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'; // Assuming shadcn/ui popover components
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, PlusCircle, Sun, Moon } from 'lucide-react'; // Icons

// Mock tRPC hooks for demonstration
const trpc = {
  event: {
    getEvents: {
      useQuery: (date: Date) => {
        const [data, setData] = useState<Event[] | null>(null);
        const [isLoading, setIsLoading] = useState(true);
        const [isError, setIsError] = useState(false);

        useEffect(() => {
          setIsLoading(true);
          setIsError(false);
          // Simulate API call
          setTimeout(() => {
            if (Math.random() > 0.1) { // Simulate occasional error
              const mockEvents: Event[] = [
                { id: '1', title: 'Team Meeting', date: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 10, 0), description: 'Discuss Q3 strategy' },
                { id: '2', title: 'Project Deadline', date: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 14, 0), description: 'Submit final report' },
              ];
              setData(mockEvents);
            } else {
              setIsError(true);
            }
            setIsLoading(false);
          }, 1000);
        }, [date]);

        return { data, isLoading, isError };
      },
    },
    addEvent: {
      useMutation: () => {
        const [isLoading, setIsLoading] = useState(false);
        const [isError, setIsError] = useState(false);
        const [isSuccess, setIsSuccess] = useState(false);

        const mutate = async (newEvent: Omit<Event, 'id'>) => {
          setIsLoading(true);
          setIsError(false);
          setIsSuccess(false);
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (Math.random() > 0.2) { // Simulate occasional error
                setIsSuccess(true);
                setIsLoading(false);
                resolve({ id: String(Math.random()), ...newEvent });
              } else {
                setIsError(true);
                setIsLoading(false);
                reject(new Error('Failed to add event'));
              }
            }, 800);
          });
        };
        return { mutate, isLoading, isError, isSuccess };
      },
    },
  },
};

interface Event {
  id: string;
  title: string;
  date: Date;
  description?: string;
}

// Dark mode context
type Theme = 'light' | 'dark';
interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const EventCalendarScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDescription, setNewEventDescription] = useState('');
  const { theme, setTheme } = useTheme();

  const { data: events, isLoading, isError } = trpc.event.getEvents.useQuery(selectedDate || new Date());
  const { mutate: addEvent, isLoading: isAddingEvent, isError: isAddEventError, isSuccess: isAddEventSuccess } = trpc.event.addEvent.useMutation();

  const handleAddEvent = async () => {
    if (selectedDate && newEventTitle) {
      try {
        await addEvent({
          title: newEventTitle,
          date: selectedDate,
          description: newEventDescription,
        });
        setNewEventTitle('');
        setNewEventDescription('');
        // In a real app, you'd likely refetch events here or update the cache
        alert('Event added successfully!');
      } catch (error) {
        alert('Failed to add event.');
      }
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Event Calendar</h1>
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Calendar View</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border shadow"
                components={{
                  IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
                  IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
                }}
                aria-label="Event calendar"
              />
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Events for {selectedDate ? format(selectedDate, 'PPP') : 'No date selected'}</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading && <p className="text-center">Loading events...</p>}
                {isError && <p className="text-center text-red-500">Error loading events. Please try again.</p>}
                {!isLoading && !isError && events && events.length === 0 && (
                  <p className="text-center text-muted-foreground">No events for this date.</p>
                )}
                {!isLoading && !isError && events && events.length > 0 && (
                  <ul className="space-y-3">
                    {events.map((event) => (
                      <li key={event.id} className="border-b pb-2 last:border-b-0 last:pb-0">
                        <h3 className="font-semibold text-lg">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{format(event.date, 'p')} - {event.description}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Add New Event</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Event Title"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  aria-label="Event title input"
                />
                <Input
                  placeholder="Event Description (Optional)"
                  value={newEventDescription}
                  onChange={(e) => setNewEventDescription(e.target.value)}
                  aria-label="Event description input"
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                      aria-label="Select event date"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                      aria-label="Event date picker"
                    />
                  </PopoverContent>
                </Popover>
                <Button onClick={handleAddEvent} className="w-full" disabled={isAddingEvent || !newEventTitle || !selectedDate}>
                  {isAddingEvent ? 'Adding...' : 'Add Event'}
                </Button>
                {isAddEventError && <p className="text-red-500 text-sm mt-2">Failed to add event. Please try again.</p>}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default EventCalendarScreen;
