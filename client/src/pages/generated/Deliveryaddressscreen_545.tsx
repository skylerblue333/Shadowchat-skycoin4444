// AUTO-GENERATED DRAFT SCREEN: DeliveryAddressScreen
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { trpc } from '@/utils/trpc';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';

const addressSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  streetAddress: z.string().min(5, 'Street address must be at least 5 characters'),
  apartment: z.string().optional(),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().min(2, 'State is required'),
  postalCode: z.string().min(5, 'Valid postal code is required'),
  country: z.string().min(2, 'Country is required'),
  isDefault: z.boolean().default(false),
});

type AddressFormValues = z.infer<typeof addressSchema>;

export default function DeliveryAddressScreen() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: '',
      streetAddress: '',
      apartment: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'US',
      isDefault: false,
    },
  });

  const updateAddressMutation = trpc.user.updateDeliveryAddress.useMutation({
    onSuccess: () => {
      setSuccessMessage('Delivery address updated successfully.');
      form.reset();
      setTimeout(() => setSuccessMessage(null), 3000);
    },
  });

  const onSubmit = async (data: AddressFormValues) => {
    setSuccessMessage(null);
    try {
      await updateAddressMutation.mutateAsync(data);
    } catch (error) {
      console.error('Failed to update address:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 flex items-center justify-center dark:bg-zinc-950">
      <Card className="w-full max-w-2xl shadow-lg border-border dark:border-zinc-800">
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-2">
            <MapPin className="w-6 h-6 text-primary" aria-hidden="true" />
            <CardTitle className="text-2xl font-bold tracking-tight">Delivery Address</CardTitle>
          </div>
          <CardDescription className="text-muted-foreground">
            Enter your shipping details for SKYCOIN4444 marketplace orders.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {successMessage && (
            <Alert variant="default" className="mb-6 border-green-500 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}

          {updateAddressMutation.error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {updateAddressMutation.error.message || 'Failed to save address. Please try again.'}
              </AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField control={form.control} name="fullName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl><Input placeholder="John Doe" autoComplete="name" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="streetAddress" render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl><Input placeholder="123 Main St" autoComplete="street-address" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="apartment" render={({ field }) => (
                <FormItem>
                  <FormLabel>Apartment, suite, etc. (optional)</FormLabel>
                  <FormControl><Input placeholder="Apt 4B" autoComplete="address-line2" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="city" render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl><Input placeholder="New York" autoComplete="address-level2" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="state" render={({ field }) => (
                  <FormItem>
                    <FormLabel>State / Province</FormLabel>
                    <FormControl><Input placeholder="NY" autoComplete="address-level1" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="postalCode" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal / Zip Code</FormLabel>
                    <FormControl><Input placeholder="10001" autoComplete="postal-code" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="country" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger aria-label="Select country"><SelectValue placeholder="Select a country" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="UK">United Kingdom</SelectItem>
                        <SelectItem value="AU">Australia</SelectItem>
                        <SelectItem value="DE">Germany</SelectItem>
                        <SelectItem value="FR">France</SelectItem>
                        <SelectItem value="JP">Japan</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField control={form.control} name="isDefault" render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border p-4 dark:border-zinc-800">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Set as default address</FormLabel>
                    <FormDescription>Use this address for all future marketplace orders.</FormDescription>
                  </div>
                  <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} aria-label="Set as default address" /></FormControl>
                </FormItem>
              )} />

              <Button type="submit" className="w-full" disabled={updateAddressMutation.isPending} aria-disabled={updateAddressMutation.isPending}>
                {updateAddressMutation.isPending ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />Saving Address...</>
                ) : ('Save Delivery Address')}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}