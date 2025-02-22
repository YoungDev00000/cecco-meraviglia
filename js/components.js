export default function loadComponents() {
    return Promise.all([
      loadView("./components/contacts.html", "contacts-container", ContactsContainer),
      loadView("./components/home.html", "home-container", HomeContainer),
      loadView("./components/projects.html", "projects-container", ProjectsContainer),
      loadView("./components/brands.html", "brands-container", BrandsContainer),
    ]);
  }
  
  /**
   * Creates a web component from an HTML file, registers the component's name and calls the constructor of the component's class.
   * @param {string} htmlFilePath - The file path for the html.
   * @param {string} componentName - A name to register the component as.
   * @param {Object} className - The name of the class of the component.
   * @returns
   */
  function loadView(htmlFilePath, componentName, className) {
    return fetch(htmlFilePath)
      .then((stream) => stream.text())
      .then((text) => {
        className._html = text;
        customElements.define(componentName, className);
      });
  }
  
  class ContactsContainer extends HTMLElement {
    constructor() {
      super();
      this.innerHTML = ContactsContainer._html;
    }
  }

  class HomeContainer extends HTMLElement {
    constructor() {
      super();
      this.innerHTML = HomeContainer._html;
    }
  }

  class ProjectsContainer extends HTMLElement {
    constructor() {
      super();
      this.innerHTML = ProjectsContainer._html;
    }
  }

  class BrandsContainer extends HTMLElement {
    constructor() {
      super();
      this.innerHTML = BrandsContainer._html;
    }
  }