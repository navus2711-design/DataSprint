import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const SceneEditor: React.FC<{ vrMode?: boolean }> = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();

  useEffect(() => {
    const width = 800;
    const height = 600;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (mountRef.current) {
        mountRef.current.innerHTML = '';
      }
    };
  }, []);

  const handleAddCube = () => {
    if (!sceneRef.current) return;
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = Math.random() * 2 - 1;
    cube.position.y = Math.random() * 2 - 1;
    sceneRef.current.add(cube);
  };

  return (
    <div>
      <button onClick={handleAddCube}>Add Cube</button>
      <div ref={mountRef} style={{ width: 800, height: 600, border: '1px solid #ccc' }} />
    </div>
  );
};

export default SceneEditor;
