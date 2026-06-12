// AUTO-GENERATED DRAFT SCREEN: Announcements
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { trpc } from '@/lib/trpc';

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
}

interface AnnouncementsProps {
  // Define any props for the Announcements component here
}

const Announcements: React.FC<AnnouncementsProps> = () => {
  const { data: announcements, isLoading, isError, error } = trpc.announcements.list.useQuery();

  if (isLoading) {
    return <div className="p-4 text-center">Loading announcements...</div>;
  }

  if (isError) {
    return <div className="p-4 text-center text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Announcements</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {announcements?.map((announcement: Announcement) => (
          <Card key={announcement.id}>
            <CardHeader>
              <CardTitle>{announcement.title}</CardTitle>
              <CardDescription>{announcement.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{announcement.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Announcements;