// AUTO-GENERATED DRAFT SCREEN: DiscussionBoard
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { api, Topic, Post } from '@/lib/trpc';
import { Sun, Moon } from 'lucide-react';

interface DiscussionBoardProps {
  // Define props here if any
}

const DiscussionBoard: React.FC<DiscussionBoardProps> = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [newPostContent, setNewPostContent] = useState<string>('');
  const { data: topics, isLoading: isLoadingTopics, isError: isErrorTopics, error: topicsError } = api.topics.useGetTopics();
  const { data: posts, isLoading: isLoadingPosts, isError: isErrorPosts, error: postsError } = api.posts.useGetPosts(selectedTopicId || '');
  const { mutate: createPost, isLoading: isCreatingPost } = api.posts.useCreatePost();

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopicId(topicId);
    setNewPostContent('');
  };

  const handlePostSubmit = async () => {
    if (selectedTopicId && newPostContent.trim() !== '') {
      try {
        await createPost({
          topicId: selectedTopicId,
          author: 'Current User', // This would typically come from user context
          content: newPostContent.trim(),
        });
        setNewPostContent('');
        // Optionally refetch posts or update local state
      } catch (error) {
        console.error('Failed to create post:', error);
        // Handle error display to user
      }
    }
  };

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="container mx-auto py-4 border-b border-border flex justify-between items-center">
        <h1 className="text-3xl font-bold">Learning Module: Discussion Board</h1>
        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </header>
      <main className="container mx-auto py-8">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Topics</h2>
          {isLoadingTopics && <p>Loading topics...</p>}
          {isErrorTopics && <p className="text-destructive">Error loading topics: {topicsError?.message}</p>}
          <div className="space-y-4">
            {topics?.map((topic) => (
              <Card key={topic.id} className={selectedTopicId === topic.id ? 'border-primary' : ''}>
                <CardHeader>
                  <CardTitle>{topic.title}</CardTitle>
                  <CardDescription>Started by {topic.starter} on {topic.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{topic.description}</p>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={() => handleTopicSelect(topic.id)} variant={selectedTopicId === topic.id ? 'default' : 'outline'}>
                    {selectedTopicId === topic.id ? 'Viewing Topic' : 'View Topic'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {selectedTopicId && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Discussion Thread: {topics?.find(t => t.id === selectedTopicId)?.title}</h2>
            {isLoadingPosts && <p>Loading posts...</p>}
            {isErrorPosts && <p className="text-destructive">Error loading posts: {postsError?.message}</p>}
            <div className="space-y-6">
              {posts?.map((post) => (
                <Card key={post.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{post.author}</CardTitle>
                    <CardDescription>{post.timestamp}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{post.content}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button variant="ghost">Reply</Button>
                    <Button variant="ghost">Like</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Reply to Topic</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Write your reply here..."
                  rows={4}
                  aria-label="New post content"
                />
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handlePostSubmit} disabled={isCreatingPost || newPostContent.trim() === ''}>
                  {isCreatingPost ? 'Posting...' : 'Submit Reply'}
                </Button>
              </CardFooter>
            </Card>
          </section>
        )}
      </main>
    </div>
  );
};

export default DiscussionBoard;
