mapboxgl.accessToken = 'pk.eyJ1IjoiY2hlbHNlYWRvZWxlbWFuIiwiYSI6ImNqdGswc3d5MTBya3U0M24wMTN3d3gxcHMifQ.ZfqXEPDV8XcCEkNfI8v0ug';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v10',
  center: [-122.662323, 45.523751], // starting position
  zoom: 12
});
// set the bounds of the map
var bounds = [[-123.069003, 45.395273], [-122.303707, 45.612333]];
map.setMaxBounds(bounds);

// initialize the map canvas to interact with later
var canvas = map.getCanvasContainer();

// an arbitrary start will always be the same
// only the end or destination will change
var start = [-122.662323, 45.523751];

// this is where the code for the next step will go