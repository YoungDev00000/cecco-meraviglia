import BrandsPcContainer from "./brands-pc.container.js";
import { fetchBrandNames, fetchBrandDescription, fetchBrandImageUrl } from "../js/firebase.js";

export default class ProjectsPcContainer {
    constructor() {
        this.init();
    }

    init() {
        const button = document.getElementById('projects-button-pc');

        if (button) {
            button.addEventListener('click', () => {
                console.log('DISPLAY');
                const brandsPcContainer = new BrandsPcContainer();
                this.displayFirstBrandDetails();
            });
        } else {
            console.error('Button with ID "projects-button-pc" not found.');
        }
    }

    displayFirstBrandDetails() {
        fetchBrandNames((brandNames) => {
            if (brandNames.length > 0) {
                const firstBrand = brandNames[0];
                this.updateBrandDescription(firstBrand);
                this.updateBrandImage(firstBrand);
            } else {
                console.error('No brands available to display.');
            }
        });
    }

    updateBrandDescription(brandName) {
        fetchBrandDescription(brandName).then(description => {
            const brandDescriptionElement = document.querySelector('.pc-brand-description');
            if (brandDescriptionElement) {
                brandDescriptionElement.textContent = description;
            } else {
                console.error('Element with class "pc-brand-description" not found.');
            }
        }).catch(error => {
            console.error('Error fetching brand description:', error);
        });
    }

    updateBrandImage(brandName) {
        fetchBrandImageUrl(brandName, (imageUrl) => {
            const brandImageElement = document.querySelector('.brand-image');
            if (brandImageElement) {
                brandImageElement.src = imageUrl;
            } else {
                console.error('Element with class "brand-image" not found.');
            }
        });
    }
}