// Initial Data
let currentColor = 'black';
let canDraw = false;
let mouseX = 0;
let mouseY = 0;

let screen = document.querySelector('#tela');
let context = screen.getContext('2d');

// Events
document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent);
});
screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);
document.querySelector('.clear').addEventListener('click', clearScreen);

// Functions
function colorClickEvent(e) {
    let color = e.target.getAttribute('data-color');
    currentColor = color;

    // pega o elemento com a class 'active' e remove
    document.querySelector('.color.active').classList.remove('active');
    // adiciona a class 'active' na cor e
    e.target.classList.add('active');
}

function mouseDownEvent(e) {
    canDraw = true;
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
}

function mouseMoveEvent(e) {
    if(canDraw) {
        draw(e.pageX, e.pageY);
    }
}

function mouseUpEvent() {
    canDraw = false
}

function draw(x, y) {
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    context.beginPath();
    context.lineWith = 9;
    context.lineJoin = "round";
    context.moveTo(mouseX, mouseY);
    context.lineTo(pointX, pointY);
    context.closePath();
    context.strokeStyle = currentColor;
    context.stroke();

    // desenhar no canvas
    mouseX = pointX;
    mouseY = pointY;
}

function clearScreen() {
    context.setTransform(1,0,0,1,0,0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}
