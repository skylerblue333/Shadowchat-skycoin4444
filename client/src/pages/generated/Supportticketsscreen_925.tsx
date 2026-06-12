// AUTO-GENERATED DRAFT SCREEN: SupportTicketsScreen
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'closed' | 'pending';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  updatedAt: string;
  assigneeId?: string;
  assigneeName?: string;
  userId: string;
  userName: string;
  comments: Comment[];
}

interface Comment {
  id: string;
  ticketId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

interface FilterOptions {
  status?: 'open' | 'in_progress' | 'closed' | 'pending';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  search?: string;
}

// Mock tRPC hooks for demonstration
const trpc = {
  ticket: {
    list: {
      useQuery: (filters: FilterOptions) => {
        // Simulate API call
        const tickets: Ticket[] = [
          {
            id: '1',
            subject: 'Issue with login',
            description: 'Users are unable to log in.',
            status: 'open',
            priority: 'high',
            createdAt: '2023-01-01T10:00:00Z',
            updatedAt: '2023-01-01T10:00:00Z',
            userId: 'user1',
            userName: 'John Doe',
            comments: [],
          },
          {
            id: '2',
            subject: 'Feature request: Dark mode',
            description: 'Request for a dark mode feature.',
            status: 'in_progress',
            priority: 'medium',
            createdAt: '2023-01-05T11:00:00Z',
            updatedAt: '2023-01-06T14:00:00Z',
            assigneeId: 'agent1',
            assigneeName: 'Agent Smith',
            userId: 'user2',
            userName: 'Jane Smith',
            comments: [],
          },
        ];
        return { data: tickets, isLoading: false, isError: false, error: null };
      },
    },
    getById: {
      useQuery: (ticketId: string) => {
        // Simulate API call
        const ticket: Ticket | undefined = {
          id: '1',
          subject: 'Issue with login',
          description: 'Users are unable to log in.',
          status: 'open',
          priority: 'high',
          createdAt: '2023-01-01T10:00:00Z',
          updatedAt: '2023-01-01T10:00:00Z',
          userId: 'user1',
          userName: 'John Doe',
          comments: [],
        };
        return { data: ticket, isLoading: false, isError: false, error: null };
      },
    },
    update: {
      useMutation: () => {
        return { mutate: (data: any) => console.log('Updating ticket:', data), isLoading: false, isError: false, error: null };
      },
    },
    addComment: {
      useMutation: () => {
        return { mutate: (data: any) => console.log('Adding comment:', data), isLoading: false, isError: false, error: null };
      },
    },
  },
};

const SupportTicketsScreen: React.FC = () => {
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({});

  const { data: tickets, isLoading: isLoadingTickets, isError: isErrorTickets, error: ticketsError } = trpc.ticket.list.useQuery(filters);
  const { data: selectedTicket, isLoading: isLoadingSelectedTicket, isError: isErrorSelectedTicket, error: selectedTicketError } = trpc.ticket.getById.useQuery(selectedTicketId || '');

  const handleTicketSelect = (ticketId: string) => {
    setSelectedTicketId(ticketId);
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <header className="p-4 border-b border-border flex justify-between items-center">
        <h1 className="text-2xl font-bold">Support Tickets</h1>
        {/* Theme Toggle Placeholder */}
        <Button variant="outline">Toggle Theme</Button>
      </header>
      <div className="flex flex-1 overflow-hidden">
        {/* Ticket List */}
        <aside className="w-1/3 border-r border-border p-4 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">All Tickets</h2>
          {isLoadingTickets && <p>Loading tickets...</p>}
          {isErrorTickets && <p className="text-destructive">Error loading tickets: {ticketsError?.message}</p>}
          <div className="space-y-2">
            {tickets?.map((ticket) => (
              <div
                key={ticket.id}
                className={`p-3 border rounded-md cursor-pointer ${selectedTicketId === ticket.id ? 'bg-accent' : 'hover:bg-muted'}`}
                onClick={() => handleTicketSelect(ticket.id)}
              >
                <h3 className="font-medium">{ticket.subject}</h3>
                <p className="text-sm text-muted-foreground">Status: {ticket.status} | Priority: {ticket.priority}</p>
              </div>
            ))}
          </div>
        </aside>

        {/* Ticket Details */}
        <main className="flex-1 p-4 overflow-y-auto">
          {selectedTicketId ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">Ticket Details: {selectedTicket?.subject}</h2>
              {isLoadingSelectedTicket && <p>Loading ticket details...</p>}
              {isErrorSelectedTicket && <p className="text-destructive">Error loading ticket details: {selectedTicketError?.message}</p>}
              {selectedTicket && (
                <div className="space-y-4">
                  <div>
                    <p><strong>ID:</strong> {selectedTicket.id}</p>
                    <p><strong>Description:</strong> {selectedTicket.description}</p>
                    <p><strong>Status:</strong> {selectedTicket.status}</p>
                    <p><strong>Priority:</strong> {selectedTicket.priority}</p>
                    <p><strong>Created At:</strong> {new Date(selectedTicket.createdAt).toLocaleString()}</p>
                    <p><strong>Updated At:</strong> {new Date(selectedTicket.updatedAt).toLocaleString()}</p>
                    <p><strong>Reporter:</strong> {selectedTicket.userName}</p>
                    {selectedTicket.assigneeName && <p><strong>Assignee:</strong> {selectedTicket.assigneeName}</p>}
                  </div>
                  {/* Update Form Placeholder */}
                  <div className="border-t border-border pt-4">
                    <h3 className="text-lg font-medium mb-2">Update Ticket</h3>
                    <p>Form to update status, priority, assignee will go here.</p>
                    <Button>Save Changes</Button>
                  </div>
                  {/* Comments Section Placeholder */}
                  <div className="border-t border-border pt-4">
                    <h3 className="text-lg font-medium mb-2">Comments</h3>
                    <p>Comments will be displayed here.</p>
                    <Button>Add Comment</Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">Select a ticket to view details</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default SupportTicketsScreen;
