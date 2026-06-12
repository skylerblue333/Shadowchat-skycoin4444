// AUTO-GENERATED DRAFT SCREEN: CommunityModerationHistory
import React, { useState, useEffect } from 'react';

interface ModerationEntry {
  id: string;
  moderator: string;
  action: string;
  target: string;
  timestamp: string;
  reason?: string;
}

interface CommunityModerationHistoryProps {
  communityId: string;
}

const CommunityModerationHistory: React.FC<CommunityModerationHistoryProps> = ({ communityId }) => {
  const [history, setHistory] = useState<ModerationEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Placeholder for tRPC hook or data fetching logic
  useEffect(() => {
    const fetchModerationHistory = async () => {
      try {
        setLoading(true);
        setError(null);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockData: ModerationEntry[] = [
          { id: '1', moderator: 'Alice', action: 'Ban', target: 'User123', timestamp: '2023-01-15T10:00:00Z', reason: 'Spamming' },
          { id: '2', moderator: 'Bob', action: 'Mute', target: 'User456', timestamp: '2023-01-15T11:30:00Z' },
          { id: '3', moderator: 'Charlie', action: 'Warn', target: 'User789', timestamp: '2023-01-15T12:45:00Z', reason: 'Offensive language' },
        ];
        setHistory(mockData);
      } catch (err) {
        setError('Failed to fetch moderation history.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchModerationHistory();
  }, [communityId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32 text-gray-500 dark:text-gray-400" role="status" aria-live="polite">
        Loading moderation history...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-700 bg-red-100 border border-red-400 rounded dark:bg-red-900 dark:text-red-300" role="alert" aria-live="assertive">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg" aria-labelledby="moderation-history-title">
      <h2 id="moderation-history-title" className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Community Moderation History for {communityId}</h2>
      {
        history.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">No moderation history found.</p>
        ) : (
          <ul className="space-y-4">
            {history.map((entry) => (
              <li key={entry.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-800 dark:text-white">{entry.action}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{new Date(entry.timestamp).toLocaleString()}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-200">Moderator: <span className="font-medium">{entry.moderator}</span></p>
                <p className="text-gray-700 dark:text-gray-200">Target: <span className="font-medium">{entry.target}</span></p>
                {entry.reason && <p className="text-gray-700 dark:text-gray-200">Reason: <span className="italic">{entry.reason}</span></p>}
              </li>
            ))}
          </ul>
        )
      }
    </div>
  );
};

export default CommunityModerationHistory;
