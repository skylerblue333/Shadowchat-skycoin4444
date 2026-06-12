// AUTO-GENERATED DRAFT SCREEN: AddressBookScreen
import React, { useState, useEffect } from 'react';
import { trpc } from '../trpc';
import { cn } from '../lib/utils';
import { Input } from './ui/input'; // Assuming shadcn/ui input component
import { Button } from './ui/button'; // Assuming shadcn/ui button component
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'; // Assuming shadcn/ui card components
import { Sun, Moon, PlusCircle, Search, Loader2 } from 'lucide-react';

interface Address {
  id: string;
  name: string;
  address: string;
}

const AddressBookScreen: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [addresses, setAddresses] = useState<Address>([]);

  // Mock tRPC hook for fetching addresses
  const { data, isLoading, error } = trpc.addressBook.useQuery({ text: searchTerm });

  useEffect(() => {
    if (data) {
      // Mock data for now, replace with actual data from tRPC
      setAddresses([
        { id: '1', name: 'Alice', address: '0x123...' },
        { id: '2', name: 'Bob', address: '0x456...' },
      ]);
    }
  }, [data]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  const filteredAddresses = addresses.filter(addr =>
    addr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    addr.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={cn(
      "min-h-screen p-4 transition-colors duration-300",
      isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
    )}>
      <div className="container mx-auto max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Crypto: Address Book</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </Button>
        </div>

        <div className="flex items-center space-x-2 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search by name or address..."
              className="pl-9 pr-4 py-2 w-full rounded-md shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search address book"
            />
          </div>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Address
          </Button>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading addresses...</span>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-center py-4">
            Error loading addresses: {error.message}
          </div>
        )}

        {!isLoading && !error && filteredAddresses.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            No addresses found.
          </div>
        )}

        <div className="space-y-4">
          {filteredAddresses.map((addr) => (
            <Card key={addr.id} className="shadow-md">
              <CardHeader>
                <CardTitle>{addr.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 break-all">{addr.address}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddressBookScreen;