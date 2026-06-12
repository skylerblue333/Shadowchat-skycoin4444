// AUTO-GENERATED DRAFT SCREEN: CryptoSocialLinksScreen

import React from 'react';
import { useQuery } from '@tanstack/react-query'; // Simulating tRPC with react-query
import { Button } from '@/components/ui/button'; // shadcn/ui button
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // shadcn/ui card
import { Input } from '@/components/ui/input'; // shadcn/ui input
import { Label } from '@/components/ui/label'; // shadcn/ui label
import { Skeleton } from '@/components/ui/skeleton'; // shadcn/ui skeleton for loading

// Define types for social links
interface SocialLink {
  platform: string;
  url: string;
}

// Simulate a tRPC-like API call
const fetchSocialLinks = async (): Promise<SocialLink[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Simulate data
  const data: SocialLink[] = [
    { platform: 'Twitter', url: 'https://twitter.com/skycoin4444' },
    { platform: 'Telegram', url: 'https://t.me/skycoin4444' },
    { platform: 'Discord', url: 'https://discord.gg/skycoin4444' },
    { platform: 'GitHub', url: 'https://github.com/skycoin4444' },
  ];
  // Simulate an error occasionally for testing error state
  // if (Math.random() > 0.8) throw new Error("Failed to fetch social links");
  return data;
};

const CryptoSocialLinksScreen: React.FC = () => {
  const { data: socialLinks, isLoading, isError, error } = useQuery<SocialLink[], Error>({
    queryKey: ['socialLinks'],
    queryFn: fetchSocialLinks,
    staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
    retry: 1, // Retry once on failure
  });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-4 dark:bg-gray-900 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Crypto: Social Links</h1>
        <Card className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100">Loading Social Links...</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-8 w-full bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-8 w-2/3 bg-gray-200 dark:bg-gray-700" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col gap-4 p-4 dark:bg-gray-900 min-h-screen text-red-600 dark:text-red-400">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Crypto: Social Links</h1>
        <Card className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg border-red-500">
          <CardHeader>
            <CardTitle className="text-red-600 dark:text-red-400">Error Loading Social Links</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm" role="alert">Failed to load social links: {error?.message || 'Unknown error'}. Please try again later.</p>
            <Button onClick={() => window.location.reload()} className="mt-4 bg-red-500 hover:bg-red-600 text-white dark:bg-red-700 dark:hover:bg-red-800">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Crypto: Social Links</h1>
      <Card className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">Connect with SKYCOIN4444</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {socialLinks?.map((link) => (
            <div key={link.platform} className="flex items-center justify-between">
              <Label htmlFor={link.platform.toLowerCase()} className="text-gray-700 dark:text-gray-300">
                {link.platform}
              </Label>
              <Input
                id={link.platform.toLowerCase()}
                type="url"
                value={link.url}
                readOnly
                className="w-2/3 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                aria-label={`${link.platform} link`}
              />
              <Button asChild className="ml-2 bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-700 dark:hover:bg-blue-800">
                <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${link.platform} page`}>
                  Visit
                </a>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoSocialLinksScreen;
