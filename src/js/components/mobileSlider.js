$(function () {

  const mobileSlider = $('.advantages ul, .reviews-rate');

  repaintMobileSlider(mobileSlider);

  $(window).on('resize', function () {
    repaintMobileSlider(mobileSlider);
  });

  function repaintMobileSlider(mobileSlider) {
    if ($(window).width() < 768) {
      $(mobileSlider).each(function () {
        if (!$(this).hasClass('slick-slider')) {
          $(this).slick();
        }
      });
    } else {
      $(mobileSlider).each(function () {
        if ($(this).hasClass('slick-slider')) {
          $(this).slick('unslick');
        }
      });
    }
  }

});
