// AUTO-GENERATED DRAFT SCREEN: CommunityForum
import React from 'react';
import { trpc } from './trpc';
import { Button } from './components/ui/button';

function App() {
  const { data: posts, isLoading, isError, error } = trpc.post.getPosts.useQuery();
  const [darkMode, setDarkMode] = React.useState(false);

  if (isLoading) return <div>Loading posts...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div className={`min-h-screen p-8 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Community Forum</h1>
        <Button onClick={() => setDarkMode(!darkMode)}>
          Toggle Dark Mode
        </Button>
      </div>
      <div className="space-y-6">
        {posts?.map((post) => (
          <div key={post.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>By {post.author}</span>
              <span>On {post.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
