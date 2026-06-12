// AUTO-GENERATED DRAFT SCREEN: NftMarketplaceScreen
import React, { useState } from 'react';
import { useQuery, useMutation } from '@trpc/react-query';
import { trpc } from '@/utils/trpc';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, AlertCircle, ShoppingCart } from 'lucide-react';

// Types
interface NFT {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  creator: string;
  collection: string;
}

export const NftMarketplaceScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Mock tRPC query for NFTs
  const { data: nfts, isLoading, error } = trpc.nft.getMarketplaceListings.useQuery({
    search: searchQuery,
    category: activeCategory === 'All' ? undefined : activeCategory,
  });

  // Mock tRPC mutation for buying NFT
  const buyNftMutation = trpc.nft.buy.useMutation();

  const handleBuy = async (nftId: string) => {
    try {
      await buyNftMutation.mutateAsync({ id: nftId });
      // Handle success (e.g., show toast)
    } catch (err) {
      // Handle error
      console.error('Failed to buy NFT', err);
    }
  };

  const categories = ['All', 'Art', 'Gaming', 'Collectibles', 'Music'];

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">NFT Marketplace</h1>
            <p className="text-muted-foreground mt-2">Discover, collect, and sell extraordinary NFTs</p>
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search NFTs..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search NFTs"
              />
            </div>
            <Button variant="outline" size="icon" aria-label="Filter">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'secondary'}
              onClick={() => setActiveCategory(category)}
              className="rounded-full whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Error State */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load marketplace listings. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardHeader className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-9 w-24" />
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && nfts?.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed rounded-lg border-muted">
            <h3 className="text-xl font-semibold mb-2">No NFTs found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters.</p>
          </div>
        )}

        {/* NFT Grid */}
        {!isLoading && !error && nfts && nfts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {nfts.map((nft: NFT) => (
              <Card key={nft.id} className="overflow-hidden flex flex-col transition-all hover:shadow-lg hover:-translate-y-1 dark:hover:shadow-primary/10">
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img
                    src={nft.imageUrl}
                    alt={nft.name}
                    className="object-cover w-full h-full transition-transform hover:scale-105"
                    loading="lazy"
                  />
                  <Badge className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm text-foreground hover:bg-background/90">
                    {nft.collection}
                  </Badge>
                </div>
                
                <CardHeader className="p-4 flex-grow">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <CardTitle className="text-lg line-clamp-1" title={nft.name}>
                        {nft.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">by {nft.creator}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardFooter className="p-4 pt-0 flex items-center justify-between border-t mt-auto">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground uppercase font-semibold">Price</span>
                    <span className="font-bold text-lg">{nft.price} SKY</span>
                  </div>
                  <Button 
                    onClick={() => handleBuy(nft.id)}
                    disabled={buyNftMutation.isPending}
                    className="gap-2"
                  >
                    {buyNftMutation.isPending ? (
                      <span className="animate-pulse">Processing...</span>
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4" />
                        Buy Now
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NftMarketplaceScreen;