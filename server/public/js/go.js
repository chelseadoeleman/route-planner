if(canMakeUseOfJavaScript() && window.mapboxgl && window.location && window.location.search) {
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
	var from = geometry.lng + ',' + geometry.lat
	var destination = ';' + state.destination.geometry.lng + ',' + state.destination.geometry.lat
	var key = '.json?access_token=pk.eyJ1IjoiY2hlbHNlYWRvZWxlbWFuIiwiYSI6ImNqdGswc3d5MTBya3U0M24wMTN3d3gxcHMifQ.ZfqXEPDV8XcCEkNfI8v0ug'
	var url = routingUrl + from + destination + key + '&overview=full&steps=true&geometries=geojson'
	
	mapboxgl.accessToken = 'pk.eyJ1IjoiY2hlbHNlYWRvZWxlbWFuIiwiYSI6ImNqdGswc3d5MTBya3U0M24wMTN3d3gxcHMifQ.ZfqXEPDV8XcCEkNfI8v0ug'
	if (document.getElementById('map')) {
		var map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/dark-v9',
			pitch: 70, // pitch in degrees
			bearing: 360, // bearing in degrees
			center: [4.895168, 52.370216], 
			zoom: 8
		})
	}
	
	if (map) {
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
