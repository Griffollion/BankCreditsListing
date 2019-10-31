$(document).ready(function () {
    /*Показ-скрытие элемента в пределах блока*/
    (function () {
        var root = '[data-swich-height-root]',
            content = '[data-swich-height-content]',
            btn = '[data-swich-height]',
            hiddenEl = '[data-swich-hidden]';


        $(document).on('click', btn, function () {
            var showBtn = $(this);

            showBtn.closest(root).find(content).show();

            if( showBtn.siblings($(hiddenEl).length > 0)) {
                showBtn.hide();
                showBtn.siblings($(hiddenEl)).css({'display':'flex'});
            }
        });
    }());
    /*Показ-скрытие элемента в пределах блока end*/

    /*Показ полной высоты блока*/
    (function () {
        var root = '[data-fixed-height-container]',
            content = '[data-fixed-height]',
            btn = '[data-show-full-height]';

        $(content).each(function () {
           $(this).attr('data-default-height', $(this).outerHeight());
           if($(this).outerHeight() > $(this).attr('data-fixed-height')) {
                $(this).css('height', $(this).attr('data-fixed-height')+'px');
                $(this).siblings('[data-show-full-height]').removeClass('hidden');
           }
        });

        $(document).on('click', btn, function () {
            var showBtn = $(this),
                container = showBtn.closest(root).find(content);
            container.css('height', container.attr('data-default-height')+'px');
            showBtn.hide();
        });
    }());
    /*Показ полной высоты блока end*/
});