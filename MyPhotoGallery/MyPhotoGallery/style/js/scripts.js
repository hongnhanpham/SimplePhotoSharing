$(document).ready(function() {
    'use strict';
    /*-----------------------------------------------------------------------------------*/
    /*	HAMBURGER MENU ICON
    /*-----------------------------------------------------------------------------------*/
    $(".nav-bars").on( "click", function() {
        $(".nav-bars").toggleClass("is-active");
    });
    /*-----------------------------------------------------------------------------------*/
    /*	FOTORAMA
	/*-----------------------------------------------------------------------------------*/
    $('.fotorama').fotorama({
        spinner: {
            color: 'rgba(0, 0, 0, 0)'
        }
    });
    $('.fotorama-item').append(' ');
    /*-----------------------------------------------------------------------------------*/
    /*	IMAGE ICON HOVER
    /*-----------------------------------------------------------------------------------*/
    $('.overlay a').prepend('<span class="over"><span></span></span>');
    /*-----------------------------------------------------------------------------------*/
    /*	LIGHTGALLERY
	/*-----------------------------------------------------------------------------------*/
    $('.light-gallery').lightGallery({
        thumbnail: false,
        selector: '.lgitem',
        animateThumb: true,
        showThumbByDefault: false,
        download: false,
        autoplayControls: false,
        zoom: false,
	    fullScreen: false,
        thumbWidth: 100,
        thumbContHeight: 80,
        hash: false,
        videoMaxWidth: '1000px'
    });
    /*-----------------------------------------------------------------------------------*/
    /*	CUBE PORTFOLIO
    /*-----------------------------------------------------------------------------------*/
    $('#js-grid-lightbox').cubeportfolio({
        filters: '#js-lightbox-filter',
        loadMore: '#js-lightbox-more',
        loadMoreAction: 'click',
        layoutMode: 'grid',
        mediaQueries: [{
            width: 1500,
            cols: 4
        }, {
            width: 1100,
            cols: 3
        }, {
            width: 800,
            cols: 3
        }, {
            width: 670,
            cols: 2
        }, {
            width: 320,
            cols: 1
        }],
        defaultFilter: '*',
        animationType: 'quicksand',
        gapHorizontal: 10,
        gapVertical: 10,
        gridAdjustment: 'responsive',
        caption: 'fadeIn',
        displayType: 'fadeIn',
        displayTypeSpeed: 100,

    });
    $('#js-grid-inline').cubeportfolio({
        filters: '#js-inline-filter',
        loadMore: '#js-inline-more',
        loadMoreAction: 'click',
        layoutMode: 'grid',
        mediaQueries: [{
            width: 1500,
            cols: 4
        }, {
            width: 1100,
            cols: 3
        }, {
            width: 800,
            cols: 3
        }, {
            width: 670,
            cols: 2
        }, {
            width: 320,
            cols: 1
        }],
        defaultFilter: '*',
        animationType: 'quicksand',
        gapHorizontal: 6,
        gapVertical: 6,
        gridAdjustment: 'responsive',
        caption: 'fadeIn',
        displayType: 'fadeIn',
        displayTypeSpeed: 100,

        // singlePageInline
        singlePageInlineDelegate: '.cbp-singlePageInline',
        singlePageInlinePosition: 'top',
        singlePageInlineDeeplinking: true,
        singlePageInlineInFocus: true,
        singlePageInlineCallback: function(url, element) {
            // to update singlePageInline content use the following method: this.updateSinglePageInline(yourContent)
            var t = this;

            $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'html',
                    timeout: 30000
                })
                .done(function(result) {

                    t.updateSinglePageInline(result);

                })
                .fail(function() {
                    t.updateSinglePageInline('AJAX Error! Please refresh the page!');
                });
        },
    });
    $('#js-grid-slider-testimonials').cubeportfolio({
        layoutMode: 'slider',
        drag: true,
        auto: false,
        autoTimeout: 5000,
        autoPauseOnHover: true,
        showNavigation: false,
        showPagination: true,
        rewindNav: true,
        scrollByPage: false,
        gridAdjustment: 'responsive',
        mediaQueries: [{
            width: 1,
            cols: 1
        }],
        gapHorizontal: 0,
        gapVertical: 0,
        caption: '',
        displayType: 'default',
    });
    /*-----------------------------------------------------------------------------------*/
    /*	TAB COLLAPSE
    /*-----------------------------------------------------------------------------------*/
    $('#tab1').tabCollapse({
        tabsClass: 'hidden-sm hidden-xs',
        accordionClass: 'visible-sm visible-xs'
    });
    $('#tab1').on('shown-accordion.bs.tabcollapse', function() {
        $('.panel-group').find('.panel-default:has(".in")').addClass('panel-active');
        $('.panel-group').on('shown.bs.collapse', function(e) {
            $(e.target).closest('.panel-default').addClass(' panel-active');
        }).on('hidden.bs.collapse', function(e) {
            $(e.target).closest('.panel-default').removeClass(' panel-active');
        });
    });
    /*-----------------------------------------------------------------------------------*/
    /*	TOGGLE
    /*-----------------------------------------------------------------------------------*/
    $('.panel-group').find('.panel-default:has(".in")').addClass('panel-active');
    $('.panel-group').on('shown.bs.collapse', function(e) {
        $(e.target).closest('.panel-default').addClass(' panel-active');
    }).on('hidden.bs.collapse', function(e) {
        $(e.target).closest('.panel-default').removeClass(' panel-active');
    });
    /*-----------------------------------------------------------------------------------*/
    /*	PROGRESS BAR
    /*-----------------------------------------------------------------------------------*/
    $('.progress-list .progress .bar').progressBar({
        shadow: false,
        percentage: false,
        animation: true,
        height: 12
    });
    /*-----------------------------------------------------------------------------------*/
    /*	DATA REL
    /*-----------------------------------------------------------------------------------*/
    $('a[data-rel]').each(function() {
        $(this).attr('rel', $(this).data('rel'));
    });
    /*-----------------------------------------------------------------------------------*/
    /*	TOOLTIP
    /*-----------------------------------------------------------------------------------*/
    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }
    /*-----------------------------------------------------------------------------------*/
    /*	PRETTIFY
    /*-----------------------------------------------------------------------------------*/
    window.prettyPrint && prettyPrint();
    /*-----------------------------------------------------------------------------------*/
    /*	LAZY LOAD GOOGLE MAPS
    /*-----------------------------------------------------------------------------------*/
    ;
    (function($, window, document, undefined) {
        var $window = $(window),
            mapInstances = [],
            $pluginInstance = $('.google-map').lazyLoadGoogleMaps({
                callback: function(container, map) {
                    var $container = $(container),
                        center = new google.maps.LatLng($container.attr('data-lat'), $container.attr('data-lng'));

                    map.setOptions({
                        center: center,
                        zoom: 15,
                        zoomControl: true,
                        zoomControlOptions: {
                            style: google.maps.ZoomControlStyle.DEFAULT,
                        },
                        disableDoubleClickZoom: false,
                        mapTypeControl: true,
                        mapTypeControlOptions: {
                            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                        },
                        scaleControl: true,
                        scrollwheel: false,
                        streetViewControl: true,
                        draggable: true,
                        overviewMapControl: false,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    });
                    new google.maps.Marker({
                        position: center,
                        map: map
                    });

                    $.data(map, 'center', center);
                    mapInstances.push(map);

                    var updateCenter = function() {
                        $.data(map, 'center', map.getCenter());
                    };
                    google.maps.event.addListener(map, 'dragend', updateCenter);
                    google.maps.event.addListener(map, 'zoom_changed', updateCenter);
                    google.maps.event.addListenerOnce(map, 'idle', function() {
                        $container.addClass('is-loaded');
                    });
                }
            });

        $window.on('resize', $pluginInstance.debounce(1000, function() {
            $.each(mapInstances, function() {
                this.setCenter($.data(this, 'center'));
            });
        }));

    })(jQuery, window, document);
    /*-----------------------------------------------------------------------------------*/
    /*	LOADER
    /*-----------------------------------------------------------------------------------*/
    $(".pageloader").lsPreloader({

        backgroundColor: "#FFF",
        logoImage: "style/images/logo.png",
        minimumTime: .5,
        progressHeight: "0",
        progressColor: "#404040",
        percentFontSize: "18px"

    });
    /*-----------------------------------------------------------------------------------*/
    /*	PARALLAX MOBILE
    /*-----------------------------------------------------------------------------------*/
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i)) {
        $('.parallax').addClass('mobile');
    }
    /*-----------------------------------------------------------------------------------*/
    /*	BACKGROUND VIDEO PARALLAX
    /*-----------------------------------------------------------------------------------*/
    $('#video-marriage').backgroundVideo({
        $outerWrap: $('.outer-wrap'),
        pauseVideoOnViewLoss: false,
        parallaxOptions: {
            effect: 1.9
        }
    });
    /*-----------------------------------------------------------------------------------*/
    /*	VANILLA
    /*-----------------------------------------------------------------------------------*/
    var myForm;
    myForm = new VanillaForm($("form.vanilla-form"));
    /*-----------------------------------------------------------------------------------*/
    /*	FITVIDS VIDEO
    /*-----------------------------------------------------------------------------------*/
    $('.player').fitVids();
    /*-----------------------------------------------------------------------------------*/
    /*	INSTAGRAM
    /*-----------------------------------------------------------------------------------*/
    var instagramFeed = new Instafeed({
        target: 'instafeed-widget',
        get: 'user',
        limit: 6,
        userId: 1215763826,
        accessToken: '1215763826.f1627ea.dad6ca96bd7642519b573d52c3ef467f',
        resolution: 'low_resolution',
        template: '<div class="item col-xs-4 col-sm-6 col-md-4"><figure class="overlay small"><a href="{{link}}" target="_blank"><img src="{{image}}" /></a></figure></div>',
        after: function() {
            $('#instafeed-widget figure.overlay a').prepend('<span class="over"><span></span></span>');
        }
    });
    $('#instafeed-widget').each(function() {
        instagramFeed.run();
    });
    var instagramFeed2 = new Instafeed({
        target: 'instafeed',
        get: 'user',
        limit: 6,
        userId: 1215763826,
        accessToken: '1215763826.f1627ea.dad6ca96bd7642519b573d52c3ef467f',
        resolution: 'low_resolution',
        template: '<div class="item col-xs-6 col-sm-4 col-md-2"><figure class="overlay instagram"><a href="{{link}}" target="_blank"><img src="{{image}}" /></a></figure></div>',
        after: function() {
            $('#instafeed figure.overlay a').prepend('<span class="over"><span></span></span>');
        }
    });
    $('#instafeed').each(function() {
        instagramFeed2.run();
    });	
    /*-----------------------------------------------------------------------------------*/
    /*	COUNTER UP
    /*-----------------------------------------------------------------------------------*/
    $('.fcounter').counterUp({
        delay: 50,
        time: 1000
    });
    /*-----------------------------------------------------------------------------------*/
    /*	COLLAGEPLUS
    /*-----------------------------------------------------------------------------------*/
    collage();
    function collage() {
        $('#collage-medium').removeWhitespace().collagePlus({
            'fadeSpeed': 5000,
            'targetHeight': 300,
            'effect': 'effect-2',
            'direction': 'vertical',
            'allowPartialLastRow': true
        });
    };
    // This is just for the case that the browser window is resized
    var resizeTimer = null;
    $(window).on('resize', function() {
        // hide all the images until we resize them
        $('.collage .collage-image-wrapper').css("opacity", 0);
        // set a timer to re-apply the plugin
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(collage, 200);
    });
});