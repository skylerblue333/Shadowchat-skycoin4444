// AUTO-GENERATED DRAFT SCREEN: WhitelistManager

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { trpc } from '../utils/trpc'; // Assuming tRPC client setup
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Loader2, PlusCircle, Trash2 } from 'lucide-react';

// Zod schema for whitelist entry validation
const whitelistEntrySchema = z.object({
  address: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address'),
  label: z.string().min(1, 'Label is required').max(50, 'Label too long'),
});

type WhitelistEntry = z.infer<typeof whitelistEntrySchema>;

const WhitelistManager: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Form setup
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<WhitelistEntry>({
    resolver: zodResolver(whitelistEntrySchema),
  });

  // Fetch whitelist entries
  const { data: whitelist, isLoading, error, refetch } = trpc.whitelist.getAll.useQuery();

  // Add whitelist entry mutation
  const addEntryMutation = trpc.whitelist.add.useMutation({
    onSuccess: () => {
      toast.success('Whitelist entry added successfully!');
      refetch();
      reset();
    },
    onError: (err) => {
      toast.error(`Failed to add entry: ${err.message}`);
    },
  });

  // Remove whitelist entry mutation
  const removeEntryMutation = trpc.whitelist.remove.useMutation({
    onSuccess: () => {
      toast.success('Whitelist entry removed successfully!');
      refetch();
    },
    onError: (err) => {
      toast.error(`Failed to remove entry: ${err.message}`);
    },
  });

  const onSubmit = (data: WhitelistEntry) => {
    addEntryMutation.mutate(data);
  };

  const handleRemove = (address: string) => {
    removeEntryMutation.mutate({ address });
  };

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading Whitelist...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-8 ${isDarkTheme ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto space-y-8" role="main" aria-label="Whitelist Manager">
        <Card className={isDarkTheme ? 'bg-gray-800 border-gray-700' : ''}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className={isDarkTheme ? 'text-gray-100' : ''}>Crypto: Whitelist Manager</CardTitle>
            <div className="flex items-center space-x-2">
              <Label htmlFor="dark-mode-switch">Dark Mode</Label>
              <Switch
                id="dark-mode-switch"
                checked={isDarkTheme}
                onCheckedChange={setIsDarkTheme}
                aria-label="Toggle dark mode"
              />
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="space-y-1">
                <Label htmlFor="address">Wallet Address</Label>
                <Input
                  id="address"
                  placeholder="0x..."
                  {...register('address')}
                  className={errors.address ? 'border-red-500' : ''}
                  aria-invalid={errors.address ? 'true' : 'false'}
                  aria-describedby="address-error"
                />
                {errors.address && <p id="address-error" className="text-red-500 text-sm">{errors.address.message}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="label">Label</Label>
                <Input
                  id="label"
                  placeholder="e.g., John Doe Wallet"
                  {...register('label')}
                  className={errors.label ? 'border-red-500' : ''}
                  aria-invalid={errors.label ? 'true' : 'false'}
                  aria-describedby="label-error"
                />
                {errors.label && <p id="label-error" className="text-red-500 text-sm">{errors.label.message}</p>}
              </div>
              <Button type="submit" disabled={isSubmitting || addEntryMutation.isPending}>
                {(isSubmitting || addEntryMutation.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <PlusCircle className="mr-2 h-4 w-4" />
                Add to Whitelist
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className={isDarkTheme ? 'bg-gray-800 border-gray-700' : ''}>
          <CardHeader>
            <CardTitle className={isDarkTheme ? 'text-gray-100' : ''}>Current Whitelist</CardTitle>
          </CardHeader>
          <CardContent>
            {whitelist && whitelist.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className={isDarkTheme ? 'text-gray-300' : ''}>Wallet Address</TableHead>
                      <TableHead className={isDarkTheme ? 'text-gray-300' : ''}>Label</TableHead>
                      <TableHead className="text-right"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {whitelist.map((entry) => (
                      <TableRow key={entry.address} className={isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}>
                        <TableCell className="font-medium">{entry.address}</TableCell>
                        <TableCell>{entry.label}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleRemove(entry.address)}
                            disabled={removeEntryMutation.isPending}
                            aria-label={`Remove ${entry.label} from whitelist`}
                          >
                            {removeEntryMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className={isDarkTheme ? 'text-gray-400' : 'text-gray-600'}>No entries in the whitelist yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WhitelistManager;
