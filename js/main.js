(function($){

  //globals
  
  var interval = 5000, 
  timers = {},
  sidebarWidth = $(".sidebar__off-canvas").width();
  megaMenus = {
    close: function(){
      $(".mm__lg.open").removeClass("open");
      $(".mm__lg.active, .top-button.active").removeClass("active");
    },
    open: function(el, event){
      event = event || false;
      //if(!$(el).hasClass("active")){  
        $(".mm__lg.active").removeClass("active");
        var classes = "active";
        if(!$(".mm__lg.open").length && event == "click"){
          $(".mm__lg").addClass("open");
        }
        $(el).addClass(classes);
     // }
    },
    init: function(){
      var maxHeight = $(".mm__lg:first").outerHeight();
      $(".mm__lg").css("height",maxHeight);
      $(".mm__lg").each(function(){
        var h = $(this).outerHeight();
        if(h > maxHeight){
          maxHeight = h;
          $(".mm__lg").css("height",maxHeight);
        }
      })
    }
  }
  
  //functions

  function runGallery(){
    /**
     * other galleria configurations located in /js/galleria.ibs.js, styles in /css/galleria.ibs.css
     */
    if($(".gallery").length){
      Galleria.configure({
        height:$(".gallery").width()/1.3,
        autoplay:interval
      })  
      Galleria.run('.gallery');
    }
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
  function toggleSidebar(){
    $(".js__expand-menu").toggleClass("active");
    sidebar_width = $(".sidebar__off-canvas").width();
    if($("body").hasClass("open")){
     $("body").removeClass("open").find(".wrapper").css({left:"auto"});
     $(".sidebar__off-canvas").css("min-height",0).removeClass("active");
    } else {
     $("body").addClass("open").find(".wrapper").css({left:sidebar_width});
     $(".sidebar__off-canvas").css("min-height",$(document).height()).addClass("active");
    }
  }
  $(".wrapper").click(function(){
    if($(".js__expand-menu").hasClass("active")){
      toggleSidebar();
    }
  });
  $(".js__expand-menu").click(function(e){
    e.stopPropagation();
    toggleSidebar();
    
  });
  
  $(".js__mm--toggle").click(function(){
    $(this).parents(".mm").toggleClass("open").toggleClass("closed");
    $(this).toggleClass("active");
  })
  
  $("[data-toggle='mm']").click(function(e){
      e.preventDefault();
      var me = $(this);
      if(me.hasClass("active")){
        megaMenus.close();
      } else {
        var el = me.attr("data-target");
        if(!el || !$(el).length){
          throw("Missing data-target attribute or element doesn't exist");
          return false;
        }
        $(".top-button.active").removeClass("active");
        me.addClass("active"); 
        megaMenus.open(el, "click");
      }
      
  });
  $("[data-toggle='mm']").hover(function(e){
      e.preventDefault();
      clearTimeout(timers.mm);
      var me = $(this);
      var el = me.attr("data-target");
      if(!el || !el.length){
        throw("Missing data-target attribute");
        return false;
      }
      if($(".mm__lg.open").length){
      //only works when menus are open
      $(".top-button.active").removeClass("active");
        me.addClass("active"); 
        megaMenus.open(el);
      }
      
  });
  $(".mm").mouseover(function(){
    clearTimeout(timers.mm);
  })
  $(".mm__lg, .top-button").mouseleave(function(){
      timers.mm = setTimeout(function(){
        megaMenus.close();
      },1000);
  })
  $(".dropdown-toggle").click(function(){
    $(this).closest("li.dropdown").toggleClass("active");
  })
  
})(jQuery);
