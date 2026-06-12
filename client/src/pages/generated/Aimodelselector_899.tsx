// AUTO-GENERATED DRAFT SCREEN: AIModelSelector
import React, { useState, useEffect } from 'react';

interface AIModel {
  id: string;
  name: string;
  description: string;
  version: string;
  status: 'active' | 'inactive' | 'deprecated';
}

const mockFetchModels = (): Promise<AIModel[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 'model-1',
          name: 'GPT-4',
          description: 'Advanced language model by OpenAI.',
          version: '4.0',
          status: 'active',
        },
        {
          id: 'model-2',
          name: 'Claude 3 Opus',
          description: 'State-of-the-art model by Anthropic.',
          version: '3.0',
          status: 'active',
        },
        {
          id: 'model-3',
          name: 'Gemini 1.5 Pro',
          description: 'Google\'s powerful multimodal model.',
          version: '1.5',
          status: 'active',
        },
        {
          id: 'model-4',
          name: 'GPT-3.5 Turbo',
          description: 'Cost-effective and fast model by OpenAI.',
          version: '3.5',
          status: 'deprecated',
        },
      ]);
    }, 1000);
  });
};

const AIModelSelector: React.FC = () => {
  const [models, setModels] = useState<AIModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        setLoading(true);
        const data = await mockFetchModels();
        setModels(data);
        if (data.length > 0) {
          setSelectedModel(data[0]);
        }
      } catch (err) {
        setError('Failed to fetch AI models.');
      } finally {
        setLoading(false);
      }
    };
    fetchModels();
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p>Loading AI models...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-8 ${isDarkTheme ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">AI Model Selector</h1>

        <div className="flex justify-end mb-4">
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Toggle {isDarkTheme ? 'Light' : 'Dark'} Theme
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Model List */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
            <h2 className="text-xl font-semibold mb-4">Available Models</h2>
            <ul className="space-y-2">
              {models.map((model) => (
                <li
                  key={model.id}
                  onClick={() => setSelectedModel(model)}
                  className={`p-3 rounded-md cursor-pointer transition-colors ${selectedModel?.id === model.id
                    ? 'bg-blue-500 text-white' : 'bg-gray-50 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900'}
                    ${model.status === 'deprecated' ? 'opacity-60 cursor-not-allowed' : ''}`}
                  aria-current={selectedModel?.id === model.id ? 'page' : undefined}
                  role="option"
                  aria-selected={selectedModel?.id === model.id}
                >
                  <h3 className="font-medium">{model.name} <span className="text-sm text-gray-600 dark:text-gray-400">({model.version})</span></h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{model.description}</p>
                  {model.status === 'deprecated' && (
                    <span className="text-xs text-red-500">Deprecated</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Model Details */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
            <h2 className="text-xl font-semibold mb-4">Model Details</h2>
            {selectedModel ? (
              <div>
                <p className="text-lg font-bold mb-2">{selectedModel.name}</p>
                <p className="mb-1"><strong>Version:</strong> {selectedModel.version}</p>
                <p className="mb-1"><strong>Status:</strong> <span className={`${selectedModel.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>{selectedModel.status}</span></p>
                <p className="mb-4"><strong>Description:</strong> {selectedModel.description}</p>
                <button
                  className="w-full px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={selectedModel.status === 'deprecated'}
                >
                  Select Model
                </button>
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">Select a model to view details.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIModelSelector;
