let imageSelector = document.querySelector('#img-selection');
let textselector = document.querySelector('#insert-text')
let lineTop = document.querySelector('#top-line')
let lineBottom = document.querySelector('#bottom-line')
let downloadButton = document.querySelector('#download')
//canvas
let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
//VARIABILI PER NON FAR SOVRASCRIVERE AL CANVAS LA FOTO CON LE SCRITTE 
let topText = ''; //contiene il valore del testo superiore
let bottomText = ''; //contiene il valore del testo inferiore
let canvasImage = ''; //scrive l' immagine nel canvas

imageSelector.addEventListener('click', (e) => {
    // console.log(e.target)
    //se il target del click è === 'IMG' allora il click attiva la funzione selctedImage
    if(e.target.tagName === 'IMG') {
        //deve essere maisculo IMG!!!! e sta per EVENT!!!
        selectedImage(e.target)
    }
})

lineTop.addEventListener('input', (e) => {
    // console.log(e)
    //PER SCRIVERE UN TESTO! leggo i valori value x il testo e l' ID per capire se è la scritta superiore o inferiore
    updateText(e.target.value, e.target.id)
})
lineBottom.addEventListener('input', (e) => {
    // console.log(e)
    //PER SCRIVERE UN TESTO!
    updateText(e.target.value, e.target.id)
})

// image ha dentro di se il valore di e.target img!
function selectedImage(image) {
    canvasImage = image;
    //faccio abilitare il pulsante quando viene cliccata una immagine, passando alla funzione il pulsante da abilitare
    enabledButton(foward)
    ridisegnoCanvas(image, bottomText, topText)
    // ctx.drawImage(image, 0,0,canvas.width, canvas.height)
}

downloadButton.addEventListener('click', downloadCanvas)

function updateText(testo, id) {
    //lascio le parti comuni fuori dalla funzione
    ctx.font = '30px Impact';
    ctx.textAlign = 'center'
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    //i cambiamenti li riporto dentro un if
    if(id === 'top-line') {
        //assegno il valore del testo alla variabile nel global scope cosi che poi posso tramite un altra funzione risolvere il bug !!
        topText = testo;
        // ctx.fillText(testo,20,40);
        // ctx.strokeText(testo,20,40);
    } else if(id === 'bottom-line'){
        bottomText = testo;
        // ctx.fillText(testo,20,canvas.height - 30);
        // ctx.strokeText(testo,20,canvas.height - 30);
    }
    ridisegnoCanvas(canvasImage, bottomText, topText)
}


//CON QUESTA FUNZIONE CAMBIANDO L' IMMAGINE NON SI PERDONO I TESTI, E POSSO CANCELLARI I TESTI SENZA CHE SI SOVRAPPONGONO!!!
/* funziona perchè questa funzione sovrascrive quella precedente sempre, sia al cambio immagine
che alle nuove lettere, abilita il console log per vederlo */
function ridisegnoCanvas(canvasImage, bottomText, topText) {
    // console.log(canvasImage, bottomText, topText)
    //disegno l' immagine
    ctx.drawImage(canvasImage, 0,0,canvas.width, canvas.height)
    //scrivo la scritta superiore
    ctx.fillText(topText,canvas.width / 2,40);
    ctx.strokeText(topText,canvas.width / 2,40);
    //scrivo la scritta inferiore
    ctx.fillText(bottomText,canvas.width / 2,canvas.height - 30);
    ctx.strokeText(bottomText,canvas.width / 2,canvas.height - 30);
}

//DOWNLOAD ricordati di dare l' attributo download all' elemento HTML!!!!!!!

function downloadCanvas(){
    let dataURL = canvas.toDataURL('image/jpeg');
    downloadButton.href = dataURL
}

//LEGGIAMO IL VALORE DI TIPO INPUT FILE DELL' IMMAGINE CARICATA!!
//voglio che quando carico un' immagine appaia nel canvas

let uploadImg = document.querySelector('#file-upload');

//change = quando viene cambiato il file si triggera il listner


//vediamo quali propieta ha
uploadImg.addEventListener('change', fileselection)

/* fileReader è un oggetto che consente all' applicazione web di leggere in modo asincrono
(asincrono perche prima deve leggere il contenuto e poi eseguo cio che gli scrivo!) 
un contenuto salvato sul pc dell' utente (immagini, file, ecc.. MDN fileReader x metodi e proprieta'*/
function fileselection(e){
    // console.log(e)
    let file = e.target.files[0]
    // console.log(file)
    let reader = new FileReader();
    //converto il file in arrivo in un URL
    reader.readAsDataURL(file);
    //creo una funzione che genera un tag img, e logghi in console il file img base64
    reader.addEventListener('load', () => {
        let image = document.createElement('img');
        image.addEventListener('load', () => {
            canvasImage = image;
            ridisegnoCanvas(canvasImage, bottomText, topText)
            /* creo questa funziona perche sneza l' immagine non si carica fin quando non scrivo
            qualcosa...il perchè non mi è molto chiaro a quanto ho capito load è asincrono
            quindi l' esecuzione non è immediata! */
            enabledButton(foward)
        })
        image.src = reader.result;
        // console.log(image)
        //adesso che image contiene un file img in formato corretto, la assegno al canvas
        //incollo la funzione che mi consentira' di poter scrivere sull' immagine ecc...
    })
}
//LOAD = quando viene caricato un file, immagine ecc...ASINCRONO


//PULSANTI

let foward = document.querySelector('#next')
let back = document.querySelector('#back')

foward.addEventListener('click', () => {
    imageSelector.style.display = 'none';
    textselector.style.display = 'block';
})

back.addEventListener('click', () =>{
    imageSelector.style.display = 'block';
    textselector.style.display = 'none';
})

function enabledButton(button) {
    button.removeAttribute('disabled');
}