// requires: form-validation.js

// Main navigation hide and show on scroll
var $pageHeader = $('.page-header');
var $pageHeaderMenu = $('.page-header__menu');
var $window = $(window);

// Check if element in the view trigger skillbar animation
function menuOnScroll () {
  if ($window.scrollTop() > $pageHeader.outerHeight()) {
    $pageHeaderMenu.fadeIn(500);
  } else {
    $pageHeaderMenu.fadeOut(500);
  }
}

$window.on('scroll resize', menuOnScroll);
$window.trigger('scroll');
