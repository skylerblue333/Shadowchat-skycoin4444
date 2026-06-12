// AUTO-GENERATED DRAFT SCREEN: LearningModuleResourceLibrary
import React from 'react';
import { trpc } from '../lib/trpc';

const LearningModuleResourceLibrary: React.FC = () => {
  // Example tRPC hook for data fetching
      const { data, isLoading, error } = trpc.example.hello.useQuery();



  if (isLoading) {
    return <div className="p-4 text-center">Loading resources...</div>;
  }

  if (error) {
        return <div className="p-4 text-center text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Resource Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data.map((resource) => (
          <div key={resource.id} className="bg-card p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{resource.title}</h2>
            <p className="text-muted-foreground mb-4">Type: {resource.type}</p>
            <a href={resource.url} className="text-primary hover:underline">View Resource</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningModuleResourceLibrary;