// AUTO-GENERATED DRAFT SCREEN: NodeDashboard
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'; // Simulating tRPC hook usage with react-query
import { cn } from '@/lib/utils'; // Simulating shadcn/ui utility

// Define types for node data
interface NodeData {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'degraded';
  uptime: string;
  version: string;
  peers: number;
  lastSeen: string;
}

// Simulate fetching data (replace with actual tRPC hook in a real app)
const fetchNodeData = async (): Promise<NodeData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 'node-1',
          name: 'Mainnet Node 1',
          status: 'online',
          uptime: '2d 14h',
          version: '1.0.0',
          peers: 128,
          lastSeen: 'Just now',
        },
        {
          id: 'node-2',
          name: 'Testnet Node 2',
          status: 'degraded',
          uptime: '1d 02h',
          version: '1.0.0',
          peers: 64,
          lastSeen: '5 minutes ago',
        },
        {
          id: 'node-3',
          name: 'Mainnet Node 3',
          status: 'offline',
          uptime: '0d 00h',
          version: '1.0.0',
          peers: 0,
          lastSeen: '1 hour ago',
        },
      ]);
    }, 1000);
  });
};

interface NodeDashboardProps {
  isDarkTheme?: boolean; // Prop for dark theme
}

const NodeDashboard: React.FC<NodeDashboardProps> = ({ isDarkTheme = false }) => {
  const { data, isLoading, isError, error } = useQuery<NodeData[], Error>({
    queryKey: ['nodeData'],
    queryFn: fetchNodeData,
  });

  if (isLoading) {
    return (
      <div className={cn(
        'flex items-center justify-center h-screen',
        isDarkTheme ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
      )}>
        <p>Loading node data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={cn(
        'flex items-center justify-center h-screen text-red-500',
        isDarkTheme ? 'bg-gray-900' : 'bg-gray-100'
      )}>
        <p>Error: {error?.message || 'Failed to fetch node data'}</p>
      </div>
    );
  }

  return (
    <div className={cn(
      'min-h-screen p-8',
      isDarkTheme ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
    )}>
      <h1 className="text-3xl font-bold mb-8">Crypto: Node Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((node) => (
          <div
            key={node.id}
            className={cn(
              'p-6 rounded-lg shadow-md',
              isDarkTheme ? 'bg-gray-800' : 'bg-white'
            )}
          >
            <h2 className="text-xl font-semibold mb-2">{node.name}</h2>
            <p className="text-sm mb-1">
              Status: <span
                className={cn(
                  'font-medium',
                  node.status === 'online' && 'text-green-500',
                  node.status === 'degraded' && 'text-yellow-500',
                  node.status === 'offline' && 'text-red-500'
                )}
              >
                {node.status.charAt(0).toUpperCase() + node.status.slice(1)}
              </span>
            </p>
            <p className="text-sm mb-1">Uptime: {node.uptime}</p>
            <p className="text-sm mb-1">Version: {node.version}</p>
            <p className="text-sm mb-1">Peers: {node.peers}</p>
            <p className="text-sm">Last Seen: {node.lastSeen}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NodeDashboard;
