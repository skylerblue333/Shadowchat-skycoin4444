// AUTO-GENERATED DRAFT SCREEN: NftBurnScreen
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useBurnNft } from '@/hooks/useBurnNft'; // Assuming a tRPC hook for burning NFT
import { useTheme } from 'next-themes'; // For dark theme
import { Loader2, AlertCircle } from 'lucide-react'; // For loading state and error icon
import { z } from 'zod'; // For input validation
import { useForm } from 'react-hook-form'; // For form management
import { zodResolver } from '@hookform/resolvers/zod'; // For integrating zod with react-hook-form
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner'; // For notifications

interface NftBurnScreenProps {
  // Define any props if necessary
}

const formSchema = z.object({
  nftId: z.string().min(1, { message: 'NFT ID cannot be empty.' }).max(100, { message: 'NFT ID is too long.' }),
  confirmation: z.boolean().refine(val => val === true, { message: 'You must confirm to burn the NFT.' }),
});

type NftBurnFormValues = z.infer<typeof formSchema>;

const NftBurnScreen: React.FC<NftBurnScreenProps> = () => {
  const { theme, setTheme } = useTheme();

  const form = useForm<NftBurnFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nftId: '',
      confirmation: false,
    },
  });

  const { mutate: burnNft, isLoading, isError, error, isSuccess } = useBurnNft();

  React.useEffect(() => {
    if (isSuccess) {
      toast.success('NFT Burned Successfully!', { description: 'The NFT has been permanently destroyed.' });
      form.reset();
    }
    if (isError) {
      toast.error('Failed to burn NFT', { description: error?.message || 'An unknown error occurred.' });
    }
  }, [isSuccess, isError, error, form]);

  const onSubmit = (values: NftBurnFormValues) => {
    burnNft({ id: values.nftId });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Burn NFT</CardTitle>
          <CardDescription>Permanently destroy an NFT from your collection. This action is irreversible.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="nftId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="nftId">NFT ID</FormLabel>
                    <FormControl>
                      <Input
                        id="nftId"
                        placeholder="Enter NFT ID to burn"
                        aria-label="NFT ID Input"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Please enter the unique identifier of the NFT you wish to burn.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmation"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Confirmation</FormLabel>
                      <FormDescription>I understand this action is irreversible and I want to proceed.</FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-label="Confirmation Switch"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isLoading && (
                <div className="flex items-center space-x-2 text-primary" role="status">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Burning NFT...</span>
                </div>
              )}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                aria-disabled={isLoading}
              >
                {isLoading ? 'Burning...' : 'Burn NFT'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            variant="outline"
            aria-label="Toggle Theme"
          >
            Toggle Theme
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NftBurnScreen;
