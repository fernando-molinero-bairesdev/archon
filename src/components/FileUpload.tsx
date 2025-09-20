import { useState } from 'react';

interface DiagramData {
  groups: any[];
  // Add more properties as needed
}

interface FileUploadProps {
  endpoint?: string;
  onDiagramLoaded?: (diagram: DiagramData[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  endpoint = process.env.REACT_APP_DIAGRAMS_ENDPOINT || '/diagrams',
  onDiagramLoaded
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [diagramData, setDiagramData] = useState<DiagramData[] | null>(null);

  // Get the API URL from environment variables or use a default
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/json' || selectedFile.name.endsWith('.json')) {
        setFile(selectedFile);
        setError(null);
      } else {
        setError('Please select a JSON file');
        setFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Read the file as text
      const fileContent = await readFileAsText(file);
      
      // Parse the JSON to validate it
      const jsonData = JSON.parse(fileContent);
      
      // Send to backend using the configured API URL and endpoint
      const url = `${apiUrl}${endpoint}`;
      console.log(`Uploading to: ${url}`);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const result = await response.json();
      if (result && Array.isArray(result.diagram)) {
        setDiagramData(result.diagram);
        if (onDiagramLoaded) {
          onDiagramLoaded(result.diagram);
        }
      }
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        resolve(reader.result as string);
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsText(file);
    });
  };

  return (
    <div className="file-upload">
      <h2>Upload JSON File</h2>
      <div className="upload-container">
        <input 
          type="file" 
          accept=".json,application/json" 
          onChange={handleFileChange} 
        />
        <button 
          onClick={handleUpload} 
          disabled={!file || isLoading}
        >
          {isLoading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
      {file && <p>Selected file: {file.name}</p>}
      {error && <p className="error">{error}</p>}
      {success && <p className="success">File uploaded successfully!</p>}
    </div>
  );
};

export default FileUpload;
