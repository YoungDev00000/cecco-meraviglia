document.addEventListener('DOMContentLoaded', function () {
    // Crea la scena
    const scene = new THREE.Scene();

    // Crea la camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Crea il renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Aggiungi una luce alla scena
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    // Crea la figura 3D (es. un cubo)
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    document.getElementById('index-button').addEventListener('click', () => {
        camera.position.x = 0;
        camera.position.y = 0;
    });
    document.getElementById('projects-button').addEventListener('click', () => {
        camera.position.x = 2;
        camera.position.y = 0;
    });
    document.getElementById('contact-button').addEventListener('click', () => {
        camera.position.x = -2;
        camera.position.y = 0;
    });

    // Funzione di animazione
    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);

        //console.log('animate');

    }

    animate();
});

function showLargeImage(img) {
    const largeImageContainer = document.createElement('div');
    largeImageContainer.className = 'large-image';

    const largeImage = document.createElement('img');
    largeImage.src = img.src;

    const closeButton = document.createElement('div');
    closeButton.className = 'close';
    closeButton.innerText = 'X';
    closeButton.onclick = () => document.body.removeChild(largeImageContainer);

    largeImageContainer.appendChild(largeImage);
    largeImageContainer.appendChild(closeButton);
    document.body.appendChild(largeImageContainer);
}