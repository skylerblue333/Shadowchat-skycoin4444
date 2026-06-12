// AUTO-GENERATED DRAFT SCREEN: CodeEditor
import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { trpc } from '../utils/trpc';
import { Sun, Moon } from 'lucide-react';

interface CodeEditorProps {
  // Add any props needed for the CodeEditor component
}

const CodeEditor: React.FC<CodeEditorProps> = () => {
  const [code, setCode] = useState<string>('// Start coding here...');
  const [filename, setFilename] = useState<string>('untitled.js');
  const [output, setOutput] = useState<string>('Console output will appear here.');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const saveCodeMutation = trpc.saveCode.useMutation({
    onSuccess: (data) => {
      setOutput(data.message);
    },
    onError: (error) => {
      setOutput(`Error saving file: ${error.message}`);
    },
  });

  const handleSave = () => {
    saveCodeMutation.mutate({ filename, code });
  };

  return (
    <div className={cn("flex h-screen bg-background text-foreground")}>
      {/* Sidebar for file tree */}
      <aside className="w-64 bg-card border-r border-border p-4">
        <h2 className="text-lg font-semibold mb-4">Files</h2>
        {/* File tree goes here */}
        <ul className="space-y-2">
          <li>{filename}</li>
        </ul>
      </aside>

      {/* Main editor area */}
      <div className="flex flex-col flex-1">
        {/* Header for actions */}
        <header className="flex items-center justify-between p-4 bg-card border-b border-border">
          <h1 className="text-xl font-bold">Code Editor</h1>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              className="p-2 bg-muted border border-input rounded-md text-sm"
              aria-label="Filename"
            />
            <Button onClick={handleSave} disabled={saveCodeMutation.isLoading}>
              {saveCodeMutation.isLoading ? 'Saving...' : 'Save'}
            </Button>
            <Button variant="secondary">Run</n            </Button>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} aria-label="Toggle dark mode">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </header>

        {/* Code editing area */}
        <main className="flex-1 p-4 overflow-auto">
          <textarea
            className="w-full h-full p-2 font-mono text-sm bg-muted border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Start coding here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            aria-label="Code editor"
          ></textarea>
        </main>

        {/* Resizable panel for output/console */}
        <footer className="h-48 bg-card border-t border-border p-4">
          <h2 className="text-lg font-semibold mb-2">Output</h2>
          <div className="bg-muted h-32 p-2 font-mono text-sm overflow-auto border border-input rounded-md">
            <p>{output}</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CodeEditor;