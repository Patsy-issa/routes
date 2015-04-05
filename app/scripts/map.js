/* global L */
(function(L){
  "use strict";
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
          this.$mapText.html("<p> Muhammad Ali set sail with 299 other men on a journey of over a thousand kilometres. </p>");
          break;
        case 26:
          this.marker.setIcon(L.icon({iconUrl: 'images/map/boat-crete.png',  "iconSize": [100, 43]}));
          this.$mapText.html("<div><p>About halfway into the voyage, after several weeks of island hopping in a struggle against the meltem wind, Ali's flotilla arrived in Crete. </p></div>");
          break;

        case 35:
          this.marker.setIcon(L.icon({iconUrl: 'images/map/boat.png',  "iconSize": [40, 43]}));
          this.$mapText.html("<div><p>About halfway into the voyage, after several weeks of island hopping in a struggle against the meltem wind, Ali's flotilla arrived in Crete. </p></div>");
          break;

        case 40:
          this.marker.setIcon(L.icon({iconUrl: 'images/map/boat.png',  "iconSize": [50, 50]}));
          this.$mapText.html("<div><p>From Crete, the second leg of the journey was a straight shot through the Mediterranean's open seas. The Ottoman rations of the time – olives, twice-baked bread and liberal pourings of arak – had to keep Muhammad Ali and his men healthy and sane and hopefully not too seasick. </p></div>");
          break;

        case 60:
          this.marker.setIcon(L.icon({iconUrl: 'images/map/boat.png',  "iconSize": [50, 50]}));
          this.$mapText.html("<div><p>Within sight of Egypt a devastating storm kept them offshore for several days before they finally made landfall on March 8, months after the trip had begun. </p></div>");
          break;

        case 65:
          this.marker.setIcon(L.icon({iconUrl: 'images/map/dot.png',  "iconSize": [14, 14]}));
          this.$mapText.html("<div><p>By the time Muhammad Ali landed in Aboukir, the French had left and the local power structure had become wobbly with recriminations, double-dealings and assassinations. </p></div>");
          break;

        case 85:
          this.marker.setIcon(L.icon({iconUrl: 'images/map/dot.png',  "iconSize": [14, 14]}));
          this.$mapText.html("<div><p> Six years later, he would decimate the remaining Mamluks, conquer Cairo and turn 42. Muhammad Ali decided that the traditional title of wali would not be enough for him. He instead chose to be called khedive, from the Persian khoda, or lord (or more dramatically: god) and lead a Turkish-speaking army to victory over the Caucasus Mamelukes, who were then (barely) ruling an Arabic Egypt.</p></div>");

          break;
      }
      setTimeout(function() {
        this.tick();
      }.bind(this), 300);
    }
  };
}(L));
