// AUTO-GENERATED DRAFT SCREEN: WrappedTokenSwap
import React, { useState, createContext, useContext } from 'react';
import { Button } from './components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { useQuery, useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';

// --- Dark Mode Context ---
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'dark' ? 'dark' : ''}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// --- Simulated tRPC Hooks ---
interface Token {
  id: string;
  name: string;
  symbol: string;
}

interface SwapParams {
  fromToken: string;
  toToken: string;
  amount: number;
}

interface SwapResult {
  transactionId: string;
  fromAmount: number;
  toAmount: number;
  exchangeRate: number;
}

const mockTokens: Token[] = [
  { id: 'eth', name: 'Ethereum', symbol: 'ETH' },
  { id: 'usdc', name: 'USD Coin', symbol: 'USDC' },
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC' },
];

const fetchTokens = async (): Promise<Token[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockTokens), 500);
  });
};

const performSwap = async (params: SwapParams): Promise<SwapResult> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (params.amount <= 0) {
        reject(new Error('Swap amount must be greater than zero.'));
        return;
      }
      if (params.fromToken === params.toToken) {
        reject(new Error('Cannot swap the same token.'));
        return;
      }
      const exchangeRate = Math.random() * 1000 + 1000; // Simulate varying exchange rate
      resolve({
        transactionId: `tx-${Date.now()}`,
        fromAmount: params.amount,
        toAmount: params.amount * exchangeRate,
        exchangeRate,
      });
    }, 1500);
  });
};

const useGetTokens = () => {
  return useQuery<Token[], Error>({
    queryKey: ['tokens'],
    queryFn: fetchTokens,
  });
};

const useSwapTokens = () => {
  return useMutation<SwapResult, Error, SwapParams>({
    mutationFn: performSwap,
  });
};

// --- Token Swap Component ---
const TokenSwap: React.FC = () => {
  const [fromToken, setFromToken] = useState<string>('eth');
  const [toToken, setToToken] = useState<string>('usdc');
  const [fromAmount, setFromAmount] = useState<number>(0);
  const [toAmount, setToAmount] = useState<number>(0);
  const { theme, toggleTheme } = useTheme();

  const { data: tokens, isLoading: isLoadingTokens, error: tokensError } = useGetTokens();
  const { mutate: swap, isPending: isSwapping, error: swapError, data: swapResult } = useSwapTokens();

  React.useEffect(() => {
    if (fromAmount > 0 && fromToken && toToken && tokens) {
      const rate = tokens.find(t => t.id === fromToken) && tokens.find(t => t.id === toToken) ? 1800 : 1; // Simplified mock rate
      setToAmount(fromAmount * rate);
    } else {
      setToAmount(0);
    }
  }, [fromAmount, fromToken, toToken, tokens]);

  const handleSwap = () => {
    if (fromAmount > 0 && fromToken && toToken) {
      swap({ fromToken, toToken, amount: fromAmount });
    }
  };

  if (isLoadingTokens) return <div className="text-center text-lg">Loading tokens...</div>;
  if (tokensError) return <div className="text-center text-red-500">Error loading tokens: {tokensError.message}</div>;

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-card shadow-lg rounded-lg p-6 border border-border">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Token Swap</h1>
          <Button variant="outline" size="sm" onClick={toggleTheme}>
            Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="from-token" className="block text-sm font-medium text-muted-foreground mb-1">From</label>
            <div className="flex items-center space-x-2">
              <Select value={fromToken} onValueChange={setFromToken}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a token" />
                </SelectTrigger>
                <SelectContent>
                  {tokens?.map((token) => (
                    <SelectItem key={token.id} value={token.id}>
                      {token.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input
                type="number"
                placeholder="0.0"
                value={fromAmount === 0 ? '' : fromAmount}
                onChange={(e) => setFromAmount(parseFloat(e.target.value) || 0)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button onClick={handleSwap} disabled={isSwapping || fromAmount <= 0 || !fromToken || !toToken}>
              {isSwapping ? 'Swapping...' : 'Swap'}
            </Button>
          </div>

          <div>
            <label htmlFor="to-token" className="block text-sm font-medium text-muted-foreground mb-1">To</label>
            <div className="flex items-center space-x-2">
              <Select value={toToken} onValueChange={setToToken}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a token" />
                </SelectTrigger>
                <SelectContent>
                  {tokens?.map((token) => (
                    <SelectItem key={token.id} value={token.id}>
                      {token.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input
                type="number"
                placeholder="0.0"
                value={toAmount === 0 ? '' : toAmount.toFixed(4)}
                readOnly
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        {swapError && <div className="text-red-500 mt-4">Error: {swapError.message}</div>}
        {swapResult && (
          <div className="mt-6 text-sm text-muted-foreground space-y-2">
            <p className="text-green-500 font-medium">Swap successful!</p>
            <div className="flex justify-between">
              <span>Transaction ID:</span>
              <span>{swapResult.transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span>Exchanged:</span>
              <span>{swapResult.fromAmount} {fromToken.toUpperCase()} for {swapResult.toAmount.toFixed(4)} {toToken.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span>Exchange Rate:</span>
              <span>1 {fromToken.toUpperCase()} = {swapResult.exchangeRate.toFixed(4)} {toToken.toUpperCase()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const queryClient = new QueryClient();

const WrappedTokenSwap: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TokenSwap />
    </ThemeProvider>
  </QueryClientProvider>
);

export default WrappedTokenSwap;
