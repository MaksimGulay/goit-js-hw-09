const body = document.querySelector('body');
const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');

let intervalId = null;

buttonStart.addEventListener('click', function() {
    if (intervalId === null) {
        buttonStart.disabled = true;
        buttonStop.disabled = false;

        intervalId = setInterval(() => {
            const color = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
            body.style.backgroundColor = color;
        }, 1000);
    }
});

buttonStop.addEventListener('click', function() {
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
        
        buttonStart.disabled = false;
        buttonStop.disabled = true;
    }
});
