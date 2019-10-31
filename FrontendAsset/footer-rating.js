$(document).ready(function () {

     /* Очистка Звезд */
     function removeStarsField(el, clName) {
        var stars = $(el);

        stars.each(function () {
            $(this).removeClass(clName);
        });
    }

    /* Закрашивание Звезд */
    function changeStarsField(el, clName, lastElIndex) {
        var stars = $(el);

        stars.each(function (index) {
            $(this).toggleClass(clName);

            if(index == lastElIndex) {
                return false;
            }
        });
    }

    var ratingContainer = '.footer-rating',
    starsContainer = '.footer-rating--authorized .footer-rating__stars-container',
    star = '.footer-rating--authorized .footer-rating__star',
    focusedStar = 'footer-rating__star--focused',
    activeStar = 'footer-rating__star--active',
    sendBtn = '.footer-rating--authorized .footer-rating__send',
    autorised = 'footer-rating--authorized',
    gratitude = '.footer-rating__gratitude',
    lastIndex,
    settedRating;


    /* Добавляем контенеру со звездами класс  footer-rating--hovered чтобы сбросить закрашенные звезды которые он выбрал*/
    $(document).on('mouseenter', starsContainer, function() {
        $(ratingContainer).addClass('footer-rating--hovered');
    })
    /* Удаляем у контенера со звездами класс  footer-rating--hovered при потере фокуса, чтобы вернуть выбранные звезды*/
    .on('mouseleave', starsContainer, function() {
        $(ratingContainer).removeClass('footer-rating--hovered');
    })
    /* Сбрасываем заливку выбранного рейтинга, при ховере на другую звезду */
    .on('mousemove', star, function() {
        var currentIndex = $(this).index();

        if(currentIndex != lastIndex && lastIndex != undefined) {
            $(ratingContainer).addClass('footer-rating--hovered');
        }
    })
    /* Закрашиваем звезды при ховере  */
    .on('mouseenter', star, function() {
        var currentIndex = $(this).index();

        removeStarsField(star, focusedStar);
        changeStarsField(star, focusedStar, currentIndex);
    })
    /* Удаляем закраску*/
    .on('mouseleave', star, function() {
        var stars = $(star);

        removeStarsField(stars, focusedStar);
    })
    /* Фиксируем рейтинг по клику */
    .on('click', star, function() {
        var currentIndex = $(this).index();

        $(ratingContainer).removeClass('footer-rating--hovered');

        removeStarsField(star, activeStar);
        changeStarsField(star, activeStar, currentIndex);

        lastIndex = currentIndex;
    })
    // После нажатия на кнопку "отправить" сбрасываем заливки звезд, возвращаем дефолтный рейтинг
    // Показываем плашку "Спасибо за регистрацию"
    .on('click', sendBtn, function(e) {
        settedRating = lastIndex + 1; //Получаем оценку выставленную пользователем


        $.post('/ajax/set-rating', {'vote': settedRating}, function (res) {
            if(!res.error) {
                $(ratingContainer +' [data-avg]').text(res.data.avg);
                $(ratingContainer +' [data-total]').text(res.data.total);
            }
            removeStarsField(star, activeStar);
            $(ratingContainer).removeClass(autorised).removeClass('active-user');
            $(gratitude).addClass('active');

            setTimeout(function(){
                $(gratitude).removeClass('active');
            },2000);
        });

        return false;
    })

    // При нажатии на блок с оценкой эмулируем ситуацию, что пользователь авторизировался
    $(document).on('click',ratingContainer + '.active-user', function () {
        if($(gratitude).hasClass('active')) {
           $(gratitude).removeClass('active');
        }
        
        $(ratingContainer).addClass(autorised);
    });
});