// AUTO-GENERATED DRAFT SCREEN: CryptoStockScreener
import React, { useState } from 'react';
import { trpc } from '../trpc';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { ScreenerFilter } from '../types';

const CryptoStockScreener: React.FC = () => {
  const [filters, setFilters] = useState<ScreenerFilter>({});
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { data, isLoading, error } = trpc.crypto.list.useQuery(filters);

  const handleFilterChange = (key: keyof ScreenerFilter, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === '' ? undefined : Number(value),
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setFilters(prev => ({ ...prev, searchQuery: e.target.value || undefined }));
  };

  if (isLoading) return <div className="text-center py-8">Loading crypto data...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-white min-h-screen">
      <h1 className="text-4xl font-extrabold mb-6 text-center">Crypto Stock Screener</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Input placeholder="Min Market Cap" type="number" onChange={(e) => handleFilterChange('minMarketCap', e.target.value)} />
        <Input placeholder="Max Market Cap" type="number" onChange={(e) => handleFilterChange('maxMarketCap', e.target.value)} />
        <Input placeholder="Min Price" type="number" onChange={(e) => handleFilterChange('minPrice', e.target.value)} />
        <Input placeholder="Max Price" type="number" onChange={(e) => handleFilterChange('maxPrice', e.target.value)} />
        <Input placeholder="Min 24h Volume" type="number" onChange={(e) => handleFilterChange('minVolume24h', e.target.value)} />
        <Input placeholder="Max 24h Volume" type="number" onChange={(e) => handleFilterChange('maxVolume24h', e.target.value)} />
        <Input placeholder="Min 24h Change (%)" type="number" onChange={(e) => handleFilterChange('minChange24h', e.target.value)} />
        <Input placeholder="Max 24h Change (%)" type="number" onChange={(e) => handleFilterChange('maxChange24h', e.target.value)} />
        <Input placeholder="Search by Name/Symbol" value={searchQuery} onChange={handleSearchChange} className="lg:col-span-2" />
        <Button onClick={() => setFilters({})} className="lg:col-span-2">Reset Filters</Button>
      </div>

      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Market Cap</TableHead>
              <TableHead>24h Volume</TableHead>
              <TableHead>24h Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell className="font-medium">{asset.name}</TableCell>
                <TableCell>{asset.symbol.toUpperCase()}</TableCell>
                <TableCell>${asset.price.toFixed(2)}</TableCell>
                <TableCell>${(asset.marketCap / 1_000_000_000).toFixed(2)}B</TableCell>
                <TableCell>${(asset.volume24h / 1_000_000_000).toFixed(2)}B</TableCell>
                <TableCell className={asset.change24h >= 0 ? 'text-green-500' : 'text-red-500'}>
                  {asset.change24h.toFixed(2)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CryptoStockScreener;
