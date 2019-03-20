const handleIndexRoute = (request, response) => {
      response.render('../views/pages/index.ejs')
}

const handleTransportRoute = (request, response) => {
    response.render('../views/pages/transport.ejs')
}

const handleStep1Route = (request, response) => {
    response.render('../views/pages/step1.ejs')
}

const handleStep2Route = (request, response) => {
    response.render('../views/pages/step2.ejs')
}
const handleFinishRoute = (request, response) => {
    response.render('../views/pages/finish.ejs')
}

module.exports = {
    handleIndexRoute,
    handleTransportRoute,
    handleStep1Route,
    handleStep2Route,
    handleFinishRoute
}