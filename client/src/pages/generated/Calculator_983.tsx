// AUTO-GENERATED DRAFT SCREEN: Calculator
import React, { useState, useEffect } from 'react';
import { Button } from './components/ui/button';

// Mock tRPC client for demonstration purposes
const mockTrpcClient = {
  calculate: {
    useQuery: (input: string, options: any) => {
      const [data, setData] = useState<{ result: string } | undefined>(undefined);
      const [isLoading, setIsLoading] = useState<boolean>(false);
      const [isError, setIsError] = useState<boolean>(false);
      const [error, setError] = useState<any>(null);

      const refetch = async () => {
        if (!input) return;
        setIsLoading(true);
        setIsError(false);
        setError(null);
        try {
          // Simulate API call delay
          await new Promise(resolve => setTimeout(resolve, 500));
          // Basic and unsafe eval for demonstration. In a real app, use a secure math evaluator.
          const calculatedResult = eval(input).toString();
          setData({ result: calculatedResult });
          options.onSuccess?.({ result: calculatedResult });
        } catch (e: any) {
          setIsError(true);
          setError(e);
          options.onError?.(e);
        } finally {
          setIsLoading(false);
        }
      };

      useEffect(() => {
        if (options.enabled) {
          refetch();
        }
      }, [options.enabled, input]); // eslint-disable-line react-hooks/exhaustive-deps

      return { data, isLoading, isError, error, refetch };
    },
  },
};

// Mock trpc object for client-side usage
const trpc = {
  createClient: (config: any) => mockTrpcClient,
  Provider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  calculate: mockTrpcClient.calculate,
};

const Calculator: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [display, setDisplay] = useState<string>('0');
  const [history, setHistory] = useState<string[]>([]);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  const { data, isLoading, isError, error, refetch } = trpc.calculate.useQuery(input, {
    enabled: false, // Only run query manually
    onSuccess: (data) => {
      setDisplay(data.result);
      setHistory((prev) => [...prev, `${input} = ${data.result}`]);
      setInput(data.result); // Set result as new input for chained operations
    },
    onError: (err) => {
      setDisplay('Error');
      console.error('Calculation error:', err);
    },
  });

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  const handleButtonClick = (value: string) => {
    if (value === '=') {
      if (input) {
        refetch();
      }
    } else if (value === 'C') {
      setInput('');
      setDisplay('0');
      setHistory([]);
    } else if (value === '+/-') {
      if (input && input !== '0') {
        setInput((prev) => (prev.startsWith('-') ? prev.substring(1) : '-' + prev));
      }
    } else if (value === '%') {
      try {
        const currentValue = parseFloat(input);
        if (!isNaN(currentValue)) {
          setInput((currentValue / 100).toString());
        }
      } catch (e) {
        setDisplay('Error');
      }
    } else if (['+', '-', '*', '/'].includes(value)) {
      // Append operator if input is not empty, or replace last operator
      if (input) {
        const lastChar = input[input.length - 1];
        if (['+', '-', '*', '/'].includes(lastChar)) {
          setInput(input.slice(0, -1) + value);
        } else {
          setInput((prev) => prev + value);
        }
      }
    } else {
      setInput((prev) => (prev === '0' && value !== '.' ? value : prev + value));
    }
  };

  const buttons = [
    'C', '+/-', '%', '/',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '=',
  ];

  return (
    <div className={`flex items-center justify-center min-h-screen ${isDarkTheme ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-96">
        <div className="flex justify-end mb-4">
          <Button
            onClick={() => setIsDarkTheme(!isDarkTheme)}
            className="px-3 py-1 text-sm"
          >
            {isDarkTheme ? 'Light Theme' : 'Dark Theme'}
          </Button>
        </div>
        <div className="w-full p-4 mb-4 bg-gray-200 dark:bg-gray-700 rounded-md text-right text-3xl font-bold text-gray-800 dark:text-white">
          <div className="text-gray-600 dark:text-gray-400 text-lg h-6 overflow-hidden">{history[history.length - 1] || ''}</div>
          <div className="h-10 overflow-hidden">{isLoading ? 'Loading...' : isError ? 'Error' : input || '0'}</div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {buttons.map((button) => (
            <Button
              key={button}
              onClick={() => handleButtonClick(button)}
              className={`text-xl p-4 ${button === '=' ? 'col-span-2 bg-blue-500 hover:bg-blue-600' : ''} ${['/', '*', '-', '+', '%'].includes(button) ? 'bg-orange-500 hover:bg-orange-600' : ''}`}
            >
              {button}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
