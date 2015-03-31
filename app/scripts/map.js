/* global L */
(function(L){
  window.geoMap = geoMap;
  function geoMap() {
    /*jshint validthis: true */
    this.target = document.getElementById('map');
    this.targetId = 'map';
    this.geoJson = function() {
      return {};
    };
    this.geoMap = null;
    this.accessToken = null;
    this.marker = null;
    this.markerIcon = null;
    this.ticker = 0;
  }

  geoMap.prototype.setMap = function() {
    /*jshint validthis: true */
    L.mapbox.accessToken = this.accessToken;

    this.geoMap = L.mapbox.map(this.targetId, this.mapRef, { attributionControl: false, zoomAnimation: false, fadeAnimation: false,inertia: false , zoomControl:false , maxZoom: 17 })
    .setView([ 40.9, 24.41], 7);
    this.marker = L.marker([0, 0]).addTo(this.geoMap);
    this.marker.setIcon(L.icon({iconUrl: this.markerIcon,  "iconSize": [100, 43]}));
    this.disableActions();
    this.setMapMarker();
    this.$map.bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
      if(isInView && visiblePartY === "both") {
        this.tick();
      }
    }.bind(this));
  };

  geoMap.prototype.disableActions = function () {
    /*jshint validthis: true */
    // Disable drag and zoom handlers.
    this.geoMap.dragging.disable();
    this.geoMap.touchZoom.disable();
    this.geoMap.doubleClickZoom.disable();
    this.geoMap.scrollWheelZoom.disable();
    // Disable tap handler, if present.
    if (this.geoMap.tap) {
      this.geoMap.tap.disable();
    }
  };

  geoMap.prototype.setMapMarker = function() {
    /*jshint validthis: true */
    // set the marker to be at the same point as one of the segments
    // of the line
    this.marker.setLatLng(L.latLng(
      this.geoJson.features[0].geometry.coordinates[this.ticker][1],
      this.geoJson.features[0].geometry.coordinates[this.ticker][0]));
    this.geoMap.setView([this.geoJson.features[0].geometry.coordinates[this.ticker][1], this.geoJson.features[0].geometry.coordinates[this.ticker][0]]);
  };

  geoMap.prototype.tick = function() {
    /*jshint validthis: true */
    this.setMapMarker();
    // move to the next point in the line or loop to the first point if
    // this.ticker runs off the end of the array
    if (++this.ticker < this.geoJson.features[0].geometry.coordinates.length) {
      switch (this.ticker) {

        case 10:
          this.marker.setIcon(L.icon({iconUrl: 'images/map/boat.png',  "iconSize": [40, 40]}));
          break;
        case 26:
          this.marker.setIcon(L.icon({iconUrl: 'images/map/boat-crete.png',  "iconSize": [100, 43]}));
          break;

        case 35:
          this.marker.setIcon(L.icon({iconUrl: 'images/map/boat.png',  "iconSize": [40, 43]}));
          break;

        case 40:
          this.marker.setIcon(L.icon({iconUrl: 'images/map/boat.png',  "iconSize": [50, 50]}));
          break;

        case 60:
          this.marker.setIcon(L.icon({iconUrl: 'images/map/boat.png',  "iconSize": [50, 50]}));
          break;

        case 65:
          this.marker.setIcon(L.icon({iconUrl: 'images/map/dot.png',  "iconSize": [14, 14]}));
          break;

        case 85:
          this.marker.setIcon(L.icon({iconUrl: 'images/map/dot.png',  "iconSize": [14, 14]}));
          break;
      }
      setTimeout(function() {
        this.tick();
      }.bind(this), 300);
    }
  };
}(L));
