// AUTO-GENERATED DRAFT SCREEN: CryptoFaqScreen
import React, { useState } from 'react';
import { trpc } from '@/utils/trpc';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Search, HelpCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Types
interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
}

export default function CryptoFaqScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // tRPC query for fetching FAQs
  const { data: faqs, isLoading, error, refetch } = trpc.faq.getFaqs.useQuery(
    { search: searchQuery, category: activeCategory },
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
    }
  );

  // tRPC query for fetching categories
  const { data: categories, isLoading: isLoadingCategories } = trpc.faq.getCategories.useQuery();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryClick = (category: string | null) => {
    setActiveCategory(category);
  };

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4 text-foreground dark:bg-slate-950">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-4">Failed to load FAQs. Please try again later.</p>
            <Button variant="outline" onClick={() => refetch()}>
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-slate-950">
      {/* Header Section */}
      <header className="border-b border-border bg-card px-6 py-12 text-center dark:bg-slate-900">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <HelpCircle className="h-8 w-8" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
            How can we help you?
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">
            Search our knowledge base or browse categories below to find answers to your crypto questions.
          </p>
          
          {/* Search Bar */}
          <div className="relative mx-auto max-w-xl">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for topics, keywords, or questions..."
              className="h-12 w-full rounded-full pl-10 pr-4 text-base shadow-sm focus-visible:ring-primary"
              value={searchQuery}
              onChange={handleSearchChange}
              aria-label="Search FAQs"
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Sidebar - Categories */}
          <aside className="md:col-span-3">
            <div className="sticky top-6 rounded-xl border border-border bg-card p-5 shadow-sm dark:bg-slate-900">
              <h2 className="mb-4 text-lg font-semibold">Categories</h2>
              
              {isLoadingCategories ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-8 w-full rounded-md" />
                  ))}
                </div>
              ) : (
                <nav className="space-y-1" aria-label="FAQ Categories">
                  <button
                    onClick={() => handleCategoryClick(null)}
                    className={`w-full rounded-md px-3 py-2 text-left text-sm font-medium transition-colors ${
                      activeCategory === null
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                    aria-current={activeCategory === null ? 'page' : undefined}
                  >
                    All Topics
                  </button>
                  {categories?.map((category: Category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className={`w-full rounded-md px-3 py-2 text-left text-sm font-medium transition-colors ${
                        activeCategory === category.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                      aria-current={activeCategory === category.id ? 'page' : undefined}
                    >
                      {category.name}
                    </button>
                  ))}
                </nav>
              )}
            </div>
          </aside>

          {/* Main Content - FAQ Accordion */}
          <div className="md:col-span-9">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">
                {searchQuery 
                  ? `Search results for "${searchQuery}"` 
                  : activeCategory 
                    ? categories?.find((c: Category) => c.id === activeCategory)?.name || 'Category'
                    : 'Frequently Asked Questions'}
              </h2>
              {!isLoading && faqs && (
                <span className="text-sm text-muted-foreground">
                  {faqs.length} {faqs.length === 1 ? 'result' : 'results'}
                </span>
              )}
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="rounded-lg border border-border p-4">
                    <Skeleton className="mb-2 h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="mt-2 h-4 w-5/6" />
                  </div>
                ))}
              </div>
            ) : faqs && faqs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq: FAQ) => (
                  <AccordionItem 
                    key={faq.id} 
                    value={faq.id}
                    className="rounded-lg border border-border bg-card px-4 shadow-sm dark:bg-slate-900"
                  >
                    <AccordionTrigger className="text-left text-base font-medium hover:no-underline [&[data-state=open]]:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
                <div className="mb-4 rounded-full bg-muted p-3">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mb-1 text-lg font-semibold">No results found</h3>
                <p className="text-muted-foreground max-w-sm">
                  We couldn't find any FAQs matching your current search or category filter. Try adjusting your criteria.
                </p>
                {(searchQuery || activeCategory) && (
                  <Button 
                    variant="link" 
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory(null);
                    }}
                    className="mt-4"
                  >
                    Clear all filters
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
