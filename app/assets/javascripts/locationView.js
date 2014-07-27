function LocationView (locationViewSelectors) {
  this.findmeButton = locationViewSelectors['findmeButton'];
}

LocationView.prototype = {
  getFindmeButtonSelector: function () {
    return $(this.findmeButton);
  }
}