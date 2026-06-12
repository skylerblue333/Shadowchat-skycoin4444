// AUTO-GENERATED DRAFT SCREEN: SkycoinMarketplaceDeliveryRatingsScreen
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star } from 'lucide-react';

interface DeliveryRating {
  id: string;
  driverName: string;
  rating: number;
  comment: string;
  timestamp: string;
}

const ITEMS_PER_PAGE = 9;

const SkycoinMarketplaceDeliveryRatingsScreen: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterDriver, setFilterDriver] = useState('');
  const [minRating, setMinRating] = useState<number | ''>('');

  const { data, isLoading, isError, error } = trpc.delivery.getRatings.useQuery();

  const filteredRatings = data?.filter(rating => {
    const matchesDriver = rating.driverName.toLowerCase().includes(filterDriver.toLowerCase());
    const matchesRating = minRating === '' || rating.rating >= minRating;
    return matchesDriver && matchesRating;
  });

  const totalPages = Math.ceil((filteredRatings?.length || 0) / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentRatings = filteredRatings?.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (isLoading) {
    return (
      <div className="p-4 dark:bg-gray-900 min-h-screen">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <Skeleton className="h-8 w-1/2 mb-2" />
            <Skeleton className="h-5 w-1/3" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 dark:bg-gray-900 min-h-screen text-red-500">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-red-600 dark:text-red-400">Error Loading Ratings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">An error occurred while fetching delivery ratings: {error.message}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-700'}`}
            fill={i < rating ? 'currentColor' : 'none'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-6 text-center">Delivery Driver Ratings</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Input
            placeholder="Filter by driver name..."
            value={filterDriver}
            onChange={(e) => {
              setFilterDriver(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
          />
          <Select
            onValueChange={(value) => {
              setMinRating(value === '' ? '' : Number(value));
              setCurrentPage(1);
            }}
            value={minRating === '' ? '' : String(minRating)}
          >
            <SelectTrigger className="w-[180px] dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
              <SelectValue placeholder="Min Rating" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
              <SelectItem value="">All Ratings</SelectItem>
              <SelectItem value="1">1 Star & Up</SelectItem>
              <SelectItem value="2">2 Stars & Up</SelectItem>
              <SelectItem value="3">3 Stars & Up</SelectItem>
              <SelectItem value="4">4 Stars & Up</SelectItem>
              <SelectItem value="5">5 Stars</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {currentRatings && currentRatings.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentRatings.map((rating: DeliveryRating) => (
              <Card key={rating.id} className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">{rating.driverName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-2">
                    {renderStars(rating.rating)}
                    <span className="ml-2 text-lg font-medium">{rating.rating}/5</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">"{rating.comment}"</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Reviewed on: {new Date(rating.timestamp).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-600 dark:text-gray-400">
            <p className="text-lg">No delivery ratings found matching your criteria.</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            <Button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              variant="outline"
              className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
            >
              Previous
            </Button>
            <span className="text-lg">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              variant="outline"
              className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkycoinMarketplaceDeliveryRatingsScreen;
