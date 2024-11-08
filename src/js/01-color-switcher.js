const bodyEl = document.querySelector('body');
const startBtnEl = document.querySelector('button:first-of-type');
const stopBtnEl = document.querySelector('button:last-of-type');
console.log(startBtnEl, stopBtnEl);

document.querySelectorAll('button').forEach(btn => btn.style.cursor = 'pointer')

let intervalId; // ia valoarea setInterval la 1000ms apelata on startBtn click

// Handling clicks on start and stop buttons
startBtnEl.addEventListener('click', changeBgColor);
stopBtnEl.addEventListener('click', stopColorChange);

function changeBgColor() {
    //Butonul de start se "dezactiveaza", cel de stop se "activeaza" modificandu-le opacitatea
    stopBtnEl.style.opacity = '1'
    startBtnEl.style.opacity = '0.3';

    intervalId = setInterval( () => {
        bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function stopColorChange(){
    startBtnEl.style.opacity = '1'
    stopBtnEl.style.opacity = '0.3';

    clearInterval(intervalId); //intervalId se reseteaza, se opreste modificarea culorii
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}