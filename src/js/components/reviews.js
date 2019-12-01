$(function () {

  const reviewsResultPercent = $('.reviews-result-percent');

  reviewsResultPercent.each(function () {
    const value = parseInt($(this).attr('data-result-percent'));
    const valueDOM = $(this).find('.reviews-result-percent-value');
    $('<div class="reviews-result-percent-color"></div>')
      .appendTo(valueDOM).css('width', value + '%');
  });

  $('.reviews-list .reviews-card p .show-all').on('click', function () {
    $(this).siblings('.all-text').css('display', 'inline');
    $(this).siblings('.dots').css('display', 'none');
    $(this).css('display', 'none');
  });

});