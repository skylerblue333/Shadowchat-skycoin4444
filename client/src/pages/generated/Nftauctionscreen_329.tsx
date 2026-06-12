// AUTO-GENERATED DRAFT SCREEN: NFTAuctionScreen
import React, { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { Skeleton } from './components/ui/skeleton';
import { Switch } from './components/ui/switch';
import { Label } from './components/ui/label';

interface NFT {
  id: string;
  name: string;
  imageUrl: string;
  currentBid: number;
  endTime: Date;
}

interface AuctionData {
  nft: NFT;
  loading: boolean;
  error: string | null;
}

// Mock tRPC hook for fetching NFT data
const useNFTAuction = (nftId: string) => {
  const [data, setData] = useState<AuctionData>({
    nft: {} as NFT,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchNFT = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        const mockNFT: NFT = {
          id: nftId,
          name: "CryptoPunk #7804",
          imageUrl: "https://via.placeholder.com/300",
          currentBid: 150.75,
          endTime: new Date(Date.now() + 3600 * 1000),
        };
        setData({ nft: mockNFT, loading: false, error: null });
      } catch (err) {
        setData({ nft: {} as NFT, loading: false, error: "Failed to fetch NFT data." });
      }
    };
    fetchNFT();
  }, [nftId]);

  return data;
};

const NFTAuctionScreen: React.FC = () => {
  const { nft, loading, error } = useNFTAuction("nft-123");
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <Switch
          id="dark-mode-switch"
          checked={isDarkTheme}
          onCheckedChange={setIsDarkTheme}
          aria-label="Toggle dark mode"
        />
        <Label htmlFor="dark-mode-switch">Dark Mode</Label>
      </div>

      <Card className="w-[350px]">
        <CardHeader>
          {loading ? (
            <Skeleton className="h-6 w-3/4" />
          ) : (
            <CardTitle className="text-2xl font-bold">{nft.name}</CardTitle>
          )}
          {loading ? (
            <Skeleton className="h-4 w-1/2 mt-2" />
          ) : (
            <CardDescription>Current Bid: {nft.currentBid} ETH</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-[300px] w-full" />
          ) : (
            <img src={nft.imageUrl} alt={nft.name} className="w-full h-auto rounded-md" />
          )}
          <div className="mt-4 text-center">
            {loading ? (
              <Skeleton className="h-4 w-2/3 mx-auto" />
            ) : (
              <p className="text-lg">Ends: {nft.endTime.toLocaleString()}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          {loading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Button className="w-full">Place Bid</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default NFTAuctionScreen;
