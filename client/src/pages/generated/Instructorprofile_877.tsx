// AUTO-GENERATED DRAFT SCREEN: InstructorProfile
import React from 'react';
import { trpc } from '../trpc';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';

const InstructorProfile: React.FC = () => {
  const { data: instructor, isLoading, isError, error } = trpc.instructor.getById.useQuery({ id: '1' });

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader className="flex flex-col items-center text-center">
            <Skeleton className="h-24 w-24 rounded-full mb-4" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-4">
        <Card className="w-full max-w-2xl mx-auto border-red-500">
          <CardHeader>
            <CardTitle className="text-red-600">Error Loading Instructor Profile</CardTitle>
            <CardDescription>An error occurred: {error.message}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-red-500">Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!instructor) {
    return (
      <div className="container mx-auto p-4">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Instructor Not Found</CardTitle>
            <CardDescription>The instructor profile could not be loaded.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>No data available for this instructor.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={instructor.profilePicture} alt={instructor.name} />
            <AvatarFallback>{instructor.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl font-bold">{instructor.name}</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">Instructor</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{instructor.bio}</p>
          <div className="flex justify-between items-center">
            <Badge variant="secondary">Courses Taught: {instructor.coursesTaught}</Badge>
            <Badge variant="outline">Rating: {instructor.rating} / 5</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructorProfile;
