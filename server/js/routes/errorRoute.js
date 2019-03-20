import { Loader } from '../components/Loader'

export const handleErrorRoute = (parent, router) => {
    return async () => {
        parent.innerHTML = ''

        const sectionElement = document.createElement('section')
        const headingElement = document.createElement('h1')
        const errorWrapper = document.createElement('div')
        const errorHeading = document.createElement('h2')
        const errorMessage = document.createElement('p')
        const backToHome = document.createElement('a')
        
        errorWrapper.classList.add('error-wrapper')
        headingElement.innerText = 'Web App From Scratch'
        errorHeading.innerText = 'OOPS!'
        errorMessage.innerText = 'This page does not seem to exist... But we know a page that does exist:'
        backToHome.innerText = `Let's go back to an existing page!`
        backToHome.classList.add('button')
        backToHome.addEventListener('click', () => {
            router.navigate('/')
        })

        Loader.toggleLoader()

        parent.appendChild(headingElement)
        parent.appendChild(sectionElement)
        errorWrapper.appendChild(errorHeading)
        errorWrapper.appendChild(errorMessage)
        parent.appendChild(errorWrapper)
        parent.appendChild(backToHome)
        
        Loader.toggleLoader()
    }
}