$(function () {

  const itemSliderLarge = $('.item-image-large');
  const itemSliderSmall = $('.item-image-small');
  const params = $('.item-params');
  const colorSlider = $('.chooser.chooser-color ul');
  const itemList = $('.item .item-list');
  const itemImage = $('.item-image');
  const itemFormHeader = $('.item-form-header');
  const itemDelivery = $('.item-delivery');
  const itemForm = $('.item-form');

  itemRepaint();

  repaintColorSlider(colorSlider);

  if (params.length) {
    params.slick({
      slidesToShow: 3,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2
          }
        }
      ]
    });
  }

  if (itemSliderLarge.length && itemSliderSmall.length) {

    itemSliderLarge.slick({
      arrows: false,
      fade: true,
      asNavFor: '.item-image-small'
    });

    itemSliderSmall.slick({
      slidesToShow: 4,
      focusOnSelect: true,
      asNavFor: '.item-image-large',
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2
          }
        }
      ]
    });

  }

  $(window).on('resize', function () {
    repaintColorSlider(colorSlider);
    itemRepaint();
  });

  function repaintColorSlider(colorSlider) {
    if ($(window).width() < 768) {
      $(colorSlider).each(function () {
        if ($(this).hasClass('slick-slider')) {
          $(this).slick('unslick');
        }
      });
    } else {
      $(colorSlider).each(function () {
        if (!$(this).hasClass('slick-slider')) {
          $(this).slick({
            slidesToShow: 3,
            infinite: false
          });
        }
      });
    }
  }

  function itemRepaint() {
    if ($(window).width() < 768) {
      renderMobileItem();
    } else if ($(window).width() < 1200) {
      renderTabletItem();
    } else {
      renderDesktopItem();
    }
  }

  function renderMobileItem () {
    itemList.insertAfter(itemFormHeader);
    itemDelivery.insertAfter(itemForm);
  }

  function renderTabletItem () {
    itemList.appendTo(itemImage);
    itemDelivery.insertAfter(itemForm);
  }

  function renderDesktopItem () {
    itemList.appendTo(itemImage);
    itemDelivery.appendTo(itemForm);
  }

});