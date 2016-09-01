// requires: form-validation.js

// Main navigation hide and show on scroll
var $pageHeader = $('.page-header');
var $pageHeaderMenu = $('.page-header__menu');
var $window = $(window);
var $hamburgerIcon = $('.page-header__hamburger-ico');
var $mainNav = $('.main-nav');
var $mobileNav = $('.page-header__mobile');

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

  if($window.innerWidth() <= 768) {
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
});

$(window).resize(function(){
  var width = $(window).width();

  if (width > 768 && $mainNav.is(':hidden')) {
    $mainNav.removeAttr('style');
  }
});


$window.on('scroll resize', menuOnScroll);
$window.trigger('scroll');
