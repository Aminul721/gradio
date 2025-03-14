document.addEventListener("DOMContentLoaded", function () {
    if (document.readyState === 'complete') {
        loadAllImages();
    } else {
        document.addEventListener('readystatechange', function() {
            if (document.readyState === 'complete') {
                loadAllImages();
            }
        });
    }
});
// loadAllImages function
function loadAllImages() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        const originalStyle = img.getAttribute("style") || "";
        img.style.height = img.clientHeight + "px";
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        img.addEventListener('load', () => {
            if (originalStyle) {
                img.setAttribute("style", originalStyle);
            } else {
                img.removeAttribute("style");
            }
            img.classList.add('lazy-image-loaded');
        });
    });
}