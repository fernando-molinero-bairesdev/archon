import { useState } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import Diagram from './components/Diagram';

function App() {
  const [diagram, setDiagram] = useState<any[] | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="App">
      <FileUpload onDiagramLoaded={setDiagram} />
      <div className="main-content">
        <div className="diagram-area" style={{ position: 'relative' }}>
          <button
            className="toggle-sidebar-btn"
            onClick={() => setShowSidebar((v) => !v)}
            style={{ position: 'absolute', top: 10, right: showSidebar ? 340 : 10, zIndex: 2 }}
            aria-label={showSidebar ? 'Hide sidebar' : 'Show sidebar'}
          >
            {showSidebar ? '⮞' : '⮜'}
          </button>
          {diagram && <Diagram diagram={diagram} />}
        </div>
        {showSidebar && (
          <div className="right-column">
            {/* Add sidebar content here, e.g. info, controls, etc. */}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
