// Helpers module

exports.linkDisabled = function() {
  return false;
};

exports.worksItemOnMobile = function() {
  if ( $(window).innerWidth() <= 768 ) {
    $(this).find('.works__item-overlay, .works__item-desk').css('opacity', '1');
  }
};

