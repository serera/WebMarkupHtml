$(document).ready(function() {

	$('#content_slider').carouFredSel({
		align:"left",
		responsive: true,
		auto:false,
		items: {
			visible: 1,
			width: 100,
			height: 145
		},
		scroll: {
			duration: 1000,
			timeoutDuration: 500,
			fx: 'uncover-fade'
		},
		swipe: {
			onTouch:true,
			onMouse:true
		},
		pagination: '#content_slider_pagination'
	});		
/****************************/

	var slide_panel = $("#slide_panel");
	var slide_panel_header_wrap = $("#slide_panel_header_wrap");
	var slide_panel_content = $("#slide_panel_content");
	
	function auto_resize() {
		var height = $(window).height();
		var width = $(window).width();
		
		slide_panel.css("height",height);
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
	
/********************************/
	
	
	$("#slide_panel .close").bind('touchstart', function() {
		slide_panel.css("left","-300px");
		slide_panel.removeClass("disclosed");
		slide_panel_header_wrap.css("width","300px");
	});
	
	$("#toggle_menu").bind('click', function() {		
		if(slide_panel.hasClass("disclosed")) {
			slide_panel.css("left","-300px");
			slide_panel_header_wrap.css("width","300px");
		} else {
			slide_panel.css("left","0px");
			auto_resize();
		}
	});
	
   $(function() {      
      $(window).swipe( {
		allowPageScroll: "auto",
        swipeRight:function(event, direction, distance, duration, fingerCount) {
			if($(event.target).closest("#content_slider").length==0)	{
				slide_panel.css("left","0px");
				slide_panel.addClass("disclosed");
				auto_resize();
			}	
        },
        threshold:100
      });
	  
      $("#slide_panel").swipe( {
		allowPageScroll: "auto",
        swipeLeft:function(event, direction, distance, duration, fingerCount) {
			slide_panel.css("left","-300px");
			slide_panel.removeClass("disclosed");
			slide_panel_header_wrap.css("width","300px");
        },
        threshold:100
      });
	  
    });	

/****************************/	

	$("#slide_panel_user_select").bind('click',function() {
		if($(this).find("#slide_panel_user_menu").hasClass("active")) {
			$(this).find("#slide_panel_user_menu").fadeOut(200).removeClass("active");
		} else {
			$(this).find("#slide_panel_user_menu").fadeIn(200).addClass("active");
		}				
	});
	
	$("#slide_panel_user_menu a").bind('click',function() {
		$("#slide_panel_user_menu").fadeOut(200);
	});

/******************************************************/
	
});		