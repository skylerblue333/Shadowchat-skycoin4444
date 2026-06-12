// AUTO-GENERATED DRAFT SCREEN: ProfileSharing
import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';

interface ProfileSharingProps {
  userId: string;
  userName: string;
  onShareProfile: (userId: string, shareWith: string) => Promise<void>;
}

const ProfileSharing: React.FC<ProfileSharingProps> = ({
  userId,
  userName,
  onShareProfile,
}) => {
  const [shareWith, setShareWith] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Simulate tRPC hook for sharing profile
  const shareProfileMutation = async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      // In a real application, this would be a tRPC mutation call
      await onShareProfile(userId, shareWith);
      setSuccessMessage('Profile shared successfully!');
      setShareWith('');
    } catch (err) {
      setError('Failed to share profile. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShareClick = () => {
    if (shareWith.trim() === '') {
      setError('Please enter a valid user or email to share with.');
      return;
    }
    shareProfileMutation();
  };

  return (
    <Card className="w-[350px] dark:bg-gray-800 dark:text-white">
      <CardHeader>
        <CardTitle>Share Your Profile</CardTitle>
        <CardDescription>Share your profile with other users or via email.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="username">Your Profile</Label>
            <Input id="username" value={userName} readOnly className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="share-with">Share With (User ID or Email)</Label>
            <Input
              id="share-with"
              placeholder="Enter user ID or email"
              value={shareWith}
              onChange={(e) => setShareWith(e.target.value)}
              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}
          {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setShareWith('')} disabled={isLoading} className="dark:border-gray-600 dark:text-white dark:hover:bg-gray-700">
          Clear
        </Button>
        <Button onClick={handleShareClick} disabled={isLoading} className="dark:bg-blue-600 dark:hover:bg-blue-700">
          {isLoading ? 'Sharing...' : 'Share Profile'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileSharing;