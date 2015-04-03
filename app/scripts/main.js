/* jshint devel:true */
'use strict';
(function() {
  var $doc = $(document),
  $menu = $('#menu'),
  $close = $('.menu-close'),
  $body = $('body'),
  $html = $('html');

  $doc.on('click', '.header-nav__menu-btn, .menu-close', function() {
    $menu.toggleClass('menu_open');
    $body.toggleClass('no-scroll');
  });
}());
