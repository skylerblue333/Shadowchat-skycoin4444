// AUTO-GENERATED DRAFT SCREEN: LearningModuleCourseDetailScreen
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useQuery } from '@tanstack/react-query'; // Placeholder for tRPC hook

interface CourseDetail {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  progress: number;
  modules: { id: string; title: string; completed: boolean }[];
}

const fetchCourseDetail = async (courseId: string): Promise<CourseDetail> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: courseId,
        title: 'Introduction to Web Development',
        description: 'A comprehensive course covering the fundamentals of web development, from HTML to advanced React concepts.',
        instructor: 'Jane Doe',
        duration: '10 hours',
        progress: 75,
        modules: [
          { id: '1', title: 'HTML Basics', completed: true },
          { id: '2', title: 'CSS Styling', completed: true },
          { id: '3', title: 'JavaScript Fundamentals', completed: false },
          { id: '4', title: 'React Introduction', completed: false },
        ],
      });
    }, 1000);
  });
};

interface LearningModuleCourseDetailScreenProps {
  courseId: string;
}

const LearningModuleCourseDetailScreen: React.FC<LearningModuleCourseDetailScreenProps> = ({ courseId }) => {
  const { data: course, isLoading, isError, error } = useQuery<CourseDetail, Error>({
    queryKey: ['courseDetail', courseId],
    queryFn: () => fetchCourseDetail(courseId),
  });

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading course details...</div>;
  }

  if (isError) {
    return <div className="flex items-center justify-center h-screen text-red-500">Error: {error?.message}</div>;
  }

  if (!course) {
    return <div className="flex items-center justify-center h-screen">No course found.</div>;
  }

  return (
    <ScrollArea className="h-screen w-full p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{course.title}</CardTitle>
            <CardDescription className="text-lg">Instructor: {course.instructor} | Duration: {course.duration}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">{course.description}</p>
            <div className="flex items-center space-x-2">
              <Progress value={course.progress} className="w-[60%]" />
              <span className="text-sm font-medium">{course.progress}% Complete</span>
            </div>
            <Button className="w-full">Continue Learning</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Modules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {course.modules.map((module) => (
                <div key={module.id} className="flex items-center justify-between">
                  <span className="text-lg">{module.title}</span>
                  <Badge variant={module.completed ? 'default' : 'outline'}>
                    {module.completed ? 'Completed' : 'Pending'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li><a href="#" className="text-blue-600 hover:underline">Course Syllabus</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">Instructor's GitHub</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">Community Forum</a></li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
};

export default LearningModuleCourseDetailScreen;
