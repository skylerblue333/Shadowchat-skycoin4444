// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: NftGallery


/* --- injected local data stubs (replaces non-existent backend hooks) --- */
function useStubQuery<T = any>(initial?: T) {
  return { data: initial as T, isLoading: false, isPending: false, isError: false, error: null as any, refetch: () => {} };
}
function useStubMutation<T = any>() {
  return {
    mutate: (_v?: any) => {}, mutateAsync: async (_v?: any) => ({} as T),
    isLoading: false, isPending: false, isError: false, isSuccess: false, error: null as any, data: undefined as any, reset: () => {},
  };
}
/* ----------------------------------------------------------------------- */


// Assume a tRPC client and types are available globally or imported

interface NFT {
  id: string;
  name: string;
  imageUrl: string;
  description?: string;
}

interface NftGalleryProps {
  userId: string;
}

const fetchNFTs = async (userId: string): Promise<NFT[]> => {
  // Simulate tRPC call
  // const data = await trpc.nft.getGallery.query({ userId });
  // return data;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', name: 'CryptoPunk #123', imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=NFT1' },
        { id: '2', name: 'Bored Ape #456', imageUrl: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=NFT2' },
        { id: '3', name: 'Art Block #789', imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=NFT3' },
      ]);
    }, 1000);
  });
};

const NftGallery: React.FC<any> = ({ userId }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkTheme);
  }, [isDarkTheme]);

  const { data: nfts, isLoading, isError, error } = useQuery<NFT[], Error>({
    queryKey: ['nfts', userId],
    queryFn: () => fetchNFTs(userId),
  });

  if (isLoading) {
    return (
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="w-full">
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-48 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return <div className="p-4 text-red-500" role="alert">Error loading NFTs: {error?.message}</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">NFT Gallery</h1>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {nfts?.map((nft) => (
          <Card key={nft.id} className="w-full">
            <CardHeader>
              <CardTitle>{nft.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <img src={nft.imageUrl} alt={nft.name} className="w-full h-48 object-cover rounded-md mb-4" />
              {nft.description && <p className="text-sm text-muted-foreground">{nft.description}</p>}
              <Button className="mt-4">View Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NftGallery;
