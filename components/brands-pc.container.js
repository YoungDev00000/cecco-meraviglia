import { fetchBrandNames, fetchBrandDescription } from "../js/firebase.js";
import ProjectsPcContainer from './projects-pc.container.js';

export default class BrandsPcContainer {
    constructor() {
        this.init();
        this.projectsPcContainer = new ProjectsPcContainer();
    }

    init() {
        const brandTitleElement = document.querySelector('.brand-title');
        if (brandTitleElement) {
            fetchBrandNames(this.updateBrandList.bind(this));
        } else {
            console.error('Element with class "brand-title" not found.');
        }
    }

    updateBrandList(brandNames) {
        const brandTitleElement = document.querySelector('.brand-title');
        brandTitleElement.innerHTML = '';
        brandNames.forEach(brand => {
            const brandItem = document.createElement('div');
            brandItem.textContent = brand;
            brandItem.classList.add('brand-item');
            brandItem.addEventListener('click', () => {
                this.updateBrandDescription(brand);
                this.projectsPcContainer.updateBrandImage(brand);
            });
            brandTitleElement.appendChild(brandItem);
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
}
