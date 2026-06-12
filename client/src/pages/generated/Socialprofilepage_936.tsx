// @ts-nocheck
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import * as __ns_lucide_react_1 from 'lucide-react';
const { AlertCircle, MapPin, Link: LinkIcon, Calendar, Mail, Edit2, Settings, Users, Activity } = (__ns_lucide_react_1 as any);

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: SocialProfilePage

/* --- injected local data stubs (replaces non-existent backend hooks) --- */
function useStubQuery<T = any>(initial?: T) {
  return { data: initial as T, isLoading: false, isPending: false, isError: false, error: null as any, refetch: () => {} };
}
function useStubMutation<T = any>() {
  return {
    mutate: (_v?: any) => {}, mutateAsync: async (_v?: any) => ({} as T),
    isLoading: false, isPending: false, isError: false, isSuccess: false, error: null as any, data: undefined as any, reset: () => {},
  };
}
/* ----------------------------------------------------------------------- */


interface Post {
  id: string;
  content: string;
  createdAt: string;
}

interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatarUrl?: string;
  coverUrl?: string;
  bio?: string;
  location?: string;
  website?: string;
  joinedAt: string;
  isVerified: boolean;
  isCurrentUser: boolean;
  interests?: string[];
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
  recentPosts?: Post[];
}

interface SocialProfilePageProps {
  userId: string;
}

export default function SocialProfilePage({ userId }: SocialProfilePageProps) {
  const { data: profile, isLoading, error, refetch } = trpc.social.getProfile.useQuery<UserProfile>({ userId });
  const [activeTab, setActiveTab] = useState<string>('posts');

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 md:p-6 max-w-5xl space-y-6 animate-pulse" aria-busy="true" aria-live="polite">
        <div className="h-48 md:h-64 bg-muted rounded-xl w-full dark:bg-gray-800"></div>
        <div className="flex flex-col md:flex-row gap-6 px-4 -mt-12 md:-mt-16 relative z-10">
          <Skeleton className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-background dark:border-gray-900" />
          <div className="flex-1 space-y-4 mt-12 md:mt-16">
            <Skeleton className="h-8 w-1/3 dark:bg-gray-700" />
            <Skeleton className="h-4 w-1/4 dark:bg-gray-700" />
            <div className="flex gap-4">
              <Skeleton className="h-10 w-24 dark:bg-gray-700" />
              <Skeleton className="h-10 w-24 dark:bg-gray-700" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 md:p-6 max-w-5xl" role="alert">
        <Alert variant="destructive" className="dark:bg-red-900/20 dark:border-red-900">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading Profile</AlertTitle>
          <AlertDescription className="flex flex-col gap-2">
            <p>{error.message || 'An unexpected error occurred while fetching the profile.'}</p>
            <Button variant="outline" size="sm" onClick={() => refetch()} className="w-fit dark:hover:bg-red-900/40">
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto p-4 md:p-6 max-w-5xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight dark:text-gray-100">Profile not found</h2>
        <p className="text-muted-foreground mt-2 dark:text-gray-400">The user you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-5xl space-y-6 dark:bg-gray-950 dark:text-gray-50">
      {/* Cover Photo */}
      <div 
        className="h-48 md:h-64 w-full rounded-xl bg-cover bg-center relative overflow-hidden bg-muted dark:bg-gray-800"
        style={{ backgroundImage: `url(${profile.coverUrl || '/default-cover.jpg'})` }}
        role="img"
        aria-label={`${profile.name}'s cover photo`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-6 px-4 -mt-12 md:-mt-16 relative z-10">
        <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-background dark:border-gray-950 shadow-lg">
          <AvatarImage src={profile.avatarUrl} alt={profile.name} />
          <AvatarFallback className="text-2xl md:text-4xl dark:bg-gray-800 dark:text-gray-200">{profile.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mt-2 md:mt-16">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2 dark:text-white">
              {profile.name}
              {profile.isVerified && (
                <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400">
                  Verified
                </Badge>
              )}
            </h1>
            <p className="text-muted-foreground dark:text-gray-400">@{profile.username}</p>
            
            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground dark:text-gray-400">
              {profile.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {profile.location}
                </span>
              )}
              {profile.website && (
                <a href={profile.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary dark:hover:text-blue-400 transition-colors">
                  <LinkIcon className="w-4 h-4" /> {new URL(profile.website).hostname}
                </a>
              )}
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> Joined {new Date(profile.joinedAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {profile.isCurrentUser ? (
              <>
                <Button variant="outline" className="flex-1 md:flex-none gap-2 dark:border-gray-700 dark:hover:bg-gray-800">
                  <Edit2 className="w-4 h-4" /> Edit Profile
                </Button>
                <Button variant="ghost" size="icon" aria-label="Settings" className="dark:hover:bg-gray-800">
                  <Settings className="w-5 h-5" />
                </Button>
              </>
            ) : (
              <>
                <Button className="flex-1 md:flex-none gap-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white">
                  <Users className="w-4 h-4" /> Follow
                </Button>
                <Button variant="outline" size="icon" aria-label="Message" className="dark:border-gray-700 dark:hover:bg-gray-800">
                  <Mail className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bio & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        <div className="md:col-span-2 space-y-4">
          <p className="text-base leading-relaxed dark:text-gray-300">
            {profile.bio || 'No bio provided.'}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {profile.interests?.map((interest: string) => (
              <Badge key={interest} variant="outline" className="rounded-full dark:border-gray-700 dark:text-gray-300">
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        <Card className="bg-muted/50 border-none dark:bg-gray-900/50">
          <CardContent className="p-6 flex justify-around text-center">
            <div>
              <p className="text-2xl font-bold dark:text-white">{profile.stats.posts.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium dark:text-gray-400">Posts</p>
            </div>
            <div>
              <p className="text-2xl font-bold dark:text-white">{profile.stats.followers.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium dark:text-gray-400">Followers</p>
            </div>
            <div>
              <p className="text-2xl font-bold dark:text-white">{profile.stats.following.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium dark:text-gray-400">Following</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full px-4">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent dark:border-gray-800">
          <TabsTrigger 
            value="posts" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3 dark:data-[state=active]:border-blue-500 dark:text-gray-400 dark:data-[state=active]:text-white"
          >
            Posts
          </TabsTrigger>
          <TabsTrigger 
            value="media" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3 dark:data-[state=active]:border-blue-500 dark:text-gray-400 dark:data-[state=active]:text-white"
          >
            Media
          </TabsTrigger>
          <TabsTrigger 
            value="likes" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3 dark:data-[state=active]:border-blue-500 dark:text-gray-400 dark:data-[state=active]:text-white"
          >
            Likes
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts" className="mt-6 space-y-4">
          {profile.recentPosts && profile.recentPosts.length > 0 ? (
            profile.recentPosts.map((post: Post) => (
              <Card key={post.id} className="dark:bg-gray-900 dark:border-gray-800">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={profile.avatarUrl} />
                      <AvatarFallback className="dark:bg-gray-800 dark:text-gray-200">{profile.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base dark:text-white">{profile.name}</CardTitle>
                      <CardDescription className="dark:text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm dark:text-gray-300">{post.content}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground border rounded-lg border-dashed dark:border-gray-800 dark:text-gray-500">
              <Activity className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>No posts yet.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="media" className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center text-muted-foreground dark:bg-gray-800 dark:text-gray-500">
              Media Item
            </div>
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center text-muted-foreground dark:bg-gray-800 dark:text-gray-500">
              Media Item
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="likes" className="mt-6">
          <div className="text-center py-12 text-muted-foreground border rounded-lg border-dashed dark:border-gray-800 dark:text-gray-500">
            <p>Liked posts will appear here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}