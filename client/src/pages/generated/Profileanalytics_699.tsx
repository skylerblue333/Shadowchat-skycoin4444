// AUTO-GENERATED DRAFT SCREEN: ProfileAnalytics
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Simulate tRPC types and hooks
type ProfileData = {
  totalViews: number;
  uniqueVisitors: number;
  averageSessionDuration: string;
  topContent: { id: string; title: string; views: number }[];
};

interface UseProfileAnalyticsResult {
  data: ProfileData | undefined;
  isLoading: boolean;
  isError: boolean;
  error: string | undefined;
  refetch: () => void;
}

const useProfileAnalytics = (): UseProfileAnalyticsResult => {
  const [data, setData] = useState<ProfileData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchData = () => {
    setIsLoading(true);
    setIsError(false);
    setError(undefined);
    setTimeout(() => {
      if (Math.random() > 0.8) { // Simulate error 20% of the time
        setIsError(true);
        setError("Failed to fetch analytics data.");
        setData(undefined);
      } else {
        setData({
          totalViews: Math.floor(Math.random() * 100000),
          uniqueVisitors: Math.floor(Math.random() * 50000),
          averageSessionDuration: `${Math.floor(Math.random() * 5) + 1}m ${Math.floor(Math.random() * 60)}s`,
          topContent: Array.from({ length: 3 }).map((_, i) => ({
            id: `content-${i + 1}`,
            title: `Content Title ${i + 1}`,
            views: Math.floor(Math.random() * 10000),
          })),
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, isError, error, refetch: fetchData };
};

const ProfileAnalytics: React.FC = () => {
  const { data, isLoading, isError, error, refetch } = useProfileAnalytics();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  return (
    <div className={`min-h-screen p-8 transition-colors duration-300 ${isDarkTheme ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Profile Analytics</h1>
          <div className="flex items-center space-x-2">
            <Switch
              id="dark-mode-toggle"
              checked={isDarkTheme}
              onCheckedChange={setIsDarkTheme}
              aria-label="Toggle dark mode"
            />
            <Label htmlFor="dark-mode-toggle">Dark Mode</Label>
            <Button onClick={refetch} disabled={isLoading} aria-label="Refresh analytics data">
              {isLoading ? "Refreshing..." : "Refresh Data"}
            </Button>
          </div>
        </div>

        {isError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-8" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error || "Something went wrong while fetching data."}
            </span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.15a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.15 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-2/3" />
              ) : (
                <div className="text-2xl font-bold">{data?.totalViews.toLocaleString()}</div>
              )}
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-2/3" />
              ) : (
                <div className="text-2xl font-bold">{data?.uniqueVisitors.toLocaleString()}</div>
              )}
              <p className="text-xs text-muted-foreground">+180.1% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v6h4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-2/3" />
              ) : (
                <div className="text-2xl font-bold">{data?.averageSessionDuration}</div>
              )}
              <p className="text-xs text-muted-foreground">+19% from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Top Content</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </div>
              ) : (
                <ul className="space-y-4">
                  {data?.topContent.map((item) => (
                    <li key={item.id} className="flex justify-between items-center">
                      <span className="font-medium">{item.title}</span>
                      <span className="text-muted-foreground">{item.views.toLocaleString()} views</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileAnalytics;
