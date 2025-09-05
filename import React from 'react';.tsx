import React from 'react';

const VRButton: React.FC<{ onEnterVR: () => void }> = ({ onEnterVR }) => (
  <button onClick={onEnterVR}>Enter VR/AR</button>
);

export default VRButton;
