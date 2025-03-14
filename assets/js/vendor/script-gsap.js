document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);
    // Split text animation
    if ($(".split-text").length > 0) {
        let st = $(".split-text");
        if (st.length == 0) return;
        // gsap.registerPlugin(SplitText);
        st.each(function (index, el) {
            el.split = new SplitText(el, {
                type: "lines,words,chars",
                linesClass: "tp-split-line",
            });
            gsap.set(el, {
                perspective: 400,
            });
            if ($(el).hasClass("right")) {
                gsap.set(el.split.chars, {
                    opacity: 0,
                    x: "50",
                    ease: "Back.easeOut",
                });
            }
            if ($(el).hasClass("left")) {
                gsap.set(el.split.chars, {
                    opacity: 0,
                    x: "-50",
                    ease: "circ.out",
                });
            }
            if ($(el).hasClass("up")) {
                gsap.set(el.split.chars, {
                    opacity: 0,
                    y: "80",
                    ease: "circ.out",
                });
            }
            if ($(el).hasClass("down")) {
                gsap.set(el.split.chars, {
                    opacity: 0,
                    y: "-80",
                    ease: "circ.out",
                });
            }
            el.anim = gsap.to(el.split.chars, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                },
                x: "0",
                y: "0",
                rotateX: "0",
                scale: 1,
                opacity: 1,
                duration: 0.6,
                stagger: 0.03,
            });
        });
    }
    // Image reveal js
    let revealContainers = document.querySelectorAll(".reveal");
    revealContainers.forEach((container) => {
        let image = container.querySelector("img");
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                toggleActions: "play none none none"
            }
        });

        tl.set(container, {
            autoAlpha: 1
        });

        if (container.classList.contains('zoom-out')) {
            // Zoom-out effect
            tl.from(image, 1.5, {
                scale: 1.4,
                ease: Power2.out
            });
        } else if (container.classList.contains('left') || container.classList.contains('right')) {
            let xPercent = container.classList.contains('left') ? -100 : 100;
            tl.from(container, 1.5, {
                xPercent,
                ease: Power2.out
            });
            tl.from(image, 1.5, {
                xPercent: -xPercent,
                scale: 1,
                delay: -1.5,
                ease: Power2.out
            });
        } else if (container.classList.contains('up') || container.classList.contains('down')) {
            let yPercent = container.classList.contains('up') ? 100 : -100;
            tl.from(container, 1.5, {
                yPercent,
                ease: Power2.out
            });
            tl.from(image, 1.5, {
                yPercent: -yPercent,
                scale: 1,
                delay: -1.5,
                ease: Power2.out
            });
        }
    });
    // Fade-up effect animation
    $(".content").each(function (i) {
        let target = $(this).find(".fade-up");

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: 'top 70%',
                toggleActions: 'play none none none',
                markers: false,
            }
        });

        if (target.length) {
            tl.from(target, {
                opacity: 0,
                y: 60,
                duration: 0.6,
                stagger: 0.2,
            });
        }
    });

    gsap.set(".fade-in-up", { y: 100, opacity: 0 });
    ScrollTrigger.batch(".fade-in-up", {
        interval: 0.1,
        duration: 5,
        toggleActions: 'play none none none',
        start: "top bottom",
        onEnter: (batch) =>
            gsap.to(batch, {
                opacity: 1,
                y: 0,
                ease: "sine",
                stagger: 0.15,
                overwrite: false,
                immediateRender: false
            }),
    });

    // green flower icon rotate js
    const greenFlower = {};
    greenFlower.interactions = {
        button: function () {
            let buttons = document.querySelectorAll(".green");
    
            buttons.forEach((button) => {
                gsap.to(button, {
                    top: Math.random() * (window.innerHeight - button.offsetHeight),
                    left: Math.random() * (window.innerWidth - button.offsetWidth),
                    opacity: 1,
                    duration: 2,
                    ease: "power3.out"
                });
    
                // Apply smooth infinite rotation with scroll, using slower scrub for smoothness
                var rotate = gsap.timeline({
                    scrollTrigger: {
                        trigger: "html",
                        scrub: 0.8,
                        start: "top top",
                        end: "+=10000"
                    }
                }).to(button, {
                    rotation: 360 * 10,
                    duration: 1,
                    ease: "none"
                });
            });
    
            // Repeat the movement every few seconds with a more fluid transition
            setInterval(() => {
                buttons.forEach((button) => {
                    gsap.to(button, {
                        top: Math.random() * (window.innerHeight - button.offsetHeight),
                        left: Math.random() * (window.innerWidth - button.offsetWidth),
                        duration: 2,
                        ease: "power4.inOut"
                    });
                });
            }, 5000);
        }
    };
    greenFlower.interactions.button();
    
    //Slightly move elements when mouse moves gsap js
    const sectionNewsletter = document.querySelector(".section-newsletter");
    const movingElements = document.querySelectorAll(".movable");
    let targetX = 0;
    let targetY = 0;
    let animationFrame;
    function handleMovement(e) {
        const x = e.touches ? e.touches[0].clientX : e.clientX;
        const y = e.touches ? e.touches[0].clientY : e.clientY;
        const w = window.innerWidth / 2;
        const h = window.innerHeight / 2;
        targetX = (x - w) / w;
        targetY = (y - h) / h;
        if (!animationFrame) {
            animationFrame = requestAnimationFrame(updateParallax);
        }
    }
    function updateParallax() {
        movingElements.forEach((element) => {
            const depth = element.getAttribute("data-depth") || 1;
            const moveX = targetX * 10 * depth;
            const moveY = targetY * 10 * depth;
    
            element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        animationFrame = null;
    }
    if(sectionNewsletter) {
        sectionNewsletter.addEventListener("mousemove", handleMovement);
        sectionNewsletter.addEventListener("touchmove", handleMovement);
    }
});


