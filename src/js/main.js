jQuery(function($){

var BRUSHED = window.BRUSHED || {};



/* ==================================================
   Filter Works
================================================== */

BRUSHED.filter = function (){
    if($('#projects').length > 0) {  
        var container = $('#projects');

        container.imagesLoaded( function() {
            container.isotope({
                itemSelector: '.item-thumbs',
                layoutMode: 'fitRows',
                animationEngine: 'best-available',
                transitionDuration: '0.7s'
            });
        })

        // filter items when filter link is clicked
        var optionSets = $('#options .option-set');
        var optionLinks = optionSets.find('a');


        optionLinks.click(function () {
            var link = $(this);
            // don't proceed if already selected
            if ( link.hasClass('selected') ) {
              return false;
            }
            var optionSet = link.parents('.option-set');
            optionSet.find('.selected').removeClass('selected');
            link.addClass('selected');
            var filterValue = link.attr('data-filter')


            container.isotope({ filter: filterValue });
        });

        return false;

    }
}


/* ==================================================
   FancyBox
================================================== */

BRUSHED.fancyBox = function(){
    if($('.fancybox').length > 0 || $('.fancybox-media').length > 0 || $('.fancybox-various').length > 0){
        
        $(".fancybox").fancybox({               
                padding : 0,
                beforeShow: function () {
                    this.title = $(this.element).attr('title');
                    this.title = '<h4>' + this.title + '</h4>' + '<p>' + $(this.element).parent().find('img').attr('alt') + '</p>';
                },
                helpers : {
                    title : { type: 'inside' },
                }
            });
            
        $('.fancybox-media').fancybox({
            openEffect  : 'none',
            closeEffect : 'none',
            helpers : {
                media : {}
            }
        });
    }
}


/* ==================================================
   Menu Highlight
================================================== */

BRUSHED.menu = function(){
    $('#menu-nav').onePageNav({
        currentClass: 'current',
        changeHash: false,
        scrollSpeed: 750,
        scrollOffset: 30,
        scrollThreshold: 0.5,
        easing: 'easeOutExpo',
        filter: ':not(.external)'
    });
}

// collapse mobile nav on link click
$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
        $(this).collapse('hide');
    }
});

/* ==================================================
   Next Section
================================================== */

BRUSHED.goSection = function(){
    $('#nextsection').on('click', function(){
        $target = $($(this).attr('href')).offset().top-30;
        
        $('body, html').animate({scrollTop : $target}, 750, 'easeOutExpo');
        return false;
    });
}

/* ==================================================
   GoUp
================================================== */

BRUSHED.goUp = function(){
    $('#goUp').on('click', function(){
        $target = $($(this).attr('href')).offset().top-30;
        
        $('body, html').animate({scrollTop : $target}, 750, 'easeOutExpo');
        return false;
    });
}


/* ==================================================
    Scroll to Top
================================================== */

BRUSHED.scrollToTop = function(){
    var windowWidth = $(window).width(),
        didScroll = false;

    var $arrow = $('#back-to-top');

    $arrow.click(function(e) {
        $('body,html').animate({ scrollTop: "0" }, 750, 'easeOutExpo' );
        e.preventDefault();
    })

    $(window).scroll(function() {
        didScroll = true;
    });

    setInterval(function() {
        if( didScroll ) {
            didScroll = false;

            if( $(window).scrollTop() > 1000 ) {
                $arrow.css('display', 'block');
            } else {
                $arrow.css('display', 'none');
            }
        }
    }, 250);
}

/* ==================================================
   Thumbs / Social Effects
================================================== */

BRUSHED.utils = function(){
    
    $('.item-thumbs').bind('touchstart', function(){
        $(".active").removeClass("active");
        $(this).addClass('active');
    });
    
    $('.image-wrap').bind('touchstart', function(){
        $(".active").removeClass("active");
        $(this).addClass('active');
    });
    
    $('#social ul li').bind('touchstart', function(){
        $(".active").removeClass("active");
        $(this).addClass('active');
    });
    
}

/* ==================================================
   Accordion
================================================== */

BRUSHED.accordion = function(){
    var accordion_trigger = $('.accordion-heading.accordionize');
    
    accordion_trigger.delegate('.accordion-toggle','click', function(event){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $(this).addClass('inactive');
        }
        else{
            accordion_trigger.find('.active').addClass('inactive');          
            accordion_trigger.find('.active').removeClass('active');   
            $(this).removeClass('inactive');
            $(this).addClass('active');
        }
        event.preventDefault();
    });
}

/* ==================================================
   Toggle
================================================== */

BRUSHED.toggle = function(){
    var accordion_trigger_toggle = $('.accordion-heading.togglize');
    
    accordion_trigger_toggle.delegate('.accordion-toggle','click', function(event){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $(this).addClass('inactive');
        }
        else{
            $(this).removeClass('inactive');
            $(this).addClass('active');
        }
        event.preventDefault();
    });
}

/* ==================================================
   Tooltip
================================================== */

BRUSHED.toolTip = function(){ 
    $('a[data-toggle=tooltip]').tooltip();
}


/* ==================================================
    Init
================================================== */


$(document).ready(function(){
    Modernizr.load();
    
    // Preload the page with jPreLoader
    $('body').jpreLoader({
        splashID: "#jSplash",
        showSplash: true,
        showPercentage: true,
        autoClose: true,
        splashFunction: function() {
            $('#circle').delay(250).animate({'opacity' : 1}, 500, 'linear');
        }
    });
    
    BRUSHED.menu();
    BRUSHED.goSection();
    BRUSHED.goUp();
    BRUSHED.filter();
    BRUSHED.fancyBox();
    BRUSHED.scrollToTop();
    BRUSHED.utils();
    BRUSHED.accordion();
    BRUSHED.toggle();
    BRUSHED.toolTip();

});


});
