$(function () {

  const body = $('body');
  const listModal = $('.modal[data-modal="order"]');
  const list = $('.order-list');
  const aside = $('.order-aside');
  const title = $('.order h1');
  const form = $('.order-form');
  const order = $('.order');

  orderRepaint();

  $(window).on('resize', function () {
    orderRepaint();
  });

  function orderRepaint () {
    if ($(window).width() < 1200) {
      renderMobileOrder();
    }  else {
      renderDesktopOrder();
    }
  }

  function renderMobileOrder () {
    if (list.find('.modal-close').length === 0) {
      $('<div class="modal-close"></div>').prependTo(list);
    }
    list.prependTo(listModal);
    title.prependTo(form);
  }

  function renderDesktopOrder () {
    body.removeClass('modal-opened');
    listModal.css({
      'display': 'none',
      'top': 'auto'
    });
    if (list.find('.modal-close').length) {
      $(list.find('.modal-close')).detach();
    }
    list.appendTo(aside);
    title.prependTo(order);
  }

});