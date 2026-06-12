// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
const ModeToggle: any = (_props: any) => null;

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: LessonViewer

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


interface Lesson {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
  attachments?: { name: string; url: string }[];
}

interface LessonViewerProps {
  lessonId: string;
}

const LessonViewer: React.FC<any> = ({ lessonId }) => {
  const { data: lesson, isLoading, isError, error } = useStubQuery({
    id: lessonId,
  });

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-3 p-4">
        <Skeleton className="h-[125px] w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div role="alert" className="p-4 text-red-500">
        <h2 className="text-lg font-semibold">Error loading lesson:</h2>
        <p>{error?.message || 'An unknown error occurred.'}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">Retry</Button>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="p-4 text-gray-500">
        <p>Lesson not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold tracking-tight">{lesson.title}</h1>
          <ModeToggle /> {/* Assuming ModeToggle handles its own state and theme application */}
        </div>
        <Separator className="mb-4" />

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Lesson Content</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
              <div dangerouslySetInnerHTML={{ __html: lesson.content }} className="prose dark:prose-invert max-w-none" />
            </ScrollArea>
          </CardContent>
        </Card>

        {lesson.videoUrl && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Lesson Video</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video w-full">
                <iframe
                  className="absolute inset-0 w-full h-full rounded-md"
                  src={lesson.videoUrl}
                  title="Lesson Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </CardContent>
          </Card>
        )}

        {lesson.attachments && lesson.attachments.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Attachments</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                {lesson.attachments.map((attachment, index) => (
                  <li key={index}>
                    <a href={attachment.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {attachment.name}
                    </a>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-end mt-6">
          <Button>Mark as Complete</Button>
        </div>
      </div>
    </div>
  );
};

export default LessonViewer;
