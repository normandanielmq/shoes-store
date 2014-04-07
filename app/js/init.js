// ********************************tinyNav menu plugin initialization********************************
// TinyNav.js 1

  $('#nav').tinyNav({
    header: 'Navigation'
  });


 $('.t-nav').tinyNav({
    header: 'Click here'
  });

// ********************************flexslider initialization********************************

  $(window).load(function() {
    $('#main-slide').flexslider({
      animation: "fade",
      controlNav: false,
      directionNav: true
    });
  });

  $(window).load(function() {
    $('#main-slide-1').flexslider({
      animation: "slide",
      controlNav: false,
      directionNav: true
    });
  });

  $(window).load(function() {
    $('#main-slide-2').flexslider({
      animation: "fade",
      controlNav: true,
      directionNav: true
    });
  });


  //product detail display slider

  $(window).load(function() {

  // The slider being synced must be initialized first

    $('#display-carousel').flexslider({
      animation: "slide",
      controlNav: false,
      animationLoop: false,
      slideshow: false,
      itemWidth: 100,
      itemMargin: 20,
      asNavFor: '#display-slider'
    });



    $('#display-slider').flexslider({
      animation: "slide",
      controlNav: false,
      animationLoop: false,
      slideshow: false,
      sync: "#display-carousel"
    });

  });



// ********************************bootstrap dropdown toggle********************************

  $('.dropdown-toggle').dropdown()


// ************************* Google Maps jQuery Initialization ************************************

jQuery(document).ready(function ($) {

    var mapObject = $('#map');
    if ($().gMap && mapObject.length > 0) {
        var lat = mapObject.data('lat'); //uses data-lat attribute
        var lng = mapObject.data('lng'); //uses data-lng attribute
        var addr = mapObject.data('address'); //uses data-address attribute
        var zoom = mapObject.data('zoom'); //uses data-zoom attribute
        var markers = {};
        if (addr) {
            markers['address'] = addr;
        } else {
            markers['latitude'] = lat;
            markers['longitude'] = lng;
        }
        mapObject.gMap({ markers:[markers], zoom:zoom });
    }
    function resizeGoogleMap() {
        if (mapObject.length > 0) {
            var mapWidth = mapObject.width();
            var mapHeight = Math.round(mapWidth * 0.425);
            mapObject.height(mapHeight);
        }
    }
    resizeGoogleMap();
});

// ************************* jquery-ui slider Initialization ************************************

$(function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
  });

// ************************* bootstraps tabs Initialization ************************************

$('#myTab a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})

$('.home-tab a').click(function (e) {
  e.preventDefault()
  $(this).tab('show');
  $('.carousel-product').trigger('updateSizes');
})







