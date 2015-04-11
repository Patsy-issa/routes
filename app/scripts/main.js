/* globals skrollr, passages */
/* jshint devel:true */
'use strict';
(function() {
  var $doc = $(document),
  $menu = $('#menu'),
  $body = $('body'),
  $window = $(window),
  $table = $('.crete-table.visible-desktop'),
  $warriors = $('.ma-warriors'),
  $map = $('#map'),
  $mapText = $('.map-text_container'),
  $mainBoat = $('.main-boat'),
  $abukir = $('.abukir'),
  $mapPopup = $('.map-popup'),
  $popupImage = $mapPopup.find('img'),
  $landSlide = $('.land-slide-2'),
  $seaSlide = $('.sea-slide-1'),
  $headerMapBtn = $('.header-nav__map-btn'),
  $mapOverlay = $('.map-overlay'),
  resizeTimeout,
  mapPopupTimeout,
  addClassTimeout,
  s;

  $(function() {
    adjustWindow();
    setInterval(function() {
      $warriors.toggleClass('ma-warriors_toggle');
    }, 600);

    var map = new window.geoMap();
    map.$map = $map;
    map.$mapText = $mapText;
    map.geoJson = window.passages;
    map.accessToken = 'pk.eyJ1Ijoia25vb3pyb29tIiwiYSI6Ims1RWhpM0EifQ.tu8ILYm_dap3ZACv38w3nA';
    map.mapRef = 'knoozroom.b01da933';
    map.markerIcon = 'images/map/boat-kavala.png';
    map.$mapOverlay = $mapOverlay;
    map.setMap();
    $map.on('click', '.map-btn', function() {
      $mapOverlay.fadeOut();
      if (map.limitReached) {
        map.markerIcon = 'images/map/boat-kavala.png';
        map.limitReached = false;
      }
      map.tick();
    });

    $window.on('scroll', function() {
      clearTimeout(mapPopupTimeout);
      mapPopupTimeout = setTimeout(toggleMapPopup, 100);
    });

    $window.on('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(adjustWindow, 100);
    });

    $doc.on('click', '.header-nav__menu-btn, .menu-close', function() {
      $menu.toggleClass('menu_open').css('top', $window.scrollTop());
      $body.toggleClass('no-scroll');
    });

    $doc.on('click', '.header-nav__map-btn', function() {
      $mapPopup.addClass('shown').css('top', $window.scrollTop());
      $body.addClass('no-scroll');
    });
    $doc.on('click', '.map-popup_close', hideMapPopup);
    $doc.on('click', '.map-popup:not(img)', function(ev) {
      if (ev.target.className === "map-popup shown") {
        hideMapPopup();
      }
    });
  });

  function toggleMapPopup() {
    var winTop = $window.scrollTop();
    var oldSrc = $popupImage.prop('src');
    if (winTop < ($seaSlide.offset().top + 150)) {
      $popupImage.prop('src', 'images/ma/map-position-1.jpg');
    } else if (winTop > $landSlide.offset().top - 150) {
      $popupImage.prop('src', 'images/ma/map-position-3.jpg');
    } else {
      $popupImage.prop('src', 'images/ma/map-position-2.jpg');
    }
    if (oldSrc !== $popupImage.prop('src')) {
      $headerMapBtn.removeClass('bounce');
      clearTimeout(addClassTimeout);
      addClassTimeout = setTimeout(function() {
        $headerMapBtn.addClass('bounce');
      }, 100);
    }
  }

  function adjustWindow() {
    var winWidth = $window.width();
    // Init Skrollr for 768 and up
    if( winWidth >= 800) {
      s = skrollr.init({
        constants: {
          mainBoat: $mainBoat.offset().top,
          table: $table.offset().top,
          abukir: $abukir.offset().top
        },
        smoothScrolling: true,
        smoothScrollingDuration: 500
      });
    } else {
      /*jshint -W030 */
      s && s.destroy();
    }
  }

  function hideMapPopup() {
    $mapPopup.removeClass('shown');
    $body.removeClass('no-scroll');
  }

}());
