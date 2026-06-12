// AUTO-GENERATED DRAFT SCREEN: DeploymentManager
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Placeholder for tRPC client
// import { trpc } from "../utils/trpc"; // Commented out for frontend-only task

interface Deployment {
  id: string;
  name: string;
  status: string;
  version: string;
  lastUpdated: string;
}

const mockDeployments: Deployment[] = [
  { id: "1", name: "Frontend App", status: "Running", version: "1.0.0", lastUpdated: "2023-01-15" },
  { id: "2", name: "Backend API", status: "Stopped", version: "1.2.1", lastUpdated: "2023-01-10" },
  { id: "3", name: "Auth Service", status: "Deploying", version: "0.5.0", lastUpdated: "2023-01-20" },
];

const DeploymentManager: React.FC = () => {
  const [deployments, setDeployments] = useState<Deployment[]>(mockDeployments);
  const [selectedDeployment, setSelectedDeployment] = useState<Deployment | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Placeholder for tRPC queries and mutations
  // const { data: deployments, isLoading, error } = trpc.deployments.getAll.useQuery(); // Commented out for frontend-only task
  // const deployMutation = trpc.deployments.deploy.useMutation(); // Commented out for frontend-only task

  const handleViewDetails = (deployment: Deployment) => {
    setSelectedDeployment(deployment);
    setIsDialogOpen(true);
  };

  const handleDeploy = (id: string) => {
    console.log(`Deploying ${id}`);
    // deployMutation.mutate({ id });
  };

  // if (isLoading) return <div className="text-center p-4">Loading deployments...</div>; // Commented out for frontend-only task
  // if (error) return <div className="text-center p-4 text-red-500">Error: {error.message}</div>; // Commented out for frontend-only task

  return (
    <div className="container mx-auto p-4 space-y-8 dark:bg-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Deployment Manager</h1>

      <Card>
        <CardHeader>
          <CardTitle>Current Deployments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Input placeholder="Search deployments..." className="max-w-sm" />
            <Button onClick={() => console.log("Add new deployment")}>Add Deployment</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deployments.map((deployment) => (
                <TableRow key={deployment.id}>
                  <TableCell className="font-medium">{deployment.name}</TableCell>
                  <TableCell>{deployment.status}</TableCell>
                  <TableCell>{deployment.version}</TableCell>
                  <TableCell>{deployment.lastUpdated}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" className="mr-2" onClick={() => handleViewDetails(deployment)}>View</Button>
                    <Button size="sm" onClick={() => handleDeploy(deployment.id)}>Deploy</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deployment Details</DialogTitle>
          </DialogHeader>
          {selectedDeployment ? (
            <div className="grid gap-4 py-4">
              <div><strong>ID:</strong> {selectedDeployment.id}</div>
              <div><strong>Name:</strong> {selectedDeployment.name}</div>
              <div><strong>Status:</strong> {selectedDeployment.status}</div>
              <div><strong>Version:</strong> {selectedDeployment.version}</div>
              <div><strong>Last Updated:</strong> {selectedDeployment.lastUpdated}</div>
            </div>
          ) : (
            <p>No deployment selected.</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeploymentManager;