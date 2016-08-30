// requires: app.js

// Progress bar plugin
// http://kimmobrunfeldt.github.io/progressbar.js/
$('.skillbar__bar').each(function() {
  var $this = $(this);

  var bar = new ProgressBar.Line(this, {
    strokeWidth: 3,
    easing: 'easeInOut',
    duration: 1400,
    color: '#000',
    trailColor: '#ccc',
    trailWidth: 2,
    svgStyle: {width: '100%', height: '100%'},
    text: {
      style: {
        // Text color.
        // Default: same as stroke color (options.color)
        color: '#645a56',
        position: 'absolute',
        right: '10px',
        top: '-15px',
        padding: 0,
        margin: 0,
        transform: null
      },
      autoStyleContainer: false
    }
  });


  // Progress bar animation on scroll
  var skillbar = $('.skillbar');
  var $window = $(window);

  // Check if element in the view trigger skillbar animation
  function checkView () {
    var windowHeight = $window.height();
    var windowTopPosition = $window.scrollTop();
    var windowBottomPosition = (windowTopPosition + windowHeight);

    $.each(skillbar, function() {
      var $element = $(this);
      var elementHeight = $element.outerHeight();
      var elementTopPosition = $element.offset().top;
      var elementBottomPosition = (elementTopPosition + elementHeight);

      // check to see if this current container is within viewport
      if ((elementBottomPosition >= windowTopPosition) && (elementTopPosition <= windowBottomPosition)) {
        skillbarAnimate();
      }
    });
  }

  // Start skillbar animation
  function skillbarAnimate () {
    var value = ($this.attr('value') / 100);

    bar.animate(value, {
      step: function(state, bar) {
        bar.setText(Math.round(bar.value() * 100) + '%');
      }
    });
  }

  $window.on('scroll resize', checkView);
  $window.trigger('scroll');
});


$(document).ready(function() {

  $('a[href="#"]').click(function() { return false; });

});
