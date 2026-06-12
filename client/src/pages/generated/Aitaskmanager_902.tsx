// AUTO-GENERATED DRAFT SCREEN: AITaskManager
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { trpc } from '../trpc';
import { Task } from '../types/task';

const AITaskManager: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const { data: tasks, isLoading, isError, error } = trpc.task.list.useQuery();
  const createTaskMutation = trpc.task.create.useMutation();
  const updateTaskMutation = trpc.task.update.useMutation();
  const deleteTaskMutation = trpc.task.delete.useMutation();

  const handleCreateTask = () => {
    createTaskMutation.mutate({
      title: 'New Task',
      description: 'Description for new task',
      status: 'todo',
      priority: 'low',
    });
  };

  const handleUpdateTask = (task: Task) => {
    updateTaskMutation.mutate(task);
  };

  const handleDeleteTask = (id: string) => {
    deleteTaskMutation.mutate(id);
  };

  if (isLoading) return <div>Loading tasks...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased flex flex-col">
      <header className="border-b p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">AI Task Manager</h1>
        <Button onClick={() => setDarkMode(!darkMode)}>
          Toggle Dark Mode
        </Button>
      </header>
      <main className="flex-1 p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={handleCreateTask} className="mb-4">Add New Task</Button>
              {tasks?.map((task) => (
                <div
                  key={task.id}
                  className="border p-2 mb-2 rounded-md cursor-pointer hover:bg-accent"
                  onClick={() => setSelectedTask(task)}
                >
                  <h3 className="font-semibold">{task.title}</h3>
                  <p className="text-sm text-muted-foreground">{task.status} - {task.priority}</p>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteTask(task.id)} className="mt-2">Delete</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          {selectedTask ? (
            <Card>
              <CardHeader>
                <CardTitle>Task Details: {selectedTask.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div>
                    <label htmlFor="title" className="text-sm font-medium">Title</label>
                    <Input
                      id="title"
                      value={selectedTask.title}
                      onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="text-sm font-medium">Description</label>
                    <Textarea
                      id="description"
                      value={selectedTask.description}
                      onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="status" className="text-sm font-medium">Status</label>
                    <Input
                      id="status"
                      value={selectedTask.status}
                      onChange={(e) => setSelectedTask({ ...selectedTask, status: e.target.value as Task['status'] })}
                    />
                  </div>
                  <div>
                    <label htmlFor="priority" className="text-sm font-medium">Priority</label>
                    <Input
                      id="priority"
                      value={selectedTask.priority}
                      onChange={(e) => setSelectedTask({ ...selectedTask, priority: e.target.value as Task['priority'] })}
                    />
                  </div>
                  <div>
                    <label htmlFor="dueDate" className="text-sm font-medium">Due Date</label>
                    <Input
                      id="dueDate"
                      value={selectedTask.dueDate || ''}
                      onChange={(e) => setSelectedTask({ ...selectedTask, dueDate: e.target.value })}
                    />
                  </div>
                  <Button onClick={() => handleUpdateTask(selectedTask)}>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Select a Task</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Please select a task from the list to view its details.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default AITaskManager;
