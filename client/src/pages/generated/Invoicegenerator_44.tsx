// AUTO-GENERATED DRAFT SCREEN: InvoiceGenerator
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// import { trpc } from '@/utils/trpc'; // Placeholder for tRPC

const invoiceSchema = z.object({
  clientName: z.string().min(1, 'Client name is required'),
  itemName: z.string().min(1, 'Item name is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  price: z.number().min(0.01, 'Price must be greater than 0'),
});

type InvoiceFormValues = z.infer<typeof invoiceSchema>;

const InvoiceGenerator: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
  });

  // Placeholder for tRPC mutation
  // const createInvoice = trpc.invoice.create.useMutation({
  //   onMutate: () => { setIsLoading(true); setError(null); },
  //   onSuccess: () => { setIsLoading(false); alert('Invoice created successfully!'); },
  //   onError: (err) => { setIsLoading(false); setError(err.message); },
  // });

  const onSubmit = async (data: InvoiceFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Invoice data:', data);
      alert('Invoice generated successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to generate invoice.');
    } finally {
      setIsLoading(false);
    }
    // createInvoice.mutate(data);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${isDarkTheme ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Crypto Invoice Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="clientName">Client Name</Label>
              <Input id="clientName" {...register('clientName')} className={errors.clientName ? 'border-red-500' : ''} />
              {errors.clientName && <p className="text-red-500 text-sm mt-1">{errors.clientName.message}</p>}
            </div>
            <div>
              <Label htmlFor="itemName">Item Name</Label>
              <Input id="itemName" {...register('itemName')} className={errors.itemName ? 'border-red-500' : ''} />
              {errors.itemName && <p className="text-red-500 text-sm mt-1">{errors.itemName.message}</p>}
            </div>
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input id="quantity" type="number" {...register('quantity', { valueAsNumber: true })} className={errors.quantity ? 'border-red-500' : ''} />
              {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>}
            </div>
            <div>
              <Label htmlFor="price">Price (USD)</Label>
              <Input id="price" type="number" step="0.01" {...register('price', { valueAsNumber: true })} className={errors.price ? 'border-red-500' : ''} />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="dark-mode"
                checked={isDarkTheme}
                onCheckedChange={setIsDarkTheme}
                aria-label="Toggle dark mode"
              />
              <Label htmlFor="dark-mode">Dark Mode</Label>
            </div>
            {error && <p className="text-red-500 text-sm mt-1">Error: {error}</p>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Generating...' : 'Generate Invoice'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceGenerator;
