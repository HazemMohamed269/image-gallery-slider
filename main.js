const initSlider = () => {
    const imgList = document.querySelector(".slider .img-list");
    const slideButtons = document.querySelectorAll(".slider .slide-button")
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar")
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imgList.scrollWidth - imgList.clientWidth;

    // Handel scrollbar thumb drag
    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPostion = scrollbarThumb.offsetLeft;

        // Update thumb postion on mouse move
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPostion = thumbPostion + deltaX;
            const maxThumbPostion = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth; 

            const boundedPostion = Math.max(0, Math.min(maxThumbPostion, newThumbPostion));
            const scrollPostion = (boundedPostion / maxThumbPostion) * maxScrollLeft;

            scrollbarThumb.style.left = `${boundedPostion}px`;
            imgList.scrollLeft = scrollPostion;
        }

        // Remove event listeners on mouse up
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }
        // Add event Listeners for drag interaction
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    })

    // Slide Images according to the slide button clicks
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev" ? -1 : 1
            const scrollAmount = imgList.clientWidth * direction
            imgList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        })
    })

    const handleSlideButtons = () => {
        slideButtons[0].style.display = imgList.scrollLeft <= 0 ? "none" : "block";
        slideButtons[1].style.display = imgList.scrollLeft >= maxScrollLeft ? "none" : "block";
    }

    // Update scrollbar thumb postion based on image scroll
    const updataScrollThumbpostion = () => {
        const scrollPostion = imgList.scrollLeft;
        const thumbPostion = (scrollPostion / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPostion}px`;
    }

    imgList.addEventListener("scroll", () => {
        updataScrollThumbpostion();
        handleSlideButtons();
    })
}


window.addEventListener("load", initSlider);