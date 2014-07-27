var CheckinDataHandler = (function () {
  return {
    getLocationData: function (locationController, clickEvent) {

      var locationController = locationController;
      var clickEvent = clickEvent;

      if (!navigator.geolocation){
        alert('Sorry, geolocation is not supported.');
        return;
      }

      function success(position) {
        var latitude  = position.coords.latitude;
        var longitude = position.coords.longitude;
        var timestamp = CheckinDataHandler.getCurrentTime();

        locationController.sendCheckin(clickEvent, latitude, longitude, timestamp);
      };
      function error() {
        alert('Unable to determine location');
      };
      var geo_options = {
        enableHighAccuracy: true
      };
      navigator.geolocation.getCurrentPosition(success, error, geo_options);
    },
    getCurrentTime: function () {
      return new Date();
    }
  }
})()