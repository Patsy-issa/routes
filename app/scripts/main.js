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
  $table = $('.crete-table'),
  $warriors = $('.ma-warriors'),
  $creditsWrapper = $('.credits-wrapper'),
  $map = $('#map'),
  ticked = false,
  resizeTimeout,
  s;

  $(function() {
    adjustWindow();
    setInterval(function() {
      $warriors.toggleClass('ma-warriors_toggle');
    }, 600);

    var map = new window.geoMap;
    map.$map = $map;
    map.geoJson = passages;
    map.accessToken = 'pk.eyJ1Ijoia25vb3pyb29tIiwiYSI6Ims1RWhpM0EifQ.tu8ILYm_dap3ZACv38w3nA';
    map.mapRef = 'knoozroom.b01da933';
    map.markerIcon = 'images/map/boat-kavala.png';
    map.setMap();
    $window.on('scroll', function() {
      if (isElementInViewport($('#map')) && !ticked) {
        map.tick();
        ticked = true;
      };
      headerCheck();
    });
  });

  $window.on('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(adjustWindow, 100);
  });

  function adjustWindow() {
    var winWidth = $window.width();
    // Init Skrollr for 768 and up
    if( winWidth >= 800) {
      s = skrollr.init({
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
