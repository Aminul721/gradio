
(function ($) {
  "use strict";
  if($(".preloader")){
    $(".preloader").fadeOut("slow", function () {
			$(this).remove(100);
		});
  }
  // header sticky js
  if ($(".section-header")) {
    $(".section-header").clone().insertAfter(".section-header").addClass("header-cloned");
  }

  var previousScroll = 0;
  function headerStickyFun() {
    const scroll = window.scrollY || document.documentElement.scrollTop;
    const header = $(".section-header");

    const totalHeaderHeight = header.height();

    if (header) {
      if (scroll > 200) {
        if (scroll > previousScroll) {
          // Scrolling down
          $(header).removeClass("is-sticky");
        } else {
          $(header).addClass("is-sticky");
        }
      } else {
        $(".section-header").removeClass("is-sticky");
      }

      function setMultipleCSSVariables(variables) {
        let root = $(':root');
        for (const [key, value] of Object.entries(variables)) {
          root.css(key, value);
        }
      }

      setMultipleCSSVariables({
        '--total-header-height': totalHeaderHeight + 'px'
      });
    }
    previousScroll = scroll;
  }
  headerStickyFun();

  // Video popup js
  if ($('.video-popup-link').length > 0) {
    $('.video-popup-link').magnificPopup({
      disableOn: 200,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false
    });
  }
  // =======Magnific-PopUp========>>>>>  
  if ($('.image-link').length > 0) {
    $('.image-link').magnificPopup({
      type: 'image',
      gallery: {
        enabled: true
      },
      zoom: {
        enabled: true,
        duration: 300,
        opener: function (element) {
          return element.find('img');
        }
      }
    });
  }

  // Leaflet map js
  if ($('#map').length > 0) {
    var map = L.map('map').setView([37.774929, -122.419418], 12);
    var locationsArray = [];
    function clickZoom(e) {
      map.setView(e.target.getLatLng(), 16);
    }

    $.each(volturaLocations, function (index, location) {
      // Create Marker
      var marker = L.marker(location.markerPoint, {
        title: location.title,
        className: "marker-usa"
      }).addTo(map);

      // Bind Popup
      marker.bindPopup(`<div class="card card-map voltura-map-card"><div class="card-body">
      <h5 class="text-black mb-1">${location.title}</h5>
      <p class="mb-0 text-black fw-semibold">${location.subtitle}</p>
      <p class="mb-0 text-black contact-home">${location.address}</p>                          
      </div></div>`).on('click', clickZoom);

      // Store the location in the array
      locationsArray.push({ marker: marker, location: location });
    });

    // Handle external link clicks
    $('.btn-map-direction').on('click', function (e) {
      e.preventDefault();
      var markerTitle = $(this).data('title');

      // Find the marker in the array based on the title
      var selectedMarker = locationsArray.find(function (item) {
        return item.location.title === markerTitle;
      });

      // Open the popup for the selected marker
      if (selectedMarker) {
        selectedMarker.marker.openPopup();
        map.setView(selectedMarker.marker.getLatLng(), 12);
      }
    });

    L.tileLayer('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {
      maxZoom: 26,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Outside click event
    $(document).on('click', function (e) {
      var mapContainer = $('#map');
      var isClickInsideMap = mapContainer.has(e.target).length > 0 || mapContainer.is(e.target);
    });
  }

  // ajax form js
  /*$(document).on('submit', '#contactForm, #callRequestForm, #downloadForm', function (e) {
    e.preventDefault();
    var form = $(this);
    var formData = form.serialize();
    var responseDiv = form.find('.response');
    form.find('[type="submit"]').prop('disabled', true);
    formData += '&id=' + form.attr('id');
    responseDiv.html('<p class="mb-0 text-warning">Working....</p>');

    $.ajax({
      type: 'POST',
      url: 'mail.php',
      data: formData,
      success: function (response) {
        var data = JSON.parse(response);
        if (data.error) {
          responseDiv.empty().html('<div class="alert alert-error">' + data.msg + '</div>');
          // You can add additional actions for success here
        } else {
          responseDiv.empty().html('<div class="alert alert-sucess">' + data.msg + '</div>');
          form.get(0).reset();
        }
        form.find('[type="submit"]').prop('disabled', false);
      },
      error: function (error) {
        console.log('Error:', error);
        form.find('[type="submit"]').prop('disabled', false);
      }
    });
  });*/

  var form = document.getElementById("my-form");
  
  async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("my-form-status");
    var data = new FormData(event.target);
    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
          'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        status.innerHTML = "Thanks for your submission!";
        form.reset()
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
          } else {
            status.innerHTML = "Oops! There was a problem submitting your form"
          }
        })
      }
    }).catch(error => {
      status.innerHTML = "Oops! There was a problem submitting your form"
    });
  }
  form.addEventListener("submit", handleSubmit)

  window.formbutton=window.formbutton||function(){(formbutton.q=formbutton.q||[]).push(arguments)};
  /* customize formbutton below*/     
  formbutton("create", {
    action: "https://formspree.io/f/mlgrdlkd",
    title: "How can we help?",
    fields: [
      { 
        type: "fullname", 
        label: "Full Name:", 
        name: "fullname",
        required: true,
        placeholder: "Your Full Name"
      },
      { 
        type: "email", 
        label: "Email:", 
        name: "email",
        required: true,
        placeholder: "your@email.com"
      },
      {
        type: "textarea",
        label: "Message:",
        name: "message",
        placeholder: "What's on your mind?",
      },
      { type: "submit" }      
    ],
    styles: {
      title: {
        backgroundColor: "gray"
      },
      button: {
        backgroundColor: "gray"
      }
    }
  });



  if ($(".wow").length) {
    var wow = new WOW({
      boxClass: "wow", // animated element css class (default is wow)
      animateClass: "animated", // animation css class (default is animated)
      mobile: true, // trigger animations on mobile devices (default is true)
      live: true // act on asynchronously loaded content (default is true)
    });
    wow.init();
  }

  // backToTopScroll js
  if($("#back-to-top").length){
    var options = {
      size: 44,
      lineWidth: 22,
      rotate: -5,
      colorCircleBackground: "#cac6d5b5",
      colorCircle: "#BDFE6D"
    };
    var canvas = document.createElement("canvas");
    $("#back-to-top").append(canvas);
    var ctx = canvas.getContext("2d");
    canvas.width = canvas.height = options.size;
    ctx.translate(options.size / 2, options.size / 2);
    ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI);
    $("#back-to-top").css({
      '--back-top-size': `${options.size}px`
    })
    $("#back-to-top").on("click", function () {
      $("html, body").animate({ scrollTop: 0 }, 600);
    });
  }
  function refreshCanvas() {
    var top = $(window).scrollTop();
    var docH = $(document).height();
    var winH = $(window).height();
    // scroll percentage
    var percent = (top / (docH - winH)) * 100;
    if (percent >= 4) {
      $("#back-to-top").addClass("show-back-top");
    } else {
      $("#back-to-top").removeClass("show-back-top");
    }
    var drawCircle = function (color, colorBackground, lineWidth, percent) {
      // clear canvas
      ctx.clearRect(
        -options.size / 2,
        -options.size / 2,
        options.size,
        options.size
      );
      // options
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "butt";
      // background circle
      ctx.beginPath();
      ctx.arc(
        0,
        0,
        (options.size - options.lineWidth) / 2,
        0,
        Math.PI * 2 * 1,
        false
      );
      ctx.strokeStyle = colorBackground;
      ctx.stroke();
      ctx.closePath();
      // variable circle
      ctx.beginPath();
      ctx.arc(
        0,
        0,
        (options.size - options.lineWidth) / 2,
        0,
        Math.PI * 2 * percent,
        false
      );
      ctx.strokeStyle = color;
      ctx.stroke();
      ctx.closePath();
    };
    drawCircle(
      options.colorCircle,
      options.colorCircleBackground,
      options.lineWidth,
      percent / 100
    );
  }
  refreshCanvas();

  $(window).on("scroll", function () {
    headerStickyFun();
    refreshCanvas();
  })
  $(window).on("resize", function () { })

})(jQuery);

document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  if (window.innerWidth > 992) {
    document.querySelectorAll(".nav-item.dropdown").forEach(function (everyElement) {
      let el_attr = everyElement.querySelector("a[data-bs-toggle]");
      if(el_attr.parentNode.querySelector('ul')){
        el_attr.classList.add('has-sub');
      }

      everyElement.addEventListener( "mouseover", function (e) {
        let el_link = this.querySelector("a[data-bs-toggle]");
        if (el_link !== null) {
          let nextEl = el_link.nextElementSibling;
          el_link.classList.add("show");
          if (nextEl !== null && this.contains(nextEl)) {
            nextEl.classList.add("show");
          }
        }
      }.bind(everyElement)); // Explicitly bind the context to the current element

      everyElement.addEventListener( "mouseleave", function (e) {
        let el_link = this.querySelector("a[data-bs-toggle]");
        if (el_link !== null) {
          let nextEl = el_link.nextElementSibling;
          if (nextEl !== null && this.contains(nextEl)) {
            el_link.classList.remove("show");
            nextEl.classList.remove("show");
          }
        }
      }.bind(everyElement)); // Explicitly bind the context to the current element
    });
  }

  // =============  Dynamic Year =====
  if ($('.dynamic-year').length > 0) {
    const yearElement = document.querySelector('.dynamic-year');
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = currentYear;
  }

  // swiper slider js
  function swiperSlider() {
    const swiperItems = document.querySelectorAll(".gradio-swiper-slider");
    swiperItems.forEach(function (swiperElm) {
      if (!swiperElm.dataset.swiperInitialized) {
        const swiperOptions = JSON.parse(swiperElm.dataset.swiperOptions);
        // Add additional callbacks here
        swiperOptions.on = {
          slideChange: function () {
            // updateClasses(this);
          }
        };
        let SwiperSlider = new Swiper(swiperElm, swiperOptions);
        swiperElm.dataset.swiperInitialized = true;
      }
    });
  }
  swiperSlider();

  let prevMrqScroll = window.scrollY;
  function marqueeFunction(){
    let winWidth = screen.width + 180;
    let marqueeWrapper = document.querySelectorAll('.marquee-wrapper');
    let marqueeItemWrap = document.querySelectorAll('.marquee-inner');
    let currentScroll = window.scrollY;
    let isScrollingDown;

    if (prevMrqScroll > currentScroll) {
      isScrollingDown =  "left";
    } else {
      isScrollingDown =  "right";
    }
    marqueeItemWrap.forEach(item => {
      item.setAttribute("data-dir", isScrollingDown);
    });
    marqueeWrapper.forEach(item => {
      item.style.minWidth = `${winWidth}px`
    })

    prevMrqScroll = currentScroll;
  }
  marqueeFunction();  

  window.addEventListener('scroll', function (event) {
    marqueeFunction();
  }, true);

  window.addEventListener('resize', function (event) {
    marqueeFunction()
    fullWidthSliderFun();
    swiperSlider();
  }, true);
})