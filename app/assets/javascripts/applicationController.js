function ApplicationController (locationView, mapView, mapOptions) {
  this.locationView = locationView;
  this.mapView = mapView;
  this.checkins = []
  this.mapOptions = mapOptions;
  this.map;
}

ApplicationController.prototype = {
  init: function () {
    this.bindListeners();
    this.map = L.mapbox.map('map', 'nickmeehan.j2n2k9kp', this.mapOptions)
    this.mapView.overlayMapImage(this.map)
  },
  bindListeners: function () {
    var $findmeButton = this.locationView.getFindmeButtonSelector();
    $findmeButton.on('click', this.getLocationAndTime.bind(this));
  },
  getLocationAndTime: function (event) {
    event.preventDefault();
    CheckinDataHandler.getLocationData(this, event);
  },
  sendCheckin: function (clickEvent, lat, lng, timestamp) {
    var checkin = new Checkin(lat, lng, timestamp);
    this.checkins.push(checkin)
    var ajaxRequest = $.ajax({
      url: clickEvent.target.form.action,
      type: clickEvent.target.form.method,
      data: checkin
    })
    ajaxRequest.done(this.handleCheckinSuccess.bind(this));
    ajaxRequest.fail(this.handleCheckinError.bind(this));
  },
  handleCheckinSuccess: function (response) {
    var checkin = this.getLastCheckin()
    this.mapView.appendMarker(this.map, checkin)
  },
  handleCheckinError: function (response) {
    alert('Sorry, we couldn\'t find you.')
  },
  getLastCheckin: function() {
    var lastCheckinPosition = this.checkins.length - 1
    return this.checkins[lastCheckinPosition]
  }
}
