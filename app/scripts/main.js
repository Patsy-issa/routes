/* jshint devel:true */
'use strict';
(function() {
  var $doc = $(document),
  $menu = $('#menu'),
  $close = $('.menu-close'),
  $body = $('body'),
  $html = $('html'),
  $nav = $('.header-nav'),
  $window = $(window);

  $doc.on('click', '.header-nav__menu-btn, .menu-close', function() {
    $menu.toggleClass('menu_open').css('top', $window.scrollTop());
    $body.toggleClass('no-scroll');
  });
  $window.on('scroll', function() {
    headerCheck();
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
}());
