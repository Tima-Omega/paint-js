document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.querySelector('.canvas');
    const ctx = canvas.getContext('2d');
    const color = document.querySelector('.jsSelectColor');
    const range = document.querySelector('.jsRange');
    const mode = document.querySelector('.jsMode');
    const save = document.querySelector('.jsSave');
    const rangeTrigger = document.querySelector('.jsRangeTrigger');
    const colorTrigger = document.querySelector('.jsColorTrigger');
    const fileName = document.querySelector('.jsName')
    const INIT_COLOR = '#2c2c2c';
    const ctxHeight = canvas.clientHeight;
    const ctxWidth = canvas.clientWidth;

    let painting = false;
    let filling = false;

    canvas.height = ctxHeight;
    canvas.width = ctxWidth;
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = INIT_COLOR;
    ctx.fillStyle = INIT_COLOR;

    rangeTrigger.addEventListener('click', (e) => {
        e.target.classList.toggle('active');
    });

    rangeTrigger.addEventListener('mouseleave', (e) => {
        e.target.classList.remove('active');
    });

    canvas.addEventListener('mousemove', (e) => {
        x = e.offsetX;
        y = e.offsetY;
        painting ? (ctx.lineTo(x, y), ctx.stroke()) : (ctx.beginPath(), ctx.moveTo(x, y));
    });
    canvas.addEventListener('mousedown', () => {
        painting = true;
    });
    canvas.addEventListener('mouseup', () => {
        painting = false;
    });
    canvas.addEventListener('mouseleave', () => {
        painting = false;
    });
    canvas.addEventListener('click', () => {
        filling ? ctx.fillRect(0, 0, ctxWidth, ctxHeight) : false;
    });
    canvas.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    range.addEventListener('input', () => {
        ctx.lineWidth = range.value;
    });

    mode.addEventListener('click', (e) => {
        if (filling) {
            filling = false;
            e.target.style.backgroundImage = "url('../assets/img/pen.svg')";
        } else {
            filling = true;
            e.target.style.backgroundImage = "url('../assets/img/fill.svg')";
        }
    });

    save.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL();
        link.download = fileName.value;
        link.click();
    });

    color.addEventListener('change', (e) => {
        colorTrigger.style.background = e.target.value;
        ctx.strokeStyle = e.target.value;
        ctx.fillStyle = ctx.strokeStyle;
    });
});
