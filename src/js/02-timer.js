import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const buttonStart = document.querySelector('[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');
let timerActive = false

// Ініціалізуємо flatpickr для вибору дати та часу
const dateTimePicker = flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      const currentDate = new Date();
      
      if (!selectedDate || selectedDate < currentDate) {
          window.alert("Please choose a date in the future");
          buttonStart.disabled = true;
        } else {
            buttonStart.disabled = false;
    }
},
});

// Початково встановлюємо кнопку "Start" в неактивний стан
buttonStart.disabled = true;

// Обробник події для кнопки "Start"

buttonStart.addEventListener('click', function() {
    if (!timerActive) {
      const selectedDate = dateTimePicker.selectedDates[0];
      const currentDate = new Date();
      let timeDiff = selectedDate.getTime() - currentDate.getTime();
    
      const interval = setInterval(function() {
        timeDiff -= 1000; // Оновлюємо різницю в часі
        updateTimer(timeDiff);
    
        if (timeDiff <= 0) {
          clearInterval(interval);
          timerActive = false;
          dateTimePicker.set("readOnly", false); // Відключаємо блокування flatpickr
        }
      }, 1000);
    
      buttonStart.disabled = true;
      timerActive = true;
      dateTimePicker.set("readOnly", true); // Блокуємо flatpickr
    }
  });

// Оголошуємо функцію оновлення значень таймера
function updateTimer(timeDiff) {
  const { days, hours, minutes, seconds } = convertMs(timeDiff);

  // Оновлення значень елементів таймера
  timerDays.textContent = addLeadingZero(days);
  timerHours.textContent = addLeadingZero(hours);
  timerMinutes.textContent = addLeadingZero(minutes);
  timerSeconds.textContent = addLeadingZero(seconds);

  // Перевірка, чи досягнуто кінцевої дати
  if (timeDiff <= 0) {
    timerDays.textContent = '00';
    timerHours.textContent = '00';
    timerMinutes.textContent = '00';
    timerSeconds.textContent = '00';
  }
}

// Оголошуємо функцію конвертації мілісекунд в дні, години, хвилини та секунди
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
  return { days, hours, minutes, seconds };
}

// Оголошуємо функцію додавання ведучого нуля
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}