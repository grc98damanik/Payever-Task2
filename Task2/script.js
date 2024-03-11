window.onload = function() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    const texture = loader.load('https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg');
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    const locations = [
        { name: 'Netherlands', latitude: 52.1326, longitude: 5.2913 },
        { name: 'Belgium', latitude: 50.8503, longitude: 4.3517 },
        { name: 'Germany', latitude: 51.1657, longitude: 10.4515 },
        { name: 'Austria', latitude: 47.5162, longitude: 14.5501 },
        { name: 'Sweden', latitude: 60.1282, longitude: 18.6435 },
        { name: 'Finland', latitude: 61.9241, longitude: 25.7482 },
        { name: 'Norway', latitude: 60.472, longitude: 8.4689 },
        { name: 'Denmark', latitude: 56.2639, longitude: 9.5018 },
        { name: 'UK', latitude: 55.3781, longitude: -3.436 },
    ];

    const pinMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    locations.forEach(location => {
        const pinGeometry = new THREE.SphereGeometry(0.1, 8, 8);
        const pin = new THREE.Mesh(pinGeometry, pinMaterial);
        const { x, y, z } = latLongToVector3(location.latitude, location.longitude, 5);
        pin.position.set(x, y, z);
        scene.add(pin);
    });

    function latLongToVector3(lat, lon, radius) {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        return { x, y, z };
    }

    camera.position.z = 15;

    function animate() {
        requestAnimationFrame(animate);
        earth.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
};
