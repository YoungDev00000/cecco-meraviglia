import { fetchBrandNames } from "../js/firebase.js";

export default class BrandsPhoneContainer {
    constructor() {
        this.init();
    }

    init() {
        const brandTitleElement = document.querySelector('.brand-title-phone');
        if (brandTitleElement) {
            fetchBrandNames(this.updateBrandList.bind(this));
        } else {
            console.error('Element with class "brand-title-phone" not found.');
        }
    }

    updateBrandList(brandNames) {
        const brandTitleElement = document.querySelector('.brand-title-phone');
        brandTitleElement.innerHTML = '';
        brandNames.forEach(brand => {
            const brandItem = document.createElement('div');
            brandItem.textContent = brand;
            brandItem.classList.add('brand-item');
            brandItem.addEventListener('click', () => {
                //LOGICA PER FAR COMPARIRE BRAND
            });
            console.log(brand);
            brandTitleElement.appendChild(brandItem);
        });
    }
}
