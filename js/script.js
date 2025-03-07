import loadComponents from "./components.js";
import ProjectsPc from "../components/projects-pc.container.js";

document.addEventListener("DOMContentLoaded", () => {
    loadComponents().then(() => {
        start();
    });
});

function start() {
    try {
        new ProjectsPc();

        var headerCecco = document.querySelector(".header-cecco");
        var projectsFilter = document.getElementById("filtro-progetti");
        var projectsButton = document.getElementById("projects-button");
        const imageContainer = document.querySelector(".image-container-pc");

        var homeContainer = document.getElementById("home");
        var contactsContainer = document.getElementById("contacts");
        var projectsContainer = document.getElementById("projects");
        var brandsComponent = document.querySelector(".brands-container");

        homeContainer.style.display = "flex";
        homeContainer.style.position = "absolute";
        contactsContainer.style.display = "none";
        projectsContainer.style.visibility = "hidden";
        brandsComponent.style.display = "none";

        imageContainer.classList.remove("show");
        imageContainer.classList.add("hide");

        projectsFilter.style.opacity = "0";
        projectsButton.textContent = "PROJECTS";

        document.querySelectorAll('#index-button').forEach(button => {
            button.addEventListener('click', () => {
                homeContainer.style.display = "flex";
                contactsContainer.style.display = "none";
                projectsContainer.style.visibility = "hidden";

                brandsComponent.style.display = "none";
                projectsFilter.style.opacity = "0";

                imageContainer.classList.remove("show");
                imageContainer.classList.add("hide");
            });
        });
        
        projectsButton.addEventListener('click', () => {
            if (projectsButton.textContent === "BACK") {
                    projectsButton.textContent = "PROJECTS";
                } else {
                    homeContainer.style.display = "none";
                    contactsContainer.style.display = "none";

                    projectsFilter.style.opacity = "0.9";
                }
        });

        document.querySelector('#projects-button-pc').addEventListener('click', () => {
            homeContainer.style.display = "none";
            contactsContainer.style.display = "none";
            projectsContainer.style.visibility = "visible";

            brandsComponent.style.display = "block";
            projectsFilter.style.opacity = "0.9";

            imageContainer.classList.remove("hide");
            imageContainer.classList.add("show");
        });

        document.querySelectorAll('#contact-button').forEach(button => {
            button.addEventListener('click', () => {
                contactsContainer.style.display = "flex";
                homeContainer.style.display = "none";
                projectsContainer.style.visibility = "hidden";

                brandsComponent.style.display = "none";
                projectsFilter.style.opacity = "0.9";

                imageContainer.classList.remove("show");
                imageContainer.classList.add("hide");
            });
        });

        document.getElementById("background").addEventListener("click", () => {
            headerCecco.style.top = "0"; // Mostra l'header con una transizione verso il basso
        });

    } catch (error) {
        console.error("Error loading components:", error);
    }
}

//BACKGROUND: 3d model three.js
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

});

document.addEventListener("click", handleFirstInteraction);
document.addEventListener("touchstart", handleFirstInteraction);

function handleFirstInteraction() {
    const headerCecco = document.querySelector(".header-cecco");
    const headerCeccoSm = document.querySelector(".header-cecco-sm");
    const menuBottom = document.querySelector(".menu-bottom");

    headerCecco.style.transition = "top 1s ease"; // Add transition effect
    headerCecco.style.top = "0"; // Show the header with a downward transition

    headerCeccoSm.style.transition = "top 1s ease"; // Add transition effect for small header
    headerCeccoSm.style.top = "0"; // Show the small header with a downward transition

    menuBottom.style.transition = "bottom 1s ease"; // Add transition effect for menu-bottom
    menuBottom.style.bottom = "30px"; // Show the menu-bottom with an upward transition

    document.removeEventListener("click", handleFirstInteraction); // Remove the event listener after the first interaction
    document.removeEventListener("touchstart", handleFirstInteraction); // Remove the event listener after the first interaction
}