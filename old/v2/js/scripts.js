$(function(){
    
        // nojs fallback removal
        $("html").removeClass("nojs");
        $("a.pd").click(function(e){e.preventDefault();});
        
         // hide top bar on safari mobile
            setTimeout(function(){
              window.scrollTo(0, 1);
            }, 100); 

        //function detectMobile(){
        //(typeof Touch !== "undefined") ? 'touchstart' : 'click';
        // alert("mobile");
         //       };
        
        //detectMobile();
        
       

         // set up hover panels
         // although this can be done without JavaScript, we've attached these events
         // because it causes the hover to be triggered when the element is tapped on a touch device
         $('.hover').hover(function(){
         	$(this).addClass('flip');
         },function(){
         	$(this).removeClass('flip');
         });
         
         /*
         // set up click/tap panels
         $('.click').toggle(function(){
         	$(this).addClass('flip');
         },function(){
         	$(this).removeClass('flip');
         });
         */
         
        
         $('.panel').bind('click', function(){
         	$(this).addClass('flip');
            $('.panel').not(this).removeClass('flip');
         });
         
         
         $('.back').bind('mouseleave click', function(e){
            e.stopPropagation();
            $(this).parent('.panel').removeClass('flip');
         }); 
        
         $('.panelLink').click(function(e){
            e.stopPropagation();
         });
        
                   
                           
          $("#more").bind("click", function(){
          // alert("hi");
          
          $("#portfolioBg img").each(function(i){
              
                     var path1 = $(this).attr("src").match(/\D+/);
                     var path2 = $(this).attr("src").match(/\.\D+/);
                     
                     $(this).attr("src", path1 + "2" + path2);
                     //alert(path1 + (i+1) + path2);
                                
                });
            });
            
         // $("#sidebar").draggable({containment: "body", scroll: false});
         //  $("#sidebar").disableSelection();
                                
            // prevent scrolling (in any direction)
            /*  
            $(document).bind("touchmove", function(e){
                     e.preventDefault();   
            });
            */
            
            // Nav hover animation
            var hoverBox = $("#hoverBox");
            var button = $(".button");
            button.mouseover(function() {
            
            hoverBox.css({"display":"block"}).stop().animate({
                                   top: $(this).position().top,
                                   //width: $(this).innerWidth(),
                                   opacity: 1
                                   }, 200, 'easeOutBack');
                       }).mouseleave(function(){
                       hoverBox.stop(true, true).animate({
                                    opacity: 0
                                    });
                       });



        
        
         // expanding panels //
    
    $('.expPanels > h3, .dropOpen').click(function(e){
        e.preventDefault();
        var me = $(this);
        me.toggleClass("moveme");
        
        if (me.hasClass("moveme")) {
            
          var h =  me.next().children("div").height();
          //h += 30;
          
          me.next().animate({height:h}, 500, 'easeInOutCubic').siblings('.panelContent').animate({height:'0'}, 500, 'easeInOutCubic');
          me.siblings().removeClass("moveme");
           }else{
               me.next().animate({height:'0'}, 500, 'easeInOutCubic');
               $("h3").removeClass("moveme"); 
                }
            });
       
      
          
    $('.expPanels > h3 a').click(function(e){ 
        e.preventDefault();
     });  
     
     
     // icons animate
	    $("#chrome_clr, #safari_clr, #firefox_clr").css({"opacity":0});
	   $("#chrome_clr, #safari_clr, #firefox_clr").mouseenter(function(){
            $(this).animate({"opacity": 1});
			}).mouseleave(function(){
				$(this).stop().animate({"opacity":0});
			  });
		    // end icons animate
                    // 
    
});