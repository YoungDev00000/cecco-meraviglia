import { fetchBrandNames } from "../js/firebase.js";
import ProjectsPhoneContainer from './projects-phone.container.js';

export default class BrandsPhoneContainer {
    constructor() {
        this.init();
        this.projectsPhoneContainer = new ProjectsPhoneContainer();
    }

    init() {
        const brandTitleElement = document.querySelector('.brand-title-phone');
        if (brandTitleElement) {
            fetchBrandNames(this.updateBrandList.bind(this));

            document.querySelectorAll('.brand-item').forEach(item => {
                item.addEventListener('click', () => {
                    console.log('click');
                    
                });
            });
        } else {
            console.error('Element with class "brand-title-phone" not found.');
        }
    }

    updateBrandList(brandNames) {
        const brandTitleElement = document.querySelector('.brand-title-phone');
        if (brandTitleElement) {
            brandTitleElement.innerHTML = '';
            brandNames.forEach(brand => {
                const brandItem = document.createElement('div');
                brandItem.textContent = brand;
                brandItem.classList.add('brand-item');
                brandItem.addEventListener('click', () => {
                    document.querySelectorAll('.brand-item').forEach(item => {
                        item.style.display = 'none';
                    });
                    brandItem.style.display = 'block';
                    this.projectsPhoneContainer.updateBrandDescription(brand);
                    this.projectsPhoneContainer.updateBrandImage(brand);
                    document.getElementById('projects-button-phone').textContent = 'BACK';
                });
                brandTitleElement.appendChild(brandItem);
            });
        } else {
            console.error('Element with class "brand-title-phone" not found.');
        }
    }
}
