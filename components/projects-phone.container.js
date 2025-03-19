import BrandsPhoneContainer from "./brands-phone.container.js";
import { fetchBrandNames, fetchBrandDescription, fetchBrandImageUrl } from "../js/firebase.js";

export default class ProjectsPhoneContainer {
    constructor() {
        this.init();
    }

    init() {
        const button = document.getElementById('projects-button-phone');

        if (button) {
            button.addEventListener('click', () => {
                new BrandsPhoneContainer();
                document.querySelector('.brand-description-phone').style.display = 'none';
                document.querySelector('.brand-img-phone').style.display = 'none';
                button.textContent = 'PROJECTS';
            });
        } else {
            console.error('Button with ID "projects-button-pc" not found.');
        }
    }

    updateBrandDescription(brandName) {
        fetchBrandDescription(brandName)
            .then((description) => {
                const brandDescriptionElement = document.querySelector('.brand-description-phone');
                console.log("brandName ", brandName);
                if (brandDescriptionElement) {
                    brandDescriptionElement.style.display = 'block';
                    console.log("descrizione ", description);
                    brandDescriptionElement.textContent = description; // Fix here
                } else {
                    console.error('Element with class "brand-image" not found.');
                }
            })
            .catch(error => {
                console.error('Error fetching brand description:', error);
            });
    }

    updateBrandImage(brandName) {
        fetchBrandImageUrl(brandName, (imageUrl) => {
            const brandImageElement = document.querySelector('.brand-img-phone');
            if (brandImageElement) {
                brandImageElement.style.display = 'block';
                brandImageElement.src = imageUrl;
            } else {
                console.error('Element with class "brand-image" not found.');
            }
        });
    }
}