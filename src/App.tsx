import './App.css';
import FileUpload from './components/FileUpload';
import Diagram from './components/Diagram';

import { useState } from 'react';

function App() {
  const [diagram, setDiagram] = useState<any[] | null>(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>JSON File Uploader</h1>
      </header>
      <main>
        <FileUpload onDiagramLoaded={setDiagram} />
        {diagram && <Diagram diagram={diagram} />}
      </main>
    </div>
  );
}

export default App;
