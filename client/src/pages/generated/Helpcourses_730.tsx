// AUTO-GENERATED DRAFT SCREEN: HelpCourses
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface HelpCourse {
  id: string;
  title: string;
  description: string;
  link: string;
}

interface HelpCoursesProps {
  courses: HelpCourse[];
  isLoading: boolean;
  error: Error | null;
}

const HelpCourses: React.FC<HelpCoursesProps> = ({ courses, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-500 dark:text-gray-400">Loading help courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-red-500">Error</CardTitle>
            <CardDescription>Failed to load help courses.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-red-400">{error.message}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">Help Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">{course.title}</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">{course.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <a
                href={course.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                Learn More
                <svg className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HelpCourses;