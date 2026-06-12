// AUTO-GENERATED DRAFT SCREEN: DecentralizedStorageScreen
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Loader2, Upload, File, HardDrive, ShieldCheck, Network } from 'lucide-react';
import { trpc } from '@/trpc/client';

interface StorageItem {
  id: string;
  name: string;
  size: number;
  uploadedAt: string;
  status: 'uploading' | 'stored' | 'error';
}

const DecentralizedStorageScreen: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Placeholder for tRPC query
  const { data: storageItems, isLoading, isError, error } = trpc.hello.useQuery({ text: 'world' });

  const handleThemeToggle = () => {
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.classList.toggle('dark', !isDarkTheme);
  };

  const handleUpload = () => {
    if (!fileName) return;
    setIsUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      setFileName('');
      alert(`Successfully uploaded ${fileName} to the decentralized network.`);
    }, 2000);
  };

  return (
    <div className={`min-h-screen p-8 transition-colors duration-300 ${isDarkTheme ? 'dark bg-zinc-950 text-zinc-50' : 'bg-zinc-50 text-zinc-900'}`}>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6 border-zinc-200 dark:border-zinc-800">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight flex items-center gap-3">
              <Network className="h-10 w-10 text-primary" />
              Decentralized Storage
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Secure, distributed, and censorship-resistant file storage.
            </p>
          </div>
          <div className="flex items-center space-x-3 bg-white dark:bg-zinc-900 p-2 rounded-full shadow-sm border border-zinc-200 dark:border-zinc-800">
            <Label htmlFor="dark-mode-toggle" className="cursor-pointer font-medium">
              {isDarkTheme ? 'Dark Mode' : 'Light Mode'}
            </Label>
            <Switch
              id="dark-mode-toggle"
              checked={isDarkTheme}
              onCheckedChange={handleThemeToggle}
              aria-label="Toggle dark mode"
            />
          </div>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <HardDrive className="h-4 w-4" /> Total Storage Used
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">124.5 GB</div>
              <p className="text-xs text-muted-foreground mt-1">Across 342 files</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Network className="h-4 w-4" /> Active Nodes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1,204</div>
              <p className="text-xs text-muted-foreground mt-1">Global distribution</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> Network Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">Optimal</div>
              <p className="text-xs text-muted-foreground mt-1">99.99% Uptime</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-zinc-200 dark:border-zinc-800 sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" /> Upload File
                </CardTitle>
                <CardDescription>
                  Files are encrypted and sharded across the network.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="file-name" className="text-sm font-semibold">File Name</Label>
                    <Input
                      id="file-name"
                      placeholder="e.g., secret_document.pdf"
                      value={fileName}
                      onChange={(e) => setFileName(e.target.value)}
                      className="focus-visible:ring-primary"
                    />
                  </div>
                  
                  <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg p-8 text-center hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer">
                    <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                    <p className="text-sm font-medium">Drag & drop a file here</p>
                    <p className="text-xs text-muted-foreground mt-1">or click to browse</p>
                  </div>

                  <Button 
                    onClick={handleUpload} 
                    disabled={!fileName || isUploading}
                    className="w-full h-12 text-lg font-semibold shadow-md transition-all hover:scale-[1.02]"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Encrypting & Uploading...
                      </>
                    ) : (
                      'Upload to Network'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* File List Section */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-zinc-200 dark:border-zinc-800 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <File className="h-5 w-5" /> Stored Files
                </CardTitle>
                <CardDescription>
                  Manage your files distributed across the decentralized network.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-64 space-y-4">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <span className="text-muted-foreground font-medium">Syncing with network...</span>
                  </div>
                ) : isError ? (
                  <div className="bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 p-6 rounded-lg text-center border border-red-200 dark:border-red-900">
                    <ShieldCheck className="h-10 w-10 mx-auto mb-2 opacity-50" />
                    <p className="font-semibold">Connection Error</p>
                    <p className="text-sm mt-1">{error?.message || 'Failed to retrieve file list from the network.'}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Mock Data List */}
                    [
                      { name: 'Q3_Financial_Report.xlsx', size: '4.2 MB', date: '2 hours ago', status: 'stored' },
                      { name: 'Project_Alpha_Source.zip', size: '1.8 GB', date: 'Yesterday', status: 'stored' },
                      { name: 'Family_Vacation_Photos.tar', size: '850 MB', date: '3 days ago', status: 'stored' },
                      { name: 'Wallet_Backup_Encrypted.dat', size: '12 KB', date: '1 week ago', status: 'stored' },
                    ].map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors group">
                        <div className="flex items-center gap-4">
                          <div className="bg-primary/10 p-3 rounded-lg text-primary">
                            <File className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm md:text-base">{file.name}</p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                              <span>{file.size}</span>
                              <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
                              <span>{file.date}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                            Secured
                          </span>
                          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecentralizedStorageScreen;
