function ApplicationController (locationView, mapView, mapOptions, checkinView) {
  this.locationView = locationView;
  this.mapView = mapView;
  this.checkins = []
  this.mapOptions = mapOptions;
  this.map;
  this.checkinView = checkinView;
  this.artist;
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
    var $checkinsWithArtist = this.checkinView.getCheckinsWithArtistSelector();
    $checkinsWithArtist.on('click', this.loadArtistData.bind(this));
    var $exitButton = this.checkinView.getExitButton();
    $exitButton.on('click', this.dismissArtistDetails.bind(this));
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
  },
  loadArtistData: function(event) {
    console.log(event.currentTarget.attributes[1].value);
    var echonestId = event.currentTarget.attributes[1].value;
    var ajaxRequest = $.ajax({
      url: 'http://developer.echonest.com/api/v4/artist/profile?api_key=MJKPEKGWSRULLKC5V&id='+echonestId+'&bucket=genre&bucket=artist_location&bucket=songs&bucket=images&bucket=biographies&bucket=reviews',
      type: 'get'
    })
    ajaxRequest.done(this.handleEchonestSuccess.bind(this));
    ajaxRequest.fail(this.handleEchonestError.bind(this));
  },
  handleEchonestSuccess: function (response) {
    var artist = response.response.artist;
    this.artist = artist
    var artist_name = artist.name.split(' ').join('%20');
    var song_title = artist.songs[0].title.split(' ').join('%20');

    var ajaxRequest = $.ajax({
      url: 'http://developer.echonest.com/api/v4/song/search?api_key=MJKPEKGWSRULLKC5V&title='+song_title+'&artist='+artist_name+'&bucket=id:spotify&results=5&bucket=tracks',
      type: 'get'
    })
    ajaxRequest.done(this.handleSongSuccess.bind(this));
    ajaxRequest.fail(this.handleSongError.bind(this));
  },
  handleEchonestError: function (response) {
    console.log(response);
  },
  handleSongSuccess: function (response) {
    console.log(response);
    var spotifyTrackId = response.response.songs[0].tracks[0].foreign_id;
    var href = 'https://embed.spotify.com/?uri=' + spotifyTrackId
    this.checkinView.showArtistDetails(this.artist, href);
  },
  handleSongError: function (response) {
    console.log(response);
  },
  dismissArtistDetails: function (event) {
    this.checkinView.hideArtistDetails();
  }
}
