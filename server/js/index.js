'use strict'

const express = require('express')
const helmet = require('helmet')
const path = require('path')
const bodyParser = require('body-parser')
const { 
    handleIndexRoute, 
    handleTransportRoute,
    handleStartRoute, 
    handleStep1Route,
    handleStep2Route,
    handleFinishRoute} = require('./routes/routes')
const app = express()

app.use(helmet())
app.use(express.static(path.join(__dirname, '../public')))
app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs')
app.set('views', `${__dirname}/views`)

app.get('/', handleIndexRoute)
app.get('/transport', handleTransportRoute)
app.get('/start', handleStartRoute)
app.get('/step1', handleStep1Route)
app.get('/step2', handleStep2Route)
app.get('/finish', handleFinishRoute)

app.listen({ port: process.env.PORT || 3000 }), () => {
    console.log(`listening on port ${process.env.PORT || 3000}`)
}   