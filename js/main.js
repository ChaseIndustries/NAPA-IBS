(function($){

 //globals
 var interval = 5000, 
 timers = {} ;

 //functions
 function runGallery(){
    /**
     * other galleria configurations located in /js/galleria.ibs.js 
     */
    Galleria.configure({
      height:$(".gallery").width()/1.3,
      autoplay:interval
    })  
    Galleria.run('.gallery');
  }
  
  window.onload = function(){
    runGallery();
    $(".carousel").carousel({interval:interval});
  }
  
  //listeners
  $(window).bind('resize', function(e)
  {
      window.resizeEvt;
      $(window).resize(function()
      {
          clearTimeout(window.resizeEvt);
          window.resizeEvt = setTimeout(function()
          {
              //code to do after window is resized
              runGallery();
          }, 250);
      });
  });
  
  var megaMenus = {
    close: function(){
    
      $(".mm.open").removeClass("open");
      $(".mm.active").removeClass("active");
      
    },
    open: function(el){
    
      clearTimeout(timers.mm);
      if($(el).hasClass("active")){      
        
        $(el).removeClass("active");
      
      } else {
        
        $(".mm.active").removeClass("active");
        var classes = "active";
        if(!$(".mm.open").length){
          $(".mm").addClass("open");
        }
        $(el).addClass(classes);
      
      }
    }
    
  }
  $("[data-toggle='mm']").hover(function(){
      
      var el = $(this).attr("data-target");
      if(!el){
        throw("Missing data-target attribute");
        return false;
      }
      $(this).addClass("active"); 
      megaMenus.open(el);
      
  }, function(){
    timers.mm = setTimeout(function(){
      megaMenus.close();
    },1000);
  });
  $(".mm").mouseover(function(){
    clearTimeout(timers.mm);
  })
  $(".mm").mouseleave(function(){
      timers.mm = setTimeout(function(){
        megaMenus.close();
      },1000);
  })
  
})(jQuery);
