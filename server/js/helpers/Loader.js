export class Loader {
    constructor() {
        this.render()
    }
    
    render() {
        const parent = document.querySelector('main')
        const loader = document.createElement('div')
        loader.classList.add('loader')
        parent.appendChild(loader)
    }

    static toggleLoader() {
        const parent = document.querySelector('main')
        const loader = parent.querySelector('.loader')
        if (loader) {
            parent.removeChild(loader)
        } else {
            new Loader()
        }
    }

}