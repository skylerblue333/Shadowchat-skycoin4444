// AUTO-GENERATED DRAFT SCREEN: CryptoWhitelist
import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { trpc } from '../utils/trpc'; // Assuming tRPC client setup
import { z } from 'zod';
import { useTheme } from 'next-themes';

// Shadcn/ui components (simplified for brevity)
const Card = ({ children }: { children: React.ReactNode }) => <div className="bg-card text-card-foreground rounded-lg shadow-sm p-6">{children}</div>;
const CardHeader = ({ children }: { children: React.ReactNode }) => <div className="flex flex-col space-y-1.5 pb-6">{children}</div>;
const CardTitle = ({ children }: { children: React.ReactNode }) => <h3 className="text-2xl font-semibold leading-none tracking-tight">{children}</h3>;
const CardContent = ({ children }: { children: React.ReactNode }) => <div className="p-0 pt-6">{children}</div>;
const CardFooter = ({ children }: { children: React.ReactNode }) => <div className="flex items-center p-6 pt-0">{children}</div>;
const Button = ({ children, onClick, disabled }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean }) => (
  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2" onClick={onClick} disabled={disabled}>
    {children}
  </button>
);
const Input = ({ value, onChange, placeholder }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string }) => (
  <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" value={value} onChange={onChange} placeholder={placeholder} />
);
const Label = ({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) => (
  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor={htmlFor}>{children}</label>
);

// Zod schema for whitelist entry
const whitelistEntrySchema = z.object({
  id: z.string(),
  address: z.string().min(1, 'Address cannot be empty'),
  label: z.string().optional(),
});
type WhitelistEntry = z.infer<typeof whitelistEntrySchema>;

const CryptoWhitelist: React.FC = () => {
  const [newAddress, setNewAddress] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const { theme } = useTheme(); // For dark theme

  // Fetch whitelist entries
  const { data: whitelist, isLoading, isError, error, refetch } = trpc.crypto.getWhitelist.useQuery();

  // Add new entry
  const addMutation = trpc.crypto.addWhitelistEntry.useMutation({
    onSuccess: () => {
      setNewAddress('');
      setNewLabel('');
      refetch();
    },
  });

  // Remove entry
  const removeMutation = trpc.crypto.removeWhitelistEntry.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const handleAddEntry = () => {
    try {
      whitelistEntrySchema.pick({ address: true, label: true }).parse({ address: newAddress, label: newLabel });
      addMutation.mutate({ address: newAddress, label: newLabel });
    } catch (e) {
      if (e instanceof z.ZodError) {
        alert(e.errors[0].message); // Basic error display
      }
    }
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading whitelist...</div>;
  if (isError) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error?.message}</div>;

  return (
    <div className={`min-h-screen p-8 ${theme === 'dark' ? 'dark' : ''}`}>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Crypto Whitelist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="address">New Address</Label>
              <Input
                id="address"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                placeholder="Enter crypto address"
                aria-label="New crypto address"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="label">Label (Optional)</Label>
              <Input
                id="label"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="e.g., My Wallet"
                aria-label="Optional label for the address"
              />
            </div>
            <Button onClick={handleAddEntry} disabled={addMutation.isLoading || newAddress.length === 0}>
              {addMutation.isLoading ? 'Adding...' : 'Add to Whitelist'}
            </Button>

            <h4 className="text-lg font-semibold mt-6">Current Whitelist</h4>
            {whitelist && whitelist.length > 0 ? (
              <ul className="space-y-2">
                {whitelist.map((entry) => (
                  <li key={entry.id} className="flex items-center justify-between bg-muted/50 p-3 rounded-md">
                    <div>
                      <p className="font-mono text-sm">{entry.address}</p>
                      {entry.label && <p className="text-xs text-muted-foreground">{entry.label}</p>}
                    </div>
                    <Button variant="destructive" onClick={() => removeMutation.mutate({ id: entry.id })} disabled={removeMutation.isLoading}>
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No entries in whitelist.</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          {addMutation.isError && <p className="text-red-500 text-sm">Error adding: {addMutation.error?.message}</p>}
          {removeMutation.isError && <p className="text-red-500 text-sm">Error removing: {removeMutation.error?.message}</p>}
        </CardFooter>
      </Card>
    </div>
  );
};

export default CryptoWhitelist;
