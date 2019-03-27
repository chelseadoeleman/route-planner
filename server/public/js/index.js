if(canMakeUseOfJavaScript()) {
	// console.log(window.location.search)
	var transportType = window.location.search.replace('?transportType=', '')
	console.log(transportType)
	var state = {
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
	
		attachEventListener(xhttp, 'load', function(event) {
			var response = this.responseText
			var data = JSON.parse(response)
			var route = data.routes[0].geometry.coordinates
			console.log(data)
	
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