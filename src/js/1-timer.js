import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;
let isActive = true;

const inputDateEl = document.querySelector('#datetime-picker');
const timerDaysEl = document.querySelector('span[data-days]');
const timerHoursEl = document.querySelector('span[data-hours]');
const timerMinutesEl = document.querySelector('span[data-minutes]');
const timerSecondsEl = document.querySelector('span[data-seconds]');
const startBtnEl = document.querySelector('button[data-start]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() > Date.now()) {
      userSelectedDate = selectedDates[0].getTime();
      startBtnEl.disabled = false;
    } else {
      iziToast.show({
        class: 'error-svg',
        position: 'topRight',
        icon: 'error-svg',
        message: 'Please choose a date in the future!',
        messageColor: '#fff',
        messageSize: '16px',
        backgroundColor: '#EF4040',
        close: false,
        closeOnClick: true,
      });
      startBtnEl.disabled = true;
      startBtnEl.classList.add('disabled');
    }
  },
};

flatpickr(inputDateEl, options);

startBtnEl.addEventListener('click', elem => {
  const timer = setInterval(() => {
    const diff = userSelectedDate - Date.now();
    const timeValue = convertMs(diff);
    if (diff <= 0) {
      clearInterval(timer);
    } else {
      timerDaysEl.textContent = addLeadingZero(timeValue.days);
      timerHoursEl.textContent = addLeadingZero(timeValue.hours);
      timerMinutesEl.textContent = addLeadingZero(timeValue.minutes);
      timerSecondsEl.textContent = addLeadingZero(timeValue.seconds);
    }
  }, 1000);
  startBtnEl.disabled = true;
  startBtnEl.classList.add('disabled');
  // inputDateEl.disabled = true;
  // inputDateEl.classList.add('disabled');
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  value = String(value);
  return value.length < 2 ? value.padStart(2, '0') : value;
}
