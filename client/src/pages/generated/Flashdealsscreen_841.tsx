// AUTO-GENERATED DRAFT SCREEN: FlashDealsScreen
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'; // Assuming shadcn/ui path
import { Button } from './ui/button';
import { Badge } from './ui/badge';

// Mock tRPC hook for demonstration purposes
// In a real application, this would connect to your tRPC backend
interface FlashDeal {
  id: string;
  name: string;
  originalPrice: number;
  dealPrice: number;
  expiresAt: string; // ISO string
  imageUrl: string;
}

interface UseFlashDealsResult {
  data: FlashDeal[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

const useFlashDeals = (): UseFlashDealsResult => {
  // Simulate data fetching with loading and error states
  const [data, setData] = React.useState<FlashDeal[] | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        const mockDeals: FlashDeal[] = [
          {
            id: '1',
            name: 'Super Gadget X',
            originalPrice: 199.99,
            dealPrice: 99.99,
            expiresAt: new Date(Date.now() + 3600 * 1000).toISOString(), // Expires in 1 hour
            imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=GadgetX',
          },
          {
            id: '2',
            name: 'Awesome Widget Y',
            originalPrice: 49.99,
            dealPrice: 24.99,
            expiresAt: new Date(Date.now() + 7200 * 1000).toISOString(), // Expires in 2 hours
            imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=WidgetY',
          },
        ];
        setData(mockDeals);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, isLoading, isError };
};

// Countdown Timer Component
interface CountdownProps {
  expiresAt: string;
}

const Countdown: React.FC<CountdownProps> = ({ expiresAt }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(expiresAt) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    // @ts-ignore
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval} className="font-medium text-primary-foreground">
        {/* @ts-ignore */}
        {String(timeLeft[interval]).padStart(2, '0')}{interval.charAt(0)}
      </span>
    );
  });

  return (
    <div className="flex items-center space-x-1 text-sm">
      {timerComponents.length ? timerComponents : <span className="text-muted-foreground">Deal Expired!</span>}
    </div>
  );
};

export const FlashDealsScreen: React.FC = () => {
  const { data: deals, isLoading, isError } = useFlashDeals();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <p className="text-lg">Loading Flash Deals...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-destructive">
        <p className="text-lg">Error loading flash deals. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 dark:bg-gray-900 dark:text-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-center">Flash Deals</h1>
      <p className="text-center text-muted-foreground mb-10">Limited-time offers you don't want to miss!</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {deals && deals.length > 0 ? (
          deals.map((deal) => (
            <Card key={deal.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img src={deal.imageUrl} alt={deal.name} className="w-full h-48 object-cover" />
              <CardHeader className="flex-grow">
                <CardTitle className="text-xl font-semibold">{deal.name}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  <span className="line-through mr-2">${deal.originalPrice.toFixed(2)}</span>
                  <span className="text-lg font-bold text-primary">${deal.dealPrice.toFixed(2)}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <Badge variant="destructive" className="bg-red-500 text-white">Flash Sale</Badge>
                  <Countdown expiresAt={deal.expiresAt} />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Grab Deal</Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground">No flash deals available at the moment. Check back soon!</p>
        )}
      </div>
    </div>
  );
};

export default FlashDealsScreen;
