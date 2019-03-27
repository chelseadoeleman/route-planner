if(canMakeUseOfJavaScript()) {
	var hasAmpecent = window.location.search.indexOf('&') > -1
	var queryParams = hasAmpecent 
		? window.location.search.split('&')
		: window.location.search
	var transportType = queryParams && typeof queryParams === 'string' 
		? queryParams.replace('?transportType=', '')
		: queryParams[0] && queryParams[0].replace('?transportType=', '')
	var name = queryParams && queryParams[1] && queryParams[1].replace('name=', '')
	var lat = queryParams && queryParams[2] && queryParams[2].replace('lat=', '')
	var lng = queryParams && queryParams[3] && queryParams[3].replace('lng=', '')

	var state = {
		currentLocation: {
			name: name || 'Home',
			geometry: {
				lng: Number(lng) || 4.605329,
				lat: Number(lat) || 52.270131,
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

	var url = 'https://api.opencagedata.com/geocode/v1/json?q=amsterdam&key=b76d8d5ab7294a3badaa17fbfea780fe'
	var mapboxDynamicKey = transportType === 'car'
		? 'driving'
		: 'walking'
	var routingUrl = 'https://api.mapbox.com/directions/v5/mapbox/' + mapboxDynamicKey + '/'
	var geometry = state.currentLocation.geometry
	var from = geometry.lng + ',' +geometry.lat
	var destination = ';' + state.destination.geometry.lng + ',' + state.destination.geometry.lat
	var key = '.json?access_token=pk.eyJ1IjoiY2hlbHNlYWRvZWxlbWFuIiwiYSI6ImNqdGswc3d5MTBya3U0M24wMTN3d3gxcHMifQ.ZfqXEPDV8XcCEkNfI8v0ug'
	var url = routingUrl + from + destination + key + '&overview=full&steps=true&geometries=geojson'

	mapboxgl.accessToken = 'pk.eyJ1IjoiY2hlbHNlYWRvZWxlbWFuIiwiYSI6ImNqdGswc3d5MTBya3U0M24wMTN3d3gxcHMifQ.ZfqXEPDV8XcCEkNfI8v0ug'
	var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/dark-v9',
		center: [4.895168, 52.370216], // starting position
		zoom: 10
	})

	map.on('load', function() {
		var xhttp = new XMLHttpRequest()
		xhttp.open("GET", url , true)	
		xhttp.send()
	
		attachEventListener(xhttp, 'load', function() {
			var response = this.responseText
			var data = JSON.parse(response)
			var route = data.routes[0].geometry.coordinates

			var steps = data.routes[0].legs[0].steps
			
			if (steps && steps.length > 0) {
				var directions = getHtmlElementsByClass('directions')[0]
				var navigation = getHtmlElementsByClass('navigation')[0]
				var startItem = document.createElement('li')
				var finishItem = document.createElement('li')
				var start = document.createElement('a')
				var finish = document.createElement('a')
				
				directions.innerHTML = ''
				navigation.innerHTML= ''

				start.setAttribute('href', '/start')
				start.innerText = 'Start'
				finish.setAttribute('href', '/finish')
				finish.innerText = 'Finish'

				startItem.appendChild(start)
				finishItem.appendChild(finish)

				navigation.appendChild(startItem)

				for(var x = 0; x < steps.length; x++) {
					renderStep(steps[x], x, directions, navigation)
				}

				navigation.appendChild(finishItem)
			}

			var geojson = {
				type: 'FeatureCollection',
				features: [{
					type: 'Feature',
					properties: {},
					geometry: {
						type: 'LineString',
						coordinates: route
					}
				}]
			}
	
			if (map.getSource('route')) {
				map.getSource('route').setData(geojson)
			} else {
				var layer = {
					id: 'route',
					type: 'line',
					source: {
						type: 'geojson',
						data: geojson
					},
					layout: {
						'line-join': 'round',
						'line-cap': 'round'
					},
					paint: {
						'line-color': '#8151b8',
						'line-width': 5,
						'line-opacity': .75
					}
				}

				map.addLayer(layer)
			}
		})
	})
}

function renderStep(step, currentX, directions, navigation) {
	var maneuver = step.maneuver.instruction
	var distance = step.distance
	var stepNumber = currentX + 1

	var section = document.createElement('section')
	var heading = document.createElement('h2')
	var list = document.createElement('ul')
	var maneuverItem = document.createElement('li')
	var distanceItem = document.createElement('li')
	var stepsItem = document.createElement('li')
	var steps = document.createElement('a')

	list.className = 'steps'
	heading.innerText = 'Step ' + stepNumber
	heading.id = stepNumber
	maneuverItem.innerText = maneuver
	distanceItem.innerText = distance + 'm'

	steps.setAttribute('href', '#' + stepNumber)
	steps.innerText = stepNumber

	list.appendChild(maneuverItem)
	list.appendChild(distanceItem)
	section.appendChild(heading)
	section.appendChild(list)
	directions.appendChild(section)

	stepsItem.appendChild(steps)

	navigation.appendChild(stepsItem)
}