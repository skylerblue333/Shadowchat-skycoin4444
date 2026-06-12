// AUTO-GENERATED DRAFT SCREEN: MarketplaceSellerOnboarding
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { trpc } from './utils/trpc'; // Assuming tRPC client setup

import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Loader2 } from 'lucide-react'; // Using Lucide-react for spinner

const formSchema = z.object({
  businessName: z.string().min(2, { message: 'Business name must be at least 2 characters.' }),
  contactEmail: z.string().email({ message: 'Please enter a valid email address.' }),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid phone number format.' }),
  addressLine1: z.string().min(5, { message: 'Address Line 1 is required.' }),
  city: z.string().min(2, { message: 'City is required.' }),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, { message: 'Invalid zip code format.' }),
  country: z.string().min(2, { message: 'Country is required.' }),
  bankAccountNumber: z.string().min(8, { message: 'Bank account number is required.' }),
  bankRoutingNumber: z.string().min(9, { message: 'Bank routing number is required.' }),
});

type FormValues = z.infer<typeof formSchema>;

export function MarketplaceSellerOnboarding() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: '',
      contactEmail: '',
      phoneNumber: '',
      addressLine1: '',
      city: '',
      zipCode: '',
      country: '',
      bankAccountNumber: '',
      bankRoutingNumber: '',
    },
  });

  const { data: onboardingStatus, isLoading: isLoadingStatus, error: statusError } = trpc.seller.getOnboardingStatus.useQuery();
  const { mutate: onboardSeller, isLoading: isSubmitting, error: submitError } = trpc.seller.onboard.useMutation({
    onSuccess: () => {
      alert('Seller onboarding successful!');
      // In a real app, you might redirect or show a more sophisticated success message.
    },
    onError: (error) => {
      form.setError('root.serverError', { message: error.message });
    },
  });

  const onSubmit = (values: FormValues) => {
    onboardSeller(values);
  };

  if (isLoadingStatus) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-900">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading onboarding status...</span>
      </div>
    );
  }

  if (statusError) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-900">
        <p className="text-red-500 text-center">Error loading onboarding status: {statusError.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 dark:bg-gray-900 min-h-screen">
      <Card className="w-full max-w-2xl mx-auto dark:bg-gray-800 dark:text-gray-50">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Seller Onboarding</CardTitle>
          <CardDescription>Provide your business details to join the marketplace.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Business Name" {...field} className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your@email.com" {...field} className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+1234567890" {...field} className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="addressLine1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 1</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St" {...field} className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="New York" {...field} className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input placeholder="10001" {...field} className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="USA" {...field} className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <h3 className="text-lg font-semibold mt-6">Bank Details</h3>
              <FormField
                control={form.control}
                name="bankAccountNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Account Number</FormLabel>
                    <FormControl>
                      <Input placeholder="1234567890" {...field} className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bankRoutingNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Routing Number</FormLabel>
                    <FormControl>
                      <Input placeholder="012345678" {...field} className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.formState.errors.root?.serverError && (
                <p className="text-red-500 text-sm dark:text-red-400">{form.formState.errors.root.serverError.message}</p>
              )}

              <Button type="submit" disabled={isSubmitting} className="w-full dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white">
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</> : 'Submit Onboarding'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}


export default function Marketplaceselleronboarding_534() { return null; }
