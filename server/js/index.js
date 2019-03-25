'use strict'

const express = require('express')
const helmet = require('helmet')
const path = require('path')
const bodyParser = require('body-parser')
const { 
    handleIndexRoute, 
    handleTransportRoute,
    handleStartRoute, 
    handleGoRoute,
    handleFinishRoute,
    transport
    } = require('./routes/routes')
const app = express()

app.use(helmet())
app.use(express.static(path.join(__dirname, '../public')))
app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs')
app.set('views', `${__dirname}/views`)

app.get('/', handleIndexRoute)
app.get('/transport', handleTransportRoute)
app.get('/start', handleStartRoute)
app.get('/go', handleGoRoute)
app.get('/finish', handleFinishRoute)

app.post('/start/:transportType', transport)

app.listen({ port: process.env.PORT || 3000 }), () => {
    console.log(`listening on port ${process.env.PORT || 3000}`)
}   