// AUTO-GENERATED DRAFT SCREEN: SearchAutocomplete
import React, { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { useDebounce } from 'use-debounce';
import { trpc } from '@/utils/trpc'; // Assuming tRPC setup
import { Loader2, XCircle, Info } from 'lucide-react'; // For loading, error, and info indicators
import { cn } from '@/lib/utils'; // Utility for conditional class names

interface SearchAutocompleteProps {
  onSelect: (item: string) => void;
  initialValue?: string;
  placeholder?: string;
  className?: string;
}

export const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({
  onSelect,
  initialValue = '',
  placeholder = 'Search...', 
  className,
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [open, setOpen] = useState(false);
  const [displaySuggestions, setDisplaySuggestions] = useState<string[]>([]);

  // tRPC hook for fetching suggestions
  const { data: suggestions, isLoading, error, isError } = trpc.search.getSuggestions.useQuery(
    { query: debouncedSearchTerm },
    { 
      enabled: debouncedSearchTerm.length > 2,
      staleTime: 60 * 1000, // Cache data for 1 minute
      onSuccess: (data) => {
        setDisplaySuggestions(data || []);
      },
      onError: () => {
        setDisplaySuggestions([]);
      }
    }
  );

  const handleSelect = useCallback((value: string) => {
    setSearchTerm(value);
    onSelect(value);
    setOpen(false);
  }, [onSelect]);

  useEffect(() => {
    if (searchTerm.length > 2 && !open && !isLoading && !isError && displaySuggestions.length > 0) {
      setOpen(true);
    } else if ((searchTerm.length <= 2 || isError || displaySuggestions.length === 0) && open) {
      setOpen(false);
    }
  }, [searchTerm, open, isLoading, isError, displaySuggestions]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className={cn("relative w-full", className)}>
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={placeholder}
            className="w-full pr-10 dark:bg-gray-800 dark:text-gray-50 dark:border-gray-700 focus-visible:ring-offset-background focus-visible:ring-ring"
            aria-label="Search input with autocomplete functionality"
            role="combobox"
            aria-expanded={open}
            aria-controls="suggestions-list"
          />
          {isLoading && (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground dark:text-gray-400" aria-label="Loading suggestions" />
          )}
          {isError && (
            <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-red-500 dark:text-red-400" aria-label="Error fetching suggestions" />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-50">
        <Command shouldFilter={false} aria-label="Search suggestions">
          <CommandInput
            placeholder={placeholder}
            value={searchTerm}
onValueChange={setSearchTerm}
            className="dark:bg-gray-800 dark:text-gray-50 dark:border-gray-700"
            aria-label="Search input for filtering suggestions"
          />
          <CommandList id="suggestions-list">
            {isError && (
              <CommandEmpty className="text-red-500 dark:text-red-400 flex items-center justify-center p-4">
                <XCircle className="h-4 w-4 mr-2" /> Failed to load suggestions.
              </CommandEmpty>
            )}
            {isLoading && (
              <CommandEmpty className="flex items-center justify-center p-4">
                <Loader2 className="h-4 w-4 animate-spin mr-2" /> Loading suggestions...
              </CommandEmpty>
            )}
            {!isLoading && !isError && displaySuggestions.length === 0 && searchTerm.length > 2 && (
              <CommandEmpty className="flex items-center justify-center p-4">
                <Info className="h-4 w-4 mr-2" /> No results found for "{searchTerm}".
              </CommandEmpty>
            )}
            <CommandGroup heading="Suggestions" className="dark:text-gray-300">
              {displaySuggestions.map((item) => (
                <CommandItem
                  key={item}
                  value={item}
                  onSelect={() => handleSelect(item)}
                  className="dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                >
                  {item}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchAutocomplete;
