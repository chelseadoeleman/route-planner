const path = require('path')
const util = require('util')
const fs = require('fs')
const promisify = util.promisify
const readFile = promisify(fs.readFile)
const walkingFilePath = path.join(__dirname, '../../../walking.json')
const carFilePath = path.join(__dirname, '../../../car.json')

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

const transport = (request, response) => {
    const { transportType } = request.params

    if (transportType === 'car' || transportType === 'walking') {
        response.status(304).redirect(`/start/?transportType=${transportType}`)
    } else {
        response.status(404).redirect('/')
    }
}

module.exports = {
    handleIndexRoute,
    handleTransportRoute,
    handleStartRoute,
    handleGoRoute,
    handleFinishRoute,
    transport
}