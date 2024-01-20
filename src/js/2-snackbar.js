import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');

const createPromise = ({ value, delay, state }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      state === 'fulfilled' ? resolve(value) : reject(value);
    }, delay);
  });
};

formEl.addEventListener('submit', event => {
  event.preventDefault();
  const delay = formEl.delay.value;
  const state = formEl.state.value;

  createPromise({ value: delay, delay, state })
    .then(() =>
      iziToast.show({
        title: '✔️',
        message: `OK Fulfilled promise in ${delay} ms!`,
        position: 'topRight',
        messageColor: '#fff',
        messageSize: '20px',
        backgroundColor: '#59A10D',
        close: false,
        closeOnClick: true,
        progressBarEasing: 'linear',
      })
    )
    .catch(() =>
      iziToast.show({
        title: '❌',
        message: `Error Rejected promise in ${delay} ms!`,
        position: 'topRight',
        messageColor: '#fff',
        messageSize: '20px',
        backgroundColor: '#EF4040',
        close: false,
        closeOnClick: true,
        progressBarEasing: 'linear',
      })
    );
  formEl.reset();
});
