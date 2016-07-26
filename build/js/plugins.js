// requires: app.js

// Progress bar plugin
// http://kimmobrunfeldt.github.io/progressbar.js/
$('.skillbar-bar').each(function() {
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

  var value = ($(this).attr('value') / 100);

  bar.animate(value, {
    step: function(state, bar) {
      bar.setText(Math.round(bar.value() * 100) + '%');
    }
  });
});


$(document).ready(function() {

  $('a[href="#"]').click(function() { return false; });

});

// $(window).load(function() {
// 	$(".loaderInner").fadeOut();
// 	$(".loader").delay(400).fadeOut("slow");
// });
