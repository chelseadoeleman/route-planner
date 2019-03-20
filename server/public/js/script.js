const getUnsplashSearchUrl = (search) => {
    const baseUrl = `https://api.unsplash.com/search/photos/?client_id=`
    const unsplash = 'd633cd88d3ab4d70df0bfa48b64ee1241d0d56f25c16a78e451f20172dbda585'
    const searchQuery = `&query=${search}`
    return `${baseUrl}${unsplash}${searchQuery}&per_page=30`
}

const searchBox = document.querySelector('.searchBox')
const photos = document.querySelector('.photos')

class Fetcher {
    constructor(options) {
        this.options = options
    }

    async fetch() {
        const { url, options } = this.options
        try {
            const response = await fetch(url, options)
            return response.json()
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    }
}

searchBox.addEventListener('keyup', (event) => handleSearch(event))

const handleSearch = async (event) => {
    
    if (event.key !== 'Enter') {
        return
    }

    const value = event.target.value

    if (!value || !value.length) {
        return window.location.reload()
    }

    const url = getUnsplashSearchUrl(value)
    const results = await new Fetcher({ url, options: {headers: {'X-Ratelimit-Limit': '1000'}} }).fetch()
    photos.innerHTML = ''

    if (!results || results.total === 0) {
        const message = document.createElement('p')
        message.classList.add('no-images')
        message.innerHTML= 'No images can be found'
        photos.append(message)
    } else {
        const markup = results.results.reduce((data, result) => {
            const currentImageWrapper = `<div class="image-wrapper">
                <img 
                    class="image" 
                    src="${ result.urls && result.urls.regular}" 
                    data-location="${ result.user && result.user.location }"
                    alt="image"
                >
                <a href="/detail/${ result.id }">More about this picture</a>
            </div>`
            
            return data += currentImageWrapper
        }, '')

        photos.innerHTML = markup
    }
}