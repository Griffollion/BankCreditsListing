$(document).on("set-src-img",function() {
    $(".load_image:not(.load_image_done)").each(function(){
        var t = $(this), offset = t.offset();
        if(($(window).scrollTop() + $(window).height()*1.5) >= offset.top) {
            !(t.data('url-img-bg')) ? t.attr("src", t.data('url-img')) : t.css({'background-image': 'url('+t.data('url-img-bg')+')'});
            t.addClass("load_image_done");
        }
    });
});
$(document).trigger('set-src-img');
setInterval(function() {
    $(document).trigger('set-src-img');
}, 50);

var pl = '', position = 0; //партнерская ссылка

function requestCounter(event) {
    if(typeof(yaCounter46623189) != "undefined"){
        yaCounter46623189.reachGoal(event);
        ga('send', 'event', 'Buttons', 'click', event);
    }
}

if(document.documentElement.innerHTML.indexOf('<!-- nginx -->') === 0) {
    $.get('/ajax/refresh-csrf', function (response) {
        var params = JSON.parse(response);
        $.each(params, function(i, v){
            $('meta[name='+i+']').attr('content', v);
        });
    });
}



function copyLink(url) {
    var container_link = $('.copy-link-container');
    window.getSelection().removeAllRanges();

    container_link.html('<span class="js-copylink">'+url+'</span>');
    // Выборка ссылки с электронной почтой
    var link = document.querySelector('.js-copylink');
    var range = document.createRange();
    range.selectNode(link);
    window.getSelection().addRange(range);

    try {
        // Теперь, когда мы выбрали текст ссылки, выполним команду копирования
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copy link command was ' + msg);
    } catch(err) {
        console.log('Oops, unable to copy');
    }
    container_link.html('');
    // Снятие выделения
    window.getSelection().removeAllRanges();
}

/**
 * Фиксация событий в трекере
 * pl - parthner link партнерская ссылка.
 * Значение должно быть определено до вызова функции, например,
 * через функцию getParthnerLink
 * @param event - событие из ЯМ(request, html, similar, ...)
 * @param bank - название(sef_alias) банка(мфо)
 * @param type - страница события (credis, zaymy)
 * @param location - позиция на странице
 */
function trackingCounter(event, bank, type, location) {
    getParthnerLink(event, bank, type, location);
    location = (typeof location != "undefined") ? location : position;
    if (typeof(tracking) !== "undefined") {
        tracking.click(event, bank, type, location, pl);
        pl = '';
    }
}

/**
 * Достает партнерскую ссылку из requestBankCounter.
 * Используется для листингов, либо для тегов, в которых есть
 * событие onclick=requestBankCounter
 * @param event
 * @param bank
 * @param type
 * @param location
 */
function getParthnerLink(event, bank, type, location) {
    if(pl == ""){
        var bank_counter = '\''+ event +'\', \''+ bank +'\', \''+ type +'\'',
            bank_counter1 = '\"'+ event +'\", \"'+ bank +'\", \"'+ type +'\"';

        if(typeof location != 'undefined'){
            bank_counter = bank_counter + ', \''+ location +'\'',
                bank_counter1 = bank_counter1 + ', \"'+ location +'\"';
        }
        var span_pl = $('[onclick*="trackingCounter(' + bank_counter + ')"], [onclick*=\'trackingCounter(' + bank_counter1 + ')\']');
        if(span_pl.length){
            position = (typeof span_pl.data('position') != "undefined") ? span_pl.data('position') : position;
            //location имеет преимущество перед span_pl.data('position')
            position = (typeof location != "undefined") ? location : position;

            if(typeof span_pl.attr('data-link') != 'undefined'){
                pl = JSON.parse(span_pl.attr('data-link'));
            } else if(typeof span_pl.attr('href') != 'undefined') {
                pl = span_pl.attr('href');
            }

        }
    }
}

function sendViewPage(referer) {
    var url = location.pathname + decodeURIComponent(location.search);
    if(typeof yaCounter46623189 !== "undefined"){
        yaCounter46623189.hit(url, {referer: referer});
    }
    if("undefined" !== typeof ga){
        ga("set","page", url);
        ga("send","pageview");
    }
}

$(document).on('click', '.encoded-link', function () {
    var t = $(this);
    if(t.data('url').length) {
        var url = atob(t.data('url'));
        if(t.hasClass('t_blank')){
            window.open(url);
        } else {
            location.href = url;
        }
        return false;
    }
});

function a() {
    var t = $("div.ic-fb"), e = $("div.ic-vk"), i = $("div.ic-tw"), n = $("div.ic-ok");
    t.on("click", function () {
        window.open("https://www.facebook.com/Myfinby")
    }), e.on("click", function () {
        window.open("https://vk.com/myfinby")
    }), i.on("click", function () {
        window.open("https://twitter.com/Myfinby")
    }), n.on("click", function () {
        window.open("https://www.ok.ru/myfinby")
    })
}
a();


function isEmpty(value) {
    return inArray(value, [null, 0, '', 'undefined', undefined, '0'])
}
function inArray(need, array) {
    return $.inArray(need, array) !== -1;
}

function clearObject(object) {
    var newObject = {};

    $.each(object, function (name, value) {
        if(!isEmpty(value)) {
            newObject[name] = value;
        }
    });

    return newObject;
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


function divided(str) {
    return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}

function removeSpaces(str) {
    return str.replace(/\s/g, "");
}

function pluralForm(n, form1, form2, form5) {
    n = Math.abs(n) % 100;
    n1 = n % 10;
    if (n > 10 && n < 20) return form5;
    if (n1 > 1 && n1 < 5) return form2;
    if (n1 == 1) return form1;
    return form5;
}

Number.prototype.format = function() {
    var num = this.toFixed(0);
    return num.replace(/\d(?=(\d{3})+$)/g, '$& ');
};

function getCsrf(){
    var obj = {};
    obj[$('meta[name="csrf-param"]').attr('content')] = $('meta[name="csrf-token"]').attr('content');
    return obj;
}

$(function() {
    $(window).scroll(function() {
        if($(this).scrollTop() != 0) {
            $('#scroll-up').fadeIn();

        } else {
            $('#scroll-up').fadeOut();
        }
    });

    $('#scroll-up').click(function() {
        $('body,html').animate({scrollTop:0},800);
    });
});

(function() {
    $('.radio-buttons label').on('mouseup', function(e){
        if(e.which == 1) { // left mouse button only
            var t = $(this);
            t.closest('.radio-buttons').find('label').removeClass('btn-default-active');
            t.addClass('btn-default-active');
        }
    });
    $('.radio-buttons').on('setValue', function(e, val){
        var t = $(this);
        t.find('label').removeClass('btn-default-active');
        t.find('input[value="'+val+'"]').closest('label').addClass('btn-default-active');
    });
    $(document)
        .on("keydown", ".currency_inp", function(){
            if (
                // Разрешаем: backspace, delete, tab и escape
            event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
            // Разрешаем: Ctrl+A
            (event.keyCode == 65 && event.ctrlKey === true) ||
            // Разрешаем: home, end, влево, вправо
            (event.keyCode >= 35 && event.keyCode <= 39)) {
                // Ничего не делаем
                return true;
            } else {
                // Убеждаемся, что это цифра, и останавливаем событие keypress
                if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault();
                }
            }
        })
        .on('hit-counters', function(e, url){
            // Счетчики
            if(typeof(yaCounter46623189) !== 'undefined')
                yaCounter46623189.hit(url, {referer: document.referrer});
            if(typeof(ga) !== 'undefined'){
                ga('set', 'page', url);
                ga("send","pageview");
            }
        })
        .ready(function(){
            if(window.location.hash.indexOf('#pos-') === 0){
                var el = $('[data-key="'+window.location.hash.replace('#pos-', '')+'"]');
                if(el.length == 1){
                    el.addClass('selected');
                }
            }
        })
        .on('click', '[data-bank-search-btn]', function() {
            $(this).toggleClass('active').siblings('[data-bank-search-content]').toggleClass('active');
        })
        .on('click', function(ev) {
            var el = $('[data-bank-search-content]');
            var btn = $('[data-bank-search-btn]');
            if(el.has(ev.target).length === 0 && !btn.is(ev.target)) {
                el.removeClass('active');
                btn.removeClass('active');
            }
        })
        .on('click', '.unset', function(e){
            var link = $(this);
            $.ajax({
                'url': '/ajax/unset-city',
                'success' : function (response) {
                    window.location.href = link.attr('href');
                }
            });
            e.preventDefault();
        })
})();

$(function() {

    // ---------------------------------------------------------------------------
    // search logic
    // ---------------------------------------------------------------------------
    $('.main_nav__btn-search').on('click', function(ev) {
        $(this).toggleClass('active');
        $('.main_nav__search').toggleClass('active');
    });

    $(document).on('click', function(ev) {
        !$('.main_nav__btn-search').is(ev.target)
        && !$('.main_nav__search').is(ev.target)
        && $('.main_nav__search').removeClass('active')
        && $('.main_nav__btn-search').removeClass('active');
    });

    // ---------------------------------------------------------------------------
    // fix menu
    // ---------------------------------------------------------------------------
    var main_nav = $('.main_nav');
    var windowWidth = $(window).width();
    if (main_nav.length && 991 < windowWidth) {
        var headerHeight = $('.header').height();
        $(document).on('scroll', function() {
            $(this).scrollTop() > headerHeight ? main_nav.addClass('fixed') : main_nav.removeClass('fixed')
        })
    }

    // ---------------------------------------------------------------------------
    // media menu
    // ---------------------------------------------------------------------------
    var screen = window.matchMedia('screen and (max-width: 991px)');
    screen.addListener(mainMenu);
    mainMenu(screen);

    function mainMenu(screen) {
        if (screen.matches) {
            $(document)
            // открытие меню
                .on('click', '[data-main_nav-btn]', openMobMenu)

                // открытие под меню
                .on('click', '.main_nav__item-sub', function() {
                    $('.main_nav').css('overflow', 'hidden').scrollTop(0);
                    $(this).children('.main_nav__sub').addClass('active');
                    $('[data-main_nav-btnBack]').addClass('active');
                })

                .on('click', '.main-nav_link--straight', function (e) {
                    e.stopPropagation();
                })

                // закрытие под меню
                .on('click', '[data-main_nav-btnBack]', function() {
                    $('.main_nav').css('overflow', 'auto');
                    $(this).removeClass('active');
                    $('.main_nav__sub').removeClass('active');
                });

            function openMobMenu() {
                if ($('.main_nav').hasClass('active')) {
                    $(this).removeClass('active');
                    $('.main_nav').removeClass('active');
                    $('.main_nav__sub').removeClass('active');
                    $('[data-main_nav-btnBack]').removeClass('active');
                    $('.overlay').removeClass('active');
                    $('html, body').css('overflow', 'auto');
                    $('.main_nav').css('overflow', 'auto');
                } else {
                    $(this).addClass('active');
                    $('.main_nav').addClass('active');
                    $('.overlay').addClass('active');
                    $('html, body').css('overflow', 'hidden');
                }

            }

            $('.overlay').on('click', overlayMobHide);
            function overlayMobHide() {
                $(this).removeClass('active');
                $('.main_nav').removeClass('active');
                $('.main_nav__sub').removeClass('active');
                $('[data-main_nav-btn]').removeClass('active');
                $('[data-main_nav-btnBack]').removeClass('active');
                $('.overlay').removeClass('active');
                $('html, body').css('overflow', 'auto');
            }
        }
    }
});

$(document)
    .on('click', '.js_link_blank', function () { var link = $.parseJSON($(this).data('link')); window.open(link); });

$(window).load(function () {
    if(typeof (tracking) != "undefined"){
        tracking.view();
    }
});
/*Init Slider for footer links  инициализация такая же как и в других js*/
var mobSlider = '[data-mob-slider]';

function initSlider() {
    var currentScreenWidth = $(window).width();
    if (currentScreenWidth < 992) {
        $(mobSlider).slick({
            arrows: false,
            dots: true,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }
};

initSlider();

$(window).on('resize',function () {
    initSlider();
});




$(window).load(function () {
    if($('.table-product-listing').length && location.search.length > 0) {
        var headerHeight = 330;

        $("html, body").stop(true).animate({
            scrollTop: $('.table-product-listing').offset().top - headerHeight
        }, 500);
    }

})