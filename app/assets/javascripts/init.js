$(document).ready( function () {
  new LocationController(new LocationView(locationViewSelectors)).init();
})

var locationViewSelectors = {
  findmeButton: '#new_checkin'
}