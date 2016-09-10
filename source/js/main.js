// Load external modules
var formValidation = require('./form-validation');
var mainNav = require('./main-nav');
var skillbar = require('./skillbar');
var helpers = require('./helpers');


function _registerEventHandlers() {
  $(window).on('scroll resize', mainNav.menuOnScroll);
  $(window).trigger('scroll');
  $(window).on('resize', mainNav.onViewportChange);
  $('a[href="#"]').on('click', helpers.linkDisabled);
  $('.page-header__hamburger-ico').on('click', mainNav.menuToggle);
  $('.main-nav__link').on('click', mainNav.scrollTo);
}

_registerEventHandlers();
formValidation.validate();
skillbar.skillbarRender();
