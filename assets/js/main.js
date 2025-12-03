$(document).ready(function () {
    // language selection code
    const accessKey = 'd52fa6bf-a8a9-46c3-b195-2fcda479a705';
    if (!sessionStorage.getItem('countryChecked')) {
        $.ajax({
            url: 'https://apiip.net/api/check?&accessKey=' + accessKey,
            success: function (result) {
                console.log(result.countryCode);
                sessionStorage.setItem('countryChecked', 'true');
                if (result.countryCode === 'PL') {
                    window.location.href = '/pl';
                } else if (result.countryCode === 'PT') {
                    window.location.href = '/pt';
                } else if (result.countryCode === 'IT') {
                    window.location.href = '/it';
                } else {
                    //window.location.href = '/';
                }
            }
        });
    }
    //welcome button code
    setTimeout(() => {
        $("#overlay-video").fadeOut();
        $('.welcome__intro').removeClass('active');
        $('.welcome__overlay').addClass('active');
        $('.welcome__content').addClass('active');
    }, 4500);
    $(".welcome__button").on("click", function () {
        $('.welcome__overlay').removeClass('active');
        $('.welcome__music')[0].play();
    });
    //boxes code
    $(".welcome__box").on("click", function () {
        const clickedBox = $(this);
        const allBoxes = $('.welcome__box');
        allBoxes.not(clickedBox).addClass('hidden');
        $('.welcome__background').hide();
        clickedBox.find('img').addClass('active');
        clickedBox.addClass('active');
        $('.hide-after-anim').slideUp();
        playBurningSound();
        let options = [10, 20, 30];
        let free = options[Math.floor(Math.random() * options.length)];
        let total = Number("1" + free);
        $('#free-spins').text(free);
        $('#total-spins').text(total);
        if ($(window).width() < 768) {
            allBoxes.not(clickedBox).remove();
            $('.splide__pagination').hide();
            $('.welcome__boxes').addClass('active');
        }
    });
    function playBurningSound() {
        const audio = document.getElementById('burning-sound');
        audio.currentTime = 0;
        audio.play().catch(() => { });
    }
    $('.welcome__box').on('mouseenter', function () {
        const audio = document.getElementById('hover-sound');
        audio.currentTime = 0;
        audio.play().catch(() => { });
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
    splide.on('click', function () {
        splide.destroy();
    });
});