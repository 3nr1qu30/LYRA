//Conversion de voz a texto

var speech = true; //Creamos la variable para que hable el wey este
window.SpeechRecognition = window.webkitSpeechRecognition; //Este es método para que en esta ventana el gugul luego luego detecte lo del microfono
const recognition = new SpeechRecognition(); //Aqui ya empieza el metodo en cuanto la constante sea tocada
recognition.interimResults = true; //Esto es para que la voz se guarde constantemente o sea detecta todos los cambios durante la grabación

let transcriptions = []; //El array para guardar todas las transcripciones y cada que deje de hablar se guarda otra nueva

let speechTimer; //Declaramos la variable del tiempo para cada q se corte a lo de los dos segundos
let isRecording = false; //Indicamos que dejó de hablar (es para q se corte ahorita lo explico)

let finalTranscription; //Este en teoria es un array pero aqui lo empecé como variable q es para guardar tolas las transcripciones o sea como q las va a ir juntando todas para hacer una final

recognition.addEventListener('result', e => { //Esta es la funcion de para transcirbir la voz y el result es para que itere en cada resultado lit, o sea que cada que se hable pues 😹
    clearTimeout(speechTimer); //Lit se limpia el contador si es que hay algo antes o sea si habia quedado un contador en 1.2 ej, lo reinicia a 0

    const transcript = Array.from(e.results) //Creamos el array para q cada cosa que hablas se vaya acumulando
        .map(result => result[0]) //Esto fue para pobtener el primer elemento del array generado (que seria la palabra final por asi decirlo)
        .map(result => result.transcript) //Y aqui lo que hacemos es ese ultimo array o bueno palabra la agregamos a la transcripción
        .join(' ');//Aqui unimos todas las palabras o sea los arrays y los separamos con un espacio para q sea como una frase normal

    if (e.results[0].isFinal) { //Aqui es para cuando uno deja de hablar por ej 1 segundo, pues lo detecta y todo eso es un array y pues obvio se toma la primer posicion que es todo
        transcriptions.push(transcript); //Y aqui lo q hacemos es jalar todas esas transcripciones y las metemos al array de transcripciones
    }

    speechTimer = setTimeout(() => { //Aqui le ponemos la funcion a lo del speechTimer para q cada que deje de hablar el cabron se tomen 3 seg se tolerancia
        recognition.stop(); //Si se cumplen los 3 segundos va a parar
        isRecording = false; //Se declara lo de q ya dejamos de hablar, incluso podriamos simplemente invocarlo pero asi dejalo 😹
        finalTranscription = transcriptions.join(' '); //Ahora si, de todas las transcripciones, se va a hacer una sola transcripcion y esa es la que va a quedar como final por asi decirlo esto lit ya es el prompt
    }, 6000); //Aqui le ponemos los segundos de tolerancia despues de hablar
});

recognition.addEventListener('end', () => { //Aqui declaramos que cuando termine el reconocimiento pues se ejcute lo siguiente
    if (isRecording) { //Y mira por eso aqui decimos que si esta hablando (Mas abajo donde pongo la funcion de cuando empiece a grabar especifico que se cambie ahorita lo ves)
        recognition.start(); //Que empiece la madre esta de grabar
    } else { //Si ya no está grabando
        console.log(`${finalTranscription}`); //Esto es para q veas q cuando uno deja de hablar la variable ya tiene el "prompt"
        //Para el envio a python aqui si ya creo q es lo q te toca o vas a hacer o no se 😹😹 pero basicamente
        const data = { transcription: finalTranscription }; //Aqui pongo como "data" el objeto que vamos a mnadar y trae el "prompt"
        fetch('https://fastapi-production-0f32.up.railway.app/', { //Especificamos a q ruta lo mandamos, yo lo deje asi porque anadaba viendo pero creo q no pude hacer todo en el mismo server xd
            method: 'POST', //El metodo
            headers: {
                'Content-Type': 'application/json' //Esto pues creo q ya lo ocupa el pitón
            },
            body: JSON.stringify(data) //Y finalmente ponemos lo del promt a tipo cadena en un json para mandarlo a  pitón
        })
        .then(response => {
            console.log('Transcription data sent to Python'); //Y pues el mensaje de q si todo salio bien pues ya q se muestra eso
        })
        .catch(error => {
            console.error('Error sending transcription data to Python:', error); //Si no pues igual lo muestra
        });
    }
});

btnComenzarGrabacion.addEventListener("click", function(){ //Por ultimo aqui pues le agregamos para q cuando le de click a ese botón pues se empiece a grabar
    if (speech === true) { //Como se inicializa en true pues va a entrar directo al ciclo
        if (!isRecording) { //Ahora lo que hace es que invierte a este wey del recording para que grabe
            transcriptions = []; //Inicializa lo del array para q se generen las descripciones
            recognition.start(); //Empieza la grabación
            isRecording = true; //Lo cambia a true para que se sigan los bucles anteriores de las funciones
        } else {
            clearTimeout(speechTimer); //ahora si por algun motivo speech es falso 
            recognition.stop(); //Va a parar la grabación
            isRecording = false; //Y lo cambia a falso para q se pueda inicializar todo el proceso
        }
    }
});

//Conversion del texto a la voz
//Esto ya es para cuando lyra nos mande el texto de vuelta, pues q ya vemos como le hacemos pero por el momento pues namas esta aqui q segun yo no afecta ni nada 
//mientras no lo descomentes pero en resumen hace esto

//--->
const playbutton = document.getElementById('playbutton')  //Aqui jalaba al boton para reproducir la voz

playbutton.addEventListener("click",() => { //Cuando le dabas click a ese botón
    playText(finalTranscription); //Lit te decia todo (con voz) esto es para cuando traigamos el objeto de python y pues ya lo pongamos a que en lugar de presionar el botón se conteste automaticamente despues de unos dos segundos estimo
    console.log(`La que se habla es ${finalTranscription}`); //Solo para ver que era lo que estaba diciendo y si lo dijo bien
});

function playText(text) { //El parametro es lo que trae de la respuesta de lyra
    const utterance = new SpeechSynthesisUtterance(text) //Mas metodos de gugul para que te hable todo lo q le dijiste bueno aqui lo llamas y le pones un parametro (el que dije)
    speechSynthesis.speak(utterance) //Otro metodo con el cual habla el texto y fin
} //<---

//Comenta todo eso que esta señalado en las flechas porque creo q nos va a servir mañana