function MapController(mapView) {
  this.view = mapView;
}

MapController.prototype = {
  init: function() {

    var map = L.mapbox.map('map', 'nickmeehan.j2n2k9kp', { infoControl: false, center: [37.7691892, -122.4898206], zoom: 15, minZoom: 15, maxZoom: 17, attributionControl: false })

    var imageUrl = 'http://i.imgur.com/My9ribO.png'
    var imageBounds = [[37.766342,-122.4959086], [37.7701691,-122.483093]];

    L.imageOverlay(imageUrl, imageBounds).addTo(map);

    L.mapbox.featureLayer({
        // this feature is in the GeoJSON format: see geojson.org
        // for the full specification
        type: 'Feature',
        geometry: {
            type: 'Point',
            // coordinates here are in longitude, latitude order because
            // x, y is the standard for GeoJSON and many formats
            coordinates: [
              -122.4898206,
              37.7691892
            ]
        },
        properties: {
            title: 'Peregrine Espresso',
            description: '1718 14th St NW, Washington, DC',
            // one can customize markers by adding simplestyle properties
            // https://www.mapbox.com/foundations/an-open-platform/#simplestyle
            'marker-size': 'large',
            'marker-color': '#BE9A6B',
            'marker-symbol': 'cafe'
        }
    }).addTo(map);
  }
}