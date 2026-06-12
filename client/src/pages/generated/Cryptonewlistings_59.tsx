// AUTO-GENERATED DRAFT SCREEN: CryptoNewListings
import React, { useState, useEffect } from 'react';

interface CryptoListing {
  id: string;
  name: string;
  symbol: string;
  priceUsd: string;
  changePercent24Hr: string;
}

// Mock tRPC hook for fetching new crypto listings
const useNewCryptoListings = () => {
  const [data, setData] = useState<CryptoListing[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockData: CryptoListing[] = [
          { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', priceUsd: '60000.00', changePercent24Hr: '2.5' },
          { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', priceUsd: '3000.00', changePercent24Hr: '3.1' },
          { id: 'cardano', name: 'Cardano', symbol: 'ADA', priceUsd: '0.50', changePercent24Hr: '-1.2' },
          { id: 'solana', name: 'Solana', symbol: 'SOL', priceUsd: '150.00', changePercent24Hr: '4.0' },
          { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE', priceUsd: '0.15', changePercent24Hr: '0.8' },
        ];
        setData(mockData);
      } catch (error) {
        setIsError(true);
        console.error('Failed to fetch crypto listings:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchListings();
  }, []);

  return { data, isLoading, isError };
};

// Shadcn/ui inspired Card component (simplified for demonstration)
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);

const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
);

const CardDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>
);

const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

// Shadcn/ui inspired Table components (simplified)
const Table: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`relative w-full overflow-auto ${className}`}>
    <table className="w-full caption-bottom text-sm">
      {children}
    </table>
  </div>
);

const TableHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <thead className={`[&_tr]:border-b ${className}`}>{children}</thead>
);

const TableBody: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <tbody className={`[&_tr:last-child]:border-0 ${className}`}>{children}</tbody>
);

const TableRow: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <tr className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${className}`}>
    {children}
  </tr>
);

const TableHead: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <th className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}>
    {children}
  </th>
);

const TableCell: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <td className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}>{children}</td>
);

const CryptoNewListings: React.FC = () => {
  const { data: listings, isLoading, isError } = useNewCryptoListings();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <p className="text-lg">Loading new crypto listings...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground text-red-500">
        <p className="text-lg">Error loading listings. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 dark">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Crypto: New Listings</CardTitle>
          <CardDescription>Discover the latest cryptocurrencies added to the market.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead className="text-right">Price (USD)</TableHead>
                <TableHead className="text-right">24h Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listings?.map((listing) => (
                <TableRow key={listing.id}>
                  <TableCell className="font-medium">{listing.name}</TableCell>
                  <TableCell>{listing.symbol}</TableCell>
                  <TableCell className="text-right">${parseFloat(listing.priceUsd).toFixed(2)}</TableCell>
                  <TableCell className={`text-right ${parseFloat(listing.changePercent24Hr) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {parseFloat(listing.changePercent24Hr).toFixed(2)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoNewListings;
