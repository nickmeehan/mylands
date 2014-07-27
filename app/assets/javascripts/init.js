$(document).ready( function () {
  new ApplicationController(new LocationView(locationViewSelectors), new MapView(mapOverlay), mapOptions).init();
})

var locationViewSelectors = {
  findmeButton: '#new_checkin'
}

var mapOptions = {
  infoControl: false,
  center: [37.7691892, -122.4898206],
  zoom: 15,
  minZoom: 15,
  maxZoom: 17,
  attributionControl: false
}

var mapOverlay = {
  imageUrl: 'http://i.imgur.com/VuN36bN.png',
  imageBounds: [[37.766642,-122.4956086], [37.7708691,-122.482193]]
}