// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: QuizInterface

/* --- injected local data stubs (replaces non-existent backend hooks) --- */
function useStubQuery<T = any>(initial?: T) {
  return { data: initial as T, isLoading: false, isPending: false, isError: false, error: null as any, refetch: () => {} };
}
function useStubMutation<T = any>() {
  return {
    mutate: (_v?: any) => {}, mutateAsync: async (_v?: any) => ({} as T),
    isLoading: false, isPending: false, isError: false, isSuccess: false, error: null as any, data: undefined as any, reset: () => {},
  };
}
/* ----------------------------------------------------------------------- */


interface Question {
  id: string;
  text: string;
  options: string[];
}

interface QuizData {
  id: string;
  title: string;
  questions: Question[];
}

interface QuizResult {
  score: number;
  total: number;
}

// Simulate tRPC query for fetching quiz data
const useQuizData = (quizId: string) => {
  return useQuery<QuizData, Error>({
    queryKey: ['quizData', quizId],
    queryFn: async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (quizId === 'quiz-123') {
        return {
          id: 'quiz-123',
          title: 'React Fundamentals Quiz',
          questions: [
            {
              id: 'q1',
              text: 'What is React?',
              options: ['A JavaScript library for building user interfaces', 'A backend framework', 'A database', 'An operating system'],
            },
            {
              id: 'q2',
              text: 'What is JSX?',
              options: ['A JavaScript extension for XML-like syntax', 'A styling language', 'A state management library', 'A testing framework'],
            },
          ],
        };
      } else {
        throw new Error('Quiz not found');
      }
    },
  });
};

// Simulate tRPC mutation for submitting quiz answers
const useSubmitQuiz = () => {
  return useMutation<QuizResult, Error, Record<string, string>>({
    mutationFn: async (answers) => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Submitting answers:', answers);
      // Simulate scoring
      const score = Object.keys(answers).filter(qId => {
        if (qId === 'q1' && answers[qId] === 'A JavaScript library for building user interfaces') return true;
        if (qId === 'q2' && answers[qId] === 'A JavaScript extension for XML-like syntax') return true;
        return false;
      }).length;
      return { score, total: 2 };
    },
  });
};

const QuizInterface: React.FC = () => {
  const quizId = 'quiz-123'; // Example quiz ID
  const { data: quiz, isLoading, isError, error } = useQuizData(quizId);
  const { mutate: submitQuiz, isPending: isSubmitting, isSuccess: isQuizSubmitted, data: quizResult } = useSubmitQuiz();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { theme, setTheme } = useTheme(); // For dark theme toggle

  useEffect(() => {
    // Ensure theme is set, for demonstration purposes
    if (!theme) setTheme('light');
  }, [theme, setTheme]);

  const handleOptionChange = (questionId: string, option: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleNextQuestion = () => {
    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    submitQuiz(answers);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading quiz...</div>;
  }

  if (isError) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">Error: {error?.message}</div>;
  }

  if (!quiz) {
    return <div className="flex items-center justify-center min-h-screen">No quiz data available.</div>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-background text-foreground p-4 flex flex-col items-center justify-center">
      <div className="absolute top-4 right-4">
        <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
        </Button>
      </div>

      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">{quiz.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {isQuizSubmitted ? (
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Quiz Completed!</h3>
              <p className="text-lg">Your score: {quizResult?.score} / {quizResult?.total}</p>
              <Button onClick={() => window.location.reload()} className="mt-6">Retake Quiz</Button>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-lg font-medium">Question {currentQuestionIndex + 1} of {quiz.questions.length}</p>
              <h4 className="text-xl font-semibold">{currentQuestion.text}</h4>
              <RadioGroup
                onValueChange={(value) => handleOptionChange(currentQuestion.id, value)}
                value={answers[currentQuestion.id] || ''}
                aria-label={`Question ${currentQuestionIndex + 1}`}
              >
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`option-${currentQuestion.id}-${index}`} />
                    <Label htmlFor={`option-${currentQuestion.id}-${index}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between mt-6">
          <Button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0 || isSubmitting}>
            Previous
          </Button>
          {currentQuestionIndex < quiz.questions.length - 1 ? (
            <Button onClick={handleNextQuestion} disabled={isSubmitting}>
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting || isQuizSubmitted}>
              {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizInterface;
