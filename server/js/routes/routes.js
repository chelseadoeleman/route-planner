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

const handleGoRoute = async (request, response) => {
    const { transportType } = request.query
    const { maneuver, distance } = request.params

    if (transportType === 'car') {
        
        const data = await readFile(carFilePath)
        const json = await JSON.parse(data)

        response.status(200).render('../views/pages/go.ejs', {
            json,
            maneuver,
            distance,
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
        // var data = JSON.parse(response)
        try {
            const route = data && data.routes && data.routes[0] && data.routes[0].geometry && data.routes[0].geometry.coordinates
            const steps = data && data.routes && data.routes[0] && data.routes[0].legs &&data.routes[0].legs[0] &&data.routes[0].legs[0].steps
            steps.forEach(step => {
            const maneuver = step && step.maneuver && step.maneuver.instruction
            const distance = step && step.distance
            console.log(maneuver)
            console.log(distance)
        })
        } catch (error) {
            throw new Error(error)
        }
        // console.dir(data, {showHidden: false, depth: null})
        response.status(304).redirect(`/go/?transportType=${transportType}&name=${name}&lat=${lat}&lng=${lng}`)
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

    if(geometry) {
        response.status(304).redirect(`/transport?name=${location.toLowerCase()}&lat=${geometry.lat}&lng=${geometry.lng}`)
    } else {
        response.status(409).redirect('/')
    }
}

module.exports = {
    setLocation,
    handleIndexRoute,
    handleTransportRoute,
    handleGoRoute,
    handleFinishRoute,
    transport
}