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
    }, 1000);
    launchConfetti(box.left + box.width / 2, box.top + box.height / 2);
});
//confetti code
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