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
	
	if (lng <= -1.729682844139461 || lng >= 11.959281999610539) {
		var main = document.getElementsByTagName('main')[0]
		if(main){
			var heading = document.createElement('h1')
			heading.innerText = 'Sorry there is no route available from this location'
			var home = document.createElement('a')
			home.setAttribute('href', '/')
			home.innerText = 'Return to home'
			main.appendChild(heading)
			main.appendChild(home)
		} else {
			alert('ERROR MESSAGE: Sorry this location could not be found please return to home')
		}
	} else {
		
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
			pitch: 70, // pitch in degrees
			bearing: 360, // bearing in degrees
			center: [4.895168, 52.370216], 
			zoom: 8
		})
		
		var bounds = [[-1.729682844139461, 50.146374056518475], [11.959281999610539, 53.57726348010249]]
		map.setMaxBounds(bounds)
		
		map.on('load', function() {
			var error = getHtmlElementsByClass('error-message')[0]
			if (error && error.parentNode) {
				error.style.opacity = '0'
				setTimeout(function () {
					error.parentNode.removeChild(error)
				}, 200)
			}
			var mapbox = document.getElementById('map')
			if (mapbox) {
				mapbox.style.opacity = '1'
			}
			
			var xhttp = new XMLHttpRequest()
			xhttp.open("GET", url , true)	
			xhttp.send()
			
			attachEventListener(xhttp, 'load', function() {
				var response = this.responseText
				var data = JSON.parse(response)
				var route = data && data.routes && data.routes[0] && data.routes[0].geometry && data.routes[0].geometry.coordinates
				// var steps = data && data.routes && data.routes[0] && data.routes[0].legs &&data.routes[0].legs[0] &&data.routes[0].legs[0].steps
				
				// if (steps && steps.length > 0) {
				// 	var directions = getHtmlElementsByClass('directions')[0]
				
				// 	if (directions) {
				// 		directions.innerHTML = ''
				
				// 		var finish = document.createElement('a')
				// 		finish.setAttribute('href', '/finish')
				// 		finish.innerText = 'Finish'
				
				// 		for(var x = 0; x < steps.length; x++) {
				// 			renderStep(steps[x], x, directions)
				// 		}
				// 		directions.appendChild(finish)
				// 	}
				// }
				
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
							'line-color': '#ff7856',
							'line-width': 6,
							'line-opacity': .75
						}
					}
					
					map.addLayer(layer)
				}
			})
		})
		
	}
	
}

// function renderStep(step, currentX, directions) {
// 	var maneuver = step.maneuver.instruction
// 	var distance = step.distance
// 	var stepNumber = currentX + 1

// 	var steps = document.createElement('a')
// 	var heading = document.createElement('h2')
// 	var list = document.createElement('ul')
// 	var maneuverItem = document.createElement('li')
// 	var distanceItem = document.createElement('li')

// 	list.className = 'steps'
// 	heading.innerText = 'Step ' + stepNumber
// 	heading.id = stepNumber
// 	maneuverItem.innerText = maneuver
// 	distanceItem.innerText = distance + 'm'

// 	steps.setAttribute('href', '#' + stepNumber)
// 	steps.setAttribute('aria-label', 'step ' + stepNumber)

// 	steps.appendChild(heading)
// 	steps.appendChild(list)
// 	list.appendChild(maneuverItem)
// 	list.appendChild(distanceItem)
// 	directions.appendChild(steps)
// }