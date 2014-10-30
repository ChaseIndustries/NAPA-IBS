(function($){

  //globals
  
  var interval = 5000, 
  timers = {},
  megaMenus = {
    close: function(){
      $(".mm.open").removeClass("open");
      $(".mm.active, .top-button.active").removeClass("active");
    },
    open: function(el){ 
      clearTimeout(timers.mm);
      if(!$(el).hasClass("active")){      
        $(".mm.active").removeClass("active");
        var classes = "active";
        if(!$(".mm.open").length){
          $(".mm").addClass("open");
        }
        $(el).addClass(classes);
      }
    },
    init: function(){
      var maxHeight = $(".mm:first").outerHeight();
      $(".mm").css("height",maxHeight);
      $(".mm").each(function(){
        var h = $(this).outerHeight();
        if(h > maxHeight){
          maxHeight = h;
          $(".mm").css("height",maxHeight);
        }
      })
    }
  }
  
  //functions

  function runGallery(){
    /**
     * other galleria configurations located in /js/galleria.ibs.js, styles in /css/galleria.ibs.css
     */
    Galleria.configure({
      height:$(".gallery").width()/1.3,
      autoplay:interval
    })  
    Galleria.run('.gallery');
  }
  
  //page load
  
  window.onload = function(){
    runGallery();
    megaMenus.init();
    $(".carousel").carousel({interval:interval});
  }
  
  //listeners
  
  //stuff to do on resize
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
  
/*
  $("carousel__lg").on("slid.bs.carousel",function(e){
    item = e.dataTarget;
    item.find(".carousel-icon").addClass("active");
  });
  
  $("carousel__lg").on("slide.bs.carousel",function(e){
    item = e.dataTarget;
    item.find(".carousel-icon").removeClass("active");
  });
*/
  
  $("[data-toggle='mm']").hover(function(){
      var me = $(this);
      //set a timeout to reduce accidentally rolling over the item
      clearTimeout(timers.mmHover);
      timers.mmHover = setTimeout(function(){
          var el = me.attr("data-target");
          if(!el){
            throw("Missing data-target attribute");
            return false;
          }
          $(".top-button.active").removeClass("active");
          me.addClass("active"); 
          megaMenus.open(el);
      },100);
      
  }, function(){
    timers.mm = setTimeout(function(){
      megaMenus.close();
    },1000);
  });
  $(".mm").mouseover(function(){
    clearTimeout(timers.mm);
    clearTimeout(timers.mmHover);
  })
  $(".mm").mouseleave(function(){
      timers.mm = setTimeout(function(){
        megaMenus.close();
      },1000);
  })
  
})(jQuery);
