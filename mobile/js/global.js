$(document).ready(function() {

    var slide_panel = $("#slide_panel");
    var slide_panel_header_wrap = $("#slide_panel_header_wrap");
    var slide_panel_content = $("#slide_panel_content");

    function auto_resize() {
        var height = $(window).height();
        var width = $(window).width();

        slide_panel.css("height",height+52);
        slide_panel_content.css("height", height-60);
        slide_panel_header_wrap.css("width",width);
    }


    $(window).resize(function(){
        if($("#slide_panel").hasClass("disclosed")) {
            auto_resize();
        }
    });

    window.addEventListener('load', function(){
        setTimeout(scrollTo, 0, 0, 1);
    }, false);


    /*****************************************************/

    var panel_width = $("#slide_panel").width();

    $("#slide_panel .close").on('click', function() {
        slide_panel.css("left",-panel_width);
        slide_panel.removeClass("disclosed");
        slide_panel_header_wrap.css("width",panel_width);
    });


    $("#toggle_menu").on('click', function() {

        //window.history.back();

        if(slide_panel.hasClass("disclosed")) {
            slide_panel.css("left",-panel_width);
            slide_panel_header_wrap.css("width",panel_width);
        } else {
            slide_panel.addClass("disclosed");
            slide_panel.css("left","0px");
            auto_resize();
        }
    });

    $("#toggle_menu_active").on('click', function() {
        slide_panel.css("left",-panel_width);
        slide_panel.removeClass("disclosed");
        slide_panel_header_wrap.css("width",panel_width);
    });

    $(window).swipe({
        allowPageScroll: "auto",
        swipeRight:function(event, direction, distance, duration, fingerCount) {
            slide_panel.css("left","0px");
            slide_panel.addClass("disclosed");
            auto_resize();
        },
        click:function (event, target) {
            if ($(target).attr('for')!==undefined) {
                $("input[id='" + $(target).attr('for') + "']").click();
            }
            if ($(target).attr('href')!==undefined) {
                window.location = $(target).attr('href');
            } else {
                $(target).on('click');
                $(target).on('touchstart');
            }
        },
        triggerOnTouchLeave: true,
        triggerOnTouchEnd: true,
        fallbackToMouseEvents: false,
        excludedElements: "label, button, input, select, textarea, .noSwipe",
        threshold:100
    });

    $("#slide_panel").swipe( {
        allowPageScroll: "auto",
        swipeLeft:function(event, direction, distance, duration, fingerCount) {
            slide_panel.css("left",-panel_width);
            slide_panel.removeClass("disclosed");
            slide_panel_header_wrap.css("width",panel_width);
        },
        threshold:100
    });


    /*
     $(window).touchwipe({
     wipeRight: function() {
     slide_panel.css("left","0px");
     slide_panel.addClass("disclosed");
     auto_resize();
     },
     wipeLeft: function() {
     slide_panel.css("left",-panel_width);
     slide_panel.removeClass("disclosed");
     slide_panel_header_wrap.css("width",panel_width);
     },
     min_move_x: 40,
     min_move_y: 10,
     preventDefaultEvents: true
     });



     var slides = jQuery('#wrapper'),
     i = 0;

     slides
     .on('swipeleft', function() {
     alert("left");
     })
     .on('swiperight', function() {
     alert("right");
     });
     */
    /*****************************************************/

    $("#slide_panel_user_select").on('click',function() {
        if($(this).find("#slide_panel_user_menu").hasClass("active")) {
            $(this).find("#slide_panel_user_menu").fadeOut(200).removeClass("active");
        } else {
            $(this).find("#slide_panel_user_menu").fadeIn(200).addClass("active");
        }
    });

    $("#slide_panel_user_menu a").on('click',function() {
        $("#slide_panel_user_menu").fadeOut(200);
    });

    /******************************************************/

    $('#sellers_list div.tab_content:not(:first)').hide();
    $('#sellers_list_tabs li').on('click',function(event) {
        event.preventDefault();
        $('#sellers_list div.tab_content').hide();
        $('#sellers_list_tabs .current').removeClass("current");
        $(this).addClass('current');

        var clicked = $(this).find('a:first').attr('href');
        $('#sellers_list ' + clicked).fadeIn('fast');
    }).eq(0).addClass('current');

    /*******************************************************/

    $("#favorits_list .favorit_item .chekbox").on("click",function() {
        $(this).parent().parent().toggleClass("selected");
        var after_select = $("#favorits_list .favorit_item.selected").length;
        $("#header_action_list .header_action_list_right span").text(after_select);
    });

    /*******************************************************/

    $("#header_action_list .header_action_list_left").on("click", function() {
        $("#header_action_list").slideUp(200);
        $("#footer_busket").removeClass("show");
        $("#footer_select_button").removeClass("active");
        $("#favorits_list").removeClass("editing");
        $("#footer_favorit").hide();
        $("#footer_send_list").show();
        $("#favorits_list .favorit_item").each(function() {
            $(this).removeClass("selected");
        });
        $("#header_action_list .header_action_list_right span").text("0");
    });


    $("#header_action_list_select_all").on("click", function() {
        var favorit_item_select = 0;
        $("#favorits_list .favorit_item").each(function() {
            $(this).addClass("selected");
            favorit_item_select++;
        });
        $("#header_action_list .header_action_list_right span").text(favorit_item_select);
    });

    $("#header_action_list_clear_select").on("click", function() {
        $("#favorits_list .favorit_item").each(function() {
            $(this).removeClass("selected");
        });
        $("#header_action_list .header_action_list_right span").text("0");
    });

    $("#footer_busket").on("click", function() {
        $("#favorits_list .favorit_item").each(function() {
            if($(this).hasClass("selected")) {
                $(this).remove();
            }
        });
        var after_delete = $("#favorits_list .favorit_item.select").length;
        $("#header_action_list .header_action_list_right span").text(after_delete);
    });

    /*******************************************************/
    $("#adding_product_favorites > div:not(.add_foto)").on('click',function() {
        $(this).addClass("show_input");
        $(this).find(".input_values input").focus();
        if(!$(this).hasClass("add_foto")) {
            $("#footer").css("position","absolute");
        }
    });

    $("#adding_product_favorites .input_values input").blur(function() {
        $("#footer").css("position","fixed");
    });

    $(document).on('keydown', function(event) {
        if (event.keyCode == 13) {
            $("#adding_product_favorites div").each(function() {
                $(this).removeClass("show_input");
            });
            $("#footer").removeClass("abs");
        };
    });

    $("#adding_product_favorites .add_foto .remove_img").on('click', function(e) {
        e.stopPropagation();
        $(this).prev("img").remove();
        $(this).remove();
        $("#adding_product_favorites .add_foto").removeClass("show_input");
    });

    $("#adding_product_favorites input:file").change(function() {
        var qwe = $(this).val();
        alert(qwe);
    });

    /**************************************/

    $('#footer .add_button').on('click',function() {
        $('#modal_window').modal();
    });



    $("#footer_select_button").on('click', function() {
        if(!$(this).hasClass("active")) {
            $(this).addClass("active");
            $("#header_action_list, #footer_action_list").slideDown(200);
            $("#shopping_lists, #favorits_list").addClass("editing");
            $("#footer_to_list, #footer_busket, #footer_add_favorit").addClass("show");
            $("#footer .add_product, #footer .add_new_product, #footer_list_receive, #footer_send_list, #footer_favorit").hide();
        } else {
            $(this).removeClass("active");
            $("#header_action_list, #footer_action_list").slideUp(200);
            $("#shopping_lists, #favorits_list").removeClass("editing");
            $("#shopping_lists .shopping_lists_item").each(function() {
                $(this).removeClass("selected");
            });
            $("#favorits_list .favorit_item").each(function() {
                $(this).removeClass("selected");
            });
            $("#footer_to_list, #footer_busket, #footer_favorit, #footer_add_favorit").removeClass("show");
            $("#footer .add_product, #footer .add_new_product, #footer_list_receive, #footer_send_list, #footer_favorit").show();
        }
    });

    $("#header_action_list .header_action_list_left").on('click',function(e) {
        e.stopPropagation();
        $("#header_action_list").slideUp(200);
        $("#footer_action_list").slideUp(200);
        $("#footer_select_button").removeClass("active");
        $("#shopping_lists .shopping_lists_item").each(function() {
            $(this).removeClass("selected");
        });
        $("#favorits_list .favorit_item").each(function() {
            $(this).removeClass("selected");
        });
        $("#shopping_lists, #favorits_list").removeClass("editing");
        $("#footer_to_list, #footer_busket, #footer_favorit, #footer_add_favorit").removeClass("show");
        $("#footer .add_product, #footer .add_new_product, #footer_list_receive, #footer_send_list, #footer_favorit").show();
    });


    /*******************************************************/

    $("#footer .add_product").on('click',function() {
        if(!$("#popup_add_tovar").hasClass("show")) {
            $("#popup_add_tovar").css("display","block").addClass("show");
        } else {
            $("#popup_add_tovar").css("display","none").removeClass("show");
        }

    });

    $("body").on('click',function(e) {
        if($(e.target).closest("#popup_add_tovar").length==0 && $(e.target).closest("#footer .add_product").length==0) {
            $("#popup_add_tovar").css("display","none").removeClass("show");
        }
        if($(e.target).closest("#resulting_list_window").length==0 && $(e.target).closest("#footer_list_receive").length==0) {
            $("#resulting_list_window").removeClass("active");
        }

        if($(e.target).closest("#price_variants").length==0 && $(e.target).closest("#price_variants_list .price_variants_item").length==0) {
            $("#price_variants_list").removeClass("active");
        }
        if($(e.target).closest("#chois_list_variants").length==0 && $(e.target).closest("#chois_list").length==0) {
            $("#chois_list_variants").removeClass("active");
        }
        if($(e.target).closest(".edit_page_wrap .currency_list").length==0 && $(e.target).closest(".edit_page_wrap .currency span").length==0) {
            $(".edit_page_wrap .currency_list").removeClass("active");
        }
        if($(e.target).closest("#search").length==0) {
            $("#footer").removeClass("absolute");
        }
        if($(e.target).closest(".modal_window_content .list_name span").length==0 && $(e.target).closest(".modal_window_content .list_name_items div").length==0) {
            $(".modal_window_content .list_name_items").removeClass("active");
        }
    });


    /******************************************************/

    $(".input_text_wrap input").focus(function() {
        $("#footer").addClass("absolute");
    });
    $(".input_text_wrap input").blur(function() {
        $("#footer").removeClass("absolute");
    });

    $(".modal_window .modal_window_footer .simplemodal-close").on('click',function() {
        $("#footer").removeClass("absolute");
    });

    $(document).on('click', ".input_text_wrap .clear_input", function() {
        $(this).parent().removeClass("have_clear").find("input").val('');
        $(this).remove();
    });

    $('.input_text_wrap input').on('keypress', function(event) {
        if(!$(this).parent().hasClass("no_remove")) {
            if(!$(this).next().is(".clear_input")) {
                $(this).parent().addClass("have_clear").append("<div class='clear_input'></div>");
            }
        }
    });

    /*****************************************************/

    $("#footer_list_receive").on('click',function() {
        $("#resulting_list_window").toggleClass("active");
    });

    /*****************************************************/

    $("#price_variants").on('click',function() {
        $(this).next().toggleClass("active");
    });
    $("#price_variants_list .price_variants_item").on('click',function() {
        var price_variants_item_val = $(this).text();
        $("#price_variants").text(price_variants_item_val);
        $("#price_variants_list").removeClass("active");
    });

    $(".modal_window_content .list_name span").on('click',function() {
        $(this).parent().find(".list_name_items").toggleClass("active");
    });
    $(".modal_window_content .list_name_items .list_name_item").on('click', function() {
        var list_name_item = $(this).text();
        $(".modal_window_content .list_name span").text(list_name_item);
        $(".modal_window_content .list_name_items").removeClass("active");
    });

    /*****************************************************/

    $("#favorits_list .favorit_item .busket").on('click',function() {
        var data_id = $(this).parent().parent().attr("data-id");
        var successful_bid = "<div class='successful_bid'><span>Товар куплен</span><span class='cancel'>Отменить</span></div>";
        $(this).parent().parent().addClass("purchased").append(successful_bid).delay(1000).fadeOut(100);

        var name = $(this).parent().parent().find("p").text();
        var price = $(this).parent().find(".price").text();
        var number = $(this).parent().find(".number").text();
        var inserted_data = "<div class='panel_products_item' data-id=" + data_id +"><div class='name'>" + name +"</div><div class='number_price'><span class='number'>" + number + "</span><span class='price'>" + price + "</span></div></div>";
        $("#panel_products_content").append(inserted_data);

        if($("#panel_products_content > div").length) {
            $("#panel_products").show();
        }	else {
            setTimeout(function() {
                $("#panel_products").show().addClass("active").css("height",height-100);
                $("#footer_select_button").hide();
                $("#footer_reestablish").show();
            },1000);
        }
    });

    $(document).on('click', "#favorits_list .successful_bid .cancel", function() {
        $(this).parent().parent().removeClass("purchased").find(".successful_bid").remove();
    });

    $(document).on('click', "#panel_products_content .panel_products_item", function() {
        var cur_data_id = $(this).attr("data-id");
        var width = $(window).width();
        $(this).remove();
        $('#favorits_list .favorit_item[data-id="'+cur_data_id+'"]').show().removeClass("purchased").find(".successful_bid").remove();
        if(!$("#panel_products_content > div").length) {
            if(width >=800) {
                $("#panel_products").css("height","70px").removeClass("active").hide();
            } else if(width<800) {
                $("#panel_products").css("height","35px").removeClass("active").hide();
            }
            $("#footer_select_button").show();
            $("#footer_reestablish").hide();
        }
    });

    $("#panel_products_toggle").on('click',function() {
        var height = $(window).height();
        var width = $(window).width();
        if($(this).parent().hasClass("active")) {
            if(width >=800) {
                $(this).parent().css("height","70px");
            } else if(width<800) {
                $(this).parent().css("height","35px");
            }
            $(this).parent().removeClass("active");
            $("#footer_select_button").show();
            $("#footer_reestablish").hide();

        } else {
            if(width >= 800) {
                $(this).parent().css("height",height-150);
            } else if(width<800) {
                $(this).parent().css("height",height-100);
            }
            $(this).parent().addClass("active");
			
				var panel_h = $("#panel_products").height();
				var panel_height = $("#panel_products_content").height();
				var total_height = $("#panel_products_total").height();
				var height_netto = panel_h - total_height;
				if(panel_height >=height_netto) {
					$("#panel_products_content").height(height_netto).css("overflow-y","auto");
				}
			
            $("#footer_select_button").hide();
            $("#footer_reestablish").show();
        }
    });

    /*****************************************************/

    $("#favorits_list .favorit_item .product_data").on('click',function() {
        var data_id = $(this).parent().parent().attr("data-id");
        var name = $(this).parent().parent().find("p").text();
        var number = $(this).find(".number").text();
        var price = $(this).find(".price").text();
        $("#edit_product_window .modal_window_header").text(name);
        $("#edit_product_window .edit_price input").val(price);
        $("#edit_product_window .edit_number input").val(number);
        $("#edit_product_window").attr("data-id", data_id);
        $("#edit_product_window").modal();
    });

    //$("#edit_product_window .edit_number .down, #wrapper.edit_page .edit_number .down").on('click',function() {
    $(".edit_number .down").on('click',function() {
        var $input = $(this).next('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    //$("#edit_product_window .edit_number .up, #wrapper.edit_page .edit_number .up").on('click',function() {
    $(".edit_number .up").on('click',function() {
        var $input = $(this).prev('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });

    $("#edit_product_window .modal_window_ok").on('click',function() {
        var this_val = $(this).parent().parent();
        var data_id = this_val.attr("data-id");
        //var adress = this_val.find(".edit_adress textarea").val();
        var price = this_val.find(".edit_price input").val();
        var number = this_val.find(".edit_number input").val();

        $('#favorits_list .favorit_item[data-id="'+ data_id +'"] .product_data').find('.number').text(number);
        $('#favorits_list .favorit_item[data-id="'+ data_id +'"] .product_data').find('.price').text(price);
        //$(this).prev().trigger('click');
        $.modal.close();
    });
    $(".simplemodal-close").on('click',function() {
        $.modal.close();
    });

    /*****************************************************/

    $("#footer_to_list").on('click', function() {
        $("#add_to_list_window").modal();
    });

    $("#slide_panel_content .city").on('click', function() {
        $("#chois_city_modal").modal({zIndex:9999},{onOpen:function() {
			alert("OK");
		}});
    });

    /*****************************************************/

    function show_message(value) {
        $(".alert_message").remove();
        var favorit_message_add = "<div class='alert_message'>" + value + "</div>";
        var favorit_message_remove = "<div class='alert_message'>" + value + "</div>";
        if(!$("#footer_action #add_to_favorit, #footer_add_favorit").hasClass("active")) {
            $("#footer_action #add_to_favorit, #footer_add_favorit").addClass("active");
            $("body").append(favorit_message_add).find(".alert_message").delay(1500).fadeOut(1000);
        } else {
            $("#footer_action #add_to_favorit, #footer_add_favorit").removeClass("active");
            $("body").append(favorit_message_remove).find(".alert_message").delay(1500).fadeOut(1000);
        }
    }

    $("#footer_action #add_to_favorit, #footer_add_favorit").on('click',function() {
        show_message("Товар успешно добавлен в избранное");
    });

    /*****************************************************/

    var win_width = $(window).width();
    if(win_width < 800) {
        var node = document.getElementById( "header_title" ),
            need = 50;
        if ( node.innerHTML.length > need ) {
            node.innerHTML = node.innerHTML.slice( 0, need ) + "…";
        }
    } else if(win_width >= 800) {
        var node = document.getElementById( "header_title" ),
            need = 70;
        if ( node.innerHTML.length > need ) {
            node.innerHTML = node.innerHTML.slice( 0, need ) + "…";
        }
    }




    /*****************************************************/

    $("#chois_list_wrap #chois_list").on('click',function() {
        if($(this).next().hasClass("active")) {
            $(this).next().removeClass("active");
        } else {
            $(this).next().addClass("active");
        }
    });

    $("#chois_list_wrap .chois_list_item").on('click',function() {
        var name_list = $(this).text();
        $(this).parent().prev().text(name_list);
        $(this).parent().removeClass("active");
    });

    $(".currency span").on('click',function() {
        if($(this).hasClass("active")) {
            $(this).next().removeClass("active");
        } else {
            $(this).next().addClass("active");
        }
    });

    $(".currency .currency_list_item").on('click',function() {
        var currency = $(this).text();
        $(this).parent().prev("span").text(currency);
        $(this).parent().removeClass("active");
    });

    /*****************************************************/

    $("#footer #reset_all").on('click',function() {
        $("#seller_choice_parameters .modal_chekbox input:checkbox").each(function() {
            $(this).removeAttr("checked");
        });
    });

    /*****************************************************/

    var isLoader = 0;
    var spinner;

    function perebor() {
        var count = 0;
        $("#favorits_list .no_show").each(function() {
            if(count <= 4) {
                $(this).removeClass("no_show");
                count++;
            }
        });
    }

    function next_show() {
        var count = 0;
        if(!$("#favorits_list .no_show").length) {
            spinner.remove();
        } else {
            setTimeout(perebor, 2000);
        }

    }

    $(window).scroll(function() {

        var scrollTop = $(window).scrollTop();
        var window_height = $(window).height();
        var document_height = $(document).height();

        if( scrollTop + window_height >= document_height) {
            if (isLoader == 0) {
                spinner = $("<div id='spinner'></div>").appendTo("#content_area");
                isLoader = 1;
            }
            //setTimeout(next_show, 1000);
            next_show();
        }
    });

    /*****************************************************/
    /*
     $("#footer button").on('click',function() {
     $(this).css("background-color","#00C5B0");
     });
     $("#footer button").on('touchend',function() {
     $(this).css("background-color","transparent");
     });
     */

    /*****************************************************/

    $(document).on('click', '#footer_action #add_price', function() {
        var name = $("#catalog_item .catalog_item_header").text();
        $("#add_price_window .modal_window_header").text(name);
        $('#add_price_window').modal({zIndex:9999, focus:false});
    });
    $('#add_price_window .modal_window_ok').bind('click',function() {
        var cur_price = $("#add_price_window .input_price input").val();
        if(!cur_price.length == '') {
            var D = new Date();
            var Day = D.getDate();
            var Day = String(Day);
            if(Day.length < 2) {
                var Day = 0 + Day;
            }
            var Month = D.getMonth() + 1;
            var Year = D.getFullYear();
            var current_date = Day + "." + Month + "." + Year;
            var seller_price_item = "<div class='seller_price_item'><div class='no_name'><em>Моя цена</em></div><div class='price'><em>"+ cur_price +"</em>"+ current_date +"</div></div>";
            $("#seller_price").prepend(seller_price_item);
            $(this).prev().trigger('click');
            $("#footer").removeClass("absolute");
        } else {
            alert("Необходимо указать цену");
        }

    });

    /*****************************************************/
    /*
     $("#edit_user_profil .edit_user_profil_item.avatar .profil_image input:file").change(function() {
     $(this).parent().addClass("have_img").append("<div class='del_img'></div>");
     });
     $("#edit_user_profil .edit_user_profil_item.avatar .profil_image .del_img").live('click',function() {
     $(this).parent().removeClass("have_img");
     $(this).remove();
     });
     */

    $("#edit_user_profil .edit_user_profil_item.avatar .add_foto input:file").change(function() {
        $(this).parent().prev().addClass("have_img").append("<div class='del_img'></div>");
    });
    $(document).on('click', "#edit_user_profil .edit_user_profil_item.avatar .profil_image .del_img", function() {
        $(this).parent().removeClass("have_img");
        $(this).remove();
    });


    $("#change_product input:file").change(function() {
        $(this).parent().next().addClass("have_img").append("<div class='del_img'></div>");
    });
    $(document).on('click', "#change_product .del_img", function() {
        $(this).parent().removeClass("have_img");
        $(this).remove();
    });

    /*****************************************************/

    $("#download_app .close").on('click', function() {
        $(this).parent().remove();
    });
	
	/*****************************************************/
	
	$("#heder_search_name").on('click', function() {
		$(this).addClass("active").prev().hide();
	});
    $(document).on('click', "#heder_search_name .clear_input", function() {
        $(this).parent().removeClass("have_clear").find(".header_search").val('');
        $(this).remove();
    });

    $('#heder_search_name .header_search').on('keypress', function(event) {
		if(!$(this).parent().find(".clear_input").length) {
			$(this).parent().addClass("have_clear").append("<div class='clear_input'></div>");
		}
    });
	/*****************************************************/
	
	
	
	/*****************************************************/
	/*
	$(document).on(clickEventType, "a#aClick", function(){
        window.location = $(this).attr('href');
        return false;
    });
	*/
	
	/*****************************************************/



});