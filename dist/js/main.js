// Preloader start
window.onload = function () {
  let preloader = document.getElementById('preloader');
  preloader.style.display = "none";
}
// Preloader end

$(function(){
    // Burger mobile menu start
    $('.menu-burger__header').click(function(){
        $('.menu-burger__header').toggleClass('open-menu');
        $('.header__nav').toggleClass('open-menu');
        $('body').toggleClass('fixed-page');
	});

 
  $('header a').on('click', function(){
    $('.menu-burger__header').toggleClass('open-menu');
    $('.header__nav').toggleClass('open-menu');
    $('body').toggleClass('fixed-page');
  })
  
  // Burger mobile menu end

  // Popup gallery start
    $('.about__gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
			verticalFit: true,
		},
        gallery: {
          enabled: true
        },
        zoom: {
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
			opener: function(element) {
				return element.find('img');
			}
		}
      });
  // Popup gallery end

    // Slider start
      $('.slider__title').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        centerMode: true,
        focusOnSelect: true,
        fade: true,
      });

      $('.slider_blocks').on('click', 'li', function(){
        let lindex = $(this).index();
        $(".slider__title").slick('slickGoTo', parseInt(lindex)); // меняем слад на нужный индекс
        $('.slider_blocks li').removeClass('active'); // change class
        $(this).addClass('active');
    });

    $('.slider__title').on('afterChange', function(event, slick, currentSlide, nextSlide){
        let slideIndex = $(this).index();
        $('.slider_blocks li').removeClass('active');
        $('.slider_blocks li').eq(currentSlide).addClass('active')
      });
    // Slider end

    // Gallery start
    $('.gallery__wrapper').magnificPopup({
      delegate: 'a',
      type: 'image',
      iframe: {
        markup: '<div class="mfp-iframe-scaler my-class">'+
                  '<div class="mfp-close"></div>'+
                  '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                '</div>'
      },
      closeOnContentClick: false,
      closeBtnInside: false,
      mainClass: 'mfp-with-zoom mfp-img-mobile',
          image: {
        verticalFit: true,
      },
          gallery: {
            enabled: true
          },
          zoom: {
        enabled: true,
        duration: 300, // don't foget to change the duration also in CSS
        opener: function(element) {
          return element.find('img');
        }
      }
    });
    // Gallery end

    // Partners start
    $('.partners__link').on('click', function(){
      $(this).addClass('active')
      $(this).siblings().removeClass('active')
      let partnersOnShow = $(this).attr('data-show')
      $('[data-show-me=' + partnersOnShow + ']').addClass('active')
      $('[data-show-me=' + partnersOnShow + ']').siblings().removeClass('active')
    })
    // Partners end

    // Modal window start
    $(document).ready(function() {
      $('.find-out-the-cost').magnificPopup({
        type: 'inline',
        preloader: false,
        focus: '#name',
        callbacks: {
          beforeOpen: function() {
            if($(window).width() < 700) {
              this.st.focus = false;
            } else {
              this.st.focus = '#name';
            }
          }
        }
      });
      $(document).on('click', '.popup-dismiss', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
      });
    });
    // Modal window end
});


$(window).scroll(function() {
    if ($(this).scrollTop() > 1){
        $('header').addClass("sticky");
    }
    else{
        $('header').removeClass("sticky");
    }
});


// Lazy load for image  start
document.addEventListener("DOMContentLoaded", function() {
  let lazyloadImages = document.querySelectorAll("img.lazy");    
  let lazyloadThrottleTimeout;
  
  function lazyload () {
    if(lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout);
    }    
    
    lazyloadThrottleTimeout = setTimeout(function() {
        let scrollTop = window.pageYOffset + 600;
        lazyloadImages.forEach(function(img) {
            if(img.offsetTop < (window.innerHeight + scrollTop)) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
            }
        });
        if(lazyloadImages.length == 0) { 
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
    }, 20);
  }
  
  document.addEventListener("scroll", lazyload);
  window.addEventListener("resize", lazyload);
  window.addEventListener("orientationChange", lazyload);
});
// Lazy load for image end



// Lazy load for iframe start
document.addEventListener("DOMContentLoaded", function() {
  if ("IntersectionObserver" in window) {
   let iframesLazy = document.querySelectorAll(".map iframe");
   let iframeObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
     if (entry.isIntersecting && entry.target.src.length == 0) {
      entry.target.src = entry.target.dataset.src;
      iframeObserver.unobserve(entry.target);
     }
    });
   });
   iframesLazy.forEach(function (iframe) {
    iframeObserver.observe(iframe);
   });
  } else {
   let iframesLazy = document.querySelector('.map iframe');
   for (let i = 0; i < iframesLazy.length; i++) {
    if (lazyVids[i].getAttribute('data-src')) {
     lazyVids[i].setAttribute('src', lazyVids[i].getAttribute('data-src'));
    }
   }
  }
 });
// Lazy load for iframe end

// Slowly scroll to link start
$(document).ready(function(){
	$(".menu, .footer__nav-links").on("click","a", function (event) {
		event.preventDefault();
		let id  = $(this).attr('href'),
		top = $(id).offset().top - 120;
		$('body,html').animate({scrollTop: top}, 700);
	});
});
// Slowly scroll to link end

// Play animation when user to scroll in counter block start
let tryIng_1 = false;
let target_1 = $('.count-num');
let targetPos_1 = target_1.offset().top;
let winHeight_1 = $(window).height();
let scrollToElem_1 = targetPos_1 - winHeight_1;

let tryIng_2 = false;
let target_2 = $('.become__block');
let targetPos_2 = target_2.offset().top;
let winHeight_2 = $(window).height();
let scrollToElem_2 = targetPos_2 - winHeight_2;

$(window).scroll(function(){
    if (tryIng_1 == false){
      let winScrollTop_1 = $(this).scrollTop();
      if(winScrollTop_1 > scrollToElem_1){

        $('.count-num').each(function(){
          $(this).prop('Counter', 0).animate({
            Counter:$(this).text()
          },{
            duration: 1000,
            easing: 'swing',
            step:function(now){
              $(this).text(Math.ceil(now));
            }
          })
        })

        tryIng_1 = true;
    }
  }
    if (tryIng_2 == false){
      let winScrollTop_2 = $(this).scrollTop();
      if(winScrollTop_2 > scrollToElem_2){

        $('.count-num-2').each(function(){
          $(this).prop('Counter', 0).animate({
            Counter:$(this).text()
          },{
            duration: 1000,
            easing: 'swing',
            step:function(now){
              $(this).text(Math.ceil(now));
            }
          })
        })

        tryIng_2 = true;
    }
  }
});
// Play animation when user to scroll in counter block end

let tryIng_3 = false;
let target_3 = $('.advantages__block--1');
let targetPos_3 = target_3.offset().top;
let winHeight_3 = $(window).height();
let scrollToElem_3 = targetPos_3 - winHeight_3;

let tryIng_4 = false;
let target_4 = $('.advantages__block--2');
let targetPos_4 = target_4.offset().top;
let winHeight_4 = $(window).height();
let scrollToElem_4 = targetPos_4 - winHeight_4;

let tryIng_5 = false;
let target_5 = $('.advantages__block--3');
let targetPos_5 = target_5.offset().top;
let winHeight_5 = $(window).height();
let scrollToElem_5 = targetPos_5 - winHeight_5;

let tryIng_6 = false;
let target_6 = $('.advantages__block--4');
let targetPos_6 = target_6.offset().top;
let winHeight_6 = $(window).height();
let scrollToElem_6 = targetPos_6 - winHeight_6;

$(window).scroll(function(){
    if (tryIng_3 == false){
      let winScrollTop_3 = $(this).scrollTop();
      if(winScrollTop_3 > scrollToElem_3){
        $('.advantages__block--1').addClass('active')
        tryIng_3 = true;
    }
  }
    if (tryIng_4 == false){
      let winScrollTop_4 = $(this).scrollTop();
      if(winScrollTop_4 > scrollToElem_4){
        $('.advantages__block--2').addClass('active')
        tryIng_4 = true;
    }
  }
    if (tryIng_5 == false){
      let winScrollTop_5 = $(this).scrollTop();
      if(winScrollTop_5 > scrollToElem_5){
        $('.advantages__block--3').addClass('active')
        tryIng_3 = true;
    }
  }
  if (tryIng_6 == false){
    let winScrollTop_6 = $(this).scrollTop();
    if(winScrollTop_6 > scrollToElem_6){
      $('.advantages__block--4').addClass('active')
      tryIng_6 = true;
  }
}
});