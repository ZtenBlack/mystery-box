$(document).ready(function () {
    //boxes code
    $(".welcome__box").on("click", function () {
        let options = [10, 20, 30];
        let free = options[Math.floor(Math.random() * options.length)];
        let total = Number("1" + free);
        $('#free-spins').text(free);
        $('#total-spins').text(total);
    });
    //counter code
    let baseValue = 991;
    let savedValue = localStorage.getItem("liveUsers");
    let counter = savedValue ? parseInt(savedValue) : baseValue;
    function formatNumber(n) {
        return n.toLocaleString("en-US");
    }
    function animateNumber(from, to, duration = 600) {
        let start = performance.now();
        requestAnimationFrame(function step(ts) {
            let progress = Math.min((ts - start) / duration, 1);
            let value = Math.floor(from + (to - from) * progress);
            $("#counter").text(formatNumber(value));
            if (progress < 1) requestAnimationFrame(step);
        });
    }
    function updateCounter(delta) {
        if (delta < 0) delta = Math.abs(delta);
        let oldValue = counter;
        counter += delta;
        localStorage.setItem("liveUsers", counter);
        animateNumber(oldValue, counter);
    }
    function smallGrowth() {
        updateCounter(Math.floor(Math.random() * 3) + 1);
        setTimeout(smallGrowth, Math.random() * 2000 + 1500);
    }
    function bigGrowth() {
        updateCounter(Math.floor(Math.random() * 15) + 10);
        setTimeout(bigGrowth, Math.random() * 45000 + 30000);
    }
    $("#counter").text(formatNumber(counter));
    setTimeout(smallGrowth, 2000);
    setTimeout(bigGrowth, 10000);

    // language selection code
    $('#language-select').on('change', function () {
        const url = $(this).val();
        window.location.href = url;
    });
});
// boxes slider code
document.addEventListener('DOMContentLoaded', function () {
    const splide = new Splide('.splide', {
        type: 'slide',
        drag: 'free',
        arrows: false,
        pagination: true,
        autoWidth: true,
        focus: 'center',
        gap: '1.5rem',
        mediaQuery: 'min',
        breakpoints: {
            768: {
                destroy: true,
            },
        }
    });
    splide.mount();
});