require('dotenv').config()
const fetch = require('node-fetch')

const state = {
    homeCoordinates: {
        lng: 4.605329,
        lat: 52.270131,
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
    const { transportType, lat, lng } = request.query
    
    const mapboxDynamicKey = transportType === 'car'
        ? 'driving'
        : 'walking'
        const routingUrl = `https://api.mapbox.com/directions/v5/mapbox/${mapboxDynamicKey}/`
        const from = `${lng},${lat}`
        const destination = `;${state.destination.geometry.lng},${state.destination.geometry.lat}`
        const key = `.json?access_token=pk.eyJ1IjoiY2hlbHNlYWRvZWxlbWFuIiwiYSI6ImNqdGswc3d5MTBya3U0M24wMTN3d3gxcHMifQ.ZfqXEPDV8XcCEkNfI8v0ug`
        const url = `${routingUrl}${from}${destination}${key}&overview=full&steps=true&geometries=geojson`

        try {
            const res = await fetch(url)
            const data = await res.json()
            const steps = data && data.routes && data.routes[0] && data.routes[0].legs && data.routes[0].legs[0] &&data.routes[0].legs[0].steps

            response.status(200).render('../views/pages/go.ejs', {
                lng,
                steps,
            })

        } catch (error) {
            throw new Error(error)
        }
}

const transport = async (request, response) => {
    const { transportType } = request.params
    const { name, lat, lng } = request.query
    console.log(lat, lng)

    if (transportType === 'car' || transportType === 'walking') {
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

    if(geometry) {
        response.status(304).redirect(`/transport?name=${location.toLowerCase()}&lat=${geometry.lat}&lng=${geometry.lng}`)
    } else {
        console.log('please enter a legit location')
        response.status(409).redirect('/')
    }
}

module.exports = {
    setLocation,
    handleIndexRoute,
    handleTransportRoute,
    handleGoRoute,
    transport
}