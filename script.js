const textArea = document.getElementById("txtCod");
const message = document.getElementById("mensajeEjecutado");
const copy = document.getElementById("copiar");
const paste = document.getElementById("pegar");
copy.style.display = "none"
paste.style.display = "none"

let alfabeto = {
    "a": "/\\", "b": "8", "c": "¢", "d": "?", "e": "€", "f": "ph", "g": "&", "h": "*^",
    "i": "!", "j": ";", "k": "1<" , "l": "*|", "m": "^^", "n": "^/" , "o": "Q",
    "p": "|*", "q": "9", "r": "Я", "s": "§", "t": "+", "u": "]", "v": "\\/",
    "w": "-", "x": ")(", "y": "Ч", "z": "s"
}

function validarTexto(){
    let textoIngresado = textArea.value;
    let validador = textoIngresado.match(/^[a-z\s]*$/);

    if(!validador) {
        Swal.fire({
            icon: 'error',
            title: 'Recuerda solo puedes ingresar letras minúsculas y sin acento',
            text: 'Intentalo de nuevo!'
        })
        //location.reload();
        return true;
    }
    if(textoIngresado === "") {
        Swal.fire({
            icon: 'error',
            title: 'No has ingresado ningún carácter para encriptar',
            text: 'Intentalo de nuevo!'
        })
        //location.reload();
    }
}

function encriptar(text){
    let textEncriptado = "";
    for(let i = 0; i < text.length; i++){
        let letra = text[i];
        //let letra = text[i].toLowerCase();
        if(letra in alfabeto){
            textEncriptado += alfabeto[letra];
        }else{
            textEncriptado += text[i];
        }
    }
    return textEncriptado;
}

function btnEncriptar(){
    if(!validarTexto()) {
        message.value = encriptar(textArea.value);
        message.style.backgroundImage = "none"
        textArea.value = "";
        copy.style.display = "block"
    }
}

function btnDesencriptar(){
    message.value = desencriptar(textArea.value);
    message.style.backgroundImage = "none"
    textArea.value = "";
    copy.style.display = "block"


}
function desencriptar(textEncriptado) {
    let textoIngresado = textArea.value

    if(textoIngresado === "") {
        Swal.fire({
            icon: 'error',
            title: 'No has ingresado ningún carácter para desencriptar',
            text: 'Intentalo de nuevo!'
        })
        //location.reload();
    }
    let textDesencriptado = "";
    let palabraEncriptada = "";
    for (let i = 0; i < textEncriptado.length; i++) {
        let caracter = textEncriptado[i];
        palabraEncriptada += caracter;

        let clave = Object.keys(alfabeto).find(
            key => alfabeto[key].toLowerCase() === palabraEncriptada.toLowerCase()
        );
        if (clave) {
            textDesencriptado += clave;
            palabraEncriptada = "";
        }
        // Añadir espacio si no se encuentra una clave y el caracter actual es un espacio
        if (!clave && caracter === " ") {
            textDesencriptado += " ";
            palabraEncriptada = "";
        }

    }message.style.backgroundImage = 'url("imagenes/Muneco.png")';
    return textDesencriptado;


}
console.log(desencriptar(textArea.value));
function copiar(){

    let textoCopiado = message.value
    if(textoCopiado === "") {
        Swal.fire({
            icon: 'error',
            title: 'No hay un texto que pueda ser copiado',
            text: 'Intentalo de nuevo!'
        })
        copy.style.display = "none"
        paste.style.display = "block"
        //alert("Solo son permitidas letras minúsculas y sin acentos")
        //location.reload();
        message.style.backgroundImage = 'url("imagenes/Muneco.png")';
    }else {
        message.select();
        navigator.clipboard.writeText(message.value)
        message.value = "";
        copy.style.display = "none"
        paste.style.display = "block"
        Swal.fire({
            position: 'top',
            /*position: 'top-end',
            icon: 'success',*/
            width: 300,
            title: "Texto copiado",
            confirmButtonText: "Aceptar",
            showConfirmButton: false,
            timer: 600
        });
        message.style.backgroundImage = 'url("imagenes/Muneco.png")';
    }
}

function pegar() {
    navigator.clipboard.readText()
        .then((text) => {
            textArea.value = text;
        })
        .catch((error) => {
            console.error('Error al pegar el texto:', error);
        });
    paste.style.display = "none"
}

function mostrarInstrucciones() {
    const instrucciones = document.getElementById("instrucciones");
    if (instrucciones.style.display === "none") {
        instrucciones.style.display = "block";
    } else {
        instrucciones.style.display = "none";
    }
}