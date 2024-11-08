import Notiflix from 'notiflix';

const amountEl = document.querySelector('input[name="amount"]');
const delayEl = document.querySelector('input[name="delay"]');
const stepEl = document.querySelector('input[name="step"]');
const submitBtn = document.querySelector('button');
const formEl = document.querySelector('form');

amountEl.addEventListener('input', () => console.log(amountEl.value))

formEl.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  const delay = parseInt(delayEl.value);
  const step = parseInt(stepEl.value);
  const amount = parseInt(amountEl.value);
  
  for(let i = 1; i <= amount; i++) {
    console.log(i);
    
    const currentDelay = delay + (i - 1) * step;

    createPromise(i, currentDelay)
        .then(({position, delay}) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({position, delay}) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        })
    
  }
}

function createPromise(position, delay) {
  return new Promise((res,rej) => {
    setTimeout( () => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        res( {position, delay} );
      } else {
        rej( {position, delay} );
      }
    }, delay)
  })
}
