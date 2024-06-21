let nome = document.querySelector('#nome')
let cognome = document.querySelector('#cognome')

/* il METODO FOCUS serve per rendere subito scrivibile un input senza che l' utente lo clicchi,
se ricarichi la pagina input cognome è gia pronto per essere scritto, senza cliccarlo con il mouse
ATTENZIONE NON TRIGGERA L' EVENTO FOCUS SE SCRITTO PRIMA, IN QUANTO IL 'CLICK' AVVIENE PRIMA!!!!
SE INVECE PORTO COGNOME.FOCUS() SOTTO IL LISTNER, IL FOCUS SI TRIGGERA AUTOMATICAMENTE, IN
QUANTO IL 'CLICK' AVVIENE DOPO!!!*/
cognome.focus();

nome.addEventListener('input', (e) => {
    console.log(e.data) //logga il valore di cio che scrivo, in modo singolare non crea una parola se scrivo c logga c se poi scrivo d logga solo d e non c+d
    console.log(e.target.value) //logga tutti i valori scritti fino all' ultimo log, quindi puo loggare un aparola intera
})


//FOCUS si attiva quando clicchi per entrare nell' input, non appen alo selezione parte il FocusEvent
cognome.addEventListener('focus', (e) => {
    console.log('focus')
    console.log(e)
})

//BLUR OPPOSTO DI FOCUS, SI TRIGGERA QUANDO ESCO DALL' INPUT!!!! SI CHIAMA FOCUS EVENT UGUALE ATTENZIONE!!!

cognome.addEventListener('blur', (e) => {
    console.log('blur')
    console.log(e)
})

// FOCUS ESISTE ANCHE SU CSS QUINDI NON IMPORTA USARE JS NEL CASO

/* ESEMPI DEL PROF */
// cognome.addEventListener('input', (e) => {
//     console.log(e.data)
//     console.log(e.target.value)
//     if(e.target.value.length === 0) {
//       // alert('Campo obbligatorio!')
//       surnameValidation.style.display = 'inline';
//       surnameValidation.textContent = "Campo Obbligatorio!"
//     } else {
//       surnameValidation.style.display = 'none';
//     }
//   })

// Blur: quando de-selezioniamo l'input
// cognome.addEventListener('blur', (e) => {
//     console.log('--- BLUR ---')
//     console.log(e)
//     if(e.target.value.length === 0) {
//       // alert('Campo obbligatorio!')
//       surnameValidation.style.display = 'inline';
//       surnameValidation.textContent = "Campo Obbligatorio!"
//     } else {
//       surnameValidation.style.display = 'none';
//     }
//   })