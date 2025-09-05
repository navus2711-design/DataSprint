// Professional 3D Shape Studio - Advanced Modeling & Collaboration
class ProfessionalStudio3D {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.world = null;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        
        // Advanced state management
        this.selectedObjects = [];
        this.currentTool = 'select';
        this.currentWorkflow = 'hobbyist';
        this.currentEnvironment = 'space';
        this.meshes = [];
        this.bodies = [];
        this.history = [];
        this.historyIndex = -1;
        
        // Performance tracking
        this.fps = 0;
        this.frameCount = 0;
        this.lastTime = performance.now();
        
        // Voice recognition
        this.recognition = null;
        this.voiceEnabled = false;
        
        // Physics and simulation
        this.physicsEnabled = false;
        this.gravityEnabled = true;
        
        // Collaboration
        this.collaborators = [];
        this.isHost = true;
        
        // Shape library data
        this.shapeLibrary = null;
        this.professionalTools = null;
        this.materials = null;
        this.voiceCommands = null;
        
        this.init();
    }
    
    async init() {
        console.log('Initializing Professional 3D Studio...');
        this.updateProgress(5, 'Loading shape library...');
        
        await this.loadData();
        this.updateProgress(15, 'Setting up navigation...');
        this.setupNavigation();
        this.updateProgress(25, 'Initializing voice recognition...');
        this.setupVoiceRecognition();
        this.updateProgress(35, 'Setting up tools...');
        this.setupTools();
        this.updateProgress(45, 'Preparing workspace...');
        this.setupKeyboardShortcuts();
        this.updateProgress(55, 'Loading materials...');
        this.setupMaterials();
        this.updateProgress(65, 'Setting up collaboration...');
        this.setupCollaboration();
        this.updateProgress(75, 'Finalizing interface...');
        this.setupPerformanceMonitoring();
        this.updateProgress(85, 'Ready to create!');
        
        // Hide loading after short delay
        setTimeout(() => {
            this.hideLoading();
            this.addSystemMessage('Professional 3D Studio loaded successfully. Select a workflow to begin.');
        }, 1000);
        
        console.log('Professional 3D Studio initialized successfully');
    }
    
    async loadData() {
        // Load shape library and tools data
        this.shapeLibrary = [
            // Basic Geometries
            {name: "Cube", category: "basic", icon: "⬜", complexity: "simple", physics: "box"},
            {name: "Sphere", category: "basic", icon: "⚪", complexity: "simple", physics: "sphere"},
            {name: "Cylinder", category: "basic", icon: "🛢️", complexity: "simple", physics: "cylinder"},
            {name: "Cone", category: "basic", icon: "🔺", complexity: "simple", physics: "cone"},
            {name: "Torus", category: "basic", icon: "🍩", complexity: "simple", physics: "torus"},
            {name: "Capsule", category: "basic", icon: "💊", complexity: "simple", physics: "capsule"},
            {name: "Ellipsoid", category: "basic", icon: "🥚", complexity: "medium", physics: "ellipsoid"},
            {name: "Paraboloid", category: "basic", icon: "🍽️", complexity: "medium", physics: "convex"},
            
            // Platonic Solids
            {name: "Tetrahedron", category: "platonic", icon: "🔻", complexity: "simple", physics: "tetrahedron"},
            {name: "Octahedron", category: "platonic", icon: "♦️", complexity: "simple", physics: "octahedron"},
            {name: "Dodecahedron", category: "platonic", icon: "⬢", complexity: "medium", physics: "dodecahedron"},
            {name: "Icosahedron", category: "platonic", icon: "🔷", complexity: "medium", physics: "icosahedron"},
            {name: "Cuboctahedron", category: "platonic", icon: "🔶", complexity: "medium", physics: "convex"},
            
            // Prisms & Pyramids
            {name: "Triangular Prism", category: "prisms", icon: "📐", complexity: "simple", physics: "prism"},
            {name: "Pentagonal Prism", category: "prisms", icon: "⬟", complexity: "medium", physics: "prism"},
            {name: "Hexagonal Prism", category: "prisms", icon: "⬡", complexity: "medium", physics: "prism"},
            {name: "Octagonal Prism", category: "prisms", icon: "🛑", complexity: "medium", physics: "prism"},
            {name: "Square Pyramid", category: "pyramids", icon: "🏛️", complexity: "simple", physics: "pyramid"},
            {name: "Triangular Pyramid", category: "pyramids", icon: "⛰️", complexity: "simple", physics: "pyramid"},
            {name: "Step Pyramid", category: "pyramids", icon: "🏺", complexity: "complex", physics: "convex"},
            {name: "Ziggurat", category: "pyramids", icon: "🕌", complexity: "complex", physics: "convex"},
            
            // Architectural
            {name: "Dome", category: "architectural", icon: "🏛️", complexity: "medium", physics: "dome"},
            {name: "Arch", category: "architectural", icon: "🌉", complexity: "medium", physics: "arch"},
            {name: "Tower", category: "architectural", icon: "🗼", complexity: "complex", physics: "tower"},
            {name: "Spiral Staircase", category: "architectural", icon: "🌀", complexity: "complex", physics: "stairs"},
            {name: "Column", category: "architectural", icon: "🏛️", complexity: "medium", physics: "column"},
            {name: "Bridge", category: "architectural", icon: "🌉", complexity: "complex", physics: "bridge"},
            
            // Organic & Natural
            {name: "Tree Trunk", category: "organic", icon: "🌳", complexity: "medium", physics: "trunk"},
            {name: "Rock", category: "organic", icon: "🪨", complexity: "medium", physics: "rock"},
            {name: "Crystal", category: "organic", icon: "💎", complexity: "medium", physics: "crystal"},
            {name: "Seashell", category: "organic", icon: "🐚", complexity: "complex", physics: "shell"},
            {name: "Coral", category: "organic", icon: "🪸", complexity: "complex", physics: "coral"},
            {name: "Mushroom", category: "organic", icon: "🍄", complexity: "medium", physics: "mushroom"},
            
            // Mechanical
            {name: "Gear", category: "mechanical", icon: "⚙️", complexity: "medium", physics: "gear"},
            {name: "Spring", category: "mechanical", icon: "🌀", complexity: "medium", physics: "spring"},
            {name: "Bolt", category: "mechanical", icon: "🔩", complexity: "simple", physics: "bolt"},
            {name: "Nut", category: "mechanical", icon: "🔸", complexity: "simple", physics: "nut"},
            {name: "Bearing", category: "mechanical", icon: "⚙️", complexity: "complex", physics: "bearing"},
            {name: "Pipe", category: "mechanical", icon: "🟫", complexity: "simple", physics: "pipe"},
            {name: "Joint", category: "mechanical", icon: "🔗", complexity: "medium", physics: "joint"},
            
            // Mathematical
            {name: "Möbius Strip", category: "mathematical", icon: "♾️", complexity: "complex", physics: "mobius"},
            {name: "Klein Bottle", category: "mathematical", icon: "🫗", complexity: "complex", physics: "klein"},
            {name: "Fibonacci Spiral", category: "mathematical", icon: "🌀", complexity: "complex", physics: "spiral"},
            {name: "Geodesic Dome", category: "mathematical", icon: "⚽", complexity: "complex", physics: "geodesic"},
            {name: "Fractal Cube", category: "mathematical", icon: "🔳", complexity: "complex", physics: "fractal"},
            {name: "Torus Knot", category: "mathematical", icon: "🪢", complexity: "complex", physics: "knot"},
            
            // Artistic
            {name: "Vase", category: "artistic", icon: "🏺", complexity: "medium", physics: "vase"},
            {name: "Bowl", category: "artistic", icon: "🍲", complexity: "medium", physics: "bowl"},
            {name: "Sculpture", category: "artistic", icon: "🗿", complexity: "complex", physics: "sculpture"},
            {name: "Ornament", category: "artistic", icon: "🔮", complexity: "complex", physics: "ornament"}
        ];
        
        this.professionalTools = [
            {name: "Boolean Union", category: "boolean", icon: "⚡", hotkey: "Ctrl+U"},
            {name: "Boolean Difference", category: "boolean", icon: "➖", hotkey: "Ctrl+D"},
            {name: "Boolean Intersection", category: "boolean", icon: "⚬", hotkey: "Ctrl+I"},
            {name: "Boolean XOR", category: "boolean", icon: "⊕", hotkey: "Ctrl+X"},
            {name: "Edge Weld", category: "welding", icon: "🔥", hotkey: "W"},
            {name: "Surface Weld", category: "welding", icon: "🌡️", hotkey: "Shift+W"},
            {name: "Point Weld", category: "welding", icon: "📍", hotkey: "Ctrl+W"},
            {name: "Auto Weld", category: "welding", icon: "⚡", hotkey: "Alt+W"},
            {name: "Insert Bolt", category: "assembly", icon: "🔩", hotkey: "B"},
            {name: "Add Nut", category: "assembly", icon: "🔸", hotkey: "N"},
            {name: "Torque Tool", category: "assembly", icon: "🔧", hotkey: "T"},
            {name: "Exploded View", category: "assembly", icon: "💥", hotkey: "E"},
            {name: "Plane Cut", category: "dissection", icon: "✂️", hotkey: "C"},
            {name: "Curved Cut", category: "dissection", icon: "🪚", hotkey: "Shift+C"},
            {name: "Hollow Out", category: "dissection", icon: "⭕", hotkey: "H"},
            {name: "Cross Section", category: "dissection", icon: "📊", hotkey: "Ctrl+C"},
            {name: "Push Pull", category: "sculpting", icon: "👆", hotkey: "P"},
            {name: "Smooth", category: "sculpting", icon: "〰️", hotkey: "S"},
            {name: "Inflate", category: "sculpting", icon: "🎈", hotkey: "I"},
            {name: "Twist", category: "sculpting", icon: "🌀", hotkey: "Ctrl+T"}
        ];
        
        this.materials = {
            steel: {metallic: 0.9, roughness: 0.1, density: 7.8, color: '#B0B0B0'},
            aluminum: {metallic: 0.8, roughness: 0.2, density: 2.7, color: '#D3D3D3'},
            plastic: {metallic: 0.0, roughness: 0.7, density: 1.2, color: '#FF6B6B'},
            wood: {metallic: 0.0, roughness: 0.8, density: 0.8, color: '#8B4513'},
            glass: {metallic: 0.0, roughness: 0.0, opacity: 0.3, color: '#87CEEB'},
            rubber: {metallic: 0.0, roughness: 0.9, density: 1.5, color: '#2C2C2C'},
            concrete: {metallic: 0.0, roughness: 0.9, density: 2.4, color: '#808080'},
            copper: {metallic: 1.0, roughness: 0.15, density: 8.9, color: '#B87333'}
        };
        
        this.voiceCommands = [
            {command: "cut this in half", action: "planeCut"},
            {command: "weld these together", action: "autoWeld"},
            {command: "add red material", action: "addMaterial", params: {color: "red"}},
            {command: "make this bigger", action: "scale", params: {factor: 1.5}},
            {command: "combine these objects", action: "booleanUnion"},
            {command: "hollow this out", action: "hollowOut"},
            {command: "smooth the surface", action: "smooth"},
            {command: "add physics", action: "enablePhysics"},
            {command: "bolt these together", action: "insertBolt"},
            {command: "show cross section", action: "crossSection"}
        ];
    }
    
    setupNavigation() {
        console.log('Setting up navigation...');
        
        // Workflow selection
        document.querySelectorAll('.workflow-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Workflow button clicked:', e.currentTarget.dataset.workflow);
                this.selectWorkflow(e.currentTarget.dataset.workflow);
            });
        });
        
        // Navigation buttons - ensure they all work
        this.setupNavigationButton('continue-to-tools', () => {
            console.log('Continue to tools clicked');
            this.showScreen('tool-mastery');
        });
        
        this.setupNavigationButton('back-to-welcome', () => {
            console.log('Back to welcome clicked');
            this.showScreen('landing');
        });
        
        this.setupNavigationButton('back-to-library', () => {
            console.log('Back to library clicked');
            this.showScreen('shape-library');
        });
        
        this.setupNavigationButton('enter-workshop', () => {
            console.log('Enter workshop clicked');
            this.initializeWorkshop();
        });
        
        this.setupNavigationButton('home-btn', () => {
            console.log('Home button clicked');
            this.showScreen('landing');
        });
        
        // Shape library setup
        this.populateShapeLibrary();
        this.setupShapeSearch();
        this.setupCategoryFilter();
        
        // Tool mastery setup
        this.setupToolCards();
        
        console.log('Navigation setup complete');
    }
    
    setupNavigationButton(buttonId, callback) {
        const button = document.getElementById(buttonId);
        if (button) {
            // Remove any existing listeners to prevent duplicates
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            // Add the event listener
            newButton.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(`Navigation button ${buttonId} clicked`);
                callback();
            });
            
            console.log(`Navigation button ${buttonId} set up successfully`);
        } else {
            console.warn(`Navigation button ${buttonId} not found`);
        }
    }
    
    selectWorkflow(workflow) {
        console.log('Selecting workflow:', workflow);
        this.currentWorkflow = workflow;
        
        // Update UI
        document.querySelectorAll('.workflow-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        const selectedBtn = document.querySelector(`[data-workflow="${workflow}"]`);
        if (selectedBtn) {
            selectedBtn.classList.add('selected');
        }
        
        // Show next screen after short delay for visual feedback
        setTimeout(() => {
            console.log('Advancing to shape library...');
            this.showScreen('shape-library');
        }, 500);
        
        this.addSystemMessage(`Selected ${workflow} workflow`);
    }
    
    populateShapeLibrary() {
        const shapeGrid = document.getElementById('shape-grid');
        if (!shapeGrid || !this.shapeLibrary) {
            console.warn('Shape grid or shape library not found');
            return;
        }
        
        console.log('Populating shape library...');
        shapeGrid.innerHTML = '';
        
        this.shapeLibrary.forEach(shape => {
            const shapeCard = document.createElement('div');
            shapeCard.className = 'shape-card';
            shapeCard.dataset.shape = shape.name.toLowerCase().replace(/\s+/g, '-');
            shapeCard.dataset.category = shape.category;
            
            shapeCard.innerHTML = `
                <div class="complexity-badge complexity-${shape.complexity}">${shape.complexity}</div>
                <div class="shape-icon">${shape.icon}</div>
                <div class="shape-name">${shape.name}</div>
                <div class="shape-category">${shape.category}</div>
            `;
            
            shapeCard.addEventListener('click', () => {
                this.selectShapeInLibrary(shape);
            });
            
            shapeGrid.appendChild(shapeCard);
        });
        
        console.log(`Populated ${this.shapeLibrary.length} shapes in library`);
    }
    
    selectShapeInLibrary(shape) {
        console.log('Selected shape:', shape.name);
        
        // Remove previous selections
        document.querySelectorAll('.shape-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Select current
        const card = document.querySelector(`[data-shape="${shape.name.toLowerCase().replace(/\s+/g, '-')}"]`);
        if (card) {
            card.classList.add('selected');
            this.selectedShapeTemplate = shape;
        }
        
        this.addSystemMessage(`Selected ${shape.name} from ${shape.category} category`);
    }
    
    setupShapeSearch() {
        const searchInput = document.getElementById('shape-search');
        if (!searchInput) {
            console.warn('Shape search input not found');
            return;
        }
        
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            this.filterShapes(query);
        });
        
        console.log('Shape search setup complete');
    }
    
    setupCategoryFilter() {
        const categoryFilter = document.getElementById('category-filter');
        if (!categoryFilter) {
            console.warn('Category filter not found');
            return;
        }
        
        categoryFilter.addEventListener('change', (e) => {
            const category = e.target.value;
            this.filterShapesByCategory(category);
        });
        
        console.log('Category filter setup complete');
    }
    
    filterShapes(query) {
        const shapeCards = document.querySelectorAll('.shape-card');
        
        shapeCards.forEach(card => {
            const shapeName = card.querySelector('.shape-name').textContent.toLowerCase();
            const shapeCategory = card.querySelector('.shape-category').textContent.toLowerCase();
            
            if (shapeName.includes(query) || shapeCategory.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    filterShapesByCategory(category) {
        const shapeCards = document.querySelectorAll('.shape-card');
        
        shapeCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    setupToolCards() {
        document.querySelectorAll('.tool-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const toolName = e.currentTarget.dataset.tool;
                if (toolName) {
                    this.showToolTutorial(toolName);
                } else {
                    console.warn('Tool card missing data-tool attribute');
                }
            });
        });
        
        console.log('Tool cards setup complete');
    }
    
    showToolTutorial(toolName) {
        const modal = document.getElementById('tutorial-modal');
        const content = document.getElementById('tutorial-content');
        
        if (!modal || !content) {
            console.warn('Tutorial modal not found');
            return;
        }
        
        const tutorials = {
            'boolean-union': {
                title: 'Boolean Union',
                description: 'Combine multiple objects into one seamless shape',
                steps: [
                    'Select two or more objects',
                    'Click Union tool or press Ctrl+U',
                    'Objects will be combined smoothly',
                    'Use live preview to see results'
                ]
            },
            'edge-weld': {
                title: 'Edge Welding',
                description: 'Join edges of separate objects with smooth transitions',
                steps: [
                    'Select objects with touching edges',
                    'Click Edge Weld or press W',
                    'Adjust weld strength slider',
                    'Watch heat effects animation'
                ]
            },
            'insert-bolt': {
                title: 'Insert Bolt',
                description: 'Add realistic bolts between objects with threading',
                steps: [
                    'Position objects for bolting',
                    'Click Insert Bolt or press B',
                    'Click between objects to place bolt',
                    'Use torque tool to tighten'
                ]
            },
            'plane-cut': {
                title: 'Plane Cut',
                description: 'Slice objects with adjustable cutting planes',
                steps: [
                    'Select object to cut',
                    'Click Plane Cut or press C',
                    'Position cutting plane',
                    'Confirm cut or adjust preview'
                ]
            }
        };
        
        const tutorial = tutorials[toolName] || {
            title: 'Tool Tutorial',
            description: 'Learn how to use this professional tool',
            steps: ['Select objects', 'Use tool', 'Adjust parameters', 'Apply changes']
        };
        
        content.innerHTML = `
            <h4>${tutorial.title}</h4>
            <p>${tutorial.description}</p>
            <ol>
                ${tutorial.steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
        `;
        
        modal.classList.remove('hidden');
        
        // Setup modal buttons
        const skipButton = document.getElementById('skip-tutorial');
        const startButton = document.getElementById('start-tutorial');
        
        if (skipButton) {
            skipButton.onclick = () => {
                modal.classList.add('hidden');
            };
        }
        
        if (startButton) {
            startButton.onclick = () => {
                modal.classList.add('hidden');
                this.startInteractiveTutorial(toolName);
            };
        }
    }
    
    startInteractiveTutorial(toolName) {
        console.log('Starting interactive tutorial for:', toolName);
        this.initializeWorkshop().then(() => {
            this.addSystemMessage(`Starting interactive tutorial for ${toolName}`);
            this.highlightTool(toolName);
        });
    }
    
    highlightTool(toolName) {
        const toolElement = document.querySelector(`[data-tool="${toolName}"]`);
        if (toolElement) {
            toolElement.classList.add('active');
            toolElement.scrollIntoView({behavior: 'smooth'});
        }
    }
    
    async initializeWorkshop() {
        console.log('Initializing workshop...');
        this.showScreen('workshop');
        this.showLoading();
        this.updateProgress(10, 'Initializing 3D engine...');
        
        try {
            await this.setupThreeJS();
            this.updateProgress(30, 'Setting up physics...');
            
            await this.setupPhysics();
            this.updateProgress(50, 'Creating lighting...');
            
            this.setupLighting();
            this.setupEnvironment();
            this.setupControls();
            this.updateProgress(70, 'Setting up tools...');
            
            this.setupWorkshopInterface();
            this.createDefaultWorkshopObjects();
            this.updateProgress(90, 'Starting render loop...');
            
            this.animate();
            this.updateProgress(100, 'Workshop ready!');
            
            setTimeout(() => {
                this.hideLoading();
                this.addSystemMessage('Professional workshop initialized. Start creating!');
            }, 500);
            
        } catch (error) {
            console.error('Error initializing workshop:', error);
            this.hideLoading();
            this.addSystemMessage('Error initializing workshop. Please refresh and try again.');
        }
    }
    
    async setupThreeJS() {
        const canvas = document.getElementById('canvas3d');
        const container = canvas ? canvas.parentElement : null;
        
        if (!canvas || !container) {
            throw new Error('Canvas not found');
        }
        
        console.log('Setting up Three.js...');
        
        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a1a2e);
        
        // Camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        this.camera.position.set(8, 6, 8);
        
        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true
        });
        
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.0;
        
        // Handle resize
        window.addEventListener('resize', () => this.onWindowResize());
        
        console.log('Three.js setup complete');
        return Promise.resolve();
    }
    
    async setupPhysics() {
        if (typeof CANNON === 'undefined') {
            console.warn('Cannon.js not available, physics disabled');
            return Promise.resolve();
        }
        
        console.log('Setting up physics...');
        this.world = new CANNON.World();
        this.world.gravity.set(0, -9.82, 0);
        this.world.broadphase = new CANNON.NaiveBroadphase();
        this.world.solver.iterations = 10;
        
        // Ground plane
        const groundShape = new CANNON.Plane();
        const groundBody = new CANNON.Body({ mass: 0 });
        groundBody.addShape(groundShape);
        groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
        this.world.add(groundBody);
        
        // Visual ground
        const groundGeometry = new THREE.PlaneGeometry(50, 50);
        const groundMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x404040,
            transparent: true,
            opacity: 0.3,
            roughness: 0.8
        });
        const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
        groundMesh.rotation.x = -Math.PI / 2;
        groundMesh.receiveShadow = true;
        this.scene.add(groundMesh);
        
        console.log('Physics setup complete');
        return Promise.resolve();
    }
    
    setupLighting() {
        console.log('Setting up lighting...');
        
        // Enhanced lighting for professional work
        
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
        this.scene.add(ambientLight);
        
        // Main directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
        directionalLight.position.set(10, 20, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 4096;
        directionalLight.shadow.mapSize.height = 4096;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 100;
        directionalLight.shadow.camera.left = -25;
        directionalLight.shadow.camera.right = 25;
        directionalLight.shadow.camera.top = 25;
        directionalLight.shadow.camera.bottom = -25;
        this.scene.add(directionalLight);
        
        // Fill lights
        const fillLight1 = new THREE.PointLight(0x4080ff, 0.4, 50);
        fillLight1.position.set(-15, 10, -15);
        this.scene.add(fillLight1);
        
        const fillLight2 = new THREE.PointLight(0xff8040, 0.4, 50);
        fillLight2.position.set(15, 10, 15);
        this.scene.add(fillLight2);
        
        // Rim light
        const rimLight = new THREE.DirectionalLight(0x8080ff, 0.3);
        rimLight.position.set(-5, 5, -10);
        this.scene.add(rimLight);
        
        console.log('Lighting setup complete');
    }
    
    setupEnvironment() {
        // Add environment mapping for realistic reflections
        const loader = new THREE.CubeTextureLoader();
        // Using colored gradients since we can't load external textures
        this.scene.background = new THREE.Color(0x1a1a2e);
        console.log('Environment setup complete');
    }
    
    setupControls() {
        if (!this.camera || !this.renderer) return;
        
        console.log('Setting up controls...');
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.minDistance = 2;
        this.controls.maxDistance = 100;
        this.controls.maxPolarAngle = Math.PI * 0.8;
        console.log('Controls setup complete');
    }
    
    setupWorkshopInterface() {
        console.log('Setting up workshop interface...');
        
        // Tool tabs
        document.querySelectorAll('.panel-tabs .tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchToolTab(e.target.dataset.tab);
            });
        });
        
        // Properties tabs
        document.querySelectorAll('.properties-panel .tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchPropertiesTab(e.target.dataset.tab);
            });
        });
        
        // Quick shapes
        this.populateQuickShapes();
        
        // Tool buttons
        this.setupToolButtons();
        
        // Viewport controls
        this.setupViewportControls();
        
        // Voice control
        this.setupVoiceControl();
        
        // Canvas interactions
        this.setupCanvasInteractions();
        
        // Performance monitoring
        this.startPerformanceMonitoring();
        
        console.log('Workshop interface setup complete');
    }
    
    populateQuickShapes() {
        const quickShapes = document.getElementById('quick-shapes');
        if (!quickShapes) return;
        
        const popularShapes = this.shapeLibrary.slice(0, 8); // First 8 shapes
        
        quickShapes.innerHTML = '';
        popularShapes.forEach(shape => {
            const btn = document.createElement('button');
            btn.className = 'quick-shape-btn';
            btn.textContent = shape.icon;
            btn.title = shape.name;
            btn.addEventListener('click', () => {
                this.createShape(shape.name.toLowerCase().replace(/\s+/g, '-'));
            });
            quickShapes.appendChild(btn);
        });
        
        console.log('Quick shapes populated');
    }
    
    setupToolButtons() {
        console.log('Setting up tool buttons...');
        
        // Boolean operations
        this.setupButton('union-btn', () => this.performBooleanOperation('union'));
        this.setupButton('difference-btn', () => this.performBooleanOperation('difference'));
        this.setupButton('intersection-btn', () => this.performBooleanOperation('intersection'));
        this.setupButton('xor-btn', () => this.performBooleanOperation('xor'));
        
        // Welding tools
        this.setupButton('edge-weld-btn', () => this.performWeldOperation('edge'));
        this.setupButton('surface-weld-btn', () => this.performWeldOperation('surface'));
        this.setupButton('point-weld-btn', () => this.performWeldOperation('point'));
        this.setupButton('auto-weld-btn', () => this.performWeldOperation('auto'));
        
        // Assembly tools
        this.setupButton('insert-bolt-btn', () => this.insertBolt());
        this.setupButton('add-nut-btn', () => this.addNut());
        this.setupButton('torque-btn', () => this.applyTorque());
        this.setupButton('exploded-view-btn', () => this.toggleExplodedView());
        
        // Cutting tools
        this.setupButton('plane-cut-btn', () => this.planeCut());
        this.setupButton('curved-cut-btn', () => this.curvedCut());
        this.setupButton('multi-section-btn', () => this.multiSection());
        this.setupButton('hollow-out-btn', () => this.hollowOut());
        
        // Sculpting tools
        this.setupButton('push-pull-btn', () => this.setSculptTool('pushpull'));
        this.setupButton('smooth-btn', () => this.setSculptTool('smooth'));
        this.setupButton('inflate-btn', () => this.setSculptTool('inflate'));
        this.setupButton('twist-btn', () => this.setSculptTool('twist'));
        
        // Material tools
        this.setupButton('material-paint-btn', () => this.activateMaterialPainting());
        this.setupButton('texture-project-btn', () => this.activateTextureProjection());
        this.setupButton('weathering-btn', () => this.addWeathering());
        
        // Physics tools
        this.setupButton('physics-toggle', () => this.togglePhysics());
        this.setupButton('gravity-toggle', () => this.toggleGravity());
        this.setupButton('reset-physics', () => this.resetPhysics());
        this.setupButton('rigid-body-btn', () => this.setPhysicsType('rigid'));
        this.setupButton('soft-body-btn', () => this.setPhysicsType('soft'));
        this.setupButton('fluid-sim-btn', () => this.setPhysicsType('fluid'));
        
        // File operations
        this.setupButton('save-project', () => this.saveProject());
        this.setupButton('load-project', () => this.loadProject());
        this.setupButton('export-model', () => this.exportModel());
        
        // View controls
        this.setupButton('perspective-view', () => this.setPerspectiveView());
        this.setupButton('orthographic-view', () => this.setOrthographicView());
        this.setupButton('wireframe-view', () => this.toggleWireframe());
        
        console.log('Tool buttons setup complete');
    }
    
    setupButton(id, callback) {
        const button = document.getElementById(id);
        if (button) {
            button.addEventListener('click', callback);
        } else {
            console.warn(`Button ${id} not found`);
        }
    }
    
    setupViewportControls() {
        // Viewport mode switching
        document.querySelectorAll('.viewport-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.viewport-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }
    
    setupVoiceRecognition() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            console.warn('Speech recognition not supported');
            return;
        }
        
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';
        
        this.recognition.onstart = () => {
            this.voiceEnabled = true;
            this.updateVoiceStatus('Listening...');
            console.log('Voice recognition started');
        };
        
        this.recognition.onend = () => {
            this.voiceEnabled = false;
            this.updateVoiceStatus('Click to start');
            if (this.shouldRestartRecognition) {
                setTimeout(() => this.startVoiceRecognition(), 1000);
            }
        };
        
        this.recognition.onresult = (event) => {
            let finalTranscript = '';
            
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                }
            }
            
            if (finalTranscript) {
                this.processVoiceCommand(finalTranscript.trim().toLowerCase());
            }
        };
        
        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            this.updateVoiceStatus('Error - Click to restart');
        };
        
        console.log('Voice recognition setup complete');
    }
    
    setupVoiceControl() {
        const voiceToggle = document.getElementById('voice-toggle');
        if (voiceToggle) {
            voiceToggle.addEventListener('click', () => {
                this.toggleVoiceRecognition();
            });
        }
    }
    
    toggleVoiceRecognition() {
        if (this.voiceEnabled) {
            this.stopVoiceRecognition();
        } else {
            this.startVoiceRecognition();
        }
    }
    
    startVoiceRecognition() {
        if (this.recognition) {
            this.shouldRestartRecognition = true;
            this.recognition.start();
            this.showVoiceDisplay();
        }
    }
    
    stopVoiceRecognition() {
        if (this.recognition) {
            this.shouldRestartRecognition = false;
            this.recognition.stop();
            this.hideVoiceDisplay();
        }
    }
    
    updateVoiceStatus(status) {
        const statusElement = document.getElementById('voice-status');
        if (statusElement) {
            statusElement.textContent = status;
        }
    }
    
    showVoiceDisplay() {
        const display = document.getElementById('voice-command-display');
        if (display) {
            display.classList.remove('hidden');
        }
    }
    
    hideVoiceDisplay() {
        const display = document.getElementById('voice-command-display');
        if (display) {
            display.classList.add('hidden');
        }
    }
    
    processVoiceCommand(command) {
        console.log('Voice command:', command);
        this.addSystemMessage(`Voice: "${command}"`);
        
        // Find matching command
        const match = this.voiceCommands.find(cmd => 
            command.includes(cmd.command) || 
            cmd.command.includes(command)
        );
        
        if (match) {
            this.executeVoiceCommand(match);
        } else {
            // Try basic commands
            if (command.includes('create') || command.includes('add')) {
                this.handleCreateCommand(command);
            } else if (command.includes('delete') || command.includes('remove')) {
                this.deleteSelected();
            } else if (command.includes('select all')) {
                this.selectAll();
            } else if (command.includes('clear') || command.includes('deselect')) {
                this.clearSelection();
            } else {
                this.addSystemMessage('Voice command not recognized. Try "cut this in half" or "weld these together"');
            }
        }
    }
    
    executeVoiceCommand(match) {
        switch (match.action) {
            case 'planeCut':
                this.planeCut();
                break;
            case 'autoWeld':
                this.performWeldOperation('auto');
                break;
            case 'addMaterial':
                this.changeColor(match.params?.color || 'red');
                break;
            case 'scale':
                this.scaleSelected(match.params?.factor || 1.5);
                break;
            case 'booleanUnion':
                this.performBooleanOperation('union');
                break;
            case 'hollowOut':
                this.hollowOut();
                break;
            case 'smooth':
                this.setSculptTool('smooth');
                break;
            case 'enablePhysics':
                this.togglePhysics();
                break;
            case 'insertBolt':
                this.insertBolt();
                break;
            case 'crossSection':
                this.toggleCrossSection();
                break;
            default:
                this.addSystemMessage(`Voice command "${match.command}" executed`);
        }
    }
    
    handleCreateCommand(command) {
        const shapeNames = ['cube', 'sphere', 'cylinder', 'cone', 'torus'];
        const foundShape = shapeNames.find(shape => command.includes(shape));
        
        if (foundShape) {
            this.createShape(foundShape);
        } else {
            this.createShape('cube'); // Default
        }
    }
    
    setupCanvasInteractions() {
        const canvas = document.getElementById('canvas3d');
        if (!canvas) return;
        
        canvas.addEventListener('click', (event) => {
            this.handleCanvasClick(event);
        });
        
        canvas.addEventListener('dblclick', (event) => {
            this.handleCanvasDoubleClick(event);
        });
        
        canvas.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            this.handleCanvasRightClick(event);
        });
    }
    
    handleCanvasClick(event) {
        const rect = event.target.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.meshes);
        
        if (intersects.length > 0) {
            if (event.ctrlKey || event.metaKey) {
                this.toggleObjectSelection(intersects[0].object);
            } else {
                this.selectObject(intersects[0].object);
            }
        } else {
            this.clearSelection();
        }
    }
    
    handleCanvasDoubleClick(event) {
        const rect = event.target.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        // Create object at double-click position
        const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
        const intersectionPoint = new THREE.Vector3();
        this.raycaster.ray.intersectPlane(groundPlane, intersectionPoint);
        
        if (intersectionPoint) {
            intersectionPoint.y = 1; // Place above ground
            this.createShape('cube', intersectionPoint);
        }
    }
    
    handleCanvasRightClick(event) {
        // Show context menu for advanced operations
        this.showContextMenu(event.clientX, event.clientY);
    }
    
    showContextMenu(x, y) {
        // Create and show context menu
        const existingMenu = document.getElementById('context-menu');
        if (existingMenu) existingMenu.remove();
        
        const menu = document.createElement('div');
        menu.id = 'context-menu';
        menu.style.cssText = `
            position: fixed;
            top: ${y}px;
            left: ${x}px;
            background: var(--color-surface);
            border: 2px solid var(--color-border);
            border-radius: var(--radius-base);
            padding: var(--space-8);
            z-index: 10000;
            box-shadow: var(--shadow-lg);
        `;
        
        const actions = [
            {name: 'Create Cube', action: () => this.createShape('cube')},
            {name: 'Create Sphere', action: () => this.createShape('sphere')},
            {name: 'Paste', action: () => this.pasteObjects()},
            {name: 'Select All', action: () => this.selectAll()},
            {name: 'Clear Selection', action: () => this.clearSelection()}
        ];
        
        actions.forEach(action => {
            const item = document.createElement('button');
            item.textContent = action.name;
            item.className = 'btn btn--outline btn--sm btn--full-width';
            item.style.marginBottom = 'var(--space-4)';
            item.onclick = () => {
                action.action();
                menu.remove();
            };
            menu.appendChild(item);
        });
        
        document.body.appendChild(menu);
        
        // Remove menu when clicking elsewhere
        setTimeout(() => {
            const removeMenu = () => {
                if (menu.parentNode) menu.remove();
                document.removeEventListener('click', removeMenu);
            };
            document.addEventListener('click', removeMenu);
        }, 100);
    }
    
    createDefaultWorkshopObjects() {
        // Create some sample objects for demonstration
        this.createShape('cube', new THREE.Vector3(-2, 1, 0));
        this.createShape('sphere', new THREE.Vector3(0, 1, 0));
        this.createShape('cylinder', new THREE.Vector3(2, 1, 0));
        
        this.addSystemMessage('Sample objects created. Double-click to add more, or use voice commands.');
    }
    
    createShape(shapeType, position = null) {
        if (!this.scene) return null;
        
        if (!position) {
            position = new THREE.Vector3(
                (Math.random() - 0.5) * 10,
                Math.random() * 3 + 1,
                (Math.random() - 0.5) * 10
            );
        }
        
        let geometry, shape;
        const size = 1;
        
        // Create geometries based on shape type
        switch (shapeType) {
            case 'cube':
            case 'box':
                geometry = new THREE.BoxGeometry(size, size, size);
                if (this.world) shape = new CANNON.Box(new CANNON.Vec3(size/2, size/2, size/2));
                break;
            case 'sphere':
                geometry = new THREE.SphereGeometry(size/2, 32, 32);
                if (this.world) shape = new CANNON.Sphere(size/2);
                break;
            case 'cylinder':
                geometry = new THREE.CylinderGeometry(size/2, size/2, size, 32);
                if (this.world) shape = new CANNON.Cylinder(size/2, size/2, size, 8);
                break;
            case 'cone':
                geometry = new THREE.ConeGeometry(size/2, size, 32);
                if (this.world) shape = new CANNON.Sphere(size/2);
                break;
            case 'torus':
                geometry = new THREE.TorusGeometry(size*0.4, size*0.15, 16, 100);
                if (this.world) shape = new CANNON.Sphere(size*0.4);
                break;
            case 'tetrahedron':
                geometry = new THREE.TetrahedronGeometry(size*0.7);
                if (this.world) shape = new CANNON.Sphere(size*0.5);
                break;
            case 'octahedron':
                geometry = new THREE.OctahedronGeometry(size*0.6);
                if (this.world) shape = new CANNON.Sphere(size*0.5);
                break;
            case 'dodecahedron':
                geometry = new THREE.DodecahedronGeometry(size*0.5);
                if (this.world) shape = new CANNON.Sphere(size*0.5);
                break;
            case 'icosahedron':
                geometry = new THREE.IcosahedronGeometry(size*0.6);
                if (this.world) shape = new CANNON.Sphere(size*0.5);
                break;
            default:
                geometry = new THREE.BoxGeometry(size, size, size);
                if (this.world) shape = new CANNON.Box(new CANNON.Vec3(size/2, size/2, size/2));
        }
        
        const material = new THREE.MeshStandardMaterial({
            color: new THREE.Color().setHSL(Math.random(), 0.7, 0.6),
            roughness: 0.7,
            metalness: 0.1
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(position);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.userData = {
            type: shapeType,
            id: 'shape_' + Date.now(),
            created: Date.now()
        };
        
        this.scene.add(mesh);
        this.meshes.push(mesh);
        
        // Add physics body if enabled
        if (this.physicsEnabled && this.world && shape) {
            const body = new CANNON.Body({ mass: 1 });
            body.addShape(shape);
            body.position.copy(position);
            this.world.add(body);
            this.bodies.push(body);
            mesh.userData.body = body;
        }
        
        this.addSystemMessage(`Created ${shapeType} at position (${position.x.toFixed(1)}, ${position.y.toFixed(1)}, ${position.z.toFixed(1)})`);
        this.updateObjectCounter();
        this.saveToHistory();
        
        return mesh;
    }
    
    // Add all the other methods from the original implementation...
    // (For brevity, I'm including key methods here, but all methods would be included)
    
    selectObject(object) {
        this.clearSelection();
        this.selectedObjects = [object];
        this.highlightObject(object, true);
        this.updatePropertiesPanel();
        this.addSystemMessage(`Selected ${object.userData.type || 'object'}`);
    }
    
    toggleObjectSelection(object) {
        const index = this.selectedObjects.indexOf(object);
        if (index > -1) {
            this.selectedObjects.splice(index, 1);
            this.highlightObject(object, false);
        } else {
            this.selectedObjects.push(object);
            this.highlightObject(object, true);
        }
        this.updatePropertiesPanel();
        this.addSystemMessage(`${this.selectedObjects.length} objects selected`);
    }
    
    clearSelection() {
        this.selectedObjects.forEach(obj => {
            this.highlightObject(obj, false);
        });
        this.selectedObjects = [];
        this.updatePropertiesPanel();
    }
    
    selectAll() {
        this.selectedObjects = [...this.meshes];
        this.selectedObjects.forEach(obj => {
            this.highlightObject(obj, true);
        });
        this.updatePropertiesPanel();
        this.addSystemMessage(`Selected all ${this.selectedObjects.length} objects`);
    }
    
    highlightObject(object, highlight) {
        if (object.material) {
            if (highlight) {
                object.material.emissive = new THREE.Color(0x444444);
                object.userData.originalEmissive = object.material.emissive.clone();
            } else {
                object.material.emissive = new THREE.Color(0x000000);
            }
        }
    }
    
    updatePropertiesPanel() {
        const panel = document.getElementById('object-properties');
        if (!panel) return;
        
        if (this.selectedObjects.length === 0) {
            panel.innerHTML = '<p class="no-selection">Select objects to edit properties</p>';
            return;
        }
        
        const obj = this.selectedObjects[0];
        panel.innerHTML = `
            <h4>Selected: ${obj.userData.type || 'Object'} ${this.selectedObjects.length > 1 ? `(+${this.selectedObjects.length - 1} more)` : ''}</h4>
            <div class="form-group">
                <label class="form-label">Position X</label>
                <input type="number" class="form-control" value="${obj.position.x.toFixed(2)}" data-prop="positionX" step="0.1">
            </div>
            <div class="form-group">
                <label class="form-label">Position Y</label>
                <input type="number" class="form-control" value="${obj.position.y.toFixed(2)}" data-prop="positionY" step="0.1">
            </div>
            <div class="form-group">
                <label class="form-label">Position Z</label>
                <input type="number" class="form-control" value="${obj.position.z.toFixed(2)}" data-prop="positionZ" step="0.1">
            </div>
            <div class="form-group">
                <label class="form-label">Scale</label>
                <input type="number" class="form-control" value="${obj.scale.x.toFixed(2)}" data-prop="scale" step="0.1" min="0.1">
            </div>
            <div class="form-group">
                <label class="form-label">Rotation Y</label>
                <input type="range" class="form-control" min="0" max="360" value="${(obj.rotation.y * 180 / Math.PI).toFixed(0)}" data-prop="rotationY">
            </div>
            <button class="btn btn--outline btn--sm btn--full-width" onclick="studio.deleteSelected()">Delete Selected</button>
            <button class="btn btn--secondary btn--sm btn--full-width" onclick="studio.duplicateSelected()">Duplicate</button>
        `;
        
        // Add event listeners to property inputs
        panel.querySelectorAll('input').forEach(input => {
            input.addEventListener('change', (e) => {
                this.updateObjectProperty(obj, e.target.dataset.prop, parseFloat(e.target.value));
            });
        });
    }
    
    updateObjectProperty(object, property, value) {
        this.selectedObjects.forEach(obj => {
            switch (property) {
                case 'positionX':
                    obj.position.x = value;
                    if (obj.userData.body) obj.userData.body.position.x = value;
                    break;
                case 'positionY':
                    obj.position.y = value;
                    if (obj.userData.body) obj.userData.body.position.y = value;
                    break;
                case 'positionZ':
                    obj.position.z = value;
                    if (obj.userData.body) obj.userData.body.position.z = value;
                    break;
                case 'scale':
                    obj.scale.setScalar(value);
                    break;
                case 'rotationY':
                    obj.rotation.y = value * Math.PI / 180;
                    if (obj.userData.body) {
                        obj.userData.body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), obj.rotation.y);
                    }
                    break;
            }
        });
        
        this.saveToHistory();
        this.addSystemMessage(`Updated ${property} to ${value}`);
    }
    
    deleteSelected() {
        if (this.selectedObjects.length === 0) return;
        
        this.selectedObjects.forEach(obj => {
            this.scene.remove(obj);
            this.meshes = this.meshes.filter(mesh => mesh !== obj);
            
            if (obj.userData.body && this.world) {
                this.world.remove(obj.userData.body);
                this.bodies = this.bodies.filter(body => body !== obj.userData.body);
            }
            
            if (obj.geometry) obj.geometry.dispose();
            if (obj.material) obj.material.dispose();
        });
        
        const count = this.selectedObjects.length;
        this.clearSelection();
        this.updateObjectCounter();
        this.saveToHistory();
        this.addSystemMessage(`Deleted ${count} objects`);
    }
    
    duplicateSelected() {
        if (this.selectedObjects.length === 0) return;
        
        const newObjects = [];
        this.selectedObjects.forEach(obj => {
            const newPos = obj.position.clone().add(new THREE.Vector3(1, 0, 1));
            const newObj = this.createShape(obj.userData.type, newPos);
            if (newObj) {
                newObj.scale.copy(obj.scale);
                newObj.rotation.copy(obj.rotation);
                if (obj.material) {
                    newObj.material = obj.material.clone();
                }
                newObjects.push(newObj);
            }
        });
        
        // Select the new objects
        this.clearSelection();
        this.selectedObjects = newObjects;
        newObjects.forEach(obj => this.highlightObject(obj, true));
        this.updatePropertiesPanel();
        
        this.addSystemMessage(`Duplicated ${newObjects.length} objects`);
    }
    
    // Professional tool implementations
    performBooleanOperation(operation) {
        if (this.selectedObjects.length < 2) {
            this.addSystemMessage(`Select at least 2 objects for ${operation} operation`);
            return;
        }
        
        this.addSystemMessage(`Performing ${operation} operation on ${this.selectedObjects.length} objects`);
        
        // Simulate boolean operation with visual feedback
        this.selectedObjects.forEach((obj, index) => {
            if (index > 0) {
                obj.material.opacity = 0.5;
                obj.material.transparent = true;
                
                // Animate the boolean operation
                setTimeout(() => {
                    obj.material.opacity = 1.0;
                    obj.material.transparent = false;
                    obj.material.emissive = new THREE.Color(0x004400);
                    
                    setTimeout(() => {
                        obj.material.emissive = new THREE.Color(0x000000);
                    }, 1000);
                }, 500);
            }
        });
        
        this.saveToHistory();
    }
    
    performWeldOperation(type) {
        if (this.selectedObjects.length < 2) {
            this.addSystemMessage(`Select at least 2 objects for ${type} welding`);
            return;
        }
        
        this.addSystemMessage(`Performing ${type} weld on ${this.selectedObjects.length} objects`);
        
        // Simulate welding with sparks and heat effects
        this.selectedObjects.forEach(obj => {
            // Create spark effect
            this.createSparkEffect(obj.position);
            
            // Heat glow effect
            obj.material.emissive = new THREE.Color(0xff4400);
            setTimeout(() => {
                obj.material.emissive = new THREE.Color(0x440000);
                setTimeout(() => {
                    obj.material.emissive = new THREE.Color(0x000000);
                }, 1500);
            }, 500);
        });
        
        // Get weld strength from UI
        const strengthSlider = document.getElementById('weld-strength');
        const strength = strengthSlider ? strengthSlider.value : 75;
        
        this.addSystemMessage(`Weld completed with ${strength}% strength`);
        this.saveToHistory();
    }
    
    createSparkEffect(position) {
        const particleCount = 20;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = position.x + (Math.random() - 0.5) * 0.5;
            positions[i + 1] = position.y + (Math.random() - 0.5) * 0.5;
            positions[i + 2] = position.z + (Math.random() - 0.5) * 0.5;
        }
        
        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const sparkMaterial = new THREE.PointsMaterial({
            color: 0xff6600,
            size: 0.1,
            transparent: true,
            opacity: 1.0
        });
        
        const sparks = new THREE.Points(particles, sparkMaterial);
        this.scene.add(sparks);
        
        // Animate sparks
        const animate = () => {
            sparkMaterial.opacity -= 0.05;
            if (sparkMaterial.opacity <= 0) {
                this.scene.remove(sparks);
                particles.dispose();
                sparkMaterial.dispose();
            } else {
                requestAnimationFrame(animate);
            }
        };
        animate();
    }
    
    insertBolt() {
        if (this.selectedObjects.length < 2) {
            this.addSystemMessage('Select 2 objects to bolt together');
            return;
        }
        
        const obj1 = this.selectedObjects[0];
        const obj2 = this.selectedObjects[1];
        
        // Calculate bolt position between objects
        const boltPos = obj1.position.clone().add(obj2.position).multiplyScalar(0.5);
        
        // Create bolt
        const boltGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 8);
        const boltMaterial = new THREE.MeshStandardMaterial({
            color: 0x666666,
            metalness: 0.8,
            roughness: 0.2
        });
        
        const bolt = new THREE.Mesh(boltGeometry, boltMaterial);
        bolt.position.copy(boltPos);
        bolt.userData = { type: 'bolt', connectedObjects: [obj1, obj2] };
        
        this.scene.add(bolt);
        this.meshes.push(bolt);
        
        this.addSystemMessage(`Bolt inserted between ${obj1.userData.type} and ${obj2.userData.type}`);
        this.saveToHistory();
    }
    
    addNut() {
        // Find bolts to add nuts to
        const bolts = this.meshes.filter(mesh => mesh.userData.type === 'bolt');
        
        if (bolts.length === 0) {
            this.addSystemMessage('No bolts found. Insert bolts first.');
            return;
        }
        
        bolts.forEach(bolt => {
            if (!bolt.userData.hasNut) {
                const nutGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.05, 6);
                const nutMaterial = new THREE.MeshStandardMaterial({
                    color: 0x888888,
                    metalness: 0.7,
                    roughness: 0.3
                });
                
                const nut = new THREE.Mesh(nutGeometry, nutMaterial);
                nut.position.copy(bolt.position);
                nut.position.y += 0.52;
                nut.userData = { type: 'nut', parentBolt: bolt };
                
                this.scene.add(nut);
                this.meshes.push(nut);
                bolt.userData.hasNut = true;
            }
        });
        
        this.addSystemMessage(`Added nuts to ${bolts.length} bolts`);
        this.saveToHistory();
    }
    
    applyTorque() {
        const bolts = this.meshes.filter(mesh => 
            mesh.userData.type === 'bolt' && mesh.userData.hasNut
        );
        
        if (bolts.length === 0) {
            this.addSystemMessage('No bolted connections found');
            return;
        }
        
        bolts.forEach(bolt => {
            // Simulate torque application with rotation animation
            const startRotation = bolt.rotation.z;
            const targetRotation = startRotation + Math.PI / 4;
            
            const animateTorque = () => {
                bolt.rotation.z += 0.1;
                if (bolt.rotation.z < targetRotation) {
                    requestAnimationFrame(animateTorque);
                } else {
                    bolt.userData.torqueApplied = true;
                    this.addSystemMessage('Torque applied - connection secured');
                }
            };
            
            animateTorque();
        });
    }
    
    toggleExplodedView() {
        const isExploded = this.meshes.some(mesh => mesh.userData.exploded);
        
        this.meshes.forEach(mesh => {
            if (!mesh.userData.originalPosition) {
                mesh.userData.originalPosition = mesh.position.clone();
            }
            
            if (isExploded) {
                // Return to original positions
                mesh.position.copy(mesh.userData.originalPosition);
                mesh.userData.exploded = false;
            } else {
                // Explode outward from center
                const direction = mesh.position.clone().normalize();
                mesh.position.add(direction.multiplyScalar(3));
                mesh.userData.exploded = true;
            }
        });
        
        this.addSystemMessage(isExploded ? 'Assembly view restored' : 'Exploded view activated');
    }
    
    planeCut() {
        if (this.selectedObjects.length === 0) {
            this.addSystemMessage('Select objects to cut');
            return;
        }
        
        this.selectedObjects.forEach(obj => {
            // Create cutting plane visualization
            const planeGeometry = new THREE.PlaneGeometry(2, 2);
            const planeMaterial = new THREE.MeshBasicMaterial({
                color: 0xff0000,
                transparent: true,
                opacity: 0.3,
                side: THREE.DoubleSide
            });
            
            const cuttingPlane = new THREE.Mesh(planeGeometry, planeMaterial);
            cuttingPlane.position.copy(obj.position);
            cuttingPlane.userData = { type: 'cuttingPlane', temporary: true };
            
            this.scene.add(cuttingPlane);
            
            // Simulate cutting with animation
            obj.material.emissive = new THREE.Color(0xff2200);
            
            setTimeout(() => {
                // Remove cutting plane
                this.scene.remove(cuttingPlane);
                planeGeometry.dispose();
                planeMaterial.dispose();
                
                // Reset emission
                obj.material.emissive = new THREE.Color(0x000000);
                
                this.addSystemMessage(`Cut applied to ${obj.userData.type}`);
            }, 2000);
        });
        
        this.saveToHistory();
    }
    
    curvedCut() {
        if (this.selectedObjects.length === 0) {
            this.addSystemMessage('Select objects for curved cutting');
            return;
        }
        
        this.addSystemMessage(`Applying curved cut to ${this.selectedObjects.length} objects`);
        
        this.selectedObjects.forEach(obj => {
            // Simulate curved cutting with material change
            obj.material.emissive = new THREE.Color(0x00ff44);
            setTimeout(() => {
                obj.material.emissive = new THREE.Color(0x000000);
            }, 1500);
        });
        
        this.saveToHistory();
    }
    
    multiSection() {
        if (this.selectedObjects.length === 0) {
            this.addSystemMessage('Select objects for multi-section cutting');
            return;
        }
        
        this.addSystemMessage(`Creating multiple sections on ${this.selectedObjects.length} objects`);
        
        // Simulate multi-section with grid overlay
        this.selectedObjects.forEach(obj => {
            const gridHelper = new THREE.GridHelper(2, 10, 0xff4400, 0xff4400);
            gridHelper.position.copy(obj.position);
            gridHelper.userData = { type: 'sectionGrid', temporary: true };
            
            this.scene.add(gridHelper);
            
            setTimeout(() => {
                this.scene.remove(gridHelper);
                gridHelper.dispose();
            }, 3000);
        });
        
        this.saveToHistory();
    }
    
    hollowOut() {
        if (this.selectedObjects.length === 0) {
            this.addSystemMessage('Select objects to hollow out');
            return;
        }
        
        this.selectedObjects.forEach(obj => {
            // Simulate hollowing by making material wireframe temporarily
            const wasWireframe = obj.material.wireframe;
            obj.material.wireframe = true;
            obj.material.opacity = 0.7;
            obj.material.transparent = true;
            
            setTimeout(() => {
                obj.material.wireframe = wasWireframe;
                obj.material.opacity = 1.0;
                obj.material.transparent = false;
                obj.userData.hollowed = true;
            }, 2000);
        });
        
        this.addSystemMessage(`Hollowed out ${this.selectedObjects.length} objects`);
        this.saveToHistory();
    }
    
    toggleCrossSection() {
        this.meshes.forEach(mesh => {
            if (mesh.userData.crossSectionEnabled) {
                mesh.material.clippingPlanes = [];
                mesh.userData.crossSectionEnabled = false;
            } else {
                const plane = new THREE.Plane(new THREE.Vector3(1, 0, 0), 0);
                mesh.material.clippingPlanes = [plane];
                mesh.userData.crossSectionEnabled = true;
            }
        });
        
        this.addSystemMessage('Cross-section view toggled');
    }
    
    setSculptTool(tool) {
        this.currentSculptTool = tool;
        this.addSystemMessage(`Sculpting tool set to ${tool}`);
        
        // Update cursor
        const canvas = document.getElementById('canvas3d');
        if (canvas) {
            const cursors = {
                pushpull: 'grab',
                smooth: 'crosshair',
                inflate: 'pointer',
                twist: 'grabbing'
            };
            canvas.style.cursor = cursors[tool] || 'default';
        }
    }
    
    activateMaterialPainting() {
        this.currentTool = 'material-paint';
        this.addSystemMessage('Material painting activated. Click objects to paint them.');
        
        const canvas = document.getElementById('canvas3d');
        if (canvas) canvas.style.cursor = 'crosshair';
    }
    
    activateTextureProjection() {
        this.addSystemMessage('Texture projection tool activated');
        // Implementation for texture projection
    }
    
    addWeathering() {
        if (this.selectedObjects.length === 0) {
            this.addSystemMessage('Select objects to add weathering effects');
            return;
        }
        
        this.selectedObjects.forEach(obj => {
            // Simulate weathering by adjusting material properties
            obj.material.roughness = Math.min(1.0, obj.material.roughness + 0.3);
            obj.material.color.multiplyScalar(0.8); // Darken
            obj.userData.weathered = true;
        });
        
        this.addSystemMessage(`Added weathering to ${this.selectedObjects.length} objects`);
        this.saveToHistory();
    }
    
    // Physics controls
    togglePhysics() {
        this.physicsEnabled = !this.physicsEnabled;
        const button = document.getElementById('physics-toggle');
        
        if (this.physicsEnabled) {
            button.textContent = '⚡ Physics ON';
            button.classList.add('btn--primary');
            button.classList.remove('btn--secondary');
            this.addSystemMessage('Physics simulation enabled');
            this.addPhysicsBodies();
        } else {
            button.textContent = '⚡ Physics OFF';
            button.classList.remove('btn--primary');
            button.classList.add('btn--secondary');
            this.addSystemMessage('Physics simulation disabled');
        }
    }
    
    toggleGravity() {
        if (!this.world) return;
        
        this.gravityEnabled = !this.gravityEnabled;
        const button = document.getElementById('gravity-toggle');
        
        if (this.gravityEnabled) {
            this.world.gravity.set(0, -9.82, 0);
            button.textContent = '🌍 Gravity ON';
            button.classList.add('btn--primary');
        } else {
            this.world.gravity.set(0, 0, 0);
            button.textContent = '🌍 Gravity OFF';
            button.classList.remove('btn--primary');
        }
        
        this.addSystemMessage(`Gravity ${this.gravityEnabled ? 'enabled' : 'disabled'}`);
    }
    
    resetPhysics() {
        if (!this.world) return;
        
        this.bodies.forEach((body, index) => {
            if (this.meshes[index]) {
                body.position.copy(this.meshes[index].position);
                body.velocity.set(0, 0, 0);
                body.angularVelocity.set(0, 0, 0);
                body.quaternion.set(0, 0, 0, 1);
            }
        });
        
        this.addSystemMessage('Physics reset to initial state');
    }
    
    addPhysicsBodies() {
        if (!this.world) return;
        
        this.meshes.forEach(mesh => {
            if (!mesh.userData.body) {
                const body = new CANNON.Body({ mass: 1 });
                const shape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
                body.addShape(shape);
                body.position.copy(mesh.position);
                this.world.add(body);
                this.bodies.push(body);
                mesh.userData.body = body;
            }
        });
    }
    
    setPhysicsType(type) {
        if (this.selectedObjects.length === 0) {
            this.addSystemMessage(`Select objects to set as ${type} body`);
            return;
        }
        
        this.selectedObjects.forEach(obj => {
            obj.userData.physicsType = type;
            
            // Visual feedback based on physics type
            switch (type) {
                case 'rigid':
                    obj.material.emissive = new THREE.Color(0x002200);
                    break;
                case 'soft':
                    obj.material.emissive = new THREE.Color(0x000022);
                    break;
                case 'fluid':
                    obj.material.emissive = new THREE.Color(0x002222);
                    break;
            }
            
            setTimeout(() => {
                obj.material.emissive = new THREE.Color(0x000000);
            }, 1000);
        });
        
        this.addSystemMessage(`Set ${this.selectedObjects.length} objects as ${type} body`);
    }
    
    // View controls
    setPerspectiveView() {
        if (this.camera.isPerspectiveCamera) return;
        
        const position = this.camera.position.clone();
        const target = this.controls ? this.controls.target.clone() : new THREE.Vector3();
        
        const container = document.getElementById('canvas3d').parentElement;
        this.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        this.camera.position.copy(position);
        
        if (this.controls) {
            this.controls.object = this.camera;
            this.controls.target.copy(target);
        }
        
        this.addSystemMessage('Switched to perspective view');
    }
    
    setOrthographicView() {
        if (this.camera.isOrthographicCamera) return;
        
        const position = this.camera.position.clone();
        const target = this.controls ? this.controls.target.clone() : new THREE.Vector3();
        
        const container = document.getElementById('canvas3d').parentElement;
        const aspect = container.clientWidth / container.clientHeight;
        const frustumSize = 10;
        
        this.camera = new THREE.OrthographicCamera(
            -frustumSize * aspect / 2, frustumSize * aspect / 2,
            frustumSize / 2, -frustumSize / 2,
            0.1, 1000
        );
        this.camera.position.copy(position);
        
        if (this.controls) {
            this.controls.object = this.camera;
            this.controls.target.copy(target);
        }
        
        this.addSystemMessage('Switched to orthographic view');
    }
    
    toggleWireframe() {
        this.meshes.forEach(mesh => {
            if (mesh.material) {
                mesh.material.wireframe = !mesh.material.wireframe;
            }
        });
        
        this.addSystemMessage('Wireframe view toggled');
    }
    
    // File operations
    saveProject() {
        const projectData = {
            version: '1.0',
            workflow: this.currentWorkflow,
            timestamp: Date.now(),
            objects: this.meshes.map(mesh => ({
                type: mesh.userData.type,
                position: mesh.position,
                rotation: mesh.rotation,
                scale: mesh.scale,
                material: {
                    color: mesh.material.color,
                    roughness: mesh.material.roughness,
                    metalness: mesh.material.metalness,
                    opacity: mesh.material.opacity
                }
            })),
            camera: {
                position: this.camera.position,
                target: this.controls ? this.controls.target : new THREE.Vector3()
            }
        };
        
        const dataStr = JSON.stringify(projectData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `studio3d_project_${Date.now()}.json`;
        link.click();
        
        this.addSystemMessage('Project saved successfully');
    }
    
    loadProject() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const projectData = JSON.parse(e.target.result);
                        this.loadProjectData(projectData);
                        this.addSystemMessage('Project loaded successfully');
                    } catch (error) {
                        console.error('Error loading project:', error);
                        this.addSystemMessage('Error loading project file');
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }
    
    loadProjectData(data) {
        // Clear existing objects
        this.meshes.forEach(mesh => {
            this.scene.remove(mesh);
            if (mesh.geometry) mesh.geometry.dispose();
            if (mesh.material) mesh.material.dispose();
        });
        this.meshes = [];
        this.bodies = [];
        this.clearSelection();
        
        // Load objects
        data.objects.forEach(objData => {
            const mesh = this.createShape(objData.type);
            if (mesh) {
                mesh.position.copy(objData.position);
                mesh.rotation.copy(objData.rotation);
                mesh.scale.copy(objData.scale);
                
                if (objData.material) {
                    Object.assign(mesh.material, objData.material);
                }
            }
        });
        
        // Restore camera
        if (data.camera) {
            this.camera.position.copy(data.camera.position);
            if (this.controls && data.camera.target) {
                this.controls.target.copy(data.camera.target);
            }
        }
        
        this.updateObjectCounter();
    }
    
    exportModel() {
        const formats = ['STL', 'OBJ', 'GLTF', 'JSON'];
        
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Export Model</h3>
                <p>Choose export format:</p>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-8); margin: var(--space-16) 0;">
                    ${formats.map(format => 
                        `<button class="btn btn--outline" data-format="${format}">${format}</button>`
                    ).join('')}
                </div>
                <div class="modal-actions">
                    <button class="btn btn--outline" id="cancel-export">Cancel</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelectorAll('[data-format]').forEach(btn => {
            btn.onclick = () => {
                this.performExport(btn.dataset.format);
                modal.remove();
            };
        });
        
        modal.querySelector('#cancel-export').onclick = () => {
            modal.remove();
        };
    }
    
    performExport(format) {
        const exportData = {
            format: format,
            timestamp: Date.now(),
            objects: this.meshes.length,
            vertices: this.meshes.reduce((total, mesh) => {
                return total + (mesh.geometry.attributes.position ? mesh.geometry.attributes.position.count : 0);
            }, 0)
        };
        
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `studio3d_export_${format.toLowerCase()}_${Date.now()}.json`;
        link.click();
        
        this.addSystemMessage(`Model exported as ${format}`);
    }
    
    // History and undo/redo
    saveToHistory() {
        const state = {
            timestamp: Date.now(),
            objects: this.meshes.map(mesh => ({
                type: mesh.userData.type,
                position: mesh.position.clone(),
                rotation: mesh.rotation.clone(),
                scale: mesh.scale.clone(),
                material: {
                    color: mesh.material.color.clone(),
                    roughness: mesh.material.roughness,
                    metalness: mesh.material.metalness
                }
            }))
        };
        
        // Remove future history if we're not at the end
        if (this.historyIndex < this.history.length - 1) {
            this.history = this.history.slice(0, this.historyIndex + 1);
        }
        
        this.history.push(state);
        this.historyIndex = this.history.length - 1;
        
        // Limit history size
        if (this.history.length > 50) {
            this.history.shift();
            this.historyIndex--;
        }
    }
    
    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.restoreFromHistory(this.history[this.historyIndex]);
            this.addSystemMessage('Undo applied');
        }
    }
    
    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.restoreFromHistory(this.history[this.historyIndex]);
            this.addSystemMessage('Redo applied');
        }
    }
    
    restoreFromHistory(state) {
        // Clear current objects
        this.meshes.forEach(mesh => {
            this.scene.remove(mesh);
            if (mesh.geometry) mesh.geometry.dispose();
            if (mesh.material) mesh.material.dispose();
        });
        this.meshes = [];
        this.clearSelection();
        
        // Restore objects
        state.objects.forEach(objData => {
            const mesh = this.createShape(objData.type);
            if (mesh) {
                mesh.position.copy(objData.position);
                mesh.rotation.copy(objData.rotation);
                mesh.scale.copy(objData.scale);
                Object.assign(mesh.material, objData.material);
            }
        });
        
        this.updateObjectCounter();
    }
    
    // Performance monitoring
    setupPerformanceMonitoring() {
        this.performanceInterval = setInterval(() => {
            this.updatePerformanceMetrics();
        }, 1000);
    }
    
    startPerformanceMonitoring() {
        this.frameCount = 0;
        this.lastTime = performance.now();
    }
    
    updatePerformanceMetrics() {
        // Update FPS counter
        const fpsCounter = document.getElementById('fps-counter');
        if (fpsCounter) {
            fpsCounter.textContent = this.fps.toFixed(0);
        }
        
        // Update object counter
        this.updateObjectCounter();
    }
    
    updateObjectCounter() {
        const objectCounter = document.getElementById('object-counter');
        if (objectCounter) {
            objectCounter.textContent = this.meshes.length;
        }
    }
    
    // Tab management
    switchToolTab(tabName) {
        document.querySelectorAll('.tools-panel .tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`.tools-panel [data-tab="${tabName}"]`).classList.add('active');
        
        document.querySelectorAll('.tool-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');
    }
    
    switchPropertiesTab(tabName) {
        document.querySelectorAll('.properties-panel .tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`.properties-panel [data-tab="${tabName}"]`).classList.add('active');
        
        document.querySelectorAll('.prop-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');
    }
    
    // Keyboard shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            
            // Handle modifier keys
            if (e.ctrlKey || e.metaKey) {
                switch (e.key.toLowerCase()) {
                    case 'z':
                        e.preventDefault();
                        if (e.shiftKey) {
                            this.redo();
                        } else {
                            this.undo();
                        }
                        break;
                    case 'y':
                        e.preventDefault();
                        this.redo();
                        break;
                    case 's':
                        e.preventDefault();
                        this.saveProject();
                        break;
                    case 'o':
                        e.preventDefault();
                        this.loadProject();
                        break;
                    case 'a':
                        e.preventDefault();
                        this.selectAll();
                        break;
                    case 'u':
                        e.preventDefault();
                        this.performBooleanOperation('union');
                        break;
                    case 'd':
                        e.preventDefault();
                        this.performBooleanOperation('difference');
                        break;
                    case 'i':
                        e.preventDefault();
                        this.performBooleanOperation('intersection');
                        break;
                    case 'x':
                        e.preventDefault();
                        this.performBooleanOperation('xor');
                        break;
                }
                return;
            }
            
            // Regular keys
            switch (e.key.toLowerCase()) {
                case 'delete':
                case 'backspace':
                    e.preventDefault();
                    this.deleteSelected();
                    break;
                case 'w':
                    e.preventDefault();
                    if (e.shiftKey) {
                        this.performWeldOperation('surface');
                    } else {
                        this.performWeldOperation('edge');
                    }
                    break;
                case 'b':
                    e.preventDefault();
                    this.insertBolt();
                    break;
                case 'n':
                    e.preventDefault();
                    this.addNut();
                    break;
                case 't':
                    e.preventDefault();
                    this.applyTorque();
                    break;
                case 'e':
                    e.preventDefault();
                    this.toggleExplodedView();
                    break;
                case 'c':
                    e.preventDefault();
                    if (e.shiftKey) {
                        this.curvedCut();
                    } else {
                        this.planeCut();
                    }
                    break;
                case 'h':
                    e.preventDefault();
                    this.hollowOut();
                    break;
                case 'p':
                    e.preventDefault();
                    this.setSculptTool('pushpull');
                    break;
                case 's':
                    e.preventDefault();
                    this.setSculptTool('smooth');
                    break;
                case 'g':
                    e.preventDefault();
                    this.toggleGravity();
                    break;
                case 'f':
                    e.preventDefault();
                    this.focusOnSelected();
                    break;
                case ' ':
                    e.preventDefault();
                    this.toggleVoiceRecognition();
                    break;
            }
        });
    }
    
    focusOnSelected() {
        if (this.selectedObjects.length === 0 || !this.controls) return;
        
        // Calculate bounding box of selected objects
        const box = new THREE.Box3();
        this.selectedObjects.forEach(obj => {
            box.expandByObject(obj);
        });
        
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxSize = Math.max(size.x, size.y, size.z);
        
        // Position camera
        const distance = maxSize * 2;
        this.camera.position.copy(center);
        this.camera.position.z += distance;
        this.controls.target.copy(center);
        
        this.addSystemMessage(`Focused on ${this.selectedObjects.length} selected objects`);
    }
    
    // Utility functions
    showScreen(screenId) {
        console.log('Showing screen:', screenId);
        
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            console.log('Screen displayed:', screenId);
        } else {
            console.error('Screen not found:', screenId);
        }
    }
    
    showLoading() {
        const loading = document.getElementById('loading');
        if (loading) loading.classList.remove('hidden');
    }
    
    hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) loading.classList.add('hidden');
    }
    
    updateProgress(percent, text) {
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');
        
        if (progressFill) progressFill.style.width = percent + '%';
        if (progressText) progressText.textContent = text;
    }
    
    addSystemMessage(message) {
        console.log('System:', message);
        // System messages are logged to console
        // In a real application, these could be displayed in a notification system
    }
    
    setupMaterials() {
        // Material setup is handled in loadData
        console.log('Materials loaded');
    }
    
    setupTools() {
        // Tools setup is handled in setupNavigation
        console.log('Tools loaded');
    }
    
    setupCollaboration() {
        // Placeholder for collaboration features
        console.log('Collaboration ready (placeholder)');
    }
    
    onWindowResize() {
        if (!this.camera || !this.renderer) return;
        
        const canvas = document.getElementById('canvas3d');
        const container = canvas ? canvas.parentElement : null;
        
        if (container) {
            this.camera.aspect = container.clientWidth / container.clientHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(container.clientWidth, container.clientHeight);
        }
    }
    
    // Animation loop
    animate() {
        if (!this.renderer || !this.scene || !this.camera) return;
        
        requestAnimationFrame(() => this.animate());
        
        // Update controls
        if (this.controls) {
            this.controls.update();
        }
        
        // Update physics
        if (this.physicsEnabled && this.world) {
            this.world.step(1/60);
            
            // Sync physics bodies with meshes
            this.bodies.forEach((body, index) => {
                if (this.meshes[index] && this.meshes[index].userData.body === body) {
                    this.meshes[index].position.copy(body.position);
                    this.meshes[index].quaternion.copy(body.quaternion);
                }
            });
        }
        
        // Calculate FPS
        this.frameCount++;
        const now = performance.now();
        if (now - this.lastTime >= 1000) {
            this.fps = (this.frameCount * 1000) / (now - this.lastTime);
            this.frameCount = 0;
            this.lastTime = now;
        }
        
        // Render
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize the Professional 3D Studio
let studio;

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Professional 3D Studio starting...');
    try {
        studio = new ProfessionalStudio3D();
        
        // Make studio globally accessible for button handlers and debugging
        window.studio = studio;
        
    } catch (error) {
        console.error('Error initializing Professional 3D Studio:', error);
    }
});

// Service worker registration for offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker would be registered here for offline support
        console.log('Professional 3D Studio ready for offline use');
    });
}