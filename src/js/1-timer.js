import flatpickr from "flatpickr";
import iziToast from "izitoast";

const refs = {
  button: document.querySelector('[data-start]'),
  input: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
}

refs.button.disabled = true

let userSelectedDate;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const date = selectedDates[0];

    if (date - Date.now() < 0){
      iziToast.show({ title: 'Hey!', message:'Please choose a date in the future'})
      refs.button.disabled = true
      return
    }

    refs.button.disabled = false
    userSelectedDate = date
  },
};

flatpickr('#datetime-picker', options)

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

const addLeadingZero = (number)=>{
  return String(number).padStart(2, '0')
}

let intervalID;
const getRestTime = ()=>{

  const restTime = userSelectedDate - Date.now()
  if (restTime <= 0){
    clearInterval(intervalID)
    refs.button.disabled = false
    refs.input.disabled = false
    return
  }

  const { days, hours, minutes, seconds } =  convertMs(restTime)
  refs.days.textContent = addLeadingZero(days)
  refs.hours.textContent = addLeadingZero(hours)
  refs.minutes.textContent = addLeadingZero(minutes)
  refs.seconds.textContent = addLeadingZero(seconds)
}

const makeTimer = ()=>{
  refs.button.disabled = true
  refs.input.disabled = true
  intervalID = setInterval(getRestTime, 1000)
}
refs.button.addEventListener('click', makeTimer)