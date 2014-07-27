function MapView(mapOverlay) {
  this.imageUrl = mapOverlay['imageUrl']
  this.imageBounds = mapOverlay['imageBounds']
}

MapView.prototype = {
  overlayMapImage: function(map) {
    L.imageOverlay(this.imageUrl, this.imageBounds).addTo(map)
  },
  appendMarker: function(map, checkin, response) {
    L.mapbox.featureLayer({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [
              response.longitude,
              response.latitude
            ]
        },
        properties: {
            title: response.location,
            description: response.artist,
            'marker-size': 'large',
            'marker-color': '#000'
        }
    }).addTo(map);
  }
}