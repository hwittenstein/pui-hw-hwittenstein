document.addEventListener("DOMContentLoaded", function () {

    // GSAP ////
    const menuButtons = document.querySelectorAll(".main-menu button");

    const pageMap = {
        "joy-bubble": "joy-connected-details.html", // mapping bubble to page
        "fear-bubble": "fear-vulnerable-details.html",
        "sadness-bubble": "sadness-lonely-details.html",
        "disgust-bubble": "disgust-repulsed-details.html",
        "anger-bubble": "anger-hurt-details.html",
        "peace-bubble": "peace-content-details.html",
    };

    menuButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const targetPage = pageMap[button.id];
            transitionToPage(targetPage);
        });
    });

    function transitionToPage(targetPage) {
        // animate the current page out
        gsap.to(".main-menu", {
            opacity: 0,
            scale: 0.8,
            duration: 2.0,
            ease: "power1.inOut",
            onComplete: () => {
                window.location.href = targetPage; // redirect to the target page
            },
        });
    }

    // hover animations
    const glowColors = {
        "joy-bubble": "rgba(255, 193, 69, 0.40)",  // Joy button glow color
        "fear-bubble": "rgba(255, 91, 181, 0.40)",  // Fear button glow color
        "sadness-bubble": "rgba(113, 229, 255, 0.40)",  // Sadness button glow color
        "disgust-bubble": "rgba(114, 255, 126, 0.40)",  // Disgust button glow color
        "anger-bubble": "rgba(255, 70, 73, 0.40)",  // Anger button glow color
        "peace-bubble": "rgba(196, 102, 255, 0.40)"  // Peace button glow color
    };

    const buttons = document.querySelectorAll("#joy-bubble, #fear-bubble, #sadness-bubble, #disgust-bubble, #anger-bubble, #peace-bubble");

    buttons.forEach((button) => {
        button.addEventListener("mouseenter", () => {
            const glowColor = glowColors[button.id];

            gsap.to(button, {
                boxShadow: `0px 0px 40px 0px ${glowColor}`, // glows the color of the bubble
                scale: 1.15,
                duration: 0.2,
                ease: "power1.out"
            });
        });

        button.addEventListener("mouseleave", () => {
            gsap.to(button, {
                boxShadow: "0px 0px 0px 0px rgba(255, 193, 69, 0)",  // no glow
                scale: 1,
                duration: 0.3,
                ease: "power1.out"
            });
        });
    });

});





// ATTEMPTED button rotation:

// const buttons = document.querySelectorAll(".main-menu button");
//     const numButtons = buttons.length;

//     gsap.to(".main-menu", {
//         rotation: 360,
//         scrollTrigger: {
//             trigger: ".main-menu",
//             start: "right center",
//             end: "left center",
//             scrub: true,
//             markers: true,
//             snap: {
//                 snapTo: (value) => Math.round(value / 60) * 60, // snap to closest button position
//                 duration: 0.3,
//                 ease: "power1.inOut",
//             },
//         },
//         onUpdate: () => {
//             const currentRotation = gsap.getProperty(".main-menu", "rotation") || 0;
//             // text rotation for all buttons
//             buttons.forEach((button, index) => {
//                 const angle = (360 / buttons.length) * index; // button angle
//                 const textRotation = -currentRotation - angle; // keep text upright

//                 button.style.transform = `rotate(${textRotation}deg)`;
//             });
//         },
//     });

// onUpdate: () => {
//     const currentRotation = gsap.getProperty(".main-menu", "rotation") || 0;
    
//     // rotation for all buttons
//     buttons.forEach((button, index) => {
//         const angle = (360 / totalButtons) * index + currentRotation; // button angle
//         const textRotation = -currentRotation - angle; // keep text upright

//         const radians = (angle * Math.PI) / 180; //convert angle to radians

//         // calculating new position of button
//         const radius = 65;
//         const x = radius * Math.cos(radians);
//         const y = radius + Math.sin(radians);

//         button.style.transform = "translate(" + x + "px, " + y + "px)";
//     });
// },