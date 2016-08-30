// requires: form-validation.js

// Main navigation hide and show on scroll
var $pageHeader = $('.page-header');
var $pageHeaderMenu = $('.page-header__menu');
var $window = $(window);
var $hamburgerIcon = $('.page-header__hamburger-ico');
var $mainNav = $('.main-nav');

// Check if element in the view trigger skillbar animation
function menuOnScroll () {
  if ($window.scrollTop() > $pageHeader.outerHeight() * 3/4) {
    $pageHeaderMenu.fadeIn(500);
  } else {
    $pageHeaderMenu.fadeOut(500);
  }
}

// Toggle navigation menu on click
$hamburgerIcon.on('click', function () {
  $mainNav.slideToggle();
});

// Scroll to block
$('.main-nav__link').on('click', function(e) {
  e.preventDefault();
  var href = $(this).attr('href');

  $('html body').animate({
    scrollTop: $(href).offset().top - $pageHeaderMenu.outerHeight()
  }, 1000);

  $mainNav.slideUp();
});

$window.on('scroll resize', menuOnScroll);
$window.trigger('scroll');
