$(window).load(function () {
    /*Функция записи общей высоты элемента в дата атрибут*/
    function saveTotalHeight(el) {
        var totalHeight = el.outerHeight(true);
        el.attr('data-height', totalHeight);
    }

    /*Функция записи высоты определенного количеста пунктов дата атрибут*/
    function saveFixedHeight(list, listItem, itemsLimit) {
        var items = list.find(listItem),
            itemsHeight = 0;

        for (var i = 0; i < itemsLimit; i++) {
            itemsHeight += $(items[i]).outerHeight(true);
        }

        list.attr('data-fixed-height', itemsHeight);
    };

    var mainBlock = '.footer-links-list',
        list = '.footer-links-list__list',
        listItem = '.footer-links-list__list-item',
        itemsLimit = 5;

    /*
    Для каждого списка сохраняем максимальную и фиксированную высоты;
    Если количество элементов в списке больше 5, устанавливаем высоту этого списка,
    равной значению фиксированной высоты и добавляем кнопку Еще
     */
    $(list).each(function () {
        var that = $(this),
            itemsCount = $(this).find(listItem).length;

        if(itemsCount > itemsLimit) {
            saveTotalHeight(that);
            saveFixedHeight(that, listItem, itemsLimit);
            that.height(that.attr('data-fixed-height'));
            $("<div class='footer-links-list__show-more'>Еще</div>").appendTo($(this).closest(mainBlock));
        }
    });


    /*При клике на кнопку еще увеличиваем либо уменьшаем высоту списка*/
    $(document).on('click', '.footer-links-list__show-more', function () {
        var list = $(this).siblings('.footer-links-list__list'),
            listHeight = list.attr('data-height'),
            listFiexdHeight = list.attr('data-fixed-height'),
            animationTime = 200;

        list.toggleClass('open');
        $(this).toggleClass('open');

        if(list.hasClass('open')) {
            list.stop(true);
            list.animate({
                height: listHeight + "px"
            }, animationTime);
        } else {
            list.stop(true);
            list.animate({
                height: listFiexdHeight + "px"
            }, animationTime);
        }
    });

});