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
            });
        } else {
            console.error('Button with ID "projects-button-pc" not found.');
        }
    }
}