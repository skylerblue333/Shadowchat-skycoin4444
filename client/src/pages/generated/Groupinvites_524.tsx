// AUTO-GENERATED DRAFT SCREEN: GroupInvites
import React from 'react';
import { useQuery, useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner'; // Assuming sonner is installed for toasts

// Mock tRPC client and types for demonstration
interface GroupInvite {
  id: string;
  groupId: string;
  groupName: string;
  inviterName: string;
  status: 'pending' | 'accepted' | 'declined';
}

interface User {
  id: string;
  name: string;
}

const mockInvites: GroupInvite[] = [
  { id: '1', groupId: 'g1', groupName: 'Project Alpha', inviterName: 'Alice', status: 'pending' },
  { id: '2', groupId: 'g2', groupName: 'Dev Team', inviterName: 'Bob', status: 'pending' },
];

const mockUsers: User[] = [
  { id: 'u1', name: 'Charlie' },
  { id: 'u2', name: 'David' },
];

const trpc = {
  group: {
    getInvites: {
      useQuery: () => useQuery<GroupInvite[]>({ queryKey: ['groupInvites'], queryFn: () => Promise.resolve(mockInvites) }),
    },
    acceptInvite: {
      useMutation: () => useMutation<GroupInvite, Error, string>({
        mutationFn: (inviteId) => {
          const invite = mockInvites.find(i => i.id === inviteId);
          if (invite) invite.status = 'accepted';
          return Promise.resolve(invite as GroupInvite);
        },
        onSuccess: () => toast.success('Invite accepted!'),
        onError: (error) => toast.error(`Failed to accept invite: ${error.message}`),
      }),
    },
    declineInvite: {
      useMutation: () => useMutation<GroupInvite, Error, string>({
        mutationFn: (inviteId) => {
          const invite = mockInvites.find(i => i.id === inviteId);
          if (invite) invite.status = 'declined';
          return Promise.resolve(invite as GroupInvite);
        },
        onSuccess: () => toast.info('Invite declined.'),
        onError: (error) => toast.error(`Failed to decline invite: ${error.message}`),
      }),
    },
    sendInvite: {
      useMutation: () => useMutation<GroupInvite, Error, { groupId: string; userId: string }>({
        mutationFn: ({ groupId, userId }) => {
          const group = mockInvites.find(g => g.groupId === groupId);
          const user = mockUsers.find(u => u.id === userId);
          if (!group || !user) return Promise.reject(new Error('Group or user not found'));
          const newInvite: GroupInvite = {
            id: String(mockInvites.length + 1),
            groupId,
            groupName: group.groupName,
            inviterName: 'Current User',
            status: 'pending',
          };
          mockInvites.push(newInvite);
          return Promise.resolve(newInvite);
        },
        onSuccess: () => toast.success('Invite sent!'),
        onError: (error) => toast.error(`Failed to send invite: ${error.message}`),
      }),
    },
  },
};

const queryClient = new QueryClient();

const GroupInvites: React.FC = () => {
  const { data: invites, isLoading, isError, error } = trpc.group.getInvites.useQuery();
  const acceptInviteMutation = trpc.group.acceptInvite.useMutation();
  const declineInviteMutation = trpc.group.declineInvite.useMutation();
  const sendInviteMutation = trpc.group.sendInvite.useMutation();

  const [newInviteGroupId, setNewInviteGroupId] = React.useState('');
  const [newInviteUserId, setNewInviteUserId] = React.useState('');
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading invites...</div>;
  if (isError) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error?.message}</div>;

  const handleSendInvite = () => {
    if (newInviteGroupId && newInviteUserId) {
      sendInviteMutation.mutate({ groupId: newInviteGroupId, userId: newInviteUserId });
      setNewInviteGroupId('');
      setNewInviteUserId('');
    } else {
      toast.error('Please enter both Group ID and User ID to send an invite.');
    }
  };

  return (
    <div className={`min-h-screen p-8 ${isDarkTheme ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Group Invites</h1>
          <div className="flex items-center space-x-2">
            <Switch
              id="dark-mode"
              checked={isDarkTheme}
              onCheckedChange={setIsDarkTheme}
              aria-label="Toggle dark mode"
            />
            <Label htmlFor="dark-mode">Dark Mode</Label>
          </div>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Send New Group Invite</CardTitle>
            <CardDescription>Invite a user to a group.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="groupId">Group ID</Label>
                <Input
                  id="groupId"
                  placeholder="Enter Group ID"
                  value={newInviteGroupId}
                  onChange={(e) => setNewInviteGroupId(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="userId">User ID</Label>
                <Input
                  id="userId"
                  placeholder="Enter User ID"
                  value={newInviteUserId}
                  onChange={(e) => setNewInviteUserId(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={handleSendInvite}
              disabled={sendInviteMutation.isPending}
            >
              {sendInviteMutation.isPending ? 'Sending...' : 'Send Invite'}
            </Button>
          </CardFooter>
        </Card>

        <h2 className="text-3xl font-semibold mt-10">Pending Invites</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {invites?.filter(invite => invite.status === 'pending').map((invite) => (
            <Card key={invite.id}>
              <CardHeader>
                <CardTitle>{invite.groupName}</CardTitle>
                <CardDescription>Invited by {invite.inviterName}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Status: {invite.status}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => declineInviteMutation.mutate(invite.id)}
                  disabled={declineInviteMutation.isPending}
                >
                  {declineInviteMutation.isPending ? 'Declining...' : 'Decline'}
                </Button>
                <Button
                  onClick={() => acceptInviteMutation.mutate(invite.id)}
                  disabled={acceptInviteMutation.isPending}
                >
                  {acceptInviteMutation.isPending ? 'Accepting...' : 'Accept'}
                </Button>
              </CardFooter>
            </Card>
          ))}
          {invites?.filter(invite => invite.status === 'pending').length === 0 && (
            <p className="col-span-full text-center text-gray-500">No pending invites.</p>
          )}
        </div>

        <h2 className="text-3xl font-semibold mt-10">Accepted/Declined Invites</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {invites?.filter(invite => invite.status !== 'pending').map((invite) => (
            <Card key={invite.id} className={invite.status === 'accepted' ? 'border-green-500' : 'border-red-500'}>
              <CardHeader>
                <CardTitle>{invite.groupName}</CardTitle>
                <CardDescription>Invited by {invite.inviterName}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Status: <span className={invite.status === 'accepted' ? 'text-green-600' : 'text-red-600'}>{invite.status}</span></p>
              </CardContent>
            </Card>
          ))}
          {invites?.filter(invite => invite.status !== 'pending').length === 0 && (
            <p className="col-span-full text-center text-gray-500">No past invites.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const AppWrapper: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <GroupInvites />
  </QueryClientProvider>
);

export default AppWrapper;
