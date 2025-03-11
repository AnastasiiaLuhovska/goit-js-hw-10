import iziToast from "izitoast";

const defs = {
  form: document.querySelector('.form')
}

const createPromise = (delayValue, stateValue) =>{
  return new Promise ((resolve, reject)=>{
    setTimeout(()=>{
      if(stateValue === 'fulfilled'){
        resolve({delayValue, stateValue})
      }
      reject({delayValue, stateValue})
    }, delayValue)
  })
}

const handleSubmit = (event) =>{
  event.preventDefault()
  const {delay, state} = event.target.elements
  const delayValue = delay.value
  const stateValue = state.value
  const promise = createPromise(delayValue, stateValue).then(onSuccess).catch(onError)
  event.target.reset()
}
defs.form.addEventListener('submit', handleSubmit)

function onSuccess ({delayValue}){
  iziToast.success({message: `✅ Fulfilled promise in ${delayValue}ms`})
}

function onError ({delayValue}){
  iziToast.error({ message: `❌ Rejected promise in ${delayValue}ms`
})
}

