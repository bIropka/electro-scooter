$(function () {

  const sliders = $('.certificates-list, .product-list, .articles-list, .reviews-slider');

  if (sliders.length) {

    sliders.each(function () {
      if ($(this).hasClass('product-list') || $(this).hasClass('certificates-list')) {
        $(this).slick({
          slidesToShow: 4,
          infinite: false,
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
                infinite: false
              }
            },
            {
              breakpoint: 930,
              settings: {
                slidesToShow: 2,
                infinite: false
              }
            },
            {
              breakpoint: 768,
              settings: {
                infinite: true,
                slidesToShow: 1
              }
            }
          ]
        });
      } else {
        $(this).slick({
          slidesToShow: 2,
          vertical:false,
          infinite: false,
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 2,
                infinite: false,
                vertical: true
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                infinite: true,
                vertical: false
              }
            }
          ]
        });
      }
      $(this).find('.slick-prev').addClass('disabled');
    });

    sliders.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      setSliderArrows($(this), nextSlide);
    });

  }

  function setSliderArrows (slider, nextSlide) {
    const prev = $(slider).find('.slick-prev');
    const next = $(slider).find('.slick-next');
    const size = $(slider).find('.slick-slide').length;
    const visible = $(slider).find('.slick-slide.slick-active').length;
    const smallAmount = visible + 1 === size;
    if (nextSlide === 0) {
      prev.addClass('disabled');
      next.removeClass('disabled');
    } else {
      prev.removeClass('disabled');
    }
    if (smallAmount) {
      if (nextSlide + visible >= size) {
        next.addClass('disabled');
        prev.removeClass('disabled');
      } else {
        next.removeClass('disabled');
      }
    } else {
      if (nextSlide + visible > size - 1) {
        next.addClass('disabled');
        prev.removeClass('disabled');
      } else {
        next.removeClass('disabled');
      }
    }
  }

});
