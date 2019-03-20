const { getUnsplashDetail } = require('../helpers/getUnsplashUrl')
const Fetcher = require('../helpers/Fetcher')

module.exports = async (request, response) => {
    const { id } = request.params
    const url = getUnsplashDetail(id)
    const details = await new Fetcher({ url, options: {headers: {'X-Ratelimit-Limit': '1000'}} }).fetch()

    console.log(details)

    response.status(200).render('pages/detail', {
        details
    })
}
