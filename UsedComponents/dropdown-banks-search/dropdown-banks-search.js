$(document).ready(function () {
    function dropdownBanksSearchToggle() {
        var toggleBtn = "[data-toggle='dropdown-banks-search']",
            dropdownContainer  = '.dropdown-banks-search-container',
            dropdownBanksSearch = '.dropdown-banks-search';

        $(toggleBtn).on('click', function () {
            requestCounter('change_bank_new');
            $(this).closest(dropdownContainer).find(dropdownBanksSearch).addClass('active');
        });
    }

    dropdownBanksSearchToggle();


    $(document)
        .off('autoComplete', '.autoCompleteDropDown')
        .on('autoComplete', '.autoCompleteDropDown', function(){
            var t = $(this), v = t.val(), data = t.data();

            data['str'] = v;
            if (data['params'] === null|| typeof(data['params']) === 'undefined')
            {
                data['params']=[];
            }
            data['params']['referrer'] = data['params']['referrer']
                ? data['params']['referrer']
                : window.location.href.replace(window.location.origin, '').split('#')[0];

            if(v.length > 2){
                $.ajax({
                    url: '/ajax/model-complete',
                    type: 'post',
                    data: data,
                    success: function(response){
                        t.next('.autoCompleteList').show().html(response);
                        $('.dropdown-banks-search__static-results').hide();
                    }
                })
            }
        })
        .off('blur', '.autoCompleteDropDown')
        .on('blur', '.autoCompleteDropDown', function(){
            var t = $(this);
            setTimeout(function(){
                t.next('.autoCompleteList').hide().html('');
                $('.dropdown-banks-search__static-results').show();
            }, 300);
        });

});