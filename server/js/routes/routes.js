require('dotenv').config()
const path = require('path')
const util = require('util')
const fs = require('fs')
const fetch = require('node-fetch')
const promisify = util.promisify
const readFile = promisify(fs.readFile)
const walkingFilePath = path.join(__dirname, '../../../walking.json')
const carFilePath = path.join(__dirname, '../../../car.json')

const state = {
    homeCoordinates: {
        lng: 4.605329,
        lat: 52.270131,
    },
    currentLocation: {
        name: 'Home',
        geometry: {
            lng: 4.605329,
            lat: 52.270131,
        },
    },
    destination: {
        name: 'Device lab',
        geometry: {
            lng: 4.907808,
            lat: 52.359205, 
        }
    }
}

const handleIndexRoute = (request, response) => {
      response.render('../views/pages/index.ejs')
}

const handleTransportRoute = (request, response) => {
    response.render('../views/pages/transport.ejs')
}

const handleStartRoute = async (request, response) => {
    const { transportType } =  request.query
    if (transportType === 'car') {
        const data = await readFile(carFilePath)
        const json = await JSON.parse(data)
        response.status(200).render('../views/pages/start.ejs', {
            json,
            nextRoute: `/go/?transportType=${transportType}`,
            finishRoute: `/finish/?transportType=${transportType}`
        })
    } else {
        const data = await readFile(walkingFilePath)
        const json = await JSON.parse(data)
        response.status(200).render('../views/pages/start.ejs', {
            json,
            carRoute: `./public/assets/carRoute.png`,
            nextRoute: `/go/?transportType=${transportType}`,
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
            nextRoute: `/finish/?transportType=${transportType}`,
        })
    } else {
        const data = await readFile(walkingFilePath)
        const json = await JSON.parse(data)
        response.status(200).render('../views/pages/go.ejs', {
            json,
            nextRoute: `/finish/?transportType=${transportType}`,
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

    if (transportType === 'car' || transportType === 'walking') {
        const mapboxDynamicKey = transportType === 'car'
            ? 'driving'
            : 'walking'
        const routingUrl = `https://api.mapbox.com/directions/v5/mapbox/${mapboxDynamicKey}/`
        const geometry = state.currentLocation.geometry
        const from = `${geometry.lng},${geometry.lat}`
        const destination = `;${state.destination.geometry.lng},${state.destination.geometry.lat}`
        const key = `.json?access_token=pk.eyJ1IjoiY2hlbHNlYWRvZWxlbWFuIiwiYSI6ImNqdGswc3d5MTBya3U0M24wMTN3d3gxcHMifQ.ZfqXEPDV8XcCEkNfI8v0ug`
        const url = `${routingUrl}${from}${destination}${key}&overview=full&steps=true&geometries=geojson`

        const res = await fetch(url)
        const data = await res.json()
        console.dir(data, {showHidden: false, depth: null})

        response.status(304).redirect(`/start/?transportType=${transportType}`)
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

    state.currentLocation.name = location.toLowerCase()
    state.currentLocation.geometry = geometry

    response.status(304).redirect('/transport')
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