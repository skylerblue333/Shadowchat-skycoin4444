// AUTO-GENERATED DRAFT SCREEN: SearchFilters
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// shadcn/ui components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// tRPC hooks (placeholder - replace with actual tRPC client setup)
const trpc = { 
  useQuery: (key: string) => ({ data: [], isLoading: false, error: null }),
  useMutation: (key: string) => ({ mutate: () => {}, isLoading: false, error: null }),
};

const formSchema = z.object({
  keyword: z.string().optional(),
  category: z.string().optional(),
  priceMin: z.number().optional(),
  priceMax: z.number().optional(),
  inStock: z.boolean().optional(),
});

type SearchFormValues = z.infer<typeof formSchema>;

const SearchFilters: React.FC = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm<SearchFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: '',
      category: '',
      priceMin: undefined,
      priceMax: undefined,
      inStock: false,
    },
  });

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // Simulate dark theme toggle based on system preference or user setting
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkTheme(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDarkTheme(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const onSubmit = (data: SearchFormValues) => {
    console.log('Search Filters Submitted:', data);
    // Implement actual search logic here, potentially using tRPC mutation
  };

  // Simulate loading state for demonstration
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading filters...</div>;
  }

  return (
    <div className={`p-6 rounded-lg shadow-md ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      <h2 className="text-2xl font-bold mb-4">Search Filters</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="keyword">Keyword</Label>
          <Input id="keyword" {...register('keyword')} placeholder="Enter keyword" />
          {errors.keyword && <p className="text-red-500 text-sm">{errors.keyword.message}</p>}
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select onValueChange={(value) => control._formValues.category = value} defaultValue="">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="books">Books</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
            </SelectContent>
          </Select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="priceMin">Min Price</Label>
            <Input id="priceMin" type="number" {...register('priceMin', { valueAsNumber: true })} placeholder="Min" />
            {errors.priceMin && <p className="text-red-500 text-sm">{errors.priceMin.message}</p>}
          </div>
          <div>
            <Label htmlFor="priceMax">Max Price</Label>
            <Input id="priceMax" type="number" {...register('priceMax', { valueAsNumber: true })} placeholder="Max" />
            {errors.priceMax && <p className="text-red-500 text-sm">{errors.priceMax.message}</p>}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="inStock" {...register('inStock')} />
          <Label htmlFor="inStock">In Stock Only</Label>
          {errors.inStock && <p className="text-red-500 text-sm">{errors.inStock.message}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Applying...' : 'Apply Filters'}
        </Button>
      </form>
    </div>
  );
};

export default SearchFilters;
