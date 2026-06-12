// AUTO-GENERATED DRAFT SCREEN: ValidatorSelection
import React, { useState, useEffect, createContext, useContext } from 'react';

// Mock tRPC setup
interface TRPCContextType {
  useQuery: <TData, TError>(key: string, fetcher: () => Promise<TData>) => {
    data: TData | undefined;
    isLoading: boolean;
    error: TError | null;
  };
}

const TRPCContext = createContext<TRPCContextType | undefined>(undefined);

const useTRPC = () => {
  const context = useContext(TRPCContext);
  if (context === undefined) {
    throw new Error('useTRPC must be used within a TRPCProvider');
  }
  return context;
};

const TRPCProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const useQuery = <TData, TError>(key: string, fetcher: () => Promise<TData>) => {
    const [data, setData] = useState<TData | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<TError | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          setError(null);
          const result = await fetcher();
          setData(result);
        } catch (err) {
          setError(err as TError);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }, [key, fetcher]);

    return { data, isLoading, error };
  };

  return (
    <TRPCContext.Provider value={{ useQuery }}>
      {children}
    </TRPCContext.Provider>
  );
};

// Component specific types
interface Validator {
  id: string;
  name: string;
  stake: number;
  commission: number;
  active: boolean;
}

interface ValidatorSelectionProps {
  // Define props here if any
}

const ValidatorSelection: React.FC<ValidatorSelectionProps> = () => {
  const { useQuery } = useTRPC();
  const [selectedValidator, setSelectedValidator] = useState<Validator | null>(null);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true); // Simulate dark theme toggle

  // Mock tRPC query for validators
  const { data: validators, isLoading, error } = useQuery<Validator[], Error>(
    'validators.list',
    async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockValidators: Validator[] = [
        { id: '1', name: 'Validator A', stake: 100000, commission: 0.05, active: true },
        { id: '2', name: 'Validator B', stake: 150000, commission: 0.03, active: true },
        { id: '3', name: 'Validator C', stake: 80000, commission: 0.07, active: false },
        { id: '4', name: 'Validator D', stake: 200000, commission: 0.02, active: true },
      ];
      // Simulate an error for demonstration
      // if (Math.random() > 0.8) throw new Error('Failed to fetch validators due to network issue.');
      return mockValidators;
    }
  );

  const handleSelectValidator = (validator: Validator) => {
    setSelectedValidator(validator);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    // In a real app, you'd update a global theme context or add/remove a 'dark' class on the html element
  };

  const themeClass = isDarkTheme ? 'dark' : 'light';

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${themeClass} bg-background text-foreground`} role="status" aria-live="polite">
        <p className="text-lg">Loading validators...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${themeClass} bg-background text-foreground`} role="alert">
        <p className="text-lg text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${themeClass} bg-background text-foreground p-6`}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Crypto: Validator Selection</h1>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label={`Toggle ${isDarkTheme ? 'Light' : 'Dark'} Theme`}
        >
          Toggle {isDarkTheme ? 'Light' : 'Dark'} Theme
        </button>
      </div>

      <section aria-labelledby="validator-list-heading">
        <h2 id="validator-list-heading" className="sr-only">Available Validators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="radiogroup" aria-label="Select a validator">
          {validators?.map((validator) => (
            <div
              key={validator.id}
              className={`relative p-6 border rounded-lg shadow-sm transition-all duration-200 ease-in-out
                ${selectedValidator?.id === validator.id
                  ? 'border-blue-500 ring-2 ring-blue-500 bg-blue-500/10'
                  : 'border-border bg-card hover:shadow-md'}
                ${!validator.active ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
              `}
              onClick={() => validator.active && handleSelectValidator(validator)}
              role="radio"
              aria-checked={selectedValidator?.id === validator.id}
              tabIndex={validator.active ? 0 : -1}
              aria-label={`Validator ${validator.name}`}
            >
              <h3 className="text-xl font-semibold mb-2">{validator.name}</h3>
              <p className="text-sm text-muted-foreground">Stake: <span className="font-medium text-foreground">{validator.stake.toLocaleString()}</span></p>
              <p className="text-sm text-muted-foreground">Commission: <span className="font-medium text-foreground">{(validator.commission * 100).toFixed(2)}%</span></p>
              <p className="text-sm text-muted-foreground">Status: <span className={`font-medium ${validator.active ? 'text-green-500' : 'text-red-500'}`}>{validator.active ? 'Active' : 'Inactive'}</span></p>
              {!validator.active && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
                  <span className="text-sm font-semibold text-muted-foreground">Inactive</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {selectedValidator && (
        <section aria-labelledby="selected-validator-heading" className="mt-10 p-8 border rounded-lg shadow-lg bg-card">
          <h2 id="selected-validator-heading" className="text-3xl font-bold mb-6">Selected Validator Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
            <div>
              <p className="text-muted-foreground">Name:</p>
              <p className="font-semibold">{selectedValidator.name}</p>
            </div>
            <div>
              <p className="text-muted-foreground">ID:</p>
              <p className="font-semibold">{selectedValidator.id}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Stake:</p>
              <p className="font-semibold">{selectedValidator.stake.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Commission:</p>
              <p className="font-semibold">{(selectedValidator.commission * 100).toFixed(2)}%</p>
            </div>
            <div>
              <p className="text-muted-foreground">Status:</p>
              <p className={`font-semibold ${selectedValidator.active ? 'text-green-500' : 'text-red-500'}`}>{selectedValidator.active ? 'Active' : 'Inactive'}</p>
            </div>
          </div>
          <button
            className="mt-8 px-6 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label={`Delegate to ${selectedValidator.name}`}
          >
            Delegate to {selectedValidator.name}
          </button>
        </section>
      )}
    </div>
  );
};

// Export the component wrapped in the TRPCProvider
const WrappedValidatorSelection: React.FC<ValidatorSelectionProps> = (props) => (
  <TRPCProvider>
    <ValidatorSelection {...props} />
  </TRPCProvider>
);

export default WrappedValidatorSelection;
