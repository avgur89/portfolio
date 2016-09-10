// Main navigation module

// Cache DOM
var $window = $(window);
var $pageHeader = $('.page-header');
var $pageHeaderMenu = $('.page-header__menu');
var $hamburgerIcon = $('.page-header__hamburger-ico');
var $mainNav = $('.main-nav');


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

  if( $window.innerWidth() <= 768 ) {
    $('html body').animate({
      scrollTop: $(href).offset().top - ($pageHeaderMenu.outerHeight() - $mainNav.outerHeight())
    }, 1000, function() {
      $mainNav.slideUp();
    });
  } else {
    $('html body').animate({
      scrollTop: $(href).offset().top - $pageHeaderMenu.outerHeight()
    }, 1000);
  }
};


// Fix navigation disappearing when viewport changes from mobile to desktop width
exports.onViewportChange = function() {
  var width = $window.width();

  if ( width > 768 && $mainNav.is(':hidden') ) {
    $mainNav.removeAttr('style');
  }
};
