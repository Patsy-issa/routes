/* jshint devel:true */
'use strict';
(function() {
  var $doc = $(document),
  $menu = $('#menu'),
  $close = $('.menu-close'),
  $body = $('body'),
  $html = $('html'),
  $nav = $('.header-nav'),
  $window = $(window),
  $table = $('.crete-table.visible-desktop'),
  $warriors = $('.ma-warriors'),
  $creditsWrapper = $('.credits-wrapper'),
  $map = $('#map'),
  ticked = false,
  $mapText = $('.map-text_container'),
  $mainBoat = $('.main-boat'),
  $abukir = $('.abukir'),
  $mapPopup = $('.map-popup'),
  $popupImage = $mapPopup.find('img'),
  $landSlide = $('.land-slide-2'),
  $seaSlide = $('.sea-slide-1'),
  $headerMapBtn = $('.header-nav__map-btn'),
  resizeTimeout,
  mapPopupTimeout,
  addClassTimeout,
  delta,
  s;

  $(function() {
    adjustWindow();
    setInterval(function() {
      $warriors.toggleClass('ma-warriors_toggle');
    }, 600);

    var map = new window.geoMap;
    map.$map = $map;
    map.$mapText = $mapText;
    map.geoJson = passages;
    map.accessToken = 'pk.eyJ1Ijoia25vb3pyb29tIiwiYSI6Ims1RWhpM0EifQ.tu8ILYm_dap3ZACv38w3nA';
    map.mapRef = 'knoozroom.b01da933';
    map.markerIcon = 'images/map/boat-kavala.png';
    map.setMap();
    $window.on('scroll', function() {
      if (isElementInViewport($map) && !ticked) {
        map.tick();
        ticked = true;
      };
      clearTimeout(mapPopupTimeout);
      mapPopupTimeout = setTimeout(toggleMapPopup, 100);
      // headerCheck();
    });

    $window.on('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(adjustWindow, 100);
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
      s && s.destroy();
    }
  }

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

  function hideMapPopup() {
    $mapPopup.removeClass('shown');
    $body.removeClass('no-scroll');
  }

  var lastScrollTop = 0;

  function headerCheck() {
    var scrollTop = $window.scrollTop();
    var delta = scrollTop - lastScrollTop;

    lastScrollTop = scrollTop;

    if (delta >= 0) {
      // scroll down
      if (scrollTop < $nav.height()) {
        $nav.addClass('header-nav_is-shown');
      } else {
        $nav.removeClass('header-nav_is-absolute');
      }
      $nav.removeClass('header-nav_is-shown');
    } else {
      // scroll up
      if (scrollTop === 0 || scrollTop < $nav.height()) {
        $nav.addClass('header-nav_is-shown');
      } else {
        $nav.addClass('header-nav_is-shown').removeClass('header-nav_is-absolute');
      }
    }
  }

  function isElementInViewport (el) {

    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
  }

}());
