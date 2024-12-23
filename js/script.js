document.addEventListener('DOMContentLoaded', function () {
    // Crea la scena
    const scene = new THREE.Scene();

    // Crea la camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 1); // Imposta il background bianco
    document.body.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    const loader = new THREE.GLTFLoader();
    loader.load('3d/edificio.glb', function (gltf) {
        const model = gltf.scene;
        scene.add(model);

        function animate() {
            requestAnimationFrame(animate);
            model.rotation.x += 0.005; // Ruota il modello
            model.rotation.y -= 0.005; // Ruota il modello
            renderer.render(scene, camera);
        }
        
        animate();
    }, undefined, function (error) {
        console.error(error);
    });

    function loadContent(url, callback = () => {}) {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                document.getElementById('content').innerHTML = html;
                callback();
            })
            .catch(error => {
                console.error('Error loading content:', error);
            });
    }

    
    document.getElementById('index-button').addEventListener('click', () => {
        loadContent('home.html');
    });

    document.getElementById('projects-button').addEventListener('click', () => {
        loadContent('projects.html', function() {
            showList('biasia');
            showList('vemecell');
            showList('tm8');
            });
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

function showList(brand) {
    document.getElementById(brand).addEventListener('click', function(event) {
        event.preventDefault();
        hideAllLists();
        document.getElementById(brand + '-images').style.display = 'block';
    });
}

function hideAllLists() {
    const lists = document.querySelectorAll('.image-list');
    lists.forEach(list => {
        list.style.display = 'none';
    });
}