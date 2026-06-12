// AUTO-GENERATED DRAFT SCREEN: ProfileCompleteness
import React from 'react';
import { useQuery } from '@tanstack/react-query'; // Simulate tRPC hook
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RocketIcon } from '@radix-ui/react-icons'; // Example icon

interface ProfileData {
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  profilePicture: string | null;
  bio: string | null;
}

interface ProfileCompletenessProps {
  userId: string;
}

const fetchProfileData = async (userId: string): Promise<ProfileData> => {
  // Simulate API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        address: null,
        profilePicture: 'https://via.placeholder.com/150',
        bio: 'A passionate software engineer.',
      });
    }, 1000);
  });
};

const calculateCompleteness = (data: ProfileData): number => {
  let completedFields = 0;
  const totalFields = 6; // name, email, phone, address, profilePicture, bio

  if (data.name) completedFields++;
  if (data.email) completedFields++;
  if (data.phone) completedFields++;
  if (data.address) completedFields++;
  if (data.profilePicture) completedFields++;
  if (data.bio) completedFields++;

  return (completedFields / totalFields) * 100;
};

export function ProfileCompleteness({ userId }: ProfileCompletenessProps) {
  const { data, isLoading, isError, error } = useQuery<ProfileData, Error>(
    ['profileCompleteness', userId],
    () => fetchProfileData(userId)
  );

  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto dark:bg-gray-800 dark:text-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Profile Completeness</CardTitle>
          <CardDescription>Loading your profile data...</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={0} className="w-full" aria-label="Profile completeness loading" />
          <p className="text-center mt-2">Fetching profile details...</p>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-full max-w-md mx-auto dark:bg-gray-800 dark:text-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Profile Completeness</CardTitle>
          <CardDescription>Error loading profile data.</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive" className="dark:bg-red-900 dark:text-red-100">
            <RocketIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error?.message || 'An unknown error occurred.'}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const completenessPercentage = data ? calculateCompleteness(data) : 0;

  return (
    <Card className="w-full max-w-md mx-auto dark:bg-gray-800 dark:text-gray-200">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Profile Completeness</CardTitle>
        <CardDescription>Complete your profile to unlock all features.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <Progress value={completenessPercentage} className="w-full h-3" aria-label={`Profile completeness: ${completenessPercentage}%`} />
          <span className="ml-4 text-lg font-semibold">{completenessPercentage.toFixed(0)}%</span>
        </div>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center">
            <span className="mr-2">{data?.name ? '✅' : '❌'}</span> Name: {data?.name || 'Not set'}
          </li>
          <li className="flex items-center">
            <span className="mr-2">{data?.email ? '✅' : '❌'}</span> Email: {data?.email || 'Not set'}
          </li>
          <li className="flex items-center">
            <span className="mr-2">{data?.phone ? '✅' : '❌'}</span> Phone: {data?.phone || 'Not set'}
          </li>
          <li className="flex items-center">
            <span className="mr-2">{data?.address ? '✅' : '❌'}</span> Address: {data?.address || 'Not set'}
          </li>
          <li className="flex items-center">
            <span className="mr-2">{data?.profilePicture ? '✅' : '❌'}</span> Profile Picture: {data?.profilePicture ? 'Set' : 'Not set'}
          </li>
          <li className="flex items-center">
            <span className="mr-2">{data?.bio ? '✅' : '❌'}</span> Bio: {data?.bio ? 'Set' : 'Not set'}
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}


export default function Profilecompleteness_688() { return null; }
