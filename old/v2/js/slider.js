/* HERO SLIDER */

$(document).ready(function(){

	var	$win = $(window),
		$sld_wrap = $('#slides-wrapper'),
		$sld_content = $('#slides-wrapper > article'),
		$sld_link = $('.slide-link'),
		inmotion;
		
	// SETUP SLIDES
	function _initSlidesSetup() {
		$sld_content.first().show().css('right','0%').addClass('current-slide');
		$sld_link.first().addClass('current');
		$sld_link.first().css('color','#ffde00');
	};
	
	// CLICK SLIDE LINKS
	$sld_link.click(function() {
		if(inmotion) return false;
		else inmotion = true;
		
		var	$t = $(this),
			$t_link = $t.attr('data-slide'),
			$t_slide = $('#' + $t_link);
		
		if($t.hasClass('current')) {
			inmotion = false;
			return false;
		} else {
			$sld_link.removeClass('current');
			$sld_link.css('color','#ffffff');
			$t.addClass('current');
			$t.css('color','#ffde00');
			
			$('.current-slide').removeClass('current-slide').stop().animate({right: '100%'}, 800, 'easeInOutExpo', function() {
				$sld_content.hide();
				$('html, body').scrollTop(0);
				$t_slide.show().addClass('current-slide').css('right','-100%').stop().animate({right: '0%'}, 800, 'easeInOutExpo', function() {
					inmotion = false;
				});
			
			});
			
			return false;
		}
	});
	_initSlidesSetup();
});

/* SUB NAV */
/* IF NEEDED...
$(document).ready(function(){

	var	$win2 = $(window),
		$sld_wrap2 = $('#slides-wrapper2'),
		$sld_content2 = $('#slides-wrapper2 article'),
		$sld_link2 = $('.slide-link2'),
		inmotion2;
		
	// SETUP SLIDES
	function _initSlidesSetup2() {
		$sld_content2.first().show().css('right','0%').addClass('current-slide2');
		$sld_link2.first().addClass('current2');
		$sld_link2.first().css('color','#ffde00');
	};
	
	// CLICK SLIDE LINKS
	$sld_link2.click(function() {
		if(inmotion2) return false;
		else inmotion2 = true;
		
		var	$t2 = $(this),
			$t_link2 = $t2.attr('data-slide2'),
			$t_slide2 = $('#' + $t_link2);
		
		if($t2.hasClass('current2')) {
			inmotion2 = false;
			return false;
		} else {
			$sld_link2.removeClass('current2');
			$sld_link2.css('color','#ffffff');
			$t2.addClass('current2');
			$t2.css('color','#ffde00');
			
			$('.current-slide2').removeClass('current-slide2').stop().animate({right: '100%'}, 666, 'easeInOutExpo', function() {
				$sld_content2.hide();
				$('html, body').scrollTop(0);
				$t_slide2.show().addClass('current-slide2').css('right','-100%').stop().animate({right: '0%'}, 666, 'easeInOutExpo', function() {
					inmotion2 = false;
				});
			
			});
			
			return false;
		}
	});
	_initSlidesSetup2();
}); */