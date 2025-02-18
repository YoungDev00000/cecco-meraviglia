import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import loadComponents from "./components.js";

document.addEventListener("DOMContentLoaded", () => {
    loadComponents().then(() => {
      start();
    });
  });

function start() {
    try{
        var homeContainer = document.getElementById("home");
        var contactsContainer = document.getElementById("contacts");
        var projectsContainer = document.getElementById("projects");
        var projectsFilter = document.getElementById("filtro-progetti");
        var projectsButton = document.getElementById("projects-button");
        var headerCecco = document.querySelector(".header-cecco");
        
        homeContainer.style.display = "flex";
        homeContainer.style.position = "absolute";
        contactsContainer.style.display = "none";
        projectsContainer.style.display = "none";
        projectsFilter.style.opacity = "0";
        projectsButton.textContent = "PROJECTS"; // Imposta il testo iniziale

        document.querySelectorAll('#index-button').forEach(button => {
            button.addEventListener('click', () => {
                homeContainer.style.display = "flex";
                contactsContainer.style.display = "none";
                projectsContainer.style.display = "none";
                projectsFilter.style.opacity = "0";
                resetBrandContainer();
            });
        });

        document.querySelectorAll('#projects-button').forEach(button => {
            button.addEventListener('click', () => {
                if (projectsButton.textContent === "BACK") {
                    resetBrandContainer();
                    projectsButton.textContent = "PROJECTS";
                } else {
                    homeContainer.style.display = "none";
                    contactsContainer.style.display = "none";
                    projectsContainer.style.display = "flex";
                    projectsFilter.style.opacity = "0.9";
                    showBrandTitles();
                    resetBrandContainer();
                }
            });
        });

        document.querySelectorAll('#contact-button').forEach(button => {
            button.addEventListener('click', () => {
                contactsContainer.style.display = "flex";
                homeContainer.style.display = "none";
                projectsContainer.style.display = "none";
                projectsFilter.style.opacity = "0.9";
                resetBrandContainer();
            });
        });

    }   catch (error) {
        console.error("Error loading components:", error);
    }
}

function showBrandTitles() {
    const brandTitleElements = document.querySelectorAll('.brand-title div');
    brandTitleElements.forEach(element => {
        element.style.opacity = 1;
    });
}

function updateBrandDetails(brand) {
    const brandImageElement = document.querySelector('.brand-images');
    const brandDescriptionElement = document.querySelector('.brand-description');
    const brandTitleElement = document.querySelector('.brand-title');
    const brandNameElement = document.querySelector('.brand-name');
    const projectsButton = document.getElementById("projects-button");

    console.log(brand);

    if (brandImageElement && brandDescriptionElement && brandTitleElement) {
        brandImageElement.src = brand.images;
        brandDescriptionElement.textContent = brand.description;

        brandNameElement.style.display = 'block';
        brandTitleElement.style.display = 'none';
        brandImageElement.style.display = 'block';
        brandDescriptionElement.style.display = 'block';
        projectsButton.textContent = "BACK";
    }
}

function resetBrandContainer() {
    const brandImageElement = document.querySelector('.brand-images');
    const brandDescriptionElement = document.querySelector('.brand-description');
    const brandNameElement = document.querySelector('.brand-name');
    const brandTitleElement = document.querySelector('.brand-title');
    const projectsButton = document.getElementById("projects-button");

    if (brandImageElement && brandDescriptionElement && brandNameElement && brandTitleElement) {
        brandTitleElement.style.display = 'block';
        brandImageElement.style.display = 'none';
        brandDescriptionElement.style.display = 'none';
        brandNameElement.style.display = 'none';
        projectsButton.textContent = "PROJECTS";
    }
}

document.addEventListener('DOMContentLoaded', function () {
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
                brandNameElement.style.opacity = 0; // Start with opacity 0
                brandNameElement.addEventListener('click', () => {
                    currentBrandIndex = index;
                    updateBrandDetails(brandData[brand]);
                    document.querySelector('.brand-name').textContent = brand;
                });
                brandTitleElement.appendChild(brandNameElement);
            });
        }
    }
                    
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

});

document.addEventListener("click", function handleFirstClick() {
    const headerCecco = document.querySelector(".header-cecco");
    const headerCeccoSm = document.querySelector(".header-cecco-sm");
    const menuBottom = document.querySelector(".menu-bottom");
    
    headerCecco.style.transition = "top 1s ease"; // Add transition effect
    headerCecco.style.top = "0"; // Show the header with a downward transition
    
    headerCeccoSm.style.transition = "top 1s ease"; // Add transition effect for small header
    headerCeccoSm.style.top = "0"; // Show the small header with a downward transition
    
    menuBottom.style.transition = "bottom 1s ease"; // Add transition effect for menu-bottom
    menuBottom.style.bottom = "30px"; // Show the menu-bottom with an upward transition
    
    document.removeEventListener("click", handleFirstClick); // Remove the event listener after the first click
});