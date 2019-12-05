$(function () {

  const wrapper = $('.wrapper');
  const body = $('body');
  const headerBottom = $('.header-bottom .wrapper-inner');
  const headerNav = $('.header-nav');
  const headerContacts = $('.header .contacts');
  const headerAddress = $('.header .address-hours');
  const headerSearch = $('.header-search');
  const headerCart = $('.header-cart');
  const footerSubscribe = $('.footer-subscribe');
  const footerCopyrights = $('.footer-copyrights');
  const footerSocial = $('.footer-social');
  const chooser = $('.chooser');
  const chooserColor = $('.chooser.chooser-color');
  const colorItem = $('.color-list li');

  setTimeout(function () {
    wrapper.animate({opacity: 1}, 500);
  }, 500);

  pageRepaint();

  setColors();

  $(window).on('resize', function () {
    pageRepaint();
  });

  $('[data-removable-close]').on('click', function () {
    $(this).parents('[data-removable]')
      .fadeOut(400, function () {
        $(this).detach();
      });
  });

  $('.header-search button[type="submit"]').on('click', function (event) {
    event.preventDefault();
    const form = $(this).parents('.header-search');
    if ($(window).width() < 1200) {
      if (form.hasClass('active')) {
        form.submit();
      } else {
        form.addClass('active');
      }
    } else {
      form.submit();
    }
  });

  $('.field-rate-list i').on('click', function () {
    const value = $(this).index() + 1;
    $(this).parents('.field-rate').find('input[type="hidden"]').val(value);
    $(this).parents('.field-rate-list').find('i').each(function (index, element) {
      if (index >= value) {
        $(element).removeClass('fa-red').addClass('fa-grey');
      } else {
        $(element).removeClass('fa-grey').addClass('fa-red');
      }
    });
  });

  $('.field-file input[type="file"]').on('change', function () {
    const valArray = $(this).val().split('\\');
    $(this).siblings('.field-file-text').text(valArray[valArray.length - 1]);
  });

  $('input[type="tel"]').mask("+7 (999) 999-999-99");

  $('.header-burger').on('click', function () {
    $(this).parents('.header').toggleClass('menu-opened');
  });

  $('[data-call-modal]').on('click', function () {
    const target = $(this).attr('data-call-modal');
    const scrollValue = $(window).scrollTop();
    const modal = $(`[data-modal="${target}"]`);
    body.addClass('modal-opened');
    modal.fadeIn(300).css({
      'display': 'flex',
      'top': `${scrollValue}px`
    });
    $(document).on('touchmove', function (event) {
      event.preventDefault();
    });
  });

  $('.modal').on('click', function (event) {
    const target = $(event.target);
    if (target.hasClass('modal-close') || !target.closest('.modal-inner').length) {
      $(this).fadeOut(300);
      body.removeClass('modal-opened');
      $(document).off('touchmove');
    }
  });

  $('[data-select-control]').on('click', function () {
    if ($(this).parents('[data-select]').hasClass('active')) {
      $(this).parents('[data-select]').removeClass('active');
    } else {
      $('[data-select]').removeClass('active');
      $(this).parents('[data-select]').addClass('active');
    }
  });

  $('[data-select] ul li').on('click', function () {
    if (!$(this).hasClass('active')) {
      const value = $(this).text();
      $(this).addClass('active');
      $(this).siblings('.active').removeClass('active');
      $(this).parents('ul').siblings('[data-select-control]').text(value);
      $(this).parents('ul').siblings('input').val(value);
      $(this).parents('[data-select]').removeClass('active');
    }
  });

  $('.amount-chooser-control').on('click', function () {
    const amountDOM = $(this).siblings('input');
    const amountValue = parseInt(amountDOM.val());
    if ($(this).hasClass('amount-chooser-minus')) {
      if (amountValue > 1) {
        amountDOM.val(amountValue - 1);
      }
    } else if ($(this).hasClass('amount-chooser-plus')) {
      amountDOM.val(amountValue + 1);
    }
    amountDOM.trigger('change');
  });

  $('.amount-chooser input').on('change', function () {
    const costDOM = $(this).parents('.amount-chooser').siblings('.card-cost').children('.card-cost-value');
    const amount = parseInt($(this).val());
    const itemCost = parseInt($(this).parents('.amount-chooser').attr('data-cost'));
    costDOM.text(amount * itemCost + ' руб.');
  });

  colorItem.on('click', function () {
    if (!$(this).hasClass('active')) {
      $(this).addClass('active');
      $(this).siblings().removeClass('active');
    }
  });

  chooser.find('.chooser-value').on('click', function () {
    if ($(this).closest('.catalog-brands').length && $(window).width() > 767
      || $(this).closest('.chooser-color').length && $(window).width() > 767) {
      console.log('hello');
      return false;
    } else {
      if ($(this).parents('.chooser').hasClass('active')) {
        $(this).parents('.chooser').removeClass('active');
      } else {
        chooser.removeClass('active');
        $(this).parents('.chooser').addClass('active');
      }
    }
  });

  chooser.find('ul li').on('click', function () {
    if (!$(this).hasClass('active') && $(this).closest('.catalog-brands').length === 0) {
      const value = $(this).html();
      $(this).siblings().removeClass('active');
      $(this).addClass('active');
      $(this).parents('.chooser').removeClass('active');
      if ($(this).closest('.chooser-color').length) {
        if ($(window).width() < 768) {
          $(this).parents('ul').siblings('.chooser-value').html(value);
        }
        $(this).parents('ul').siblings('input').val($(this).find('.chooser-color-text').text());
      } else {
        $(this).parents('ul').siblings('.chooser-value').html(value);
        $(this).parents('ul').siblings('input').val(value);
      }
    }
  });

  chooserColor.find('ul li').on('click', function (event) {
    event.preventDefault();
    if (!$(this).hasClass('active')) {
      const value = $(this).find('.chooser-color-text').text();
      $(this).parents('ul').siblings('input').val(value);
    }
  });

  $(document).on('click', function (event) {
    const target = $(event.target);

    if (target.closest('[data-select]').length === 0) $('.active[data-select]').removeClass('active');
    if (target.closest('.header-search').length === 0) $('.header-search').removeClass('active');
    if (target.closest('.chooser').length === 0) chooser.removeClass('active');

  });

  function pageRepaint() {
    if ($(window).width() < 768) {
      renderMobileHeader();
      renderMobileFooter();
    } else if ($(window).width() < 1200) {
      renderTabletHeader();
      renderTabletFooter();
    } else {
      headerSearch.removeClass('active');
      $('.header').removeClass('menu-opened');
      renderDesktopHeader();
      renderDesktopFooter();
    }
  }

  function renderMobileHeader() {
    headerSearch.insertBefore(headerCart);
    headerContacts.appendTo(headerNav);
    headerAddress.appendTo(headerNav);
  }

  function renderTabletHeader() {
    headerSearch.insertBefore(headerCart);
    headerContacts.appendTo(headerBottom);
    headerAddress.appendTo(headerNav);
  }

  function renderDesktopHeader() {
    headerSearch.appendTo(headerBottom);
    headerContacts.appendTo(headerBottom);
    headerAddress.appendTo(headerBottom);
  }

  function renderMobileFooter() {
    footerSubscribe.insertAfter(footerCopyrights);
  }

  function renderTabletFooter() {
    footerSubscribe.insertBefore(footerSocial);
  }

  function renderDesktopFooter() {
      footerSubscribe.insertBefore(footerSocial);
  }

  function setColors () {
    colorItem.each(function () {
      $(this).attr('data-background', $(this).css('background-color'));
    });
  }

});
