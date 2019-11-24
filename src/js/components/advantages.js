$(function () {

  const advantages = $('.advantages ul');

  if (advantages.length) {
    repaintAdvantages();
  }

  $(window).on('resize', function () {
    if (advantages.length) {
      repaintAdvantages();
    }
  });

  function repaintAdvantages () {
    if ($(window).width() < 768) {
      if (!advantages.hasClass('slick-slider')) {
        advantages.slick({
          infinite: false
        });
      }
    } else {
      if (advantages.hasClass('slick-slider')) {
        advantages.slick('unslick');
      }
    }
  }

});
