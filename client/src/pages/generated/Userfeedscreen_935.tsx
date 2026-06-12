// AUTO-GENERATED DRAFT SCREEN: UserFeedScreen

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useQuery, useMutation } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc'; // Assuming tRPC client setup
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Moon, Sun, Send } from 'lucide-react';
import { useTheme } from 'next-themes';

// Define types for a Post and User
interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

interface Post {
  id: string;
  author: User;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
}

// Schema for new post creation
const newPostSchema = z.object({
  content: z.string().min(1, 'Post cannot be empty'),
});

type NewPostFormValues = z.infer<typeof newPostSchema>;

const UserFeedScreen: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const { data: posts, isLoading, isError, error } = trpc.post.getFeed.useQuery();
  const createPostMutation = trpc.post.create.useMutation();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<NewPostFormValues>({
    resolver: zodResolver(newPostSchema),
  });

  const onSubmit = async (data: NewPostFormValues) => {
    try {
      await createPostMutation.mutateAsync(data);
      reset();
      // Optionally refetch posts or update cache
    } catch (err) {
      console.error('Failed to create post:', err);
    }
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading feed...</div>;
  if (isError) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error?.message}</div>;

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">User Feed</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
        </Button>
      </div>

      {/* New Post Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Textarea
              placeholder="What's on your mind?"
              {...register('content')}
              className="min-h-[80px]"
            />
            {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
            <Button type="submit" className="w-full">
              <Send className="mr-2 h-4 w-4" /> Post
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* User Feed */}
      <div className="space-y-4">
        {posts?.map((post: Post) => (
          <Card key={post.id}>
            <CardHeader className="flex flex-row items-center space-x-4">
              <Avatar>
                <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{post.author.name}</p>
                <p className="text-sm text-gray-500">{new Date(post.timestamp).toLocaleString()}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{post.content}</p>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{post.likes} Likes</span>
                <span>{post.comments} Comments</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserFeedScreen;
