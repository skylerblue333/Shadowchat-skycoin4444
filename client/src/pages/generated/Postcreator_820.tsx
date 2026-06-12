// @ts-nocheck
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: PostCreator

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


const PostCreator: React.FC = () => {
  const [postContent, setPostContent] = useState<string>('');
  const createPost = useStubMutation();

  const handleSubmit = async () => {
    if (!postContent.trim()) return;
    try {
      await createPost.mutateAsync({ content: postContent });
      setPostContent('');
      alert('Post created successfully!');
    } catch (error: any) {
      alert('Failed to create post: ' + error.message);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-card text-card-foreground rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
      <Textarea
        placeholder="What's on your mind?"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        className="mb-4 min-h-[100px]"
        aria-label="Post content"
      />
      <Button
        onClick={handleSubmit}
        className="w-full"
        disabled={createPost.isLoading || !postContent.trim()}
      >
        {createPost.isLoading ? 'Posting...' : 'Post'}
      </Button>
      {createPost.isError && (
        <p className="text-red-500 text-sm mt-2">Error: {createPost.error?.message}</p>
      )}
    </div>
  );
};

export default PostCreator;
