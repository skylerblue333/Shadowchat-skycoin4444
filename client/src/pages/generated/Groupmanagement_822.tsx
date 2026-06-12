// AUTO-GENERATED DRAFT SCREEN: GroupManagement
import React, { useState, useMemo } from 'react';
import { Group } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog';
import { trpc } from '../lib/trpc';
import { Loader2, Search, PlusCircle } from 'lucide-react';

const GroupManagement: React.FC = () => {
  const [newGroupName, setNewGroupName] = useState<string>('');
  const [newGroupDescription, setNewGroupDescription] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const { data: groups, isLoading, isError, error } = trpc.group.list.useQuery();
  const addGroupMutation = trpc.group.create.useMutation({
    onSuccess: () => {
      setNewGroupName('');
      setNewGroupDescription('');
      setIsDialogOpen(false);
      trpc.group.list.invalidate(); // Refetch groups after adding a new one
    },
  });
  const deleteGroupMutation = trpc.group.delete.useMutation({
    onSuccess: () => {
      trpc.group.list.invalidate(); // Refetch groups after deleting one
    },
  });

  const handleAddGroup = () => {
    if (newGroupName.trim() && newGroupDescription.trim()) {
      addGroupMutation.mutate({ name: newGroupName.trim(), description: newGroupDescription.trim() });
    }
  };

  const handleDeleteGroup = (id: string) => {
    deleteGroupMutation.mutate({ id });
  };

  const filteredGroups = useMemo(() => {
    if (!groups) return [];
    return groups.filter(group =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [groups, searchTerm]);

  if (isLoading) return (
    <div className="container mx-auto p-4 flex justify-center items-center h-screen">
      <Loader2 className="h-8 w-8 animate-spin" />
      <span className="ml-2">Loading groups...</span>
    </div>
  );
  if (isError) return <div className="container mx-auto p-4 text-red-500">Error: {error?.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Social Module: Group Management</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search groups..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button><PlusCircle className="mr-2 h-4 w-4" />Create New Group</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Group</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Group Name"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                aria-label="Group Name"
              />
              <Input
                placeholder="Group Description"
                value={newGroupDescription}
                onChange={(e) => setNewGroupDescription(e.target.value)}
                aria-label="Group Description"
              />
            </div>
            <DialogFooter>
              <Button onClick={handleAddGroup} disabled={addGroupMutation.isLoading}>
                {addGroupMutation.isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Adding...</>) : 'Add Group'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Existing Groups</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredGroups.length === 0 ? (
            <p className="text-center text-muted-foreground">No groups found.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGroups.map((group) => (
                    <TableRow key={group.id}>
                      <TableCell className="font-medium">{group.name}</TableCell>
                      <TableCell>{group.description}</TableCell>
                      <TableCell>{group.memberCount}</TableCell>
                      <TableCell>{group.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="mr-2">View</Button>
                        <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteGroup(group.id)}
                          disabled={deleteGroupMutation.isLoading}
                        >
                          {deleteGroupMutation.isLoading ? (<Loader2 className="h-4 w-4 animate-spin" />) : 'Delete'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GroupManagement;
