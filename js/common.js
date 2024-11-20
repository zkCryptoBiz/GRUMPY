jQuery(document).ready(function ($) {
    // document start


    // Navbar
    $("<span class='clickD'></span>").insertAfter(".navbar-nav li.menu-item-has-children > a");
    $('.navbar-nav li .clickD').click(function (e) {
        e.preventDefault();
        var $this = $(this);
        if ($this.next().hasClass('show')) {
            $this.next().removeClass('show');
            $this.removeClass('toggled');
        }
        else {
            $this.parent().parent().find('.sub-menu').removeClass('show');
            $this.parent().parent().find('.toggled').removeClass('toggled');
            $this.next().toggleClass('show');
            $this.toggleClass('toggled');
        }
    });

    $(window).on('resize', function () {
        if ($(this).width() < 1025) {
            $('html').click(function () {
                $('.navbar-nav li .clickD').removeClass('toggled');
                $('.toggled').removeClass('toggled');
                $('.sub-menu').removeClass('show');
            });
            $(document).click(function () {
                $('.navbar-nav li .clickD').removeClass('toggled');
                $('.toggled').removeClass('toggled');
                $('.sub-menu').removeClass('show');
            });
            $('.navbar-nav').click(function (e) {
                e.stopPropagation();
            });
        }
    });
    // Navbar end

    if ($(window).width() < 992) {
        $('.navbar-collapse a[href*="#"]').on('click', function () {
            $('nav.navbar > .navbar-toggler').trigger('click')
        })
    }



    /* ===== For menu animation === */
    $(".navbar-toggler").click(function () {
        $(".navbar-toggler").toggleClass("open");
        $(".navbar-toggler .stick").toggleClass("open");
        $('body,html').toggleClass("open-nav");
    });

    // Navbar end


    // Sticky Nav
    function stickyNav() {
        var scroll = $(window).scrollTop();
        if (scroll > 0) {
            $(".main-head").addClass("sticky");
        }
        else {
            $(".main-head").removeClass("sticky");
        }
    }
    stickyNav();
    
    $(window).scroll(function () {
        stickyNav();
    })

    // back to top
    if ($("#scroll").length) {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 200) {
                $('#scroll').fadeIn(200);
            } else {
                $('#scroll').fadeOut(200);
            }
        });
        $('#scroll').click(function () {
            $("html, body").animate({ scrollTop: 0 }, 500);
            return false;
        });
    }




    $('.responsive').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });



    // one page scroll menu link
    if ($(".navbar-nav").length) {
        $('a[href*="#"]').on('click', function (e) {
            e.preventDefault();
            $(document).off("scroll");
            $('.navbar-nav > li > a[href*="#"]').each(function () {
                $(this).parent('li').removeClass('current-menu-item');
            });
            $(this).parent('li').addClass('current-menu-item');
            var target = this.hash, $target = $(target);
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, function () {
                window.location.href.substr(0, window.location.href.indexOf('#'));
                $(document).on("scroll", onScroll);
            });
        });
        $(document).on("scroll", onScroll);
        function onScroll(event) {
            var scrollPos = $(document).scrollTop() + 100;
            $('.navbar-nav > li > a[href*="#"]').each(function () {
                var currLink = $(this);
                var refElement = $(currLink.attr("href"));
                if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                    $('.navbar-nav > li').removeClass("current-menu-item");
                    currLink.parent('li').addClass("current-menu-item");
                }
                else {
                    currLink.parent('li').removeClass("current-menu-item");
                }
            });
        }
    }



    if ($(".navbar-nav").length) {
        const navBar = document.querySelector('.navbar-nav'),
            myEl = navBar.querySelectorAll('li'),
            navLogo = document.querySelector(".navbar-brand img"),
            navBtn = document.querySelector(".navbar-rht");
        gsap.set(navLogo, {
            x: -40,
            opacity: 0,
        })
        gsap.set(navBtn, {
            scale: 0,
            opacity: 0,
        })
        let navMaination = gsap.timeline();
        navMaination.to(navLogo, {
            x: 0,
            opacity: 1,
            ease: "none",
            duration: 0.7,
        })
            .from(myEl, {
                y: 10,
                stagger: 0.1,
                scale: 0.8,
                opacity: 0,
                ease: "bounce.out",
                duration: 0.6,
            }, "-=0.5")
            .to(navBtn, {
                scale: 1,
                opacity: 1,
                ease: "bounce",
                duration: 0.6,
            }, "-=0.8")
    }

    //scroll to parallax effect
    if ($("[data-parallax]").length) {
        document.querySelectorAll("[data-parallax]").forEach((el) => {
            let pr_val = Number(el.dataset.parallax) * 100;
            //console.log(pr_val);
            gsap.to(el, {
                yPercent: pr_val,
                duration: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: el,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.3,
                    invalidateOnRefresh: true,
                    // markers: true,
                },
            });
        });
    }

    // Parent Element Animation
    setTimeout(() => {
        if ($('[data-anim="parent-anim-sec"]').length) {
            const parentAnimation = document.querySelectorAll('[data-anim="parent-anim-sec"]');
            parentAnimation.forEach((elem, index) => {
                let moveUpElem = elem.querySelectorAll("[data-move]");
                let slideElem = elem.querySelectorAll("[data-slide]");
                let moveTl = gsap.timeline();
                let slideTl = gsap.timeline();
                moveUpElem.forEach(function (elem2, index2) {
                    if (elem2.dataset.move == "up") {
                        gsap.set(elem2, { y: 50, opacity: 0 });
                        moveTl.to(elem2, {
                            ease: "none",
                            duration: 0.5,
                            y: 0,
                            opacity: 1,
                        })
                    }

                    if (elem2.dataset.move == "scale-up") {
                        gsap.set(elem2, { y: 50, scale: 0 });
                        slideTl.to(elem2, {
                            ease: "Power3.easeOut",
                            duration: 1.4,
                            scale: 1,
                            opacity: 1,
                            y: 0,
                        }, "=-0.2")
                    }
                    ScrollTrigger.create({
                        trigger: elem2,
                        start: "top 70%",
                        animation: moveTl,
                    })
                });

                slideElem.forEach(function (elem2, index2) {
                    if (elem2.dataset.slide == "right") {
                        gsap.set(elem2, { x: -100, opacity: 0, });
                        slideTl.to(elem2, {
                            //   stagger: 0.2,
                            ease: "Power3.easeOut",
                            duration: 1,
                            opacity: 1,
                            x: 0,
                        }, (index2 == 0 ? "" : "-=0.7"))
                    }
                    if (elem2.dataset.slide == "left") {
                        gsap.set(elem2, { x: 100, opacity: 0, });
                        slideTl.to(elem2, {
                            //   stagger: 0.2,
                            ease: "Power3.easeOut",
                            duration: 1,
                            opacity: 1,
                            x: 0,
                        }, (index2 == 0 ? "" : "-=0.7"))
                    }
                    ScrollTrigger.create({
                        trigger: elem2,
                        start: "top 70%",
                        animation: slideTl,
                    })
                });

            })
        }
    }, 10);

    // Banner Animation
    if ($(".main-banner").length) {
        let mainBanner = document.querySelector('.main-banner'),
            mainImg = mainBanner.querySelector('.banner-main-img'),
            txt1 = mainBanner.querySelector('.text1 span'),
            txt2 = mainBanner.querySelector('.text2 span'),
            txt3 = mainBanner.querySelector('.text3 span'),
            eyeIcon = mainBanner.querySelector('.banner-eye-icon'),
            star1 = mainBanner.querySelector('.star-icon1'),
            star2 = mainBanner.querySelector('.star-icon2'),
            btmTxt = mainBanner.querySelector('.banner-btm-txt');

        let mainBannerTl = gsap.timeline({});
        gsap.set([mainImg, btmTxt], {
            opacity: 0,
            y: 30,
        })
        gsap.set([txt1], {
            opacity: 0,
            rotate: -10,
        })
        gsap.set([txt2, txt3], {
            opacity: 0,
            rotate: 10,
        })
        gsap.set([eyeIcon], {
            opacity: 0,
            y: -30,
        })
        gsap.set([star1, star2], {
            opacity: 0,
            scale: 0,
        })

        mainBannerTl.to(mainImg, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "none",
        })
            .to([txt1, txt2, txt3], {
                opacity: 1,
                duration: 0.2,
                ease: "none",
                stagger: -0.05,
            })
            .to([star1, star2], {
                scale: 1,
                opacity: 1,
                duration: 0.2,
                ease: "none",
            }, "<")
            .to([eyeIcon], {
                y: 0,
                opacity: 1,
                duration: 0.4,
                ease: "none",
            }, "<")
            .to(txt1, {
                rotate: 0,
                duration: 0.5,
                ease: "bounce",
            }, "<")
            .to([txt2, txt3], {
                rotate: 0,
                duration: 0.5,
                ease: "bounce",
            }, "<")
            .to([btmTxt], {
                y: 1,
                opacity: 1,
                duration: 0.5,
                ease: "none",
            }, "-=0.7")
            .pause();

        ScrollTrigger.create({
            trigger: mainBanner,
            start: "top 75%",
            animation: mainBannerTl,
        })
    }

    // About Animation
    if ($(".abt-sec").length) {
        let aboutSec = document.querySelector('.abt-sec'),
            mainImg = aboutSec.querySelector('.about-main-img'),
            circle1 = aboutSec.querySelector('.about-img-bg1'),
            circle2 = aboutSec.querySelector('.about-img-bg2'),
            leftStar = aboutSec.querySelector('.about-left-star'),
            rightStar = aboutSec.querySelector('.about-right-star'),
            line = aboutSec.querySelector('.about-curl-line'),
            paw = aboutSec.querySelector('.abt-paw');

        let aboutSecTl = gsap.timeline({});
        gsap.set([mainImg], {
            opacity: 0,
            x: -60,
        })
        gsap.set([circle1], {
            opacity: 0,
            x: -30,
        })
        gsap.set([circle2, paw], {
            opacity: 0,
            x: 30,
        })
        gsap.set([line], {
            opacity: 0,
            y: -30,
        })
        gsap.set([leftStar, rightStar], {
            opacity: 0,
            scale: 0,
        })

        aboutSecTl.to(mainImg, {
            x: 0,
            opacity: 1,
            duration: 0.5,
            ease: "none",
        })
            .to([circle1, circle2], {
                opacity: 1,
                x: 0,
                duration: 0.3,
                ease: "none",
            })
            .to([leftStar, rightStar], {
                scale: 1,
                opacity: 1,
                duration: 0.2,
                ease: "none",
            }, "-=0.1")
            .to([line], {
                y: 0,
                opacity: 1,
                duration: 0.3,
                ease: "none",
            })
            .to([paw], {
                x: 0,
                opacity: 1,
                duration: 0.3,
                ease: "none",
            })
            .pause();

        ScrollTrigger.create({
            trigger: aboutSec,
            start: "top 75%",
            animation: aboutSecTl,
        })
    }

    // How to buy Animation
    if ($(".htb-sec").length) {
        let howToBuy = document.querySelector('.htb-sec'),
            leftStar = howToBuy.querySelector('.htb-left-star'),
            rightStar = howToBuy.querySelector('.htb-right-star'),
            htbCards = howToBuy.querySelectorAll('.htb-card');

        let howToBuyTl = gsap.timeline({});
        gsap.set([leftStar, rightStar], {
            scale: 0,
            opacity: 0,
        })
        howToBuyTl.to([leftStar, rightStar], {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "bounce"
        })
        htbCards.forEach((eachCard, index) => {
            gsap.set([eachCard], {
                rotateY: 90,
            })
            howToBuyTl.to(eachCard, {
                rotateY: 0,
                ease: "none",
                duration: 0.7,
            }, (index == 0 ? null : "-=0.5"))
        })
        howToBuyTl.pause();

        ScrollTrigger.create({
            trigger: howToBuy,
            start: "top 75%",
            animation: howToBuyTl,
        })
    }

    // Grumpynomics Animation
    if ($(".tokenomics").length) {
        let tknmc = document.querySelector('.tokenomics'),
            mainImg = tknmc.querySelector('.tokenomics-intro-middle-img'),
            mdlShape = tknmc.querySelector('.tmg'),
            token = tknmc.querySelector('.token-icon'),
            tokenTitle = tknmc.querySelector('.tokenomics-intro-title'),
            tokenPrice = tknmc.querySelector('.token-price'),
            cloud = tknmc.querySelector('.cloud-graphics'),
            leftStar = tknmc.querySelector('.tek-starf'),
            rightStars = tknmc.querySelector('.tek-stars'),
            rightPara = tknmc.querySelector('.tokenomics-intro-right-wrp');

        let tknmcTl = gsap.timeline({});
        gsap.set([mainImg], {
            y: 60,
            opacity: 0,
        })
        gsap.set([tokenTitle, tokenPrice, rightPara], {
            y: 15,
            opacity: 0,
        })
        gsap.set([mdlShape, token, cloud, leftStar, rightStars], {
            scale: 0,
            opacity: 0,
        })
        tknmcTl.to(mainImg, {
            y: 0,
            opacity: 1,
            ease: "none",
            duration: 0.5,
        })
            .to([mdlShape], {
                scale: 1,
                opacity: 1,
                ease: "none",
                duration: 1,
            }, "<")
            .to([leftStar, rightStars], {
                scale: 1,
                opacity: 1,
                ease: "bounce",
                duration: 0.4,
            }, "-=0.4")
            .to([token], {
                scale: 1,
                opacity: 1,
                ease: "bounce",
                duration: 0.4,
            })
            .to([tokenTitle, tokenPrice], {
                y: 0,
                opacity: 1,
                ease: "none",
                duration: 0.3,
                stargger: -0.1,
            }, "-=0.2")
            .to([cloud], {
                scale: 1,
                opacity: 1,
                ease: "none",
                duration: 0.5,
            }, "-=0.2")
            .to([rightPara], {
                y: 0,
                opacity: 1,
                ease: "none",
                duration: 0.3,
            }, "-=0.2")
            .pause();

        ScrollTrigger.create({
            trigger: tknmc,
            start: "top 75%",
            animation: tknmcTl,
        })
    }

    // Roadmap Animation
    if ($(".roadmap").length) {
        let rdmap = document.querySelector('.roadmap'),
            mainImg = rdmap.querySelector('.rd-img'),
            leftBgCircle = rdmap.querySelector('.rd-oval-left'),
            rightBgCircle = rdmap.querySelector('.rd-oval-right'),
            leftStar = rdmap.querySelector('.rd-star-f'),
            rightStars = rdmap.querySelector('.rd-star-s'),
            rdmapListItems = rdmap.querySelectorAll('.roadmap-list .roadmap-list-item');

        let rdmapTl = gsap.timeline({});
        gsap.set([mainImg], {
            x: 60,
            opacity: 0,
        })
        gsap.set([leftBgCircle], {
            x: -30,
            opacity: 0,
        })
        gsap.set([rightBgCircle], {
            x: 30,
            opacity: 0,
        })
        gsap.set([leftStar, rightStars], {
            scale: 0,
            opacity: 0,
        })
        rdmapTl.to(mainImg, {
            x: 0,
            opacity: 1,
            ease: "none",
            duration: 0.5,
        })
            .to([leftStar, rightStars], {
                scale: 1,
                opacity: 1,
                ease: "bounce",
                duration: 0.4,
            }, "-=0.4")
            .to([leftBgCircle, rightBgCircle], {
                x: 1,
                opacity: 1,
                ease: "none",
                duration: 0.4,
            })
        rdmapListItems.forEach((eachItem, index) => {
            let itemImg = eachItem.querySelector('.roadmap-icon'),
                itemText = eachItem.querySelector('.roadmap-intro'),
                itemLine = eachItem.querySelector('.rd-line'),
                itemDot = eachItem.querySelector('.rd-dotted');
            gsap.set([itemImg], {
                x: -30,
                opacity: 0,
            })
            gsap.set([itemText], {
                x: 30,
                opacity: 0,
            })
            gsap.set([itemLine], {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            })
            gsap.set([itemDot], {
                scale: 0,
                opacity: 0,
            })
            rdmapTl.to([itemImg, itemText], {
                x: 0,
                opacity: 1,
                ease: "none",
                duration: 0.25,
            }, (index == 0 ? "-=0.5" : null))
                .to(itemLine, {
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                    ease: "none",
                    duration: 0.3,
                }, "-=0.15")
                .to(itemDot, {
                    scale: 1,
                    opacity: 1,
                    ease: "none",
                    duration: 0.3,
                }, "-=0.05")
        })
        rdmapTl.pause();

        ScrollTrigger.create({
            trigger: rdmap,
            start: "top 70%",
            animation: rdmapTl,
        })
    }





    // document end

})


