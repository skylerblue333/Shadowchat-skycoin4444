// AUTO-GENERATED DRAFT SCREEN: CryptoGrantProgram

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from './utils/trpc'; // Assuming tRPC client setup
import { Button } from './components/ui/button'; // shadcn/ui button
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './components/ui/card'; // shadcn/ui card
import { Skeleton } from './components/ui/skeleton'; // shadcn/ui skeleton for loading states
import { Badge } from './components/ui/badge'; // shadcn/ui badge for status
import { Separator } from './components/ui/separator'; // shadcn/ui separator
import { Lightbulb, CalendarDays, Users } from 'lucide-react'; // Icons

interface GrantProgram {
  id: string;
  name: string;
  description: string;
  status: 'open' | 'closed' | 'pending';
  applicationDeadline: string;
  fundingAmount: string;
  eligibility: string[];
  contactEmail: string;
}

const CryptoGrantProgram: React.FC = () => {
  const { data, isLoading, isError, error } = trpc.getGrantPrograms.useQuery();

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-4 p-6 dark:bg-gray-900 min-h-screen items-center justify-center">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <Skeleton className="h-[200px] w-full max-w-screen-md rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-screen-lg">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="dark:bg-gray-800 dark:border-gray-700 p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-10 w-24" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div role="alert" className="p-6 text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900 rounded-lg shadow-md mx-auto max-w-screen-md mt-10">
        <p className="font-bold text-lg mb-2">Error loading grant programs:</p>
        <p className="text-base">Failed to fetch grant program data. Please try again later.</p>
        <p className="text-sm mt-2">Details: {error.message}</p>
        <Button onClick={() => window.location.reload()} className="mt-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white">
          Reload Page
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-600 dark:text-blue-400">SKYCOIN4444 Grant Programs</h1>
      <p className="text-center text-lg mb-10 max-w-2xl mx-auto">Explore available grant opportunities to fund your innovative projects within the SKYCOIN4444 ecosystem.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.map((program: GrantProgram) => (
          <Card key={program.id} className="dark:bg-gray-800 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold flex items-center">
                <Lightbulb className="mr-2 text-yellow-500" size={24} />
                {program.name}
              </CardTitle>
              <CardDescription className="text-sm text-gray-500 dark:text-gray-400 mt-1">Funding: {program.fundingAmount}</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-gray-700 dark:text-gray-300 mb-4 text-base leading-relaxed">{program.description}</p>
              
              <Separator className="my-4 dark:bg-gray-700" />

              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                <CalendarDays className="mr-2" size={16} />
                Deadline: {new Date(program.applicationDeadline).toLocaleDateString()}
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                <Users className="mr-2" size={16} />
                Eligibility: {program.eligibility.join(', ')}
              </div>

              <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                <Badge
                  className={`px-3 py-1 text-sm font-semibold ${program.status === 'open' ? 'bg-green-500 text-white' : program.status === 'pending' ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white'}`}
                >
                  {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
                </Badge>
                <Button
                  variant="default"
                  className="dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white px-6 py-2 rounded-md text-base font-medium"
                  disabled={program.status !== 'open'}
                  aria-label={`Apply for ${program.name}`}
                  onClick={() => alert(`Applying for ${program.name}. Contact: ${program.contactEmail}`)}
                >
                  {program.status === 'open' ? 'Apply Now' : 'View Details'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} SKYCOIN4444. All rights reserved.</p>
        <p className="text-sm mt-1">For inquiries, please contact <a href="mailto:grants@skycoin4444.com" className="text-blue-500 hover:underline">grants@skycoin4444.com</a></p>
      </div>
    </div>
  );
};

export default CryptoGrantProgram;
