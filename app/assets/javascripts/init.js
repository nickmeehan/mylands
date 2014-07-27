$(document).ready( function () {
  new LocationController(new LocationView(locationViewSelectors)).init();
  new MapController(new MapView()).init()
})

var locationViewSelectors = {
  findmeButton: '#new_checkin'
}