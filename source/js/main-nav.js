// Main navigation module

// Cache DOM
var $window = $(window);
var $pageHeader = $('.page-header');
var $pageHeaderMenu = $('.page-header__menu');
var $pageHeaderMenuHeight = $pageHeaderMenu.outerHeight();
var $mainNav = $('.main-nav');
var $mainNavHeight = $mainNav.outerHeight();
var $hamburgerIcon = $('.page-header__hamburger-ico');


// Check if element in the view, then trigger skillbar animation
exports.menuOnScroll = function() {
  if ( $window.scrollTop() > ($pageHeader.outerHeight() * 3/4) ) {
    $pageHeaderMenu.fadeIn(500);
  } else {
    $pageHeaderMenu.fadeOut(500);
  }
};


// Toggle main navigation on mobile devices
exports.menuToggle = function() {
  $mainNav.slideToggle();
};


// Smooth scroll animation to block when main navigation link clicked
exports.scrollTo = function(e) {
  e.preventDefault();
  var href = $(this).attr('href');
  var delay = 1000;

  function slideUp() {
    $mainNav.slideUp();
  }

  if ( $window.innerWidth() <= 768 ) {
    $('html, body').animate({
      scrollTop: $(href).offset().top - ($pageHeaderMenuHeight - $mainNavHeight)
    }, delay, slideUp);
  } else {
    $('html, body').animate({
      scrollTop: $(href).offset().top - $pageHeaderMenuHeight
    }, delay);
  }
};


// Fix navigation disappearing when viewport changes from mobile to desktop width
exports.onViewportChange = function() {
  var width = $window.width();

  if ( width > 768 && $mainNav.is(':hidden') ) {
    $mainNav.removeAttr('style');
  }
};
