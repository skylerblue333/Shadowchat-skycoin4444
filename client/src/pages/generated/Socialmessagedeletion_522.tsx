// AUTO-GENERATED DRAFT SCREEN: SocialMessageDeletion
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useMutation } from '@tanstack/react-query'; // Placeholder for tRPC hook
import { toast } from 'sonner'; // For toast notifications

interface MessageDeletionProps {
  messageId: string;
  onDeleteSuccess: () => void;
  onDeleteError?: (error: Error) => void;
}

const SocialMessageDeletion: React.FC<MessageDeletionProps> = ({ messageId, onDeleteSuccess, onDeleteError }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Simulate tRPC mutation hook for message deletion
  const { mutate, isLoading, isError, error, reset } = useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      // Simulate API call with a delay and random success/failure
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.15) { // 85% success rate
            console.log(`Successfully deleted message with ID: ${id}`);
            resolve();
          } else {
            const err = new Error('Failed to delete message. Please try again later.');
            console.error(`Error deleting message ${id}:`, err);
            reject(err);
          }
        }, 1800); // Simulate network latency
      });
    },
    onSuccess: () => {
      onDeleteSuccess();
      toast.success('Message deleted successfully!');
      setIsOpen(false);
      reset(); // Reset mutation state after success
    },
    onError: (err) => {
      onDeleteError?.(err);
      toast.error(err.message || 'An unknown error occurred during deletion.');
      // Optionally keep dialog open to show error, or close and let toast handle it
      // setIsOpen(false);
    },
  });

  const handleDelete = () => {
    if (messageId) {
      mutate(messageId);
    } else {
      toast.error('No message ID provided for deletion.');
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      reset(); // Reset mutation state when dialog closes
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          aria-label={`Delete message with ID ${messageId}`}
          className="w-full md:w-auto"
        >
          Delete Message
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark:bg-gray-800 dark:text-white rounded-lg shadow-xl">
        <DialogHeader className="border-b pb-3 mb-4">
          <DialogTitle className="text-lg font-semibold">Confirm Message Deletion</DialogTitle>
          <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
            This action will permanently delete the message. Are you absolutely sure you want to proceed?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 px-2">
          {isLoading && (
            <div className="flex items-center space-x-2 text-blue-500 dark:text-blue-400" role="status" aria-live="polite">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Deleting message... This might take a moment.</span>
            </div>
          )}
          {isError && (
            <p className="text-red-600 dark:text-red-400 text-sm font-medium" role="alert">
              Error: {error?.message || 'An unexpected error occurred.'}
            </p>
          )}
          {!isLoading && !isError && (
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Once deleted, the message cannot be recovered. Please consider carefully.
            </p>
          )}
        </div>
        <DialogFooter className="border-t pt-3 mt-4 flex flex-col sm:flex-row sm:justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isLoading}
            aria-label="Cancel message deletion"
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
            aria-label="Confirm message deletion"
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <span className="flex items-center"><svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Deleting...</span>
            ) : (
              'Delete Permanently'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SocialMessageDeletion;
