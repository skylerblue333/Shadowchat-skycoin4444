// AUTO-GENERATED DRAFT SCREEN: CryptoBlockExplorerLink

import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query'; // Placeholder for tRPC/react-query integration
import { cn } from '@/lib/utils'; // Utility for conditional class names, typically from shadcn/ui
import { Button } from '@/components/ui/button'; // shadcn/ui Button component
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'; // shadcn/ui Alert for error display
import { Terminal, ExternalLink } from 'lucide-react'; // Icons for better UX and accessibility

interface CryptoBlockExplorerLinkProps {
  /**
   * The cryptocurrency address to display and link to in the block explorer.
   * This is a required prop and should be a valid address string.
   */
  address: string;
  /**
   * The base URL of the block explorer. For example, 'https://etherscan.io'.
   * This is a required prop and should be a valid URL.
   */
  explorerUrl: string;
  /**
   * Optional title for the component. Defaults to 'Block Explorer'.
   */
  title?: string;
  /**
   * Optional CSS class names to apply to the root element of the component.
   */
  className?: string;
}

/**
 * Simulates fetching the block explorer link. In a real application, this would be a tRPC call
 * or another data fetching mechanism that constructs the full URL based on the address and base explorer URL.
 * @param address The cryptocurrency address.
 * @param explorerUrl The base URL of the block explorer.
 * @returns A promise that resolves with the full block explorer URL.
 */
const fetchBlockExplorerLink = async (address: string, explorerUrl: string): Promise<string> => {
  // Simulate network delay and processing for a production-like experience.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!address || !explorerUrl) {
        reject(new Error('Address or explorer URL is missing.'));
        return;
      }
      try {
        const url = new URL(`${explorerUrl}/address/${address}`);
        resolve(url.toString());
      } catch (e) {
        reject(new Error('Invalid explorer URL provided.'));
      }
    }, 800); // Simulate a realistic API call delay
  });
};

/**
 * `CryptoBlockExplorerLink` is a React component that displays a link to a cryptocurrency
 * block explorer for a given address. It includes loading states, error handling,
 * dark theme compatibility, and accessibility features.
 *
 * @param {CryptoBlockExplorerLinkProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered React component.
 */
const CryptoBlockExplorerLink: React.FC<CryptoBlockExplorerLinkProps> = ({
  address,
  explorerUrl,
  title = 'Block Explorer',
  className,
}) => {
  // useQuery hook for data fetching, simulating tRPC integration.
  // The query key ensures that the data is re-fetched only when address or explorerUrl changes.
  const { data: blockExplorerLink, isLoading, isError, error, refetch } = useQuery(
    ['blockExplorerLink', address, explorerUrl], // Unique query key
    () => fetchBlockExplorerLink(address, explorerUrl), // Query function
    {
      staleTime: Infinity, // The link for a given address/explorerUrl is unlikely to change
      retry: 1, // Only retry once on failure
      enabled: !!address && !!explorerUrl, // Only run query if address and explorerUrl are provided
    }
  );

  // Handle re-fetching on prop changes if necessary, though useQuery handles most cases.
  useEffect(() => {
    if (address && explorerUrl) {
      refetch();
    }
  }, [address, explorerUrl, refetch]);

  // Render loading state
  if (isLoading) {
    return (
      <div
        className={cn(
          "flex items-center justify-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md",
          "border border-gray-200 dark:border-gray-700 transition-colors duration-200",
          className
        )}
        role="status"
        aria-live="polite"
      >
        <svg className="animate-spin h-5 w-5 mr-3 text-blue-500" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="text-gray-500 dark:text-gray-400">Loading block explorer link...</span>
      </div>
    );
  }

  // Render error state using shadcn/ui Alert component
  if (isError) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md",
          "border border-gray-200 dark:border-gray-700 transition-colors duration-200",
          className
        )}
        role="alert"
        aria-live="assertive"
      >
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load block explorer link.
            {error instanceof Error ? ` Details: ${error.message}` : ' An unknown error occurred.'}
          </AlertDescription>
        </Alert>
        <Button onClick={() => refetch()} className="mt-4">Try Again</Button>
      </div>
    );
  }

  // Render the main component with the block explorer link
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md",
        "border border-gray-200 dark:border-gray-700 transition-colors duration-200",
        className
      )}
    >
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        {title}
      </h2>
      {blockExplorerLink ? (
        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600">
          <a
            href={blockExplorerLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View address ${address} on block explorer`}
            className="flex items-center space-x-2"
          >
            <span>View on Explorer</span>
            <ExternalLink className="h-4 w-4" /> {/* Lucide React icon */}
          </a>
        </Button>
      ) : (
        <p className="text-gray-600 dark:text-gray-300" aria-live="polite">
          No explorer link available for address: <span className="font-mono break-all">{address}</span>
        </p>
      )}
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 break-all">
        Address: <span className="font-mono text-gray-700 dark:text-gray-200">{address}</span>
      </p>
    </div>
  );
};

export default CryptoBlockExplorerLink;
