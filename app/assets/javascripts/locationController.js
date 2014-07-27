function LocationController (locationView) {
  this.locationView = locationView;
}

LocationController.prototype = {
  init: function () {
    this.bindListeners();

  },
  bindListeners: function () {
    var $findmeButton = this.locationView.getFindmeButtonSelector();
    console.log($findmeButton);
    $findmeButton.on('click', this.getLocationAndTime.bind(this));
  },
  getLocationAndTime: function (event) {
    event.preventDefault();
    CheckinDataHandler.getLocationData(this, event);
  },
  sendCheckin: function (clickEvent, lat, lng, timestamp) {
    var checkin = new Checkin(lat, lng, timestamp);
    console.log(checkin, clickEvent.target.form.action, clickEvent.target.form.method);
    var ajaxRequest = $.ajax({
      url: clickEvent.target.form.action,
      type: clickEvent.target.form.method,
      data: checkin
    })
    ajaxRequest.done(this.handleCheckinSuccess);
    ajaxRequest.fail(this.handleCheckinError);
  },
  handleCheckinSuccess: function () {

  },
  handleCheckinError: function () {

  }
}
