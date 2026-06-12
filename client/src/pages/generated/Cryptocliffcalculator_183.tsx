// AUTO-GENERATED DRAFT SCREEN: CryptoCliffCalculator
import React, { useState, useEffect, useCallback } from 'react';
import { cn } from './lib/utils';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Button } from './components/ui/button';

interface CryptoCliffCalculatorProps {
  // Define props here if any
}

// Simulate tRPC context and hooks
const trpc = {
  crypto: {
    getCliffData: {
      useQuery: (params: { initialInvestment: number; cliffDuration: number; vestingDuration: number; tokenPrice: number }) => {
        const [data, setData] = useState<{ vestedTokens: number; currentValue: number } | null>(null);
        const [isLoading, setIsLoading] = useState<boolean>(false);
        const [error, setError] = useState<string | null>(null);

        useEffect(() => {
          const calculate = async () => {
            setIsLoading(true);
            setError(null);
            try {
              await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay

              if (params.initialInvestment <= 0 || params.tokenPrice <= 0 || params.vestingDuration <= 0) {
                throw new Error('Invalid input for calculation.');
              }

              const totalTokens = params.initialInvestment / params.tokenPrice;
              const monthlyVesting = totalTokens / params.vestingDuration;
              const calculatedVestedTokens = monthlyVesting * (params.vestingDuration - params.cliffDuration);
              const calculatedCurrentValue = calculatedVestedTokens * params.tokenPrice;

              setData({ vestedTokens: calculatedVestedTokens, currentValue: calculatedCurrentValue });
            } catch (err: any) {
              setError(err.message || 'An unknown error occurred during calculation.');
            } finally {
              setIsLoading(false);
            }
          };

          calculate();
        }, [params.initialInvestment, params.cliffDuration, params.vestingDuration, params.tokenPrice]);

        return { data, isLoading, error };
      },
    },
  },
};

const CryptoCliffCalculator: React.FC<CryptoCliffCalculatorProps> = () => {
  const [initialInvestment, setInitialInvestment] = useState<number>(10000);
  const [cliffDuration, setCliffDuration] = useState<number>(12); // in months
  const [vestingDuration, setVestingDuration] = useState<number>(48); // in months
  const [tokenPrice, setTokenPrice] = useState<number>(0.5);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  const { data, isLoading, error } = trpc.crypto.getCliffData.useQuery({
    initialInvestment,
    cliffDuration,
    vestingDuration,
    tokenPrice,
  });

  const toggleTheme = useCallback(() => {
    setIsDarkTheme(prev => !prev);
    document.documentElement.classList.toggle('dark');
  }, []);

  return (
    <div className={cn("p-4 max-w-md mx-auto shadow-md rounded-lg", isDarkTheme ? 'dark bg-gray-800 text-white' : 'bg-white text-gray-900')}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Crypto: Cliff Calculator</h1>
        <Button onClick={toggleTheme} variant="outline" size="sm">
          Toggle {isDarkTheme ? 'Light' : 'Dark'} Mode
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="initialInvestment">Initial Investment ($)</Label>
          <Input
            type="number"
            id="initialInvestment"
            value={initialInvestment}
            onChange={(e) => setInitialInvestment(parseFloat(e.target.value))}
            aria-label="Initial Investment"
            min="0"
          />
        </div>
        <div>
          <Label htmlFor="cliffDuration">Cliff Duration (months)</Label>
          <Input
            type="number"
            id="cliffDuration"
            value={cliffDuration}
            onChange={(e) => setCliffDuration(parseFloat(e.target.value))}
            aria-label="Cliff Duration"
            min="0"
          />
        </div>
        <div>
          <Label htmlFor="vestingDuration">Vesting Duration (months)</Label>
          <Input
            type="number"
            id="vestingDuration"
            value={vestingDuration}
            onChange={(e) => setVestingDuration(parseFloat(e.target.value))}
            aria-label="Vesting Duration"
            min="0"
          />
        </div>
        <div>
          <Label htmlFor="tokenPrice">Current Token Price ($)</Label>
          <Input
            type="number"
            id="tokenPrice"
            value={tokenPrice}
            onChange={(e) => setTokenPrice(parseFloat(e.target.value))}
            aria-label="Current Token Price"
            min="0"
            step="0.01"
          />
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-2">Results</h2>
        {isLoading && <p className="text-center py-2">Calculating...</p>}
        {error && <p className="text-center py-2 text-red-500">Error: {error}</p>}
        {data && !isLoading && !error && (
          <>
            <p>Vested Tokens: <span className="font-medium">{data.vestedTokens.toFixed(2)}</span></p>
            <p>Current Value: <span className="font-medium">${data.currentValue.toFixed(2)}</span></p>
          </>
        )}
      </div>
    </div>
  );
};

export default CryptoCliffCalculator;
