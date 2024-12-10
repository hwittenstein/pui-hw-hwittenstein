document.addEventListener("DOMContentLoaded", function () {

    // mapping bubbles to pages
    const bubbles = [
        {id: "grateful-bubble", url: "joy-grateful-details.html"},
        {id: "excited-bubble", url: "joy-excited-details.html"},
        {id: "creative-bubble", url: "joy-creative-details.html"},
        {id: "energetic-bubble", url: "joy-energetic-details.html"},
        {id: "connected-bubble", url: "joy-connected-details.html"},
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