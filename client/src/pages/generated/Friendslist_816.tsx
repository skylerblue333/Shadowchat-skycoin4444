// AUTO-GENERATED DRAFT SCREEN: FriendsList
import React from 'react';
import { Button } from '@/components/ui/button';
import { trpc } from './trpc';

interface Friend {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'away';
}

const FriendsList: React.FC = () => {
  const { data: friends, isLoading, isError, error } = trpc.friends.query();

  if (isLoading) {
    return <div className="container mx-auto p-4 text-center">Loading friends...</div>;
  }

  if (isError) {
    return <div className="container mx-auto p-4 text-red-500 text-center">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Friends List</h1>
      <div className="space-y-2">
        {friends?.map((friend: Friend) => (
          <div key={friend.id} className="flex items-center justify-between p-3 border rounded-md shadow-sm">
            <div className="flex items-center space-x-3">
              <span className={`w-3 h-3 rounded-full ${friend.status === 'online' ? 'bg-green-500' : friend.status === 'offline' ? 'bg-gray-400' : 'bg-yellow-500'}`}></span>
              <span className="font-medium">{friend.name}</span>
            </div>
            <Button variant="outline" size="sm">View Profile</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
