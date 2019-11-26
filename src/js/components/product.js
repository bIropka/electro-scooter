$(function () {

  const product = $('.product-list');

  if (product.length) {

    product.slick({
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

    product.each(function () {
      $(product).find('.slick-prev').addClass('disabled');
    });

    product.on('beforeChange', function(event, slick, currentSlide, nextSlide){
      setProductArrows($(this), nextSlide);
    });

  }

  function setProductArrows (product, nextSlide) {
    const prev = $(product).find('.slick-prev');
    const next = $(product).find('.slick-next');
    if (nextSlide === 0) {
      prev.addClass('disabled');
    } else {
      prev.removeClass('disabled');
    }
    if ($(product).find('.slick-slide.slick-active').last().index() === $(product).find('.slick-slide').length - 2) {
      next.addClass('disabled');
    } else {
      next.removeClass('disabled');
    }
  }

});
