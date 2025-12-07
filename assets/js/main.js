$(document).ready(function () {
    //getting the gtag value
    const params = new URLSearchParams(window.location.search);
    let qtag = params.get('qtag');
    if (qtag) {
        sessionStorage.setItem('qtag', qtag);
    } else {
        qtag = sessionStorage.getItem('qtag');
    }
    if (qtag) {
        const newUrl = `https://10black.net/api/affiliate/?qtag=${qtag}`;
        $('.modal__content-link').attr('href', newUrl);
        console.log(newUrl);
    }
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
                    window.location.href = '/';
                }
            }
        });
    }
    //welcome button code
    $(window).on('load', function () {
        const video = document.getElementById('overlay-video');
        video.play().catch(() => { });
        setTimeout(() => {
            $("#overlay-video").fadeOut();
            $('.welcome__intro').removeClass('active');
            $('.welcome__overlay').addClass('active');
            $('.welcome__content').addClass('active');
        }, 4500);
    });
    $(".welcome__button").on("click", function () {
        $('.welcome__overlay').removeClass('active');
        $('#background-sound')[0].play();
    });
    //boxes code
    $(".welcome__box").on("click", function () {
        const clickedBox = $(this);
        const boxImage = clickedBox.find('#box-img');
        const fireBoxImage = clickedBox.find('#firebox-img');
        boxImage.hide();
        clickedBox.addClass('active');
        fireBoxImage.show();
        fireBoxImage.addClass('active');
        setTimeout(() => {
            fireBoxImage.hide();
        }, 7000);
        const allBoxes = $('.welcome__box');
        allBoxes.not(clickedBox).addClass('hidden');
        $('.welcome__background').hide();
        $('.hide-after-anim').slideUp();
        playBurningSound();
        let options = [20, 40, 60];
        let extra = options[Math.floor(Math.random() * options.length)];
        let free = Number("1" + extra);
        $('#free-spins').text(free);
        $('#extra-spins').text(extra);
        // $('#unique-id').text(generateNumber());
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
    // function generateNumber() {
    //     const STORAGE_KEY = "uniqueModalNumber";
    //     let savedNumber = localStorage.getItem(STORAGE_KEY);
    //     if (!savedNumber) {
    //         savedNumber = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
    //         localStorage.setItem(STORAGE_KEY, savedNumber);
    //     }
    //     return savedNumber;
    // }
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
    const swiper = new Swiper('.swiper', {
        loop: false,
        freeMode: true,
        slidesPerView: 'auto',
        spaceBetween: 24,
        breakpoints: {
            768: {
                enabled: false,
            }
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
});