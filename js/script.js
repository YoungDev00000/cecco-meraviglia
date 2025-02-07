import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

document.addEventListener('DOMContentLoaded', function () {
    // Crea la scena
    const scene = new THREE.Scene();

    // Crea la camera
    const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
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
    loader.load('3d/cranio5.glb', function (gltf) {
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

    let brandNames = [];
    let brandData = {};
    let currentBrandIndex = 0;
    let currentImageIndex = 0;

    function updateBrandContent() {
        const brandTitleElement = document.querySelector('.brand-title');
        if (brandTitleElement && brandNames.length > 0) {
            brandTitleElement.innerHTML = ''; // Clear existing content
            brandNames.forEach((brand, index) => {
                const brandNameElement = document.createElement('div');
                brandNameElement.textContent = brand;
                brandNameElement.style.cursor = 'pointer';
                brandNameElement.addEventListener('click', () => {
                    currentBrandIndex = index;
                    updateBrandDetails();
                    document.querySelectorAll('.brand-title div').forEach(el => {
                        el.style.transform = 'translateX(0)'; // Reset transform for all elements
                    });
                    brandNameElement.style.transform = 'translateX(20px)'; // Move clicked element
                });
                brandTitleElement.appendChild(brandNameElement);
            });
            updateBrandDetails();
        }
    }

    function updateBrandDetails() {
        const brandDescriptionElement = document.querySelector('.brand-description');  
        const brandDescriptionSmElement = document.querySelector('.brand-description-sm');
        const brandPhotosElement = document.querySelector('.brand-photos');
        const brandPhotosSmElement = document.querySelector('.brand-photos-sm');
        const currentBrand = brandNames[currentBrandIndex];
        if (brandDescriptionElement && brandData[currentBrand]) {
            brandDescriptionElement.textContent = brandData[currentBrand].description;
        }
        if (brandDescriptionSmElement && brandData[currentBrand]) {
            brandDescriptionSmElement.textContent = brandData[currentBrand].description;
        }
        if (brandPhotosElement && brandData[currentBrand]) {
            brandPhotosElement.innerHTML = ''; // Clear existing photos
            const images = brandData[currentBrand].images;
            if (Array.isArray(images)) {
                let totalWidth = 0;
                images.forEach(imageUrl => {
                    const img = document.createElement('img');
                    img.src = imageUrl;
                    img.style.height = '350px';
                    img.style.width = 'auto';
                    img.onload = () => {
                        totalWidth += img.naturalWidth * (350 / img.naturalHeight); // Calculate scaled width
                        brandPhotosElement.style.width = `${totalWidth}px`; // Set container width
                        brandDescriptionElement.style.width = `${totalWidth}px`; // Set container width
                    };
                    img.addEventListener('click', () => {
                        showImageInModal(img.src);
                    });
                    brandPhotosElement.appendChild(img);
                });
            }
        }
        if (brandPhotosSmElement && brandData[currentBrand]) {
            const images = brandData[currentBrand].images;
            if (Array.isArray(images) && images.length > 0) {
                brandPhotosSmElement.src = images[currentImageIndex];
                brandPhotosSmElement.addEventListener('click', () => {
                    showImageInModal(brandPhotosSmElement.src);
                });
            }
        }
    }

    function showImageInModal(src) {
        const modal = document.createElement('div');
        modal.classList.add('image-modal');
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <img src="${src}" class="modal-image">
            </div>
        `;
        document.body.appendChild(modal);
    
        const closeButton = modal.querySelector('.close-button');
        closeButton.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    function addMenuEventListeners() {
        document.querySelectorAll('#index-button').forEach(button => {
            button.addEventListener('click', () => {
                loadContent('home.html');
            });
        });

        document.querySelectorAll('#projects-button').forEach(button => {
            button.addEventListener('click', () => {
                loadContent('projects.html', function() {
                    
                    const firebaseConfig = {
                        apiKey: "AIzaSyDm18l5VH6gxrC-33uA7xNDIGfzPpgOr_s",
                        authDomain: "storage-cecco.firebaseapp.com",
                        databaseURL: "https://storage-cecco-default-rtdb.europe-west1.firebasedatabase.app",
                        projectId: "storage-cecco",
                        storageBucket: "storage-cecco.firebasestorage.app",
                        messagingSenderId: "711299112703",
                        appId: "1:711299112703:web:dcc4c8d6a7f0639fbbf6ca",
                        measurementId: "G-4V1V6VQ6X2"
                    };

                    const app = initializeApp(firebaseConfig);
                    const analytics = getAnalytics(app);
                    const db = getDatabase(app);
                    const dbRef = ref(db);

                    onValue(dbRef, (snapshot) => {
                        const data = snapshot.val();
                        brandNames = Object.keys(data);
                        brandData = data;
                        currentBrandIndex = 0;
                        currentImageIndex = 0; // Reset image index when loading projects
                        updateBrandContent();
                    });

                    document.querySelector('.f-sinistra').addEventListener('click', () => {
                        if (currentImageIndex > 0) {
                            currentImageIndex--;
                            updateBrandDetails();
                        }
                    });
                
                    document.querySelector('.f-destra').addEventListener('click', () => {
                        const images = brandData[brandNames[currentBrandIndex]].images;
                        if (currentImageIndex < images.length - 1) {
                            currentImageIndex++;
                            updateBrandDetails();
                        }
                    });
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

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        document.getElementById('flash-text').style.display = 'none';
    }, 7000);
});