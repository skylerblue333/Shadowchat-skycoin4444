// AUTO-GENERATED DRAFT SCREEN: CertificateGallery
import React from 'react';
import { cn } from './lib/utils';
import { trpc } from './trpc';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  imageUrl: string;
}

const CertificateGallery: React.FC = () => {
  const { data: certificates, isLoading, error } = trpc.certificates.useQuery();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen text-lg font-medium">Loading certificates...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500 text-lg font-medium">Error: {error.message}</div>;
  }

  return (
    <div className={cn("container mx-auto p-4 dark:bg-gray-900 dark:text-white", "min-h-screen")}>
      <h1 className="text-4xl font-extrabold mb-8 text-center">Certificate Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {certificates?.map((certificate: Certificate) => (
          <div
            key={certificate.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <img
              src={certificate.imageUrl}
              alt={certificate.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{certificate.title}</h2>
              <p className="text-gray-600 dark:text-gray-400">{certificate.issuer}</p>
              <p className="text-gray-500 dark:text-gray-500 text-sm">{certificate.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificateGallery;