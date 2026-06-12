// AUTO-GENERATED DRAFT SCREEN: FileManager
import React, { useState, useEffect } from 'react';
import { trpc } from '@/utils/trpc';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  FileIcon,
  FolderIcon,
  MoreVerticalIcon,
  DownloadIcon,
  TrashIcon,
  UploadIcon,
  SearchIcon,
  Loader2Icon,
  AlertCircleIcon,
} from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size: number;
  updatedAt: string;
}

export const FileManager: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPath, setCurrentPath] = useState<string>('/');

  // Mock tRPC query for fetching files
  const { data: files, isLoading, error, refetch } = trpc.fileManager.getFiles.useQuery({
    path: currentPath,
    search: searchQuery,
  });

  // Mock tRPC mutations
  const deleteFileMutation = trpc.fileManager.deleteFile.useMutation({
    onSuccess: () => refetch(),
  });

  const uploadFileMutation = trpc.fileManager.uploadFile.useMutation({
    onSuccess: () => refetch(),
  });

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteFileMutation.mutate({ id });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you'd handle file upload logic here
      uploadFileMutation.mutate({ name: file.name, path: currentPath });
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-background text-foreground p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">File Manager</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search files..."
              className="pl-8 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileUpload}
            />
            <label htmlFor="file-upload">
              <Button asChild cursor="pointer">
                <span>
                  <UploadIcon className="mr-2 h-4 w-4" />
                  Upload
                </span>
              </Button>
            </label>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <span
          className="cursor-pointer hover:text-foreground transition-colors"
          onClick={() => setCurrentPath('/')}
        >
          Home
        </span>
        {currentPath !== '/' && (
          <>
            <span>/</span>
            <span>{currentPath.replace(/^\//, '')}</span>
          </>
        )}
      </div>

      <div className="border rounded-md flex-1 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px]">Name</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Last Modified</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2Icon className="h-5 w-5 animate-spin text-muted-foreground" />
                    <span className="text-muted-foreground">Loading files...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-destructive">
                  <div className="flex items-center justify-center space-x-2">
                    <AlertCircleIcon className="h-5 w-5" />
                    <span>Failed to load files. Please try again.</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : files?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  No files found.
                </TableCell>
              </TableRow>
            ) : (
              files?.map((file: FileItem) => (
                <TableRow key={file.id} className="group">
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      {file.type === 'folder' ? (
                        <FolderIcon className="h-5 w-5 text-blue-500" />
                      ) : (
                        <FileIcon className="h-5 w-5 text-gray-500" />
                      )}
                      <span
                        className={
                          file.type === 'folder'
                            ? 'cursor-pointer hover:underline'
                            : ''
                        }
                        onClick={() => {
                          if (file.type === 'folder') {
                            setCurrentPath(
                              currentPath === '/'
                                ? `/${file.name}`
                                : `${currentPath}/${file.name}`
                            );
                          }
                        }}
                      >
                        {file.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {file.type === 'folder' ? '--' : formatSize(file.size)}
                  </TableCell>
                  <TableCell>{formatDate(file.updatedAt)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreVerticalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {file.type === 'file' && (
                          <DropdownMenuItem>
                            <DownloadIcon className="mr-2 h-4 w-4" />
                            <span>Download</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDelete(file.id)}
                        >
                          <TrashIcon className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FileManager;