// AUTO-GENERATED DRAFT SCREEN: LessonPlayerScreen
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { trpc } from '../lib/trpc'; // Assuming tRPC client setup
import { cn } from '../lib/utils'; // For shadcn/ui utility

// shadcn/ui components (placeholders, actual imports would be from '@/components/ui/*')
const Button = ({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => <button className={cn('px-4 py-2 rounded-md', className)} {...props}>{children}</button>;
const Card = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn('bg-white dark:bg-gray-800 shadow-md rounded-lg p-4', className)} {...props}>{children}</div>;
const Progress = ({ value, className }: { value: number; className?: string }) => <div className={cn('w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5', className)}><div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${value}%` }}></div></div>;
const Skeleton = ({ className }: { className?: string }) => <div className={cn('animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md', className)}></div>;

// --- Type Definitions ---
interface Lesson {
  id: string;
  title: string;
  content: string; // HTML content or similar
  quiz?: Quiz;
  nextLessonId?: string;
  previousLessonId?: string;
}

interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

interface UserProgress {
  lessonId: string;
  completed: boolean;
  quizAttempts: number;
  score?: number;
}

interface LessonPlayerScreenProps {
  initialLessonId: string;
}

// --- Sub-components (simplified for this example) ---
const LessonContent: React.FC<{ lesson: Lesson; isLoading: boolean }> = ({ lesson, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    );
  }
  return (
    <Card className="mt-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{lesson.title}</h2>
      <div className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: lesson.content }} />
    </Card>
  );
};

const LessonNavigation: React.FC<{ currentLessonId: string; nextLessonId?: string; previousLessonId?: string; onNavigate: (id: string) => void }> = (
  { currentLessonId, nextLessonId, previousLessonId, onNavigate }
) => {
  return (
    <div className="flex justify-between mt-4">
      <Button
        onClick={() => previousLessonId && onNavigate(previousLessonId)}
        disabled={!previousLessonId}
        className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
      >
        Previous
      </Button>
      <Button
        onClick={() => nextLessonId && onNavigate(nextLessonId)}
        disabled={!nextLessonId}
        className="bg-blue-600 text-white"
      >
        Next
      </Button>
    </div>
  );
};

const LessonProgress: React.FC<{ progress: UserProgress | undefined; isLoading: boolean }> = ({ progress, isLoading }) => {
  const completionPercentage = progress?.completed ? 100 : 0;
  return (
    <Card className="mt-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Progress</h3>
      {isLoading ? (
        <Skeleton className="h-2.5 w-full" />
      ) : (
        <Progress value={completionPercentage} className="mt-2" />
      )}
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
        {progress?.completed ? 'Lesson Completed!' : 'Lesson in progress.'}
      </p>
    </Card>
  );
};

const QuizComponent: React.FC<{ quiz: Quiz; onQuizSubmit: (isCorrect: boolean) => void; isLoading: boolean }> = (
  { quiz, onQuizSubmit, isLoading }
) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedOption !== null) {
      const isCorrect = selectedOption === quiz.correctAnswerIndex;
      onQuizSubmit(isCorrect);
      setSubmitted(true);
    }
  };

  if (isLoading) {
    return (
      <Card className="mt-4 space-y-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </Card>
    );
  }

  return (
    <Card className="mt-4">
      <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Quiz: {quiz.question}</h3>
      <div className="space-y-2">
        {quiz.options.map((option, index) => (
          <Button
            key={index}
            onClick={() => setSelectedOption(index)}
            disabled={submitted}
            className={cn(
              'w-full text-left',
              selectedOption === index ? 'bg-blue-200 dark:bg-blue-700' : 'bg-gray-100 dark:bg-gray-600',
              submitted && index === quiz.correctAnswerIndex && 'bg-green-200 dark:bg-green-700',
              submitted && selectedOption === index && selectedOption !== quiz.correctAnswerIndex && 'bg-red-200 dark:bg-red-700'
            )}
          >
            {option}
          </Button>
        ))}
      </div>
      <Button onClick={handleSubmit} disabled={selectedOption === null || submitted} className="mt-4 bg-green-600 text-white">
        Submit Answer
      </Button>
      {submitted && (
        <p className="mt-2 text-sm">
          {selectedOption === quiz.correctAnswerIndex ? 'Correct!' : 'Incorrect. Try again!'}
        </p>
      )}
    </Card>
  );
};

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <strong className="font-bold">Error:</strong>
    <span className="block sm:inline"> {message}</span>
  </div>
);

// --- Main Component ---
const LessonPlayerScreen: React.FC<LessonPlayerScreenProps> = ({ initialLessonId }) => {
  const [currentLessonId, setCurrentLessonId] = useState(initialLessonId);

  // Fetch lesson data
  const { data: lesson, isLoading: isLessonLoading, error: lessonError } = trpc.lesson.getById.useQuery(currentLessonId);

  // Fetch user progress
  const { data: progress, isLoading: isProgressLoading, error: progressError, refetch: refetchProgress } = trpc.user.getProgress.useQuery(currentLessonId);

  // Mutation for updating progress
  const updateProgressMutation = trpc.user.updateProgress.useMutation({
    onSuccess: () => {
      refetchProgress();
    },
  });

  // Mutation for submitting quiz answers
  const submitQuizMutation = trpc.quiz.submitAnswer.useMutation({
    onSuccess: () => {
      refetchProgress();
    },
  });

  const handleQuizSubmit = (isCorrect: boolean) => {
    submitQuizMutation.mutate({ lessonId: currentLessonId, isCorrect });
  };

  const handleNavigate = (lessonId: string) => {
    setCurrentLessonId(lessonId);
    // Optionally update progress when navigating
    updateProgressMutation.mutate({ lessonId: currentLessonId, completed: true });
  };

  const isLoading = isLessonLoading || isProgressLoading;
  const error = lessonError || progressError;

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 p-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-3xl font-extrabold mb-6 text-center">Learning Module</h1>

        {isLoading && <LoadingSpinner />}

        {lesson && (
          <>
            <LessonProgress progress={progress} isLoading={isProgressLoading} />
            <LessonContent lesson={lesson} isLoading={isLessonLoading} />
            {lesson.quiz && (
              <QuizComponent
                quiz={lesson.quiz}
                onQuizSubmit={handleQuizSubmit}
                isLoading={isLessonLoading} // Use lesson loading for quiz as well
              />
            )}
            <LessonNavigation
              currentLessonId={currentLessonId}
              nextLessonId={lesson.nextLessonId}
              previousLessonId={lesson.previousLessonId}
              onNavigate={handleNavigate}
            />
          </>
        )}
      </div>
    </div>
  );
};

// Placeholder for a simple LoadingSpinner component
const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-32">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100"></div>
  </div>
);

export default LessonPlayerScreen;
