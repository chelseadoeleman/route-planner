const images = [...document.querySelectorAll('.image')]

// images.map(image => {
//     const color = image.getAttribute('data-color')
//     // image.style.setProperty('background-color', color)
// })

const geoCoder = new MapboxGeocoder({ 
    accessToken: 'pk.eyJ1IjoibWVsa2JvZXIiLCJhIjoiY2pydDZnemZrMGk2NTQ0bnB5N2FzYnY4ZSJ9.6Rz3rv9QYard69Bd1_onig'
})

mapboxgl.accessToken = 'pk.eyJ1IjoibWVsa2JvZXIiLCJhIjoiY2pydDZnemZrMGk2NTQ0bnB5N2FzYnY4ZSJ9.6Rz3rv9QYard69Bd1_onig'

const mapBox = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9',
    zoom: 1,
    center: [4.895168, 52.370216]
})

mapBox.addControl(geoCoder)

images.map(image => {
    image.addEventListener('click', (event) =>  {
        const location = event.target.getAttribute('data-location')
        location === undefined
            ? alert('Location Unknown')
            : geoCoder.query(location)
    })
})