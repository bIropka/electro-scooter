$(function () {

    const wrapper = $('.wrapper');

    setTimeout(function () {
        wrapper.animate({opacity: 1}, 500);
    }, 500);

    pageRepaint();

    $(window).on('resize', function () {
        pageRepaint();
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

    $(document).on('click', function (event) {
        const target = $(event.target);

        if (target.closest('[data-select]').length === 0) $('.active[data-select]').removeClass('active');

    });

    function pageRepaint() {
        if ($(window).width() < 768) {

        } else if ($(window).width() < 1200) {

        } else {

        }
    }

});
