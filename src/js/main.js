$(function () {

  const wrapper = $('.wrapper');
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

  setTimeout(function () {
    wrapper.animate({opacity: 1}, 500);
  }, 500);

  pageRepaint();

  $(window).on('resize', function () {
    pageRepaint();
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

  $('.catalog-burger').on('click', function () {
    $(this).toggleClass('active');
    $(this).siblings('.catalog-filter').toggleClass('active');
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
      const value = $(this).html();
      const valueText = ($(this).find('.color-item').length)
        ? $(this).find('.color-item-name').text()
        : $(this).text();
      $(this).addClass('active');
      $(this).siblings('.active').removeClass('active');
      $(this).parents('[data-select]').find('[data-select-control]').html(value);
      $(this).parents('[data-select]').find('input').val(valueText);
      $(this).parents('[data-select]').removeClass('active');
    }
  });

  $('.amount-chooser .fa').on('click', function () {
    const amountDOM = $(this).parents('.amount-chooser').find('input');
    const amountValue = parseInt(amountDOM.val());
    if ($(this).hasClass('fa-chevron-left')) {
      if (amountValue > 1) {
        amountDOM.val(amountValue - 1);
      }
    } else if ($(this).hasClass('fa-chevron-right')) {
      amountDOM.val(amountValue + 1);
    }
    amountDOM.trigger('change');
  });

  $('.amount-chooser input').on('change', function () {
    const amountDOM = $(this).parents('.amount-chooser').find('input');
    const costDOM = $(this).parents('.amount-chooser').siblings('.card-cost');
    const costValue = costDOM.length
      ? parseInt($(this).parents('[data-cost]').attr('data-cost'))
      : false;
    costDOM.html(amountDOM.val() * costValue + ' <i class="fa fa-rub"></i>');
  });

  chooser.find('.chooser-value').on('click', function () {
    $(this).parents('.chooser').toggleClass('active');
  });

  chooser.find('ul li').on('click', function () {
    if (!$(this).hasClass('active')) {
      const value = $(this).text();
      $(this).siblings().removeClass('active');
      $(this).addClass('active');
      $(this).parents('.chooser').find('.chooser-value').text(value);
      $(this).parents('.chooser').removeClass('active');
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

});
