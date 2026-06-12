// AUTO-GENERATED DRAFT SCREEN: CurrencyPairSelector
import React, { useState, useEffect, useCallback } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

/**
 * @typedef {Object} CurrencyPair
 * @property {string} symbol - The symbol of the currency pair (e.g., "BTC/USD").
 * @property {string} name - A more descriptive name for the currency pair.
 */

/**
 * A mock tRPC-like hook to simulate fetching currency pair data.
 * In a real application, this would interact with a tRPC backend.
 * It includes simulated loading, error, and data states.
 * @returns {{ data: CurrencyPair[] | null, isLoading: boolean, isError: boolean, refetch: () => void }}
 */
const useCurrencyPairs = () => {
  const [data, setData] = useState<CurrencyPair[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      // Simulate API call delay and potential failure
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (Math.random() < 0.1) { // 10% chance of error
        throw new Error("Failed to fetch currency pairs.");
      }
      const mockData: CurrencyPair[] = [
        { symbol: 'BTC/USD', name: 'Bitcoin / US Dollar' },
        { symbol: 'ETH/USD', name: 'Ethereum / US Dollar' },
        { symbol: 'XRP/USD', name: 'Ripple / US Dollar' },
        { symbol: 'LTC/USD', name: 'Litecoin / US Dollar' },
        { symbol: 'ADA/USD', name: 'Cardano / US Dollar' },
        { symbol: 'SOL/USD', name: 'Solana / US Dollar' },
        { symbol: 'DOT/USD', name: 'Polkadot / US Dollar' },
      ];
      setData(mockData);
    } catch (error) {
      console.error("Error fetching currency pairs:", error);
      setIsError(true);
      setData(null); // Clear data on error
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, isError, refetch: fetchData };
};

interface CurrencyPairSelectorProps {
  /**
   * Callback function triggered when a currency pair is selected.
   * @param {string} pair - The symbol of the selected currency pair (e.g., "BTC/USD").
   */
  onSelectPair: (pair: string) => void;
  /**
   * The initial currency pair to be selected in the dropdown.
   */
  initialPair?: string;
}

/**
 * `CurrencyPairSelector` is a production-grade React component for selecting cryptocurrency pairs.
 * It features: React 19, TypeScript, Tailwind CSS v4, shadcn/ui, mock tRPC hooks for data fetching,
 * comprehensive error handling, loading states, dark theme support, and accessibility.
 * The component is designed to be concise and reusable, adhering to a strict line count.
 *
 * @component
 * @param {CurrencyPairSelectorProps} props - Props for the CurrencyPairSelector component.
 * @returns {JSX.Element}
 */
export const CurrencyPairSelector: React.FC<CurrencyPairSelectorProps> = ({ onSelectPair, initialPair }) => {
  const { data: currencyPairs, isLoading, isError, refetch } = useCurrencyPairs();
  const [selectedPair, setSelectedPair] = useState<string | undefined>(initialPair);

  useEffect(() => {
    if (currencyPairs && !selectedPair && currencyPairs.length > 0) {
      setSelectedPair(currencyPairs[0].symbol);
      onSelectPair(currencyPairs[0].symbol);
    }
  }, [currencyPairs, selectedPair, onSelectPair]);

  const handleValueChange = (value: string) => {
    setSelectedPair(value);
    onSelectPair(value);
  };

  if (isLoading) {
    return (
      <div
        className="w-full max-w-xs mx-auto p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex flex-col space-y-4 items-center justify-center"
        aria-live="polite"
        aria-busy="true"
      >
        <div className="h-8 w-3/4 animate-pulse bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-8 w-1/2 animate-pulse bg-gray-200 dark:bg-gray-700 rounded"></div>
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading currency pairs...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="w-full max-w-xs mx-auto p-4 rounded-lg shadow-lg bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-200 border border-red-200 dark:border-red-700 flex flex-col space-y-2 items-center justify-center"
        role="alert"
        aria-live="assertive"
      >
        <p className="font-semibold">Error loading currency pairs.</p>
        <p className="text-sm">Please check your connection and try again.</p>
        <button
          onClick={refetch}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={cn(
      "w-full max-w-xs mx-auto p-4 rounded-lg shadow-lg",
      "bg-white dark:bg-gray-800",
      "border border-gray-200 dark:border-gray-700"
    )}>
      <label htmlFor="currency-pair-select" className="sr-only">Select Currency Pair</label>
      <Select value={selectedPair} onValueChange={handleValueChange}>
        <SelectTrigger
          id="currency-pair-select"
          className="w-full [&>span]:line-clamp-1 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
          aria-label="Select a currency pair"
        >
          <SelectValue placeholder="Select a currency pair" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          {currencyPairs?.map((pair) => (
            <SelectItem key={pair.symbol} value={pair.symbol} className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
              {pair.name} ({pair.symbol})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CurrencyPairSelector;
