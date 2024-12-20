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

    // Carica il modello .glb
    const loader = new THREE.GLTFLoader();
    loader.load('3d/edificio.glb', function (gltf) {
        const model = gltf.scene;
        scene.add(model);

        // Funzione di animazione aggiornata
        function animate() {
            requestAnimationFrame(animate);
            model.rotation.x += 0.01; // Ruota il modello
            model.rotation.y += 0.01; // Ruota il modello
            renderer.render(scene, camera);
        }
        
        animate();
    }, undefined, function (error) {
        console.error(error);
    });

    //camera.position.x = 0;
    //camera.position.y = 0;

    function loadContent(file) {
        fetch(file)
            .then(response => response.text())
            .then(data => {
                document.getElementById('content').innerHTML = data;
            })
            .catch(error => console.error('Error loading content:', error));
    }

    document.getElementById('index-button').addEventListener('click', () => {
        loadContent('home.html');
    });
    document.getElementById('projects-button').addEventListener('click', () => {
        loadContent('projects.html');
    });
    document.getElementById('contact-button').addEventListener('click', () => {
        loadContent('contact.html');
    });
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