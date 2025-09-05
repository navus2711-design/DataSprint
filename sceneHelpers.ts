import * as THREE from 'three';

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let controls: any;

export function initThreeScene(container: HTMLDivElement, vrMode: boolean) {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
  camera.position.z = 5;
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  container.appendChild(renderer.domElement);

  // Add light
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 7.5);
  scene.add(light);

  // VR/AR support
  if (vrMode && 'xr' in renderer) {
    renderer.xr.enabled = true;
    document.body.appendChild(THREE.WEBXR.createButton(renderer));
  }

  animate();
  (window as any).renderer = renderer;
  (window as any).scene = scene;
  (window as any).camera = camera;
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

export function disposeThreeScene() {
  if (renderer) renderer.dispose();
}

export function addCube() {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.x = Math.random() * 2 - 1;
  cube.position.y = Math.random() * 2 - 1;
  (window as any).scene.add(cube);
}

export function enableObjectDragging() {
  // Minimal drag logic (for demo)
  // ...implement drag controls or use three/examples/jsm/controls/DragControls...
}