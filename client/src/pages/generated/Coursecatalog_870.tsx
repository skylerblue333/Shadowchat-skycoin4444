// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import * as __ns_lucide_react_1 from 'lucide-react';
const { Sun, Moon } = (__ns_lucide_react_1 as any);

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: CourseCatalog

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


const CourseCatalog: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const { data: courses, isLoading, isError, error } = useStubQuery({ category: selectedCategory });

  const categories = ['All', 'Frontend', 'Backend']; // Categories are still hardcoded for filter display

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
        <p className="text-xl">Loading courses...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
        <p className="text-xl text-destructive">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="w-full p-4 bg-card shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">Course Catalog</h1>
        <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)} aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
          {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
        </Button>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Sidebar for Filters/Navigation */}
        <aside className="md:col-span-1 bg-card p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div className="space-y-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="w-full"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </aside>

        {/* Course Listings */}
        <section className="md:col-span-3 bg-card p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Available Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses?.map(course => (
              <Card key={course.id}>
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{course.description}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">View Course</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full p-4 bg-card shadow-md mt-4">
        <p className="text-center text-muted-foreground text-sm">&copy; 2024 SKYCOIN4444. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CourseCatalog;