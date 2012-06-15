(function( $ ){
  var outerCarousel = '<div class="j-carousel-outer"></div>';
  var arrow =  
    '<div class="arrow">\
      <div class="arrow-inner"></div>\
    </div>'

  var methods = {
    init : function( options ) { 
      this.addClass("j-carousel-inner");
      this.wrap(outerCarousel);
      var outer = this.parent();

      var numElems = this.children().length;

      //get outer dimensions which (with the true flag) include margins
      var elemWidth = this.children().outerWidth(true);
      var elemHeight = this.children().outerHeight(true);

      //outer class is for specific css targeting
      outer.addClass(options.outerClass).height(elemHeight);

      var carousel = {
        numElems: numElems,
        currElem: 0,
        elemWidth: elemWidth,
        options: options
      };

      this.data("j-carousel", carousel);

      outer.prepend($(arrow).addClass("arrow-left").height(elemHeight));
      outer.append($(arrow).addClass("arrow-right").height(elemHeight).css("top", -elemHeight+"px"));

      $('.arrow-left', outer).bind("click.carousel", function() { methods.move($(this).parent(), 1) } );
      $('.arrow-right', outer).bind("click.carousel", function() { methods.move($(this).parent(), -1) } );

      return this;
    },
    move : function(outer, shiftDir) {
      //carousel associated with the arrow
      var inner = outer.find(".j-carousel-inner");
      var carousel = inner.data('j-carousel');
      var options = carousel.options;
      var duration = options.duration;
      //index of current item at the front of the visible carousel
      var currPos = carousel.currElem;
      //total number of items in the carousel
      var numElems = carousel.numElems;

      //take into account the setting of reversing the direction that the arrows move the carousel
      shiftDir = shiftDir*options.direction;

      //calculate width of carousel that is not covered by arrows
      var displayWidth = outer.width(); //- arrow widths?
      //width of each item in the carousel (includes margin)
      var elemWidth = carousel.elemWidth;
      //number of elements to shift based on current width of carousel
      var shiftNum = Math.floor(displayWidth/elemWidth);

      //index of last item willing to put at front of carousel (prevents last elem from being at front)
      var maxElemPos = numElems - shiftNum + 1; 

      //if we're trying to advance in the direction that's already maxed out
      if ((currPos >= 0 && shiftDir > 0) || (Math.abs(currPos) >= maxElemPos && shiftDir < 0 )){

        //if wrap is enabled, perform wrap
        if (options.wrap){
          var shiftWidth = maxElemPos * elemWidth * -shiftDir;

          $(inner).animate({
            left: '+='+shiftWidth,
          }, duration);

          //update currElem
          carousel.currElem = shiftDir > 0 ? -maxElemPos : 0;
          $(inner).data("carousel", carousel);

          options.bounceWrapCallback.call(this, outer, shiftDir, currPos);
          return;
        }

        //if bounce is enabled, perform bounce
        if (options.bounce){
          $(inner).animate({
            left: '+='+(50*shiftDir),
          }, duration, function() {
            $(inner).animate({
              left: '-='+(50*shiftDir),
            }, duration);
          });

          options.bounceWrapCallback.call(this, outer, shiftDir, currPos);
          return;
        }
      }

      //max number of elements we are willing to shift
      var maxShiftNum = shiftDir < 0 ? maxElemPos - Math.abs(currPos) : Math.abs(currPos);
      //shiftNum is the number of elements we will shift (lowest of maxShiftNum and self)
      shiftNum = shiftNum < maxShiftNum ? shiftNum : maxShiftNum;

      //number of pixels to shift (will be a multiple of elemWidth in the direction of shiftDir)
      var shift = shiftDir*shiftNum*elemWidth;

      //index of item that will be at front of carousel
      var endPos = currPos + shiftNum*shiftDir;
      carousel.currElem = endPos;
      $(inner).data("carousel", carousel);

      $(inner).animate({
        left: '+='+shift,
      }, 250, function() {
        // Animation complete.
      });
      
      options.arrowClickCallback.call(this, outer, shiftDir, currPos, endPos);
    }
  };

  $.fn.Carousel = function( method ) {
    
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {

      var defaults = {
        duration: 150,
        direction: 1,
        outerClass: '',
        bounce: true,
        wrap: false,
        arrowClickCallback: function(outer, shiftDir, currPos, endPos){},
        bounceWrapCallback: function(outer, shiftDir, currPos){},
      };

      // extend defaults with args passed by client (method)
      arguments = $.extend(defaults, method);

      return methods.init.call( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.carousel' );
    }    
  
  };

})( jQuery );
