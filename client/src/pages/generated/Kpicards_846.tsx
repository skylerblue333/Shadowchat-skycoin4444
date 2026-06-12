// AUTO-GENERATED DRAFT SCREEN: KPICards
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { trpc } from '@/lib/trpc';
import { ModeToggle } from '@/components/mode-toggle';

interface KPICardProps {
  title: string;
  value: string;
  description: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, description }) => {
  return (
    <Card className="w-[300px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {/* Icon can be added here */}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

const KPICards: React.FC = () => {
  const { data, isLoading, error } = trpc.kpi.useQuery();

  if (isLoading) {
    return <div className="p-4">Loading KPI data...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">KPI Dashboard</h1>
        <ModeToggle />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data?.map((kpi, index) => (
          <KPICard key={index} title={kpi.title} value={kpi.value} description={kpi.description} />
        ))}
      </div>
    </div>
  );
};

export default KPICards;
