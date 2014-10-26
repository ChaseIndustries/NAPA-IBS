(function($){

 //globals
 var interval = 5000;

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
  
})(jQuery);
