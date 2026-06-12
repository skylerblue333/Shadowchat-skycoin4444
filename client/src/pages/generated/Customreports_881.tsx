// AUTO-GENERATED DRAFT SCREEN: CustomReports
import React, { useState, useEffect } from 'react';

interface Report {
  id: string;
  name: string;
  date: string;
  value: number;
}

interface CustomReportsProps {
  className?: string;
}

interface ReportQueryParams {
  reportType: string;
  startDate: string;
  endDate: string;
}

// Mock tRPC hook for demonstration purposes
const useGetCustomReports = (params: ReportQueryParams) => {
  const [data, setData] = useState<Report[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (Math.random() > 0.8) {
        throw new Error("Failed to fetch reports");
      }
      setData([
        { id: '1', name: 'Sales Report Q1', date: '2023-03-31', value: 120000 },
        { id: '2', name: 'Marketing Spend', date: '2023-04-15', value: 50000 },
        { id: '3', name: 'Customer Acquisition', date: '2023-05-01', value: 75000 },
      ]);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params.reportType, params.startDate, params.endDate]); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, isLoading, isError, refetch: fetchData };
};

const CustomReports: React.FC<CustomReportsProps> = ({ className }) => {
  const [reportType, setReportType] = useState<string>('sales');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const { data: reports, isLoading, isError, refetch } = useGetCustomReports({
    reportType,
    startDate,
    endDate,
  });

  const handleGenerateReport = () => {
    refetch();
  };

  return (
    <div className={`min-h-screen bg-background text-foreground p-6 dark:bg-gray-900 dark:text-gray-50 ${className || ''}`}>
      <h1 className="text-4xl font-extrabold mb-8 text-center">Custom Reports</h1>

      {/* Card component simulation */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-4xl mx-auto mb-8 dark:bg-gray-800">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="font-semibold whitespace-nowrap tracking-tight text-2xl">Report Filters</h3>
        </div>
        <div className="p-6 pt-0 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="reportType" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">Report Type</label>
            <select
              id="reportType"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600"
              aria-label="Select Report Type"
            >
              <option value="sales">Sales</option>
              <option value="marketing">Marketing</option>
              <option value="finance">Finance</option>
            </select>
          </div>
          <div>
            <label htmlFor="startDate" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">Start Date</label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600"
              aria-label="Start Date"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">End Date</label>
            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600"
              aria-label="End Date"
            />
          </div>
          <div className="md:col-span-3 flex justify-end">
            <button
              onClick={handleGenerateReport}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full md:w-auto dark:bg-blue-600 dark:hover:bg-blue-700"
              aria-label="Generate Report"
            >
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Card component simulation */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-4xl mx-auto dark:bg-gray-800">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="font-semibold whitespace-nowrap tracking-tight text-2xl">Report Results</h3>
        </div>
        <div className="p-6 pt-0">
          {isLoading && (
            <div className="flex justify-center items-center h-48" role="status" aria-live="polite">
              <p className="text-lg">Loading reports...</p>
            </div>
          )}

          {isError && (
            <div className="flex justify-center items-center h-48 text-red-500" role="alert">
              <p className="text-lg">Error loading reports. Please try again.</p>
            </div>
          )}

          {!isLoading && !isError && reports && reports.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm caption-bottom dark:text-gray-200" aria-label="Custom Reports Table">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 dark:text-gray-400">ID</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 dark:text-gray-400">Name</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 dark:text-gray-400">Date</th>
                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 dark:text-gray-400">Value</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {reports.map((report) => (
                    <tr key={report.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted dark:hover:bg-gray-700">
                      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium">{report.id}</td>
                      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{report.name}</td>
                      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{report.date}</td>
                      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right">${report.value.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!isLoading && !isError && (!reports || reports.length === 0) && (
            <div className="flex justify-center items-center h-48 text-gray-500 dark:text-gray-400">
              <p className="text-lg">No reports generated yet. Use the filters above to generate a report.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomReports;
