import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import SceneEditor from './components/SceneEditor';
import VRButton from './components/VRButton';

const App: React.FC = () => {
  const [vrMode, setVrMode] = useState(false);

  return (
    <div>
      <h1>VR/AR Prototyping Platform</h1>
      <VRButton onEnterVR={() => setVrMode(true)} />
      <SceneEditor vrMode={vrMode} />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
