$(document).ready(function () {
    /*initializing select*/
    $('.select-container select').selectric({
        arrowButtonMarkup: ''
    });


    var loanItem = '.credits-list-item.credits-list-item--requirements',
        loanRequirements = '.credit-requirements',
        requirementsBtn = '.credits-list-item__requirements-btn',
        requirementsCloseBtn = '.credit-requirements__close',
        subItemsBtn = '.credits-list__more-items';

    //Останавливаем всплытие событий у ссылок кредита, чтобы по клику на них не отображался блок с доп. инфой
    $(document).on('click', loanItem + ' a' + ', ' + loanRequirements, function (e) {
        e.stopPropagation();
    });

    //Показываем блок с доп инфой у кредита
    $(document).on('click', loanItem, function () {
        $(this).hasClass('requirements-show') ? requestCounter('hide_more_information') : requestCounter('3dots');
        $(this).toggleClass('requirements-show');
        $(this).find(loanRequirements).toggleClass('visible');
        $(this).find(requirementsBtn).toggleClass('invisible');
    })
    //Скрываем блок с доп инфой у кредита
        .on('click', requirementsCloseBtn, function (e) {
            e.stopPropagation();
            requestCounter('hide_more_information');
            $(this).closest(loanItem).removeClass('requirements-show');
            $(this).closest(loanItem).find(loanRequirements).removeClass('visible');
            $(this).closest(loanItem).find(requirementsBtn).removeClass('invisible');
        })

        //
        .on('click', subItemsBtn, function (e) {
            e.preventDefault();
            var toogle = function (item) {
                var mainContainer = $(item).closest('.credits-list__item');
                $(item).toggleClass('active');
                mainContainer.toggleClass('subittems-on');
                mainContainer.find('.credits-list__sub-items').toggleClass('active');

                if($(item).hasClass('active')) {
                    requestCounter('more_credits');
                    $(item).find('.name').text('Скрыть');
                    $(item).parent('.credits-list__item').find('img:not(.load_image_done)').addClass('load_image')
                } else {
                    requestCounter('hide_more_credits');
                    $(item).find('.name').text('Еще');
                }
            };

            if($(this).hasClass('lazy-load')) {
                var self = this;
                $.get('/ajax/load-more-product', {params: $(this).data('load')}, function (res) {
                    $(self).removeClass('lazy-load')
                        .data('load', '')
                        .closest('.credits-list__item')
                        .find('.credits-list__sub-items')
                        .html(res);

                    $(self).closest('.credits-list__item').find('.credits-list__sub-items [data-bank-link]').attr('href', $(self).closest('.credits-list__item').find('[data-bank-link]').attr('href'));
                    toogle(self);
                })
            } else {
                toogle(this);
            }
        })
});