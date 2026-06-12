// @ts-nocheck
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as __ns_lucide_react_1 from 'lucide-react';
const { Search, ChevronRight, Loader2 } = (__ns_lucide_react_1 as any);
import { z } from 'zod';
import * as __ns_react_hook_form_2 from 'react-hook-form';
const { useForm } = (__ns_react_hook_form_2 as any);
import * as __ns__hookform_resolvers_zod_3 from '@hookform/resolvers/zod';
const { zodResolver } = (__ns__hookform_resolvers_zod_3 as any);
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: HelpCategories

/* --- injected local data stubs (replaces non-existent backend hooks) --- */
function useStubQuery<T = any>(initial?: T) {
  return { data: initial as T, isLoading: false, isPending: false, isError: false, error: null as any, refetch: () => {} };
}
function useStubMutation<T = any>() {
  return {
    mutate: (_v?: any) => {}, mutateAsync: async (_v?: any) => ({} as T),
    isLoading: false, isPending: false, isError: false, isSuccess: false, error: null as any, data: undefined as any, reset: () => {},
  };
}
/* ----------------------------------------------------------------------- */


interface Category {
  id: string;
  name: string;
  description: string;
}

const searchSchema = z.object({
  query: z.string().optional(),
});

type SearchFormValues = z.infer<typeof searchSchema>;

const fetchCategories = async (searchQuery?: string): Promise<Category[]> => {
  // Simulate API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const allCategories = [
        { id: '1', name: 'Getting Started', description: 'Learn how to set up your SKYCOIN4444 account and begin your journey.' },
        { id: '2', name: 'Troubleshooting Common Issues', description: 'Find solutions for frequently encountered problems and errors.' },
        { id: '3', name: 'Security & Privacy Best Practices', description: 'Understand how to keep your account and data safe and private.' },
        { id: '4', name: 'Billing & Payments Management', description: 'Manage your subscriptions, view invoices, and update payment methods.' },
        { id: '5', name: 'Integrations with Other Services', description: 'Connect SKYCOIN4444 seamlessly with your favorite third-party applications.' },
        { id: '6', name: 'Advanced Features & Customization', description: 'Explore advanced functionalities and personalize your SKYCOIN4444 experience.' },
        { id: '7', name: 'API Documentation & Development', description: 'Access our comprehensive API documentation for developers and integrators.' },
        { id: '8', name: 'Community Support & Forums', description: 'Engage with the SKYCOIN4444 community and get peer-to-peer assistance.' },
      ];

      if (searchQuery) {
        const filteredCategories = allCategories.filter(category =>
          category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          category.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        resolve(filteredCategories);
      } else {
        resolve(allCategories);
      }
    }, 1000);
  });
};

const HelpCategories: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: '',
    },
  });

  const { data: categories, isLoading, isError, refetch } = useQuery<Category[]>(
    { queryKey: ['helpCategories', searchQuery], queryFn: () => fetchCategories(searchQuery) }
  );

  const onSubmit = (values: SearchFormValues) => {
    setSearchQuery(values.query || '');
    refetch();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 antialiased">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 text-center leading-tight">SKYCOIN4444 Help Center</h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-10 text-center font-light">Your comprehensive guide to getting the most out of SKYCOIN4444.</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="relative mb-12">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Search for articles, topics, or keywords..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 text-base"
                      aria-label="Search help articles"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="sr-only">Search</Button>
          </form>
        </Form>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <span className="ml-3 text-lg text-gray-700 dark:text-gray-300">Loading help categories...</span>
          </div>
        ) : isError ? (
          <div className="flex justify-center items-center h-64 text-red-500 text-lg">
            <p>Error loading help categories. Please try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories?.length === 0 ? (
              <p className="col-span-full text-center text-gray-600 dark:text-gray-400 text-lg">No categories found for your search query.</p>
            ) : (
              categories?.map((category) => (
                <Card key={category.id} className="dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 group">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-gray-900 dark:text-gray-100 text-xl font-semibold group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">{category.name}</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400 text-sm">{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="link" className="p-0 h-auto text-blue-600 dark:text-blue-400 font-medium group-hover:underline">
                      View articles <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpCategories;
