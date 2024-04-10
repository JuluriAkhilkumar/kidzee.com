$(document).ready(function() {

    /////////////////// PreLoader
    $(window).load(function() {
        $('#preloader').delay(350).fadeOut('slow');
        //$('body').delay(350).css({ 'overflow': 'visible' });
    });

    //////////////////////// Header Fixed
    var stickyNavTop = $('#header').offset().top;
    $(window).scroll(function() {
        if ($(window).scrollTop() > stickyNavTop) {
            $('#header').addClass('fixed');
        } else {
            $('#header').removeClass('fixed');
        }
    })

    //////////////////////// Top Menu
    if (window.matchMedia('(min-width: 1023px)').matches) {
        var ico = $('<i class="fa fa-angle-down"></i>');
        var icoinn = $('<i class="fa fa-angle-right"></i>');
        $('#TopNavBar .FirstLevel > li:has(ul) > a').append(ico);
        $('#TopNavBar li ul li:has(ul) > a').append(icoinn);
    } else {
        var ico = $('<i class="fa fa-plus"></i>');
        var icoinn = $('<i class="fa fa-plus"></i>');
        $('#TopNavBar .FirstLevel > li:has(ul), #TopNavBar .ForMembership > li:has(ul)').prepend(ico);
        $('#TopNavBar li ul li:has(ul)').prepend(icoinn);
    }

    $('#TopNavBar li:has(ul)').addClass("HasUl");

    $('#TopNavBar li:has(ul) > i').on('click', function() {
        var element = $(this).parent('li');
        element.toggleClass("open");
        element.children('ul').animate({
            height: "toggle",
            opacity: "toggle"
        }, "fast");
        element.children('ul').find('ul').slideUp();
        element.siblings('li').children('ul').slideUp();
        element.siblings('li').find('ul').slideUp();
        element.siblings('li').removeClass("open");
        element.siblings('li').find('li').removeClass("open");
    });

    $('a#ToggleMenu').on('click', function(e) {
        $('html').toggleClass('open-menu');
        $('#ToggleMenu').toggleClass("change");
        return false;
    });
    $('div#overlay, #TopNavBar a[href]').on('click', function() {
        $('html').removeClass('open-menu');
        $('#ToggleMenu').toggleClass("change");
    });

    $(window).bind("load resize", function(e) {
        if (window.matchMedia('(max-width: 991px)').matches) {
            $(".RightSide > ul").appendTo("#TopNavBar");
            $(".top-left > ul, .top-right > ul:not(.UserPhoto)").appendTo("#TopNavBar");
        } else {

        }
    });

    //////////////////////// Jump to ID

    $(".scrollto").on("click", function(e) {
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top - 40
        }, 1000);
        return false;
    });
    //$('a[href^="#"]:not([data-toggle])').click(function () {
    //    $('html,body').animate({ scrollTop: $(this.hash).offset().top - 80 });
    //    return false;
    //    e.preventDefault();
    //});


    ///////////////////// Animated carousel
    var owl = $('#banner-carousel');

    function setAnimation1(_elem, _InOut) {
        var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        _elem.each(function() {
            var $elem = $(this);
            var $animationType = 'animated ' + $elem.data('animation-' + _InOut);
            $elem.addClass($animationType).one(animationEndEvent, function() {
                $elem.removeClass($animationType); // remove animate.css Class at the end of the animations
            });
        });
    }
    owl.on('change.owl.carousel', function(event) {
        var $currentItem = $('.owl-item', owl).eq(event.item.index);
        var $elemsToanim = $currentItem.find("[data-animation-out]");
        setAnimation1($elemsToanim, 'out');
    });
    owl.on('changed.owl.carousel', function(event) {
        var $currentItem = $('.owl-item', owl).eq(event.item.index);
        var $elemsToanim = $currentItem.find("[data-animation-in]");
        setAnimation1($elemsToanim, 'in');
    });

    $('#banner-carousel').owlCarousel({
        loop: true,
        margin: 0,
        navSpeed: 1000,
        items: 1,
        smartSpeed: 1400,
        autoplay: true,
        autoplayTimeout: 8000,
        autoplayHoverPause: true,
        lazyLoad: true,
        responsiveClass: false,
        responsive: {
            0: {
                nav: false
            },
            480: {},
            640: {},
            768: {},
            1000: {
                dots: false,
                nav: true,
                navText: ["<i class='fa fa-long-arrow-left'></i>", "<i class='fa fa-long-arrow-right'></i>"]
            }
        },
        dots: false
    });
    $('#parent-testimonials-carousel').owlCarousel({
        loop: true,
        margin: 40,
        navSpeed: 1000,
        items: 2,
        smartSpeed: 1400,
        autoplay: true,
        autoplayTimeout: 8000,
        autoplayHoverPause: true,
        lazyLoad: true,
        responsiveClass: false,
        responsive: {
            0: {
                dots: false,
                nav: false
            },
            480: {},
            640: {},
            768: {},
            1000: {}
        },
        dots: false,
        nav: true,
        navText: ["<i class='fa fa-long-arrow-left'></i>", "<i class='fa fa-long-arrow-right'></i>"]
    });

    $('#Programmes').owlCarousel({
        loop: true,
        margin: 0,
        navSpeed: 1000,
        items: 1,
        smartSpeed: 1400,
        autoplay: true,
        autoplayTimeout: 8000,
        autoplayHoverPause: true,
        lazyLoad: true,
        responsiveClass: false,
        dots: true,
        responsive: {
            0: {
                nav: false
            },
            480: {},
            640: {},
            768: {},
            1000: {
                //dots: false,
                nav: true,
                navText: ["<i class='fa fa-long-arrow-left'></i>", "<i class='fa fa-long-arrow-right'></i>"]
            }
        }

    });




    $('#AnnouncementPopup').owlCarousel({
        loop: true,
        margin: 0,
        navSpeed: 1000,
        items: 1,
        smartSpeed: 1400,
        autoplay: true,
        autoplayTimeout: 8000,
        autoplayHoverPause: true,
        lazyLoad: true,
        responsiveClass: false,
        dots: true,
        responsive: {
            0: {
                //nav: false
            },
            480: {},
            640: {},
            768: {},
            1000: {
                dots: true,
                nav: true,
                navText: ["<i class='fa fa-long-arrow-left'></i>", "<i class='fa fa-long-arrow-right'></i>"]
            }
        }
    });

    $('[data-toggle="tooltip"]').tooltip()

    $(".counter").each(function() {
        $(this).prop("Counter", 0).animate({
            Counter: $(this).text()
        }, {
            duration: 4e3,
            easing: "swing",
            step: function(n) {
                $(this).text(Math.ceil(n))
            }
        })
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#back-to-top').fadeIn().addClass("fixed");
        } else {
            $('#back-to-top').fadeOut().removeClass("fixed");
        }
    });

    $('.advertiseclose').on('click', function(e) {
        $('.advertise').animate({
            height: "toggle",
            opacity: "toggle"
        }, "slow");
        return false;
    });

    $('.Chating').hide();
    $('.CloseChat').on('click', function(e) {
        $('.Chating').hide();
        return false;
    });


    $('#mapview').hide();
    $('.listview').addClass("active");
    $('.mapview').on('click', function(e) {
        $('.listview').removeClass("active");
        $('.mapview').addClass("active");
        $('#listview').hide();
        $('#mapview').show();
    });
    $('.listview').on('click', function(e) {
        $('.mapview').removeClass("active");
        $('.listview').addClass("active");
        $('#mapview').hide();
        $('#listview').show();
    });


    /////////////////////////
    $(window).bind("load resize", function(e) {
        OpenAnnouncement();
    });

    function OpenAnnouncement() {
        if (window.matchMedia('(min-width: 991px)').matches) {
            $('.popupclose').click(function() {
                $('.rgtpopup').addClass("Hidergtpopup");
                $('.OpenAnnouncement').addClass("CloseAnnouncement");
            });

            $('.OpenAnnouncement').click(function() {
                $('.rgtpopup').removeClass("Hidergtpopup");
                $('.OpenAnnouncement').removeClass("CloseAnnouncement");
            });
        } else {
            $('.popupclose').click(function() {
                $('.rgtpopup').removeClass("Hidergtpopup");
                $('.OpenAnnouncement').removeClass("CloseAnnouncement");
            });

            $('.OpenAnnouncement').click(function() {
                $('.rgtpopup').addClass("Hidergtpopup");
                $('.OpenAnnouncement').addClass("CloseAnnouncement");
            });
        }
    }


    $('.InputgroupBdr input:not([type=button]), .InputgroupBdr select, .InputgroupBdr textarea, .Inputgroup input:not([type=button]), .Inputgroup select, .Inputgroup textarea').on('focus change', function() {
        $(this).parents('.InputgroupBdr, .Inputgroup').addClass('field-focus');
    });
    $('.InputgroupBdr input:not([type=button]), .InputgroupBdr select, .InputgroupBdr textarea, .Inputgroup input:not([type=button]), .Inputgroup select, .Inputgroup textarea').blur(function() {
        $(this).parents('.InputgroupBdr, .Inputgroup').removeClass('field-focus')
        if ((jQuery.trim($(this).val()).length > 0)) { // && $(this)[0].checkValidity()
            $(this).parents('.InputgroupBdr, .Inputgroup').addClass('field-fill-text');
        } else {
            $(this).parents('.InputgroupBdr, .Inputgroup').removeClass('field-fill-text');
        }
        //if ($(this)[0].checkValidity()) { // &&
        //    $(this).parents('.inputeffect').addClass('is-valid');
        //} else {
        //    $(this).parents('.inputeffect').removeClass('is-valid');
        //}
    });


    /**
     * Animation on scroll
     */
    function aos_init() {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true,
            mirror: false
        });
    }
    window.addEventListener('load', () => {
        aos_init();
    });

});