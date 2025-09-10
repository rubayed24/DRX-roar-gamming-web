// Initialize globe
function initGlobe() {
    if (typeof THREE === 'undefined') return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true,
        powerPreference: 'low-power'
    });
    
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('globe').appendChild(renderer.domElement);

    // Create the glassy globe
    const globeGeometry = new THREE.SphereGeometry(2, 48, 48); // Reduced segments
    const globeMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x4a1e8c,
        metalness: 0.7,
        roughness: 0.1,
        transmission: 0.85,
        thickness: 0.5,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        reflectivity: 1,
        transparent: true,
        opacity: 0.7,
        ior: 1.5,
        specularIntensity: 1,
        emissive: 0x2c0a3b,
        emissiveIntensity: 0.2
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    // Add glow effect
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xa966ff,
        transparent: true,
        opacity: 0.18,
        wireframe: true
    });
    const glowSphere = new THREE.Mesh(
        new THREE.SphereGeometry(2.1, 24, 24), // Reduced segments
        glowMaterial
    );
    scene.add(glowSphere);

    // Add atmosphere
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x8a2be2,
        transparent: true,
        opacity: 0.08,
        side: THREE.BackSide
    });
    const atmosphere = new THREE.Mesh(
        new THREE.SphereGeometry(2.2, 48, 48), // Reduced segments
        atmosphereMaterial
    );
    scene.add(atmosphere);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.18);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.25);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    const pointLight1 = new THREE.PointLight(0xa966ff, 0.7, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);
    const pointLight2 = new THREE.PointLight(0x6a0dad, 0.7, 100);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);

    camera.position.z = 5;

    // Add stars in the background
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.02,
        transparent: true,
        opacity: 0.5
    });
    const starsVertices = [];
    for (let i = 0; i < 5000; i++) { // Reduced stars
        const x = (Math.random() - 0.5) * 200;
        const y = (Math.random() - 0.5) * 200;
        const z = (Math.random() - 0.5) * 200;
        starsVertices.push(x, y, z);
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    function animateGlobe() {
        requestAnimationFrame(animateGlobe);
        globe.rotation.x += 0.001;
        glowSphere.rotation.x += 0.001;
        stars.rotation.y += 0.0002;
        renderer.render(scene, camera);
    }
    animateGlobe();

    // Responsive handling with debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }, 200);
    });
    
    // Cleanup on unload
    window.addEventListener('beforeunload', () => {
        renderer.dispose();
        globeGeometry.dispose();
        globeMaterial.dispose();
        starsGeometry.dispose();
        starsMaterial.dispose();
    });
}