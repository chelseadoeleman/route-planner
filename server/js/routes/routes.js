require('dotenv').config()
const path = require('path')
const util = require('util')
const fs = require('fs')
const fetch = require('node-fetch')
const promisify = util.promisify
const readFile = promisify(fs.readFile)
const walkingFilePath = path.join(__dirname, '../../../walking.json')
const carFilePath = path.join(__dirname, '../../../car.json')

const handleIndexRoute = (request, response) => {
      response.render('../views/pages/index.ejs')
}

const handleTransportRoute = (request, response) => {
    const { name, lat, lng } = request.query

    response.render(
        '../views/pages/transport.ejs', 
        (name && lat && lng) ? {
            name,
            lat,
            lng
        } : {
            name: undefined,
            lat: undefined,
            lng: undefined
        }
    )
}

const handleStartRoute = async (request, response) => {
    const { transportType, name, lat, lng } = request.query

    if (transportType === 'car') {
        const data = await readFile(carFilePath)
        const json = await JSON.parse(data)
        response.status(200).render('../views/pages/start.ejs', {
            json,
            nextRoute: `/go/?transportType=${transportType}&name=${name}&lat=${lat}&lng=${lng}`,
            finishRoute: `/finish/?transportType=${transportType}`
        })
    } else {
        const data = await readFile(walkingFilePath)
        const json = await JSON.parse(data)
        response.status(200).render('../views/pages/start.ejs', {
            json,
            nextRoute: `/go/?transportType=${transportType}&name=${name}&lat=${lat}&lng=${lng}`,
            finishRoute: `/finish/?transportType=${transportType}`
        })
    }
}

const handleGoRoute = async (request, response) => {
    const { transportType } =  request.query

    if (transportType === 'car') {
        const data = await readFile(carFilePath)
        const json = await JSON.parse(data)
        response.status(200).render('../views/pages/go.ejs', {
            json,
            nextRoute: `/finish?transportType=${transportType}`,
        })
    } else {
        const data = await readFile(walkingFilePath)
        const json = await JSON.parse(data)
        response.status(200).render('../views/pages/go.ejs', {
            json,
            nextRoute: `/finish?transportType=${transportType}`,
        })
    }
}


const handleFinishRoute = async (request, response) => {
    const { transportType } =  request.query
    
    if (transportType === 'car') {
        const data = await readFile(carFilePath)
        const json = await JSON.parse(data)
        response.status(200).render('../views/pages/finish.ejs', {
            json
        })
    } else {
        const data = await readFile(walkingFilePath)
        const json = await JSON.parse(data)
        response.status(200).render('../views/pages/finish.ejs', {
            json
        })
    }
}

const transport = async (request, response) => {
    const { transportType } = request.params
    const { name, lat, lng } = request.query

    if (transportType === 'car' || transportType === 'walking') {
        response.status(304).redirect(`/start/?transportType=${transportType}&name=${name}&lat=${lat}&lng=${lng}`)
    } else {
        response.status(404).redirect('/')
    }
}

const setLocation = async (request, response) => {
    const { location } = request.body
    const urlBase = `https://api.opencagedata.com/geocode/v1/json`

    const res = await fetch(`${urlBase}?q=${location.toLowerCase()}&key=${process.env.KEY}`)
    const data = await res.json()
    const geometry = data && data.results && data.results[0] && data.results[0].geometry

    response.status(304).redirect(`/transport?name=${location.toLowerCase()}&lat=${geometry.lat}&lng=${geometry.lng}`)
}

module.exports = {
    setLocation,
    handleIndexRoute,
    handleTransportRoute,
    handleStartRoute,
    handleGoRoute,
    handleFinishRoute,
    transport
}