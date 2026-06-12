// @ts-nocheck
import React from 'react';
import * as __ns_recharts_1 from 'recharts';
const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = (__ns_recharts_1 as any);

/* injected loose stubs so generated UI renders without a real backend */
const trpc: any = new Proxy({}, { get: () => new Proxy({}, { get: () => () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {}, mutate: () => {}, mutateAsync: async () => ({}) }) }) });
const useQuery: any = () => ({ data: undefined, isLoading: false, isPending: false, isError: false, error: null, refetch: () => {} });
const useMutation: any = () => ({ mutate: () => {}, mutateAsync: async () => ({}), isLoading: false, isPending: false, isError: false, isSuccess: false, error: null, data: undefined, reset: () => {} });
const useQueryClient: any = () => ({ invalidateQueries: () => {}, setQueryData: () => {} });

// AUTO-GENERATED DRAFT SCREEN: RetentionCharts

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


const RetentionCharts: React.FC = () => {
  const { data, isLoading, error } = trpc.retention.query({
    startDate: '2023-01-01',
    endDate: '2023-01-31',
  });

  if (isLoading) {
    return <div className="p-4 text-center">Loading retention data...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Retention Charts</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data?.data.map((cohort, index) => ({
              name: cohort.name,
              ...cohort.data.reduce((acc, val, i) => ({ ...acc, [data.labels[i]]: val }), {}),
            }))}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-600" />
            <XAxis dataKey="name" className="text-sm text-gray-600 dark:text-gray-300" />
            <YAxis className="text-sm text-gray-600 dark:text-gray-300" />
            <Tooltip />
            <Legend />
            {data?.data.map((cohort, index) => (
              <Line
                key={cohort.name}
                type="monotone"
                dataKey={cohort.name}
                stroke={index === 0 ? "#8884d8" : "#82ca9d"}
                activeDot={{ r: 8 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RetentionCharts;