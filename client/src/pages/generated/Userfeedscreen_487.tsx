// @ts-nocheck
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import * as __ns_lucide_react_1 from 'lucide-react';
const { AlertCircle, Heart, MessageCircle, Share2, MoreHorizontal, Loader2 } = (__ns_lucide_react_1 as any);
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import * as __ns_date_fns_2 from 'date-fns';
const { formatDistanceToNow } = (__ns_date_fns_2 as any);

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: UserFeedScreen

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


// Types
export interface User {
  id: string;
  name: string;
  username: string;
  avatarUrl?: string;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  createdAt: Date;
  likesCount: number;
  commentsCount: number;
  isLikedByMe: boolean;
}

export function UserFeedScreen() {
  const [postContent, setPostContent] = useState('');
  
  // tRPC hooks
  const { 
    data, 
    isLoading, 
    isError, 
    error, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage,
    refetch
  } = trpc.social.getFeed.useInfiniteQuery(
    { limit: 10 },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  const utils = trpc.useUtils();

  const likePostMutation = useStubMutation({
    onMutate: async ({ postId }) => {
      await utils.social.getFeed.cancel();
      const previousFeed = utils.social.getFeed.getInfiniteData();
      
      utils.social.getFeed.setInfiniteData({ limit: 10 }, (data) => {
        if (!data) return data;
        return {
          ...data,
          pages: data.pages.map((page) => ({
            ...page,
            items: page.items.map((post) => 
              post.id === postId 
                ? { ...post, isLikedByMe: true, likesCount: post.likesCount + 1 } 
                : post
            ),
          })),
        };
      });
      
      return { previousFeed };
    },
    onError: (err, newTodo, context) => {
      if (context?.previousFeed) {
        utils.social.getFeed.setInfiniteData({ limit: 10 }, context.previousFeed);
      }
    },
  });

  const unlikePostMutation = useStubMutation({
    onMutate: async ({ postId }) => {
      await utils.social.getFeed.cancel();
      const previousFeed = utils.social.getFeed.getInfiniteData();
      
      utils.social.getFeed.setInfiniteData({ limit: 10 }, (data) => {
        if (!data) return data;
        return {
          ...data,
          pages: data.pages.map((page) => ({
            ...page,
            items: page.items.map((post) => 
              post.id === postId 
                ? { ...post, isLikedByMe: false, likesCount: Math.max(0, post.likesCount - 1) } 
                : post
            ),
          })),
        };
      });
      
      return { previousFeed };
    },
    onError: (err, newTodo, context) => {
      if (context?.previousFeed) {
        utils.social.getFeed.setInfiniteData({ limit: 10 }, context.previousFeed);
      }
    },
  });

  const createPostMutation = useStubMutation({
    onSuccess: () => {
      setPostContent('');
      refetch();
    }
  });

  const handleLikeToggle = (postId: string, isLiked: boolean) => {
    if (isLiked) {
      unlikePostMutation.mutate({ postId });
    } else {
      likePostMutation.mutate({ postId });
    }
  };

  const handleCreatePost = () => {
    if (!postContent.trim()) return;
    createPostMutation.mutate({ content: postContent });
  };

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-background text-foreground">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error loading feed</AlertTitle>
          <AlertDescription>
            {error?.message || 'Something went wrong while fetching your feed. Please try again later.'}
          </AlertDescription>
          <Button variant="outline" className="mt-4" onClick={() => refetch()}>
            Retry
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-zinc-950">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto max-w-2xl px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">Feed</h1>
          <Avatar className="h-8 w-8 cursor-pointer hover:opacity-80 transition-opacity">
            <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="container mx-auto max-w-2xl px-4 py-6 space-y-6">
        {/* Create Post Input Area */}
        <Card className="shadow-sm">
          <CardContent className="p-4 flex gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <textarea 
                className="w-full bg-transparent resize-none outline-none placeholder:text-muted-foreground min-h-[60px]"
                placeholder="What's on your mind?"
                aria-label="Create a post"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                disabled={createPostMutation.isPending}
              />
              <div className="flex justify-end mt-2">
                <Button 
                  size="sm" 
                  className="rounded-full px-6" 
                  onClick={handleCreatePost}
                  disabled={!postContent.trim() || createPostMutation.isPending}
                >
                  {createPostMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Post'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feed Posts */}
        <div className="space-y-4" role="feed" aria-busy={isLoading}>
          {isLoading ? (
            // Loading Skeletons
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="shadow-sm">
                <CardHeader className="flex-row gap-4 items-center p-4 pb-2">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-[120px]" />
                    <Skeleton className="h-3 w-[80px]" />
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[90%]" />
                  <Skeleton className="h-4 w-[60%]" />
                </CardContent>
              </Card>
            ))
          ) : (
            // Actual Posts
            data?.pages.map((page, pageIndex) => (
              <React.Fragment key={pageIndex}>
                {page.items.map((post: Post) => (
                  <Card key={post.id} className="shadow-sm transition-shadow hover:shadow-md">
                    <CardHeader className="flex-row gap-3 items-start p-4 pb-2 space-y-0">
                      <Avatar>
                        <AvatarImage src={post.author.avatarUrl} alt={`@${post.author.username}`} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold truncate">{post.author.name}</p>
                          <p className="text-sm text-muted-foreground truncate">@{post.author.username}</p>
                          <span className="text-muted-foreground text-xs">•</span>
                          <p className="text-xs text-muted-foreground whitespace-nowrap">
                            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 rounded-full">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More options</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Report post</DropdownMenuItem>
                          <DropdownMenuItem>Mute @{post.author.username}</DropdownMenuItem>
                          <DropdownMenuItem>Copy link</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <p className="text-sm whitespace-pre-wrap break-words">{post.content}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between border-t mt-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`gap-2 rounded-full ${post.isLikedByMe ? 'text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50' : 'text-muted-foreground'}`}
                        onClick={() => handleLikeToggle(post.id, post.isLikedByMe)}
                        aria-label={post.isLikedByMe ? "Unlike post" : "Like post"}
                      >
                        <Heart className={`h-4 w-4 ${post.isLikedByMe ? 'fill-current' : ''}`} />
                        <span className="text-xs">{post.likesCount}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2 rounded-full text-muted-foreground">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-xs">{post.commentsCount}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2 rounded-full text-muted-foreground">
                        <Share2 className="h-4 w-4" />
                        <span className="sr-only">Share</span>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </React.Fragment>
            ))
          )}
        </div>

        {/* Load More */}
        {hasNextPage && (
          <div className="flex justify-center py-4">
            <Button 
              variant="outline" 
              onClick={() => fetchNextPage()} 
              disabled={isFetchingNextPage}
              className="rounded-full"
            >
              {isFetchingNextPage ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading more...
                </>
              ) : (
                'Load more posts'
              )}
            </Button>
          </div>
        )}
        
        {!hasNextPage && !isLoading && data?.pages[0]?.items.length > 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">
            You've caught up on all posts!
          </p>
        )}
      </main>
    </div>
  );
}

export default function Userfeedscreen_487() { return null; }
