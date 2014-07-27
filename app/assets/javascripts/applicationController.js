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
    this.getUserCheckins()
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
    // var datetime = new Date(2014, 7, 8, 18, 20,0,0)
    // console.log(datetime)
    var ajaxRequest = $.ajax({
      url: clickEvent.target.form.action,
      type: clickEvent.target.form.method,
      // data: new Checkin(37.768545, -122.4924813, timestamp)
      data: new Checkin(37.766642 + Math.random()*.0042271, -122.4956086+Math.random()*.013415, datetime)
      // data: checkin
    })
    ajaxRequest.done(this.handleCheckinSuccess.bind(this));
    ajaxRequest.fail(this.handleCheckinError.bind(this));
  },
  handleCheckinSuccess: function (response) {
    var checkin = this.getLastCheckin()
    this.mapView.appendMarker(this.map, checkin, response)
  },
  handleCheckinError: function (response) {
    alert('Sorry, we couldn\'t find you.')
  },
  getLastCheckin: function() {
    var lastCheckinPosition = this.checkins.length - 1
    return this.checkins[lastCheckinPosition]
  },
  getUserCheckins: function(){
    var ajaxRequest = $.ajax({
      url: '/user_checkins',
      type: 'get'
    })
    ajaxRequest.done(this.handleUserCheckinsSuccess.bind(this));
    ajaxRequest.fail(this.handleUserCheckinsError.bind(this));
  },
  handleUserCheckinsSuccess: function(response){
    for(var i = 0; i < response.length; i++){
      this.mapView.appendMarker(this.map, null, response[i])
    }
  },
  handleUserCheckinsError: function(response){

  }
}
