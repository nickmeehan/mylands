function MapView(mapOverlay) {
  this.imageUrl = mapOverlay['imageUrl']
  this.imageBounds = mapOverlay['imageBounds']
}

MapView.prototype = {
  overlayMapImage: function(map) {
    L.imageOverlay(this.imageUrl, this.imageBounds).addTo(map)
  },
  appendMarker: function(map, checkin) {
    L.mapbox.featureLayer({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [
              checkin.longitude,
              checkin.latitude
            ]
        },
        properties: {
            title: 'Peregrine Espresso',
            description: '1718 14th St NW, Washington, DC',
            'marker-size': 'large',
            'marker-color': '#000'
        }
    }).addTo(map);
  }
}