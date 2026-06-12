// AUTO-GENERATED DRAFT SCREEN: SocialCreatePost
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { z } from 'zod'; // For robust form validation

// --- Zod Schema for Form Validation ---
// Defines the validation rules for the post creation form.
// Content must be between 10 and 250 characters.
const createPostSchema = z.object({
  content: z.string()
    .min(10, "Post must be at least 10 characters.")
    .max(250, "Post cannot exceed 250 characters."),
});

// Infer the TypeScript type from the Zod schema
type CreatePostForm = z.infer<typeof createPostSchema>;

// --- Mock tRPC Mutation Hook ---
// This hook simulates a tRPC mutation for creating a post.
// In a real application, this would interact with a tRPC backend.
const useCreatePost = () => {
  return useMutation<string, Error, CreatePostForm>({
    mutationFn: async (newPost) => {
      // Simulate an asynchronous API call with a delay.
      // This mimics network latency and server processing.
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate an API error if the content includes the word 'error'.
          if (newPost.content.toLowerCase().includes('error')) {
            reject(new Error('Simulated API error: Could not create post. Please try again.'));
          } else {
            // Log the successful post creation and resolve the promise.
            console.log('Post created successfully:', newPost);
            resolve('Post created successfully!');
          }
        }, 1500); // Simulate a 1.5-second network request
      });
    },
    onSuccess: () => {
      // Callback for successful mutation. In a real app, this might invalidate
      // relevant queries to refetch data (e.g., a list of posts).
      console.log('Post creation successful. UI can now be updated or re-rendered.');
    },
    onError: (error) => {
      // Callback for failed mutation. Useful for displaying toast notifications
      // or logging errors to an error tracking service.
      console.error('Error creating post:', error.message);
    },
  });
};

// --- SocialCreatePost Component ---
// This is the main React component for creating a social media post.
// It includes form handling, validation, loading states, error display,
// and a dark mode toggle for enhanced user experience.
const SocialCreatePost: React.FC = () => {
  // State for the post content input field.
  const [content, setContent] = useState<string>('');
  // State for client-side validation errors.
  const [validationError, setValidationError] = useState<string | null>(null);
  // State for managing dark mode preference.
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Destructure mutation state from the useCreatePost hook.
  const { mutate, isLoading, isError, error, isSuccess } = useCreatePost();

  // Effect hook to apply or remove the 'dark' class to the document element
  // based on the `isDarkMode` state. This enables Tailwind CSS dark mode.
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]); // Re-run effect when isDarkMode changes

  // Handles the form submission logic.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default browser form submission
    setValidationError(null); // Clear previous validation errors

    try {
      // Validate form content using Zod schema.
      createPostSchema.parse({ content });
      // If validation passes, trigger the tRPC-like mutation.
      mutate({ content });
      setContent(''); // Clear the input field on successful submission attempt
    } catch (err) {
      // Catch and display Zod validation errors.
      if (err instanceof z.ZodError) {
        setValidationError(err.errors[0].message); // Display the first validation error
      } else {
        // Handle any other unexpected errors during submission.
        setValidationError('An unexpected error occurred during validation.');
      }
    }
  };

  // Toggles the dark mode state.
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 p-4">
      {/* Header Section */}
      <header className="w-full max-w-md text-center py-4">
        <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-200">SKYCOIN4444 Social</h1>
      </header>

      {/* Dark Mode Toggle Button */}
      <div className="absolute top-4 right-4">
        <Button
          onClick={toggleDarkMode}
          variant="outline"
          className="dark:text-gray-100 dark:border-gray-600 border-gray-300 text-gray-800"
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </div>

      {/* Main Content Area - Create Post Form */}
      <main className="flex-grow flex items-center justify-center w-full">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 transition-colors duration-300 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-center" aria-live="polite">Create New Post</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Textarea for post content */}
            <label htmlFor="post-content" className="sr-only">What's on your mind?</label>
            <Textarea
              id="post-content"
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              className="w-full resize-none border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              aria-invalid={!!validationError || isError}
              aria-describedby={(validationError || isError) ? "post-error" : undefined}
              disabled={isLoading} // Disable input while loading
            />

            {/* Display validation errors */}
            {validationError && (
              <p id="post-error" className="text-red-500 text-sm" role="alert">
                Validation Error: {validationError}
              </p>
            )}

            {/* Display API errors */}
            {isError && (
              <p id="post-error" className="text-red-500 text-sm" role="alert">
                Error: {error?.message || 'Failed to create post due to an unknown error.'}
              </p>
            )}

            {/* Display success message */}
            {isSuccess && (
              <p className="text-green-500 text-sm" role="status">
                Post created successfully! Your post is now live.
              </p>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-200"
              disabled={isLoading || !content.trim()} // Disable if loading or content is empty
              aria-live="assertive" // Announce changes to assistive technologies
            >
              {isLoading ? 'Posting...' : 'Post'}
            </Button>

            {/* Loading indicator */}
            {isLoading && (
              <p className="text-blue-500 text-sm mt-2" role="status">
                Submitting your post, please wait...
              </p>
            )}
          </form>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="w-full max-w-md text-center py-4 text-gray-600 dark:text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} SKYCOIN4444. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SocialCreatePost;