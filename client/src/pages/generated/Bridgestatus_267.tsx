// AUTO-GENERATED DRAFT SCREEN: BridgeStatus
import React from 'react';
import { cn } from '@/lib/utils';

interface BridgeStatusProps {
  className?: string;
}

const BridgeStatus: React.FC<BridgeStatusProps> = ({ className }) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<string | null>(null);

  // Simulate tRPC hook
  React.useEffect(() => {
    const fetchBridgeStatus = async () => {
      try {
        setLoading(true);
        setError(null);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        const data = { status: 'Operational' }; // Replace with actual tRPC call
        setStatus(data.status);
      } catch (err) {
        setError('Failed to fetch bridge status.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBridgeStatus();
  }, []);

  if (loading) {
    return (
      <div className={cn("flex items-center justify-center p-4 text-gray-500 dark:text-gray-400", className)}>
        Loading bridge status...
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("flex items-center justify-center p-4 text-red-500 dark:text-red-400", className)}>
        Error: {error}
      </div>
    );
  }

  return (
    <div className={cn("p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800", className)}>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">SKYCOIN4444 Bridge Status</h2>
      <p className="text-gray-600 dark:text-gray-300">
        Status: <span className="font-medium text-green-600 dark:text-green-400">{status}</span>
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Last updated: {new Date().toLocaleTimeString()}</p>
    </div>
  );
};

export default BridgeStatus;
