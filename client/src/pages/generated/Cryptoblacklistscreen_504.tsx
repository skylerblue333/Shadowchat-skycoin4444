// AUTO-GENERATED DRAFT SCREEN: CryptoBlacklistScreen
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '../lib/utils';
import { Button } from '../../components/ui/button';

// Mock tRPC hooks for demonstration. In a real app, these would come from trpc.ts
const trpc = {
  blacklist: {
    useGetAll: () => ({ data: ['ScamCoin', 'PhishToken'], isLoading: false, isError: false }),
    useAdd: () => ({ mutate: (item: string) => console.log("Adding:", item), isLoading: false }),
    useRemove: () => ({ mutate: (id: string) => console.log("Removing:", id), isLoading: false }),
  },
};

const blacklistSchema = z.object({
  item: z.string().min(1, { message: "Blacklist item cannot be empty." }),
});

type BlacklistItem = z.infer<typeof blacklistSchema> & { id: string };

const CryptoBlacklistScreen: React.FC = () => {
  const [blacklist, setBlacklist] = useState<BlacklistItem[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<z.infer<typeof blacklistSchema>>({
    resolver: zodResolver(blacklistSchema),
  });

  const { data: initialBlacklist, isLoading: isLoadingBlacklist, isError: isErrorBlacklist } = trpc.blacklist.useGetAll();
  const { mutate: addBlacklistItem, isLoading: isAdding } = trpc.blacklist.useAdd();
  const { mutate: removeBlacklistItem, isLoading: isRemoving } = trpc.blacklist.useRemove();

  useEffect(() => {
    if (initialBlacklist) {
      setBlacklist(initialBlacklist.map((item: string, index: number) => ({ id: String(index), item })));
    }
  }, [initialBlacklist]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const onSubmit = (data: z.infer<typeof blacklistSchema>) => {
    const newItem: BlacklistItem = { id: String(blacklist.length + 1), item: data.item }; // Unique ID
    setBlacklist((prev) => [...prev, newItem]);
    addBlacklistItem(data.item);
    reset();
  };

  const handleRemove = (id: string) => {
    setBlacklist((prev) => prev.filter((item) => item.id !== id));
    removeBlacklistItem(id);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  if (isLoadingBlacklist) return <div className="text-center text-foreground">Loading blacklist...</div>;
  if (isErrorBlacklist) return <div className="text-center text-destructive">Error loading blacklist.</div>;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <Button onClick={toggleDarkMode} aria-label="Toggle dark mode">
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </Button>
      </div>

      <h1 className="text-4xl font-bold mb-8">Crypto Blacklist</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-card text-card-foreground p-6 rounded-lg shadow-md mb-8" aria-labelledby="add-item-heading">
        <h2 id="add-item-heading" className="sr-only">Add New Blacklist Item</h2>
        <div className="mb-4">
          <label htmlFor="item" className="block text-sm font-bold mb-2">Add Item</label>
          <input
            type="text"
            id="item"
            {...register("item")}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              errors.item && "border-destructive"
            )}
            placeholder="e.g., ScamCoin, RugPullToken"
            aria-invalid={errors.item ? "true" : "false"}
            aria-describedby={errors.item ? "item-error" : undefined}
          />
          {errors.item && <p id="item-error" className="text-destructive text-xs italic mt-2" role="alert">{errors.item.message}</p>}
        </div>
        <Button
          type="submit"
          disabled={isAdding}
          aria-live="polite"
        >
          {isAdding ? "Adding..." : "Add to Blacklist"}
        </Button>
      </form>

      <div className="w-full max-w-md bg-card text-card-foreground p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Blacklisted Items</h2>
        {blacklist.length === 0 ? (
          <p className="text-muted-foreground">No items in blacklist.</p>
        ) : (
          <ul aria-label="Blacklisted items">
            {blacklist.map((item) => (
              <li key={item.id} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                <span className="text-foreground">{item.item}</span>
                <Button
                  variant="destructive"
                  onClick={() => handleRemove(item.id)}
                  disabled={isRemoving}
                  aria-label={`Remove ${item.item} from blacklist`}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CryptoBlacklistScreen;
