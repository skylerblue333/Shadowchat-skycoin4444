// AUTO-GENERATED DRAFT SCREEN: PromptLibraryScreen

import React, { useState, useEffect, useMemo } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query'; // Placeholder for tRPC/React Query
import { Input } from '@/components/ui/input'; // shadcn/ui Input
import { Button } from '@/components/ui/button'; // shadcn/ui Button
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // shadcn/ui Card
import { Label } from '@/components/ui/label'; // shadcn/ui Label
import { Switch } from '@/components/ui/switch'; // shadcn/ui Switch
import { Separator } from '@/components/ui/separator'; // shadcn/ui Separator
import { Skeleton } from '@/components/ui/skeleton'; // shadcn/ui Skeleton
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'; // shadcn/ui Alert
import { SunIcon, MoonIcon, SearchIcon, PlusIcon } from 'lucide-react'; // Lucide icons

// --- Type Definitions ---
interface Prompt {
  id: string;
  title: string;
description: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface PromptFilter {
  search?: string;
  tag?: string;
}

// --- Mock API Functions (replace with actual tRPC client) ---
const mockFetchPrompts = async (filters: PromptFilter): Promise<Prompt[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allPrompts: Prompt[] = [
        {
          id: '1',
          title: 'Generate Marketing Copy',
          description: 'A prompt to generate engaging marketing copy for various products.',
          content: 'Write compelling marketing copy for {{product_name}} focusing on {{key_benefit}}.',
          tags: ['marketing', 'copywriting'],
          createdAt: '2023-01-15T10:00:00Z',
          updatedAt: '2023-01-15T10:00:00Z',
        },
        {
          id: '2',
          title: 'Summarize Article',
          description: 'Summarizes a given article into concise bullet points.',
          content: 'Summarize the following article in 3 bullet points: {{article_text}}',
          tags: ['summarization', 'content'],
          createdAt: '2023-02-20T11:30:00Z',
          updatedAt: '2023-02-20T11:30:00Z',
        },
        {
          id: '3',
          title: 'Code Review Feedback',
          description: 'Provides constructive feedback on code snippets.',
          content: 'Review the following code for best practices and potential bugs: ```{{code_snippet}}```',
          tags: ['development', 'code'],
          createdAt: '2023-03-01T09:00:00Z',
          updatedAt: '2023-03-01T09:00:00Z',
        },
        {
          id: '4',
          title: 'Brainstorm Blog Post Ideas',
          description: 'Generates creative blog post ideas around a given topic.',
          content: 'Brainstorm 5 unique blog post ideas about {{topic}}.',
          tags: ['content', 'brainstorming'],
          createdAt: '2023-04-10T14:00:00Z',
          updatedAt: '2023-04-10T14:00:00Z',
        },
      ];

      let filteredPrompts = allPrompts;
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredPrompts = filteredPrompts.filter(
          (prompt) =>
            prompt.title.toLowerCase().includes(searchTerm) ||
            prompt.description.toLowerCase().includes(searchTerm) ||
            prompt.content.toLowerCase().includes(searchTerm)
        );
      }
      if (filters.tag) {
        filteredPrompts = filteredPrompts.filter((prompt) =>
          prompt.tags.includes(filters.tag!)
        );
      }
      resolve(filteredPrompts);
    }, 500);
  });
};

// --- PromptLibraryScreen Component ---
export const PromptLibraryScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);
  const [isDarkTheme, setIsDarkTheme] = useState(false); // State for dark theme

  // Simulate tRPC query for prompts
  const { data: prompts, isLoading, isError, error } = useQuery<Prompt[], Error>(
    ['prompts', { search: searchTerm, tag: selectedTag }],
    () => mockFetchPrompts({ search: searchTerm, tag: selectedTag }),
    { staleTime: 5 * 60 * 1000 } // Example stale time
  );

  // Simulate tRPC mutation for adding a prompt (not fully implemented in UI)
  const addPromptMutation = useMutation<Prompt, Error, Omit<Prompt, 'id' | 'createdAt' | 'updatedAt'>>(
    (newPrompt) => new Promise((resolve) => setTimeout(() => resolve({ ...newPrompt, id: 'new-id', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }), 500))
  );

  // Dark theme toggle effect
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  const allAvailableTags = useMemo(() => {
    const tags = new Set<string>();
    prompts?.forEach(prompt => prompt.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, [prompts]);

  return (
    <div className={`min-h-screen p-8 ${isDarkTheme ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className=
        max-w-7xl mx-auto`}>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Prompt Library</h1>
          <div className="flex items-center space-x-4">
            <Switch
              id="dark-mode-toggle"
              checked={isDarkTheme}
              onCheckedChange={setIsDarkTheme}
            />
            <Label htmlFor="dark-mode-toggle">{isDarkTheme ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}</Label>
            <Button onClick={() => console.log("Add new prompt")}>
              <PlusIcon className="mr-2 h-4 w-4" /> Add New Prompt
            </Button>
          </div>
        </div>

        <div className="mb-8 flex space-x-4">
          <div className="relative flex-grow">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search prompts..."
              className="pl-10 pr-4 py-2 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* Tag filtering could be implemented with a Select component */}
          {/* <Select onValueChange={setSelectedTag} value={selectedTag}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tags</SelectItem>
              {allAvailableTags.map(tag => (
                <SelectItem key={tag} value={tag}>{tag}</SelectItem>
              ))}
            </SelectContent>
          </Select> */}
        </div>

        <Separator className="mb-8" />

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {isError && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Failed to load prompts: {error?.message || "Unknown error"}</AlertDescription>
          </Alert>
        )}

        {!isLoading && !isError && prompts && prompts.length === 0 && (
          <p className="text-center text-gray-600 dark:text-gray-400">No prompts found matching your criteria.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prompts?.map((prompt) => (
            <Card key={prompt.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{prompt.title}</CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400">{prompt.description}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3">{prompt.content}</p>
                <div className="flex flex-wrap gap-2">
                  {prompt.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full dark:bg-blue-900 dark:text-blue-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <div className="p-6 pt-0 flex justify-end">
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromptLibraryScreen;
