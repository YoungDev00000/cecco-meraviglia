document.addEventListener('DOMContentLoaded', function () {
    // Crea la scena
    const scene = new THREE.Scene();

    // Crea la camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xDFDFDF, 1); // Imposta il background bianco
    document.body.appendChild(renderer.domElement);

    // Aggiungi luce direzionale
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // Aggiungi luce ambientale per ridurre il contrasto
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Colore bianco, intensità 0.5
    scene.add(ambientLight);

    const loader = new THREE.GLTFLoader();
    loader.load('3d/cranio6.glb', function (gltf) {
        const model = gltf.scene;
        scene.add(model);

        let isDragging = false;
        let previousMousePosition = {
            x: 0,
            y: 0
        };

        function onMouseDown(e) {
            isDragging = true;
        }

        function onMouseMove(e) {
            if (isDragging) {
                const deltaMove = {
                    x: e.offsetX - previousMousePosition.x,
                    y: e.offsetY - previousMousePosition.y
                };

                model.rotation.y += deltaMove.x * 0.005;
                model.rotation.x += deltaMove.y * 0.005;
            }

            previousMousePosition = {
                x: e.offsetX,
                y: e.offsetY
            };
        }

        function onMouseUp(e) {
            isDragging = false;
        }

        function onTouchStart(e) {
            isDragging = true;
            previousMousePosition = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            };
        }

        function onTouchMove(e) {
            if (isDragging) {
                const deltaMove = {
                    x: e.touches[0].clientX - previousMousePosition.x,
                    y: e.touches[0].clientY - previousMousePosition.y
                };

                model.rotation.y += deltaMove.x * 0.005;
                model.rotation.x += deltaMove.y * 0.005;

                previousMousePosition = {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY
                };
            }
        }

        function onTouchEnd(e) {
            isDragging = false;
        }

        renderer.domElement.addEventListener('mousedown', onMouseDown);
        renderer.domElement.addEventListener('mousemove', onMouseMove);
        renderer.domElement.addEventListener('mouseup', onMouseUp);
        renderer.domElement.addEventListener('mouseleave', onMouseUp);

        renderer.domElement.addEventListener('touchstart', onTouchStart);
        renderer.domElement.addEventListener('touchmove', onTouchMove);
        renderer.domElement.addEventListener('touchend', onTouchEnd);

        function animate() {
            requestAnimationFrame(animate);
            if (!isDragging) {
                model.rotation.x += 0.005; // Ruota il modello
                model.rotation.y -= 0.005; // Ruota il modello
            }
            renderer.render(scene, camera);
        }
        
        animate();
    }, undefined, function (error) {
        console.error(error);
    });

    function addMenuEventListeners() {
        document.querySelectorAll('#index-button').forEach(button => {
            button.addEventListener('click', () => {
                loadContent('home.html');
            });
        });

        document.querySelectorAll('#projects-button').forEach(button => {
            button.addEventListener('click', () => {
                loadContent('projects.html', function() {
                    showList('biasia');
                    showList('coeval');
                    showList('espiazione');
                    showList('junk');
                    showList('maxMara');
                    showList('spaziox');
                    showList('tm8');
                    showList('vemecell');
                    showList('webEyewear');
                    showList('personal');
                });
            });
        });

        document.querySelectorAll('#contact-button').forEach(button => {
            button.addEventListener('click', () => {
                loadContent('contact.html');
            });
        });
    }

    addMenuEventListeners();

    function loadContent(url, callback = () => {}) {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                document.getElementById('content').innerHTML = html;
                callback();
                addMenuEventListeners(); // Riassegna gli eventi click dopo il caricamento del contenuto
            })
            .catch(error => {
                console.error('Error loading content:', error);
            });
    }
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

/*function showList(brand) {
    document.getElementById(brand).addEventListener('click', function(event) {
        event.preventDefault();
        hideAllLists();
        document.getElementById(brand + '-images').style.display = 'block';
    });
}*/

function hideAllLists() {
    const lists = document.querySelectorAll('.image-list');
    lists.forEach(list => {
        list.style.display = 'none';
    });
}

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        document.getElementById('flash-text').style.display = 'none';
    }, 7000);
});