import"./assets/styles-O_cqUJUU.js";import{i as r}from"./assets/vendor-Dov3POoy.js";const i={form:document.querySelector(".form")},m=(e,t)=>new Promise((s,o)=>{setTimeout(()=>{t==="fulfilled"&&s({delayValue:e,stateValue:t}),o({delayValue:e,stateValue:t})},e)}),c=e=>{e.preventDefault();const{delay:t,state:s}=e.target.elements,o=t.value,n=s.value;m(o,n).then(u).catch(f),e.target.reset()};i.form.addEventListener("submit",c);function u({delayValue:e}){r.success({message:`✅ Fulfilled promise in ${e}ms`})}function f({delayValue:e}){r.error({message:`❌ Rejected promise in ${e}ms`})}
//# sourceMappingURL=2-snackbar.js.map
