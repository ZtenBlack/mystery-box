$('.welcome__box').on('click', function (i) {
    const box = $(this)[0].getBoundingClientRect()
    setTimeout(() => {
        $(".modal").fadeIn(200);
    }, 500);
    const modal = $('.modal__content');
    const clickedBox = $(this);
    clickedBox.addClass('active');
    modal.css({
        display: 'block',
        position: 'fixed',
        top: box.top + 'px',
        left: box.left + 'px',
        width: box.width + 'px',
        height: box.height + 'px',
        transform: 'scale(0.3) rotateX(50deg)',
        opacity: 0,
    });

    setTimeout(() => {
        modal.css({
            position: 'static',
            top: '50%',
            left: '50%',
            width: 'auto',
            height: 'auto',
            transform: 'translate(0, 0) scale(1) rotateX(0deg)',
            opacity: 1
        });
        launchBackgroundConfetti();
    }, 1000);
    launchConfetti(box.left + box.width / 2, box.top + box.height / 2);
});
//box confetti code
function launchConfetti(x, y) {
    const container = $('<div class="confetti"></div>');
    $('.wrapper').append(container);
    for (let i = 0; i < 30; i++) {
        let piece = $('<div></div>');
        piece.css({
            position: 'absolute',
            top: y + 'px',
            left: x + 'px',
            width: Math.random() * 8 + 4 + 'px',
            height: Math.random() * 8 + 4 + 'px',
            background: `hsl(${Math.random() * 360}, 90%, 60%)`,
            transform: `rotate(${Math.random() * 360}deg)`
        });
        container.append(piece);
        piece.animate({
            top: y - (Math.random() * 300 + 100),
            left: x + (Math.random() * 400 - 200),
            opacity: 0,
        }, Math.random() * 800 + 700, 'linear', function () {
            piece.remove();
        });
    }
    setTimeout(() => container.remove(), 1500);
}
//modal background confetti code
function launchBackgroundConfetti() {
    const container = document.querySelector('.modal__wrapper');
    const count = 300;
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    for (let i = 0; i < count; i++) {
        const conf = document.createElement('div');
        conf.classList.add('confetti-piece');
        const size = Math.random() * 8 + 5;
        conf.style.width = size + 'px';
        conf.style.height = (size * 0.4) + 'px';
        const startX = (screenW / count) * i + (Math.random() * 10 - 5);
        conf.style.left = startX + 'px';
        const delay = Math.random() * 500;
        conf.style.backgroundColor = randomColor();
        container.appendChild(conf);
        const fall = conf.animate(
            [
                {
                    transform: `translateY(-50px) rotate(0deg)`,
                    opacity: 1
                },
                {
                    transform: `translateY(${screenH + 10}px) rotate(${Math.random() * 720}deg)`,
                    opacity: 0.9
                }
            ],
            {
                duration: 2000 + Math.random() * 2000, // 3–5 сек
                easing: 'linear',
                delay: delay,
                iterations: 1
            }
        );
        fall.onfinish = () => conf.remove();
    }
}
function randomColor() {
    const colors = ["#FFD700", "#FF4500", "#00BFFF", "#32CD32", "#FF1493"];
    return colors[Math.floor(Math.random() * colors.length)];
}
