// AUTO-GENERATED DRAFT SCREEN: AITrainingDashboard
import React from 'react';

// Simulated shadcn/ui components and tRPC hooks
interface TrainingJob {
  id: string;
  modelName: string;
  status: 'running' | 'completed' | 'failed' | 'paused';
  progress: number;
  startTime: string;
  endTime?: string;
}

interface ModelMetrics {
  accuracy: number[];
  loss: number[];
  labels: string[];
}

interface ResourceUtilization {
  cpu: number[];
  gpu: number[];
  memory: number[];
  labels: string[];
}

// --- Simulated tRPC Hooks ---
const useGetTrainingJobs = () => {
  const [data, setData] = React.useState<TrainingJob[] | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      if (Math.random() > 0.1) { // Simulate success 90% of the time
        setData([
          { id: 'job-1', modelName: 'ResNet50', status: 'running', progress: 75, startTime: '2023-01-01T10:00:00Z' },
          { id: 'job-2', modelName: 'BERT-Large', status: 'completed', progress: 100, startTime: '2023-01-01T08:00:00Z', endTime: '2023-01-01T09:30:00Z' },
        ]);
      } else {
        setIsError(true);
      }
    }, 1000);
  }, []);

  return { data, isLoading, isError };
};

const useGetModelMetrics = (jobId: string) => {
  const [data, setData] = React.useState<ModelMetrics | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    if (!jobId) return;
    setTimeout(() => {
      setIsLoading(false);
      if (Math.random() > 0.1) {
        setData({ accuracy: [0.7, 0.8, 0.85, 0.88], loss: [0.3, 0.2, 0.15, 0.12], labels: ['Epoch 1', 'Epoch 2', 'Epoch 3', 'Epoch 4'] });
      } else {
        setIsError(true);
      }
    }, 800);
  }, [jobId]);

  return { data, isLoading, isError };
};

const useStartTrainingJob = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const mutate = (config: { model: string; dataset: string }) => {
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);
    setTimeout(() => {
      setIsLoading(false);
      if (Math.random() > 0.2) {
        setIsSuccess(true);
      } else {
        setIsError(true);
      }
    }, 1500);
  };

  return { mutate, isLoading, isSuccess, isError };
};

// --- Shadcn/ui component placeholders ---
const Card = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
    {children}
  </div>
);

const Table = ({ columns, data }: { columns: { header: string; accessor: string }[]; data: any[] }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg">
      <thead>
        <tr>
          {columns.map((col, i) => (
            <th key={i} className="px-4 py-2 border-b-2 border-gray-200 dark:border-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-700">
            {columns.map((col, colIndex) => (
              <td key={colIndex} className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-800 dark:text-gray-200">
                {row[col.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Button = ({ children, onClick, disabled = false }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-700 dark:hover:bg-blue-800"
  >
    {children}
  </button>
);

const Input = ({ placeholder, value, onChange }: { placeholder: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
);

const Select = ({ children, value, onChange }: { children: React.ReactNode; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }) => (
  <select
    value={value}
    onChange={onChange}
    className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    {children}
  </select>
);

const Chart = ({ data, labels, title }: { data: number[]; labels: string[]; title: string }) => (
  <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center text-gray-500 dark:text-gray-400">
    <p>Chart placeholder: {title}</p>
  </div>
);

// --- Main Component ---
const AITrainingDashboard: React.FC = () => {
  const { data: trainingJobs, isLoading: jobsLoading, isError: jobsError } = useGetTrainingJobs();
  const [selectedJobId, setSelectedJobId] = React.useState<string | null>(trainingJobs?.[0]?.id || null);
  const { data: metrics, isLoading: metricsLoading, isError: metricsError } = useGetModelMetrics(selectedJobId || '');

  const { mutate: startTraining, isLoading: startLoading, isSuccess: startSuccess, isError: startError } = useStartTrainingJob();
  const [newModel, setNewModel] = React.useState('');
  const [newDataset, setNewDataset] = React.useState('');

  React.useEffect(() => {
    if (trainingJobs && trainingJobs.length > 0 && !selectedJobId) {
      setSelectedJobId(trainingJobs[0].id);
    }
  }, [trainingJobs, selectedJobId]);

  const jobColumns = [
    { header: 'Job ID', accessor: 'id' },
    { header: 'Model Name', accessor: 'modelName' },
    { header: 'Status', accessor: 'status' },
    { header: 'Progress', accessor: 'progress' },
    { header: 'Start Time', accessor: 'startTime' },
    { header: 'End Time', accessor: 'endTime' },
  ];

  const handleStartTraining = () => {
    if (newModel && newDataset) {
      startTraining({ model: newModel, dataset: newDataset });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6 space-y-6 font-sans" aria-label="AI Training Dashboard">
      <h1 className="text-3xl font-bold mb-6">AI Training Dashboard</h1>

      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Total Models">
          <p className="text-2xl font-bold">5</p>
        </Card>
        <Card title="Active Trainings">
          <p className="text-2xl font-bold">{trainingJobs?.filter(job => job.status === 'running').length || 0}</p>
        </Card>
        <Card title="Completed Trainings">
          <p className="text-2xl font-bold">{trainingJobs?.filter(job => job.status === 'completed').length || 0}</p>
        </Card>
      </div>

      {/* Training Jobs List */}
      <Card title="Training Jobs">
        {jobsLoading && <p>Loading training jobs...</p>}
        {jobsError && <p className="text-red-500">Error loading training jobs.</p>}
        {trainingJobs && trainingJobs.length > 0 ? (
          <Table columns={jobColumns} data={trainingJobs} />
        ) : !jobsLoading && <p>No training jobs found.</p>}
        <div className="mt-4">
          <Select value={selectedJobId || ''} onChange={(e) => setSelectedJobId(e.target.value)}>
            <option value="">Select a job for details</option>
            {trainingJobs?.map(job => (
              <option key={job.id} value={job.id}>{job.modelName} ({job.status})</option>
            ))}
          </Select>
        </div>
      </Card>

      {/* Model Performance Metrics */}
      {selectedJobId && (
        <Card title={`Performance Metrics for ${selectedJobId}`}>
          {metricsLoading && <p>Loading metrics...</p>}
          {metricsError && <p className="text-red-red-500">Error loading metrics.</p>}
          {metrics ? (
            <div className="space-y-4">
              <Chart data={metrics.accuracy} labels={metrics.labels} title="Accuracy over Epochs" />
              <Chart data={metrics.loss} labels={metrics.labels} title="Loss over Epochs" />
            </div>
          ) : !metricsLoading && <p>No metrics available for this job.</p>}
        </Card>
      )}

      {/* New Training Run */}
      <Card title="Start New Training Run">
        <div className="flex flex-col space-y-4">
          <Input placeholder="Model Name (e.g., ResNet50)" value={newModel} onChange={(e) => setNewModel(e.target.value)} />
          <Input placeholder="Dataset (e.g., ImageNet)" value={newDataset} onChange={(e) => setNewDataset(e.target.value)} />
          <Button onClick={handleStartTraining} disabled={startLoading || !newModel || !newDataset}>
            {startLoading ? 'Starting...' : 'Start Training'}
          </Button>
          {startSuccess && <p className="text-green-500">Training job started successfully!</p>}
          {startError && <p className="text-red-500">Failed to start training job.</p>}
        </div>
      </Card>
    </div>
  );
};

export default AITrainingDashboard;
