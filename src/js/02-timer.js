// Descris în documentație
import flatpickr from "flatpickr";
// Import suplimentar de stil
import "flatpickr/dist/flatpickr.min.css";

const DTPickerEl = document.querySelector('#datetime-picker');
const startBtnEl = document.querySelector('button');

const daysEl = document.querySelector('.value[data-days]');
const hoursEl = document.querySelector('.value[data-hours]');
const minEl = document.querySelector('.value[data-minutes]');
const secEl = document.querySelector('.value[data-seconds]');
// daysEl.innerText = 30;
// console.log(daysEl);


const flatpickr = require('flatpickr');
// console.log(flatpickr);

startBtnEl.style.cursor = 'not-allowed';
startBtnEl.style.opacity = 0.3;

let intervalId, selectedDate;

const options = {
    enableTime: true, //enables time picker
    time_24hr: true, //time ticker in 24 h mode - no need for AM/PM
    defaultDate: new Date(), //initial date shown on input - now time
    minuteIncrement: 1,
    onClose(selectedDates) { //selectedDates is the array of Date objects selected by user 
      console.log(selectedDates[0]);

      if(selectedDates[0] < Date.now()) {
        window.alert('Please choose a date in the future');
        return;
      }
 
      startBtnEl.style.cursor = 'auto';
      startBtnEl.style.opacity = '1';
      selectedDate = selectedDates[0];
    },
};

const fp = flatpickr(DTPickerEl, options);

startBtnEl.addEventListener('click', () => {
    // reverseCounting();
    if(intervalId) clearInterval(intervalId) //clears any existing interval

    intervalId = setInterval(reverseCounting, 1000);
})

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

function reverseCounting() {
    const now = Date.now();
    const diff = selectedDate - now;
    
    //Stop when the time reaces zero
    if (diff < 0) {
        clearInterval(intervalId);
        return;
    }

    const {days, hours, minutes, seconds} = convertMs(diff);
    
    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minEl.textContent = String(minutes).padStart(2, '0');
    secEl.textContent = String(seconds).padStart(2, '0');
}

