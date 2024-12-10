document.addEventListener("DOMContentLoaded", function () {

    // mapping bubbles to pages
    const bubbles = [
        {id: "critical-bubble", url: "anger-critical-details.html"},
        {id: "mad-bubble", url: "anger-mad-details.html"},
        {id: "rageful-bubble", url: "anger-rageful-details.html"},
        {id: "frustrated-bubble", url: "anger-frustrated-details.html"},
        {id: "hurt-bubble", url: "anger-hurt-details.html"},
    ];

    // clicking a bubble opens respective emotion card
    bubbles.forEach((bubble) => {
        const element = document.getElementById(bubble.id);
        if (element) {
            element.addEventListener("click", function () {
                window.location.href = bubble.url;
            });
        }
    });

    //GSAP
    gsap.from(".container", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
    });

    const container = document.querySelector(".container");
    const closeButton = document.querySelector(".close-button");
    const mainMenu = document.querySelector(".main-menu");

    closeButton.addEventListener("click", function () {
        
        // animate out before returning to the main menu
        gsap.to(container, {
            duration: 0.8,
            x: "100%",  // move the container out to the right
            ease: "power1.inOut",
            onComplete: () => {
                gsap.to(mainMenu, {
                    duration: 1.0,
                    x: "0%",  // slide the menu in from the left
                    ease: "circ.out",
                    onComplete: () => {
                        window.location.href = "index.html"; // redirect to main menu
                    }
                });
            }
        });
    });
});

