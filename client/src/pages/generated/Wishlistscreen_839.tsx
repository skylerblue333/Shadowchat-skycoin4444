// AUTO-GENERATED DRAFT SCREEN: WishlistScreen
import React from 'react';
import { useQuery } from '@tanstack/react-query'; // Assuming tRPC integrates with react-query
import { trpc } from './utils/trpc'; // Placeholder for tRPC client
import { Button } from './components/ui/button'; // shadcn/ui button
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'; // shadcn/ui card
import { Skeleton } from './components/ui/skeleton'; // shadcn/ui skeleton for loading states
import { Heart, X, ShoppingCart } from 'lucide-react'; // Icons

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
}

const WishlistScreen: React.FC = () => {
  // Simulate tRPC hook for fetching wishlist data
  const { data: wishlistItems, isLoading, isError, error } = trpc.wishlist.getWishlist.useQuery();

  // Simulate tRPC hook for removing an item from wishlist
  const removeItemMutation = trpc.wishlist.removeItem.useMutation();

  const handleRemoveItem = (itemId: string) => {
    removeItemMutation.mutate({ id: itemId });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 animate-pulse" role="status" aria-live="polite" aria-label="Loading wishlist items">
        <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="flex flex-col">
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="flex-grow flex flex-col items-center space-y-2">
                <Skeleton className="h-48 w-full rounded-md mb-4" />
                <Skeleton className="h-4 w-1/4 mb-2" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-4 text-red-600 dark:text-red-400" role="alert" aria-live="assertive">
        <h1 className="text-3xl font-bold mb-4">Error Loading Wishlist</h1>
        <p>We encountered an issue while loading your wishlist. Please try again later.</p>
        {error && <p className="text-sm mt-2">Details: {error.message}</p>}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-8 flex items-center text-gray-900 dark:text-gray-50">
        <Heart className="mr-4 h-10 w-10 text-red-500" aria-hidden="true" />
        Your Wishlist
      </h1>

      {wishlistItems && wishlistItems.length === 0 ? (
        <div className="text-center py-20 flex flex-col items-center justify-center">
          <ShoppingCart className="h-24 w-24 text-gray-400 dark:text-gray-600 mb-6" aria-hidden="true" />
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">Your wishlist is empty. Start adding some items!</p>
          <Button className="px-8 py-3 text-lg" aria-label="Browse Marketplace to add items">
            Browse Marketplace
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems?.map((item: WishlistItem) => (
            <Card key={item.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover" loading="lazy" />
              <CardHeader className="flex flex-row items-start justify-between space-y-0 p-4">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-50 leading-tight mb-1">{item.name}</CardTitle>
                  {item.description && <CardDescription className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{item.description}</CardDescription>}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveItem(item.id)}
                  disabled={removeItemMutation.isLoading}
                  className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                  aria-label={`Remove ${item.name} from wishlist`}
                >
                  {removeItemMutation.isLoading ? <span className="animate-spin text-sm">...</span> : <X className="h-5 w-5" />}
                </Button>
              </CardHeader>
              <CardContent className="flex-grow p-4 pt-0">
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">${item.price.toFixed(2)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistScreen;
