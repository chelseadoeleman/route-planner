const fetch = require('node-fetch')

module.exports = class Fetcher {
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