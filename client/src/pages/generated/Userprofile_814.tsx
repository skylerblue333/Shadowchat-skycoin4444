// AUTO-GENERATED DRAFT SCREEN: UserProfile
import React from 'react';
import { trpc } from './trpc';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import { Button } from './components/ui/button';
import { Skeleton } from './components/ui/skeleton';

interface UserProfileProps {
  userId: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const { data: userData, isLoading, error, refetch } = trpc.user.query({ userId });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-row items-center space-x-4">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-40" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <div className="grid grid-cols-3 gap-4">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-red-500">
        <p>Error: {error.message}</p>
        <Button onClick={() => refetch()} className="mt-4">Retry</Button>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <p>No user data found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center space-x-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={userData.avatar} alt="User Avatar" />
            <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-3xl font-bold">{userData.name}</CardTitle>
            <p className="text-gray-600 dark:text-gray-400">@{userData.username}</p>
            <p className="text-blue-500">{userData.email}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg">{userData.bio}</p>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{userData.posts}</p>
              <p className="text-gray-600 dark:text-gray-400">Posts</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{userData.followers}</p>
              <p className="text-gray-600 dark:text-gray-400">Followers</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{userData.following}</p>
              <p className="text-gray-600 dark:text-gray-400">Following</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold">Recent Activity</h2>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300">No recent activity to display.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
