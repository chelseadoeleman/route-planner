const { times } = require('../helpers/helpers')
const { getUnsplashUrl } = require('../helpers/getUnsplashUrl')
const Fetcher = require('../helpers/Fetcher')

module.exports = async (request, response) => {
    const images = await Promise.all(times(10).map(async (pageNumber) => {
        const url = getUnsplashUrl(pageNumber)
        const results = await new Fetcher({ url, options: {headers: {'X-Ratelimit-Limit': '1000'}} }).fetch()
        return results
    }))

    response.status(200).render('pages/index', {
        images: images.reduce( (a, b) => a.concat(b), [])
    })
}
