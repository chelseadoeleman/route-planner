require('dotenv').config()

const getUnsplashUrl = (pageNumber) =>  {
    const baseUrl = 'https://api.unsplash.com/photos/?client_id='
    const unsplash = 'd633cd88d3ab4d70df0bfa48b64ee1241d0d56f25c16a78e451f20172dbda585'
    const addPage = `&page=${pageNumber}`
    const resultsPage = '&per_page=30'
    return `${baseUrl}${unsplash}${addPage}${resultsPage}`
}

const getUnsplashDetail = (id) =>  {
    const baseUrl = `https://api.unsplash.com/photos/${id}?client_id=`
    const unsplash = 'd633cd88d3ab4d70df0bfa48b64ee1241d0d56f25c16a78e451f20172dbda585'
    return `${baseUrl}${unsplash}`
}

// const getUnsplashSearchUrl = (search) => {
//     const baseUrl = `https://api.unsplash.com/search/photos/?client_id=`
//     const unsplash = 'd633cd88d3ab4d70df0bfa48b64ee1241d0d56f25c16a78e451f20172dbda585'
//     const searchQuery = `&query=${search}`
//     return `${baseUrl}${unsplash}${searchQuery}&per_page=30`
// }

module.exports = {
    getUnsplashUrl,
    getUnsplashDetail
}