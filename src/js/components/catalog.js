$(function () {

  const body = $('body');
  const catalogFilter = $('.catalog-filter');
  const catalogArticles = $('.catalog-articles');
  const catalogBanner = $('.catalog-banner');
  const breadcrumbs = $('.breadcrumbs');
  const catalogAside = $('.catalog-aside');
  const filterCost = document.getElementById('filter-cost');
  const filterCostHandles =[
    document.getElementById('filter-cost-from'),
    document.getElementById('filter-cost-to')
  ];

  catalogRepaint();

  setChooserColors();

  if (filterCost) {
    noUiSlider.create(filterCost, {
      start: [1000, 5000],
      step: 100,
      margin: 1000,
      connect: true,
      range: {
        'min': 0,
        'max': 8000
      }
    });
    filterCostHandles.forEach(function (element, index) {
      element.addEventListener('change', function () {
        filterCost.noUiSlider.setHandle(index, filterCostHandles[index].value);
      });
    });
    filterCost.noUiSlider.on('update', function (values, handle) {
      filterCostHandles[handle].value = Math.trunc(values[handle]);
    });
  }

  $(window).on('resize', function () {
    catalogRepaint();
  });

  function catalogRepaint () {
    if ($(window).width() < 1200) {
      renderMobileCatalog();
    }  else {
      renderDesktopCatalog();
    }
  }

  function renderMobileCatalog () {
    breadcrumbs.prependTo($('.header').next('.wrapper-inner'));
    if (catalogFilter.find('.modal-close').length === 0) {
      $('<div class="modal-close"></div>').prependTo(catalogFilter);
    }
    catalogFilter.appendTo('.modal[data-modal="filter"]');
    catalogArticles.insertAfter('.pagination');
    catalogBanner.insertAfter(catalogArticles);
  }

  function renderDesktopCatalog () {
    breadcrumbs.prependTo($('.catalog-content'));
    body.removeClass('modal-opened');
    $('.modal[data-modal="filter"]').css({
      'display': 'none',
      'top': 'auto'
    });
    if (catalogFilter.find('.modal-close').length) {
      $(catalogFilter.find('.modal-close')).detach();
    }
    catalogFilter.prependTo(catalogAside);
    catalogArticles.appendTo(catalogAside);
    catalogBanner.appendTo(catalogAside);
  }

  function setChooserColors () {
    $('.chooser-color li').each(function () {
      $(this).attr('data-background', $(this).find('span').eq(0).css('background-color'));
    });
  }

});