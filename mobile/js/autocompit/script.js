/*jslint  browser: true, white: true, plusplus: true */
/*global $, countries */

$(function () {
    'use strict';

    var countriesArray = $.map(search_items, function (value, key) { return { value: value, data: key }; });

    // Setup jQuery ajax mock:
    /*
	$.mockjax({
        url: '*',
        responseTime: 2000,
        response: function (settings) {
            var query = settings.data.query,
                queryLowerCase = query.toLowerCase(),
                re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi'),
                suggestions = $.grep(countriesArray, function (country) {
                     // return country.value.toLowerCase().indexOf(queryLowerCase) === 0;
                    return re.test(country.value);
                }),
                response = {
                    query: query,
                    suggestions: suggestions
                };

            this.responseText = JSON.stringify(response);
        }
    });
	*/



    // Initialize autocomplete with local lookup:
    $('#search #search_text').autocomplete({
        lookup: countriesArray,
        minChars: 2,
        onSelect: function (suggestion) {
            //$('#selection').html('You selected: ' + suggestion.value + ', ' + suggestion.data);
        }
    });
	
    $("#city_list").autocomplete({
        lookup: countriesArray,
        minChars: 1 
    }); 
	
	$('#search #street_chois').autocomplete({
        lookup: countriesArray,
        minChars: 2
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
	
	
	
    //$("#search.double input.disable").autocomplete('disable');

});