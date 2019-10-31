(function($){
    $(document)
        /**
         * Функция клика по ссылке на модальные окна
         */
        .on('click', '[data-toggle="modal"]', function(){
            var t = $(this), selector = t.data('target'), params = $('[data-id="'+selector+'"]');
            if($(selector).length == 0){
                if(params.length == 1) {
                    $.ajax({
                        url: '/ajax/load-modal',
                        data: Object.assign(params.data(), getCsrf()),
                        type: 'post',
                        success: function (content) {
                            $('span.mod_params:last').after(content);
                            $('.modal').modal('hide');
                            $(selector).modal();
                        }
                    });
                }
            }
        })
})(jQuery);