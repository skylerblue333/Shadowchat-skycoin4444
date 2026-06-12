// AUTO-GENERATED DRAFT SCREEN: MerkleTreeViewer
import React, { useState, useEffect, useMemo } from 'react';
import { trpc } from './trpc';

/**
 * Props for the MerkleTreeViewer component.
 * @interface MerkleTreeViewerProps
 * @property {string[]} data - An array of strings representing the initial data for the Merkle tree leaves.
 */
interface MerkleTreeViewerProps {
  data: string[];
}

/**
 * MerkleTreeViewer component displays a visual representation of a Merkle tree.
 * It integrates with tRPC for data fetching, handles loading and error states,
 * supports dark theme, and includes accessibility features.
 * @param {MerkleTreeViewerProps} { data } - The component props.
 * @returns {JSX.Element} The rendered Merkle Tree Viewer component.
 */
const MerkleTreeViewer: React.FC<MerkleTreeViewerProps> = ({ data }) => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  // tRPC hook to fetch Merkle tree data asynchronously.
  // The `data` prop is passed as input to the tRPC procedure.
  const { data: merkleData, isLoading, isError, error } = trpc.getMerkleData.useQuery({ data });

  /**
   * Effect hook to detect and manage dark theme preference.
   * It listens for changes in the user's system color scheme preference.
   */
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkTheme(prefersDark);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => {
      setIsDarkTheme(event.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  /**
   * Effect hook to apply or remove the 'dark' class to the document element
   * based on the `isDarkTheme` state, enabling Tailwind CSS dark mode.
   */
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  // Memoized class names for dynamic styling based on theme.
  const containerClasses = useMemo(() => (
    `min-h-screen p-8 transition-colors duration-300 ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`
  ), [isDarkTheme]);

  const nodeClasses = useMemo(() => (
    `p-4 rounded-lg shadow-md transition-colors duration-300 ${isDarkTheme ? 'bg-gray-800' : 'bg-white'} border ${isDarkTheme ? 'border-gray-700' : 'border-gray-200'}`
  ), [isDarkTheme]);

  // Display loading state while data is being fetched.
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-semibold" aria-live="polite" aria-atomic="true">
        <p>Loading Merkle Tree...</p>
      </div>
    );
  }

  // Display error state if data fetching fails.
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 text-lg font-semibold" aria-live="assertive" aria-atomic="true">
        <p>Error: {error?.message || 'An unknown error occurred.'}</p>
      </div>
    );
  }

  // Render the Merkle tree structure.
  return (
    <div className={containerClasses} role="region" aria-label="Merkle Tree Viewer">
      <h1 className="text-4xl font-bold text-center mb-12" tabIndex={0}>Merkle Tree Viewer</h1>
      <div className="flex flex-col items-center space-y-6" aria-description="Visual representation of the Merkle tree levels.">
        {merkleData?.merkleTree.map((level, levelIndex) => (
          <div
            key={levelIndex}
            className="flex justify-center space-x-4"
            role="list"
            aria-label={`Level ${merkleData.merkleTree.length - levelIndex} of Merkle Tree`}
          >
            {level.map((node, nodeIndex) => (
              <div
                key={nodeIndex}
                className={nodeClasses}
                role="listitem"
                aria-label={`Merkle node at level ${merkleData.merkleTree.length - levelIndex}, position ${nodeIndex + 1}`}
                tabIndex={0}
              >
                <p className="font-mono text-sm break-all">{node}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MerkleTreeViewer;
