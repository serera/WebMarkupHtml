var seller_id = 0;
$(document).ready(function() {

    $("#other_seller").on('click', function(){
        window.location = '/selectPointSales/seller';
        return false;
    });

    var number_form = $("#search.fix form").length;
    if(number_form > 1) {
        $("#search.fix, #content_area").addClass("double");
    }

    $("#search.double .input_text_wrap input").on('focus', function() {
        var idd = $(this).attr("id");
        if(idd == "search_text") {
            $("#search.double").addClass("top");
        } else {
            $("#search.double").removeClass("top");
        }
        $("#search.double .input_text_wrap input").autocomplete('disable');
        $(this).autocomplete('enable');
    });


    /**
     * Поиск продавца
     */
    $('#search #search_text').autocomplete({
        paramName: 'name_startsWith',
        serviceUrl: '/ajax/autocomplete/seller',
        params: {
            city_id: city_id
        },
        minChars: 2,
        dataType: 'json',
        onSelect: function (suggestion) {
            seller_id = suggestion.id;
        },
        transformResult: function(response) {
            var items = [];
            if (response.items.length>0) {
                for (i in response.items) {
                    items.push({
                        value: response.items[i].label,
                        id: response.items[i].value
                    });
                }
            }
            var result = {
                suggestions: items
            };
            return result;
        }
    });

    $("#pointSalesSearch").on('click', function(){
        if (seller_id>0) {
            $.getJSON('/ajax/autocomplete/pointSales', { name_startsWith: $("#street_chois").val(), seller_id: seller_id },  function(e){
                if (e.items.length>0) {
                    var pointSalesList = $("#search_sellers_list");
                    pointSalesList.html('');
                    var html = '';
                    for (i in e.items) {
                        html += '' +
                            '<div class="seller_item">' +
                            '   <div class="seller_item_name" id="selectPointSales" data-id="' + e.items[i].id + '">' + e.items[i].label + '</div>' +
                            '   <div class="seller_item_result"><em>' + e.items[i].count_goods + '</em> товаров</div>' +
                            '</div>';
                    }
                    pointSalesList.html(html);
                }
            });
        }
        return false;
    });
});