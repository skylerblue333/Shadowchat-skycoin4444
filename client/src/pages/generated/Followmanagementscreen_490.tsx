// AUTO-GENERATED DRAFT SCREEN: FollowManagementScreen

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button'; // Assuming shadcn/ui button
import { Input } from './ui/input';   // Assuming shadcn/ui input
import { Switch } from './ui/switch'; // Assuming shadcn/ui switch for dark mode

interface User {
  id: string;
  name: string;
  isFollowing: boolean;
}

// Simulated tRPC hook for fetching and mutating data
const useFollowManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const fetchedUsers: User[] = [
          { id: '1', name: 'Alice', isFollowing: false },
          { id: '2', name: 'Bob', isFollowing: true },
          { id: '3', name: 'Charlie', isFollowing: false },
        ];
        setUsers(fetchedUsers);
      } catch (err) {
        setError('Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const toggleFollow = async (userId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user
        )
      );
    } catch (err) {
      setError('Failed to update follow status.');
    }
  };

  return { users, loading, error, toggleFollow };
};

const FollowManagementScreen: React.FC = () => {
  const { users, loading, error, toggleFollow } = useFollowManagement();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen p-4 ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white" aria-label="Follow Management Page Title">Follow Management</h1>

        <div className="flex justify-between items-center mb-4">
          <Input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow mr-4 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            aria-label="Search users input field"
          />
          <div className="flex items-center space-x-2">
            <Switch
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              aria-label="Toggle dark mode"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Dark Mode</span>
          </div>
        </div>

        {loading && <p className="text-blue-500 dark:text-blue-400">Loading users...</p>}
        {error && <p className="text-red-500 dark:text-red-400" role="alert">Error: {error}</p>}

        {!loading && !error && filteredUsers.length === 0 && (
          <p className="text-gray-600 dark:text-gray-400">No users found.</p>
        )}

        <ul className="space-y-4">
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm"
            >
              <span className="text-lg font-medium text-gray-800 dark:text-white" aria-label={`User name: ${user.name}`}>{user.name}</span>
              <Button
                onClick={() => toggleFollow(user.id)}
                className={`px-4 py-2 rounded-md text-white ${user.isFollowing ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                aria-label={user.isFollowing ? `Unfollow ${user.name}` : `Follow ${user.name}`}
              >
                {user.isFollowing ? 'Unfollow' : 'Follow'}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FollowManagementScreen;
