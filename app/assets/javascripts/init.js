$(document).ready( function () {
  new ApplicationController(new LocationView(locationViewSelectors), new MapView(mapOverlay), mapOptions, new CheckinView(checkinViewSelectors)).init();
})

var locationViewSelectors = {
  findmeButton: '#new_checkin'
}

var checkinViewSelectors = {
  checkinsWithArtist: '.checkin-artist',
  exitButton: '.exit'
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

String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
}