// AUTO-GENERATED DRAFT SCREEN: AuctionInterface
import React, { useState } from 'react';
import { trpc } from '../trpc';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Label } from './ui/label';

interface AuctionItemProps {
  auction: {
    id: string;
    name: string;
    currentBid: number;
    endTime: Date;
    imageUrl: string;
    description: string;
  };
  onViewDetails: (auctionId: string) => void;
}

const AuctionCard: React.FC<AuctionItemProps> = ({ auction, onViewDetails }) => {
  const [bidAmount, setBidAmount] = useState<number>(auction.currentBid + 1);
  const placeBidMutation = trpc.auction.placeBid.useMutation();

  const handlePlaceBid = async () => {
    try {
      await placeBidMutation.mutateAsync({ auctionId: auction.id, bidAmount });
      alert('Bid placed successfully!');
    } catch (error: any) {
      alert(`Failed to place bid: ${error.message}`);
    }
  };

  const timeLeft = Math.max(0, auction.endTime.getTime() - Date.now());
  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <Card className="w-[300px] shadow-lg dark:bg-gray-800 dark:text-white">
      <CardHeader>
        <img src={auction.imageUrl} alt={auction.name} className="w-full h-40 object-cover rounded-md mb-4" />
        <CardTitle className="text-xl font-bold">{auction.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 dark:text-gray-300">Current Bid: ${auction.currentBid}</p>
        <p className="text-gray-700 dark:text-gray-300">Time Left: {hours}h {minutes}m {seconds}s</p>
        <div className="flex items-center space-x-2 mt-4">
          <Input
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(Number(e.target.value))}
            min={auction.currentBid + 1}
            className="flex-grow dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <Button onClick={handlePlaceBid} disabled={placeBidMutation.isLoading} className="dark:bg-blue-600 dark:hover:bg-blue-700">
            {placeBidMutation.isLoading ? 'Bidding...' : 'Place Bid'}
          </Button>
        </div>
        <Button variant="outline" className="w-full mt-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700" onClick={() => onViewDetails(auction.id)}>
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export const AuctionInterface: React.FC = () => {
  const { data: auctions, isLoading, isError, error } = trpc.auction.getAuctions.useQuery();
  const [selectedAuctionId, setSelectedAuctionId] = useState<string | null>(null);
  const { data: selectedAuctionDetails } = trpc.auction.getAuctionDetails.useQuery(
    { id: selectedAuctionId! },
    { enabled: !!selectedAuctionId }
  );

  const handleViewDetails = (auctionId: string) => {
    setSelectedAuctionId(auctionId);
  };

  const handleCloseDetails = () => {
    setSelectedAuctionId(null);
  };

  if (isLoading) return <div className="text-center p-8 dark:text-white">Loading auctions...</div>;
  if (isError) return <div className="text-center p-8 text-red-500">Error: {error?.message}</div>;

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-8 dark:text-white">Live Auctions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {auctions?.map((auction) => (
          <AuctionCard key={auction.id} auction={auction} onViewDetails={handleViewDetails} />
        ))}
      </div>

      <Dialog open={!!selectedAuctionId} onOpenChange={handleCloseDetails}>
        <DialogContent className="dark:bg-gray-800 dark:text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{selectedAuctionDetails?.name}</DialogTitle>
            <DialogDescription className="dark:text-gray-300">
              {selectedAuctionDetails?.description}
            </DialogDescription>
          </DialogHeader>
          {selectedAuctionDetails && (
            <div className="mt-4">
              <img src={selectedAuctionDetails.imageUrl} alt={selectedAuctionDetails.name} className="w-full h-60 object-cover rounded-md mb-4" />
              <p className="text-lg dark:text-gray-200">Current Bid: ${selectedAuctionDetails.currentBid}</p>
              <p className="text-lg dark:text-gray-200">Ends: {selectedAuctionDetails.endTime.toLocaleString()}</p>
            </div>
          )}
          <Button onClick={handleCloseDetails} className="mt-4 dark:bg-blue-600 dark:hover:bg-blue-700">Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuctionCard;
