// AUTO-GENERATED DRAFT SCREEN: LearningMilestones
import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc"; // Assuming tRPC client setup
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, XCircle, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input"; // Assuming shadcn/ui Input component
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Assuming shadcn/ui Select component

// Define the interface for a Milestone to ensure type safety throughout the component.
interface Milestone {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
}

/**
 * LearningMilestones Component
 * Displays a list of learning milestones, fetched using tRPC.
 * Includes features for loading states, error handling, dark theme support, and basic filtering.
 */
const LearningMilestones: React.FC = () => {
  // Fetch learning milestones using tRPC's useQuery hook.
  // This hook automatically manages loading, error, and data states.
  const { data, isLoading, isError, error } = trpc.milestones.getMilestones.useQuery();

  // State for filtering milestones
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "pending">("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Memoize filtered milestones to prevent unnecessary re-renders.
  const filteredMilestones = useMemo(() => {
    if (!data) return [];

    let tempMilestones = data;

    // Apply status filter
    if (filterStatus === "completed") {
      tempMilestones = tempMilestones.filter((m) => m.completed);
    } else if (filterStatus === "pending") {
      tempMilestones = tempMilestones.filter((m) => !m.completed);
    }n
    // Apply search term filter
    if (searchTerm) {
      tempMilestones = tempMilestones.filter(
        (m) =>
          m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return tempMilestones;
  }, [data, filterStatus, searchTerm]);

  // Display loading skeletons while data is being fetched.
  if (isLoading) {
    return (
      <div className="p-4 space-y-4" role="status" aria-live="polite" aria-label="Loading learning milestones">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="dark:bg-gray-800">
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
    );
  }

  // Display an error message if the data fetching fails.
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-500 dark:text-red-400" role="alert">
        <XCircle className="h-8 w-8 mb-2" aria-hidden="true" />
        <p className="text-lg">Error loading milestones: {error.message}</p>
        <p className="text-sm">Please try again later.</p>
      </div>
    );
  }

  // Display a message if no milestones are found after loading.
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400" role="status">
        <p className="text-lg">No learning milestones found.</p>
        <p className="text-sm">Start by adding new milestones to track your progress!</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white" aria-label="Learning Milestones Dashboard">
      <h1 className="text-3xl font-bold mb-6">Learning Milestones</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" aria-hidden="true" />
          <Input
            type="text"
            placeholder="Search milestones..."
            className="pl-9 pr-3 py-2 border rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search milestones by title or description"
          />
        </div>
        <Select value={filterStatus} onValueChange={(value: "all" | "completed" | "pending") => setFilterStatus(value)}>
          <SelectTrigger className="w-[180px] dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <Filter className="h-4 w-4 mr-2" aria-hidden="true" />
            <SelectValue placeholder="Filter by status" aria-label="Filter milestones by status" />
          </SelectTrigger>
          <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredMilestones.length > 0 ? (
          filteredMilestones.map((milestone: Milestone) => (
            <Card
              key={milestone.id}
              className="dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-200"
              aria-labelledby={`milestone-title-${milestone.id}`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle id={`milestone-title-${milestone.id}`} className="text-lg font-medium text-gray-900 dark:text-white">
                  {milestone.title}
                </CardTitle>
                {milestone.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" aria-label="Milestone Completed" />
                ) : (
                  <span className="text-sm text-gray-500 dark:text-gray-400" aria-label={`Due date: ${milestone.dueDate}`}>
                    Due: {milestone.dueDate}
                  </span>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4" aria-describedby={`milestone-title-${milestone.id}`}>
                  {milestone.description}
                </p>
                {!milestone.completed && (
                  <Button
                    variant="outline"
                    className="w-full dark:text-white dark:border-gray-700 dark:hover:bg-gray-700"
                    aria-label={`Mark ${milestone.title} as Complete`}
                  >
                    Mark as Complete
                  </Button>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">
            <p>No milestones match your current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningMilestones;
