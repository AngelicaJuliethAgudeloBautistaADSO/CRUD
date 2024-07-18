const $formulario = document.querySelector("form");
const nombre = document.querySelector("#nombre");
const apellidos = document.querySelector("#apellidos");
const telefono = document.querySelector("#telefono");
const direccion = document.querySelector("#direccion");
const tipo = document.querySelector("#tipo");
const documento = document.querySelector("#documento");
const politicas = document.querySelector("#politicas");
const boton = document.querySelector("#boton")

const validar = () => {
    event.preventDefault()
    console.log(nombre.value)//value: valida el valor que se encuentra en la casilla nombre
    if (nombre.value === "") {// si la casilla nombre no tiene valor es igual a nada ""
        // alert("el campo nombre es obligatorio")
        nombre.focus()//ayuda a que cuando se de aceptar se selecciona la casilla nombre
        nombre.classList.add("error")// se agrega el color de la clase error que esta en style al borde de la casilla nombre
    }

    console.log(apellidos.value)
    if (apellidos.value === "") {
        // alert("el campo apellidos es obligatorio")
        apellidos.focus()
        apellidos.classList.add("error")
    }

    console.log(telefono.value)
    if (telefono.value === "") {
        // alert("el campo telefono es obligatorio")
        telefono.focus()
        telefono.classList.add("error")
    }

    console.log(direccion.value)
    if (direccion.value === "") {
        // alert("el campo direccion es obligatorio")
        direccion.focus()
        direccion.classList.add("error")
    }

    console.log(tipo.value)
    if (tipo.value === "") {
        // alert("el campo tipo es obligatorio")
        tipo.focus()
        tipo.classList.add("error")
    }

    console.log(documento.value)
    if (documento.value === "") {
        // alert("el campo documento es obligatorio")
        documento.focus()
        documento.classList.add("error")
    }


}
//quitar el borde rojo al momento que se ingresen los datos y la casilla deje de estar vacia
const remover = (e, input) =>{
    if (input.value != "") {
        input.classList.remove("error");
        input.classList.add("correcto");
    }else{
        input.classList.remove("correcto");
        input.classList.add("error");
    }
}
$formulario.addEventListener("submit" , validar);

nombre.addEventListener("blur", (event) => {
    remover(event, nombre);
});
apellidos.addEventListener("blur", (event) => {
    remover(event, apellidos);
});
telefono.addEventListener("blur", (event) => {
    remover(event, telefono);
});
direccion.addEventListener("blur", (event) => {
    remover(event, direccion);
});
tipo.addEventListener("blur", (event) => {
    remover(event, tipo);
});
documento.addEventListener("blur", (event) => {
    remover(event, documento);
});
// nombre.addEventListener("blur", function () {
//     if (nombre.value === "") {
//         nombre.classList.add("error")
//     }else{
//         nombre.classList.remove("error")
//     }
// })

// $formulario.addEventListener("submit" , function(event){
//     event.preventDefault();
//     console.log(event)
// })

$formulario.addEventListener("submit", validar);
nombre.addEventListener("keydown", (event) => {
    remover(event, nombre);
});
apellidos.addEventListener("keydown", (event) => {
    remover(event, apellidos);
});
telefono.addEventListener("keydown", (event) => {
    remover(event, telefono);
});
direccion.addEventListener("keydown", (event) => {
    remover(event, direccion);
});
tipo.addEventListener("keydown", (event) => {
    remover(event, tipo);
});
documento.addEventListener("keydown", (event) => {
    remover(event, documento);
});
//que solo resivan letras y caracteres especiales el nombre y apellido
const letras = (event, elemento) =>{
    let letras =/^[a-zA-ZáéíóúÁÉÍÓÚ\s]*$/;
    // console.log(letras.test(elemento.value))
    if (letras.test(event.key)) {
        console.log("si")
    }else{
        console.log("#no")
    }
}
// const soloLetras = (event, elemento) => {
//   let letras = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/;
//   if (!letras.test(elemento.value + event.key)) {
//     event.preventDefault();
//   }
// };

// nombre.addEventListener("input", (event) => {
//   soloLetras(event, nombre);
// });

// apellidos.addEventListener("input", (event) => {
//   soloLetras(event, apellidos);
// });

//boton enviar hasta que se acepten las politicas
addEventListener("DOMContentLoaded",(event)=>{
    //console.log(politicas.checked);
    if(!politicas.checked){
        // console.log(boton);
        boton.setAttribute("disabled", "");
    }
});
politicas.addEventListener("change", function(e){
    console.log(e.target.checked);
    if(e.target.checked){
        boton.removeAttribute("disabled")
    }
});

const numeros =(event) =>{
    if (event.keyCode < 48 || event.keyCode > 57) {
        event.preventDefault();
        console.log("a");
    }
}
// const letras = (event) =>{
//     // if (event.keyCode < 97 || event.keyCode > 122 && event.keyCode === [250, 243, 237, 233, 225].includes(charCode)){
//     //     event.preventDefault();
//     let letras =/a-zA-Z/;
//     if (letras.test) {
//         console.log("si")
//     }else{
//         console.log("#no")
//     }
// }

// //solo numeros en el telefono
// telefono.addEventListener("keypress", function (event) {
//     console.log(event.keyCode);  
//     if (event.keyCode >= 48 && event.keyCode <= 57) {
        
//     }else{
//         event.preventDefault()
//     }
// });

// //solo numeros en el documento
// // cuando pulsamos la tecla
// documento.addEventListener("keypress", function (event) {
//     console.log(event.keyCode);  
//     if (event.keyCode >= 48 && event.keyCode <= 57) {
        
//     }else{
//         event.preventDefault()
//     }
// });
// // mientras mantegamos pulsada una letra
// documento.addEventListener("keydowm", function (event) {
//     // console.log("keydowm",event);
// });
// // cuando pulsamos la tecla
// documento.addEventListener("keyup", function (event) {
//     // console.log("keyup",event);
// });
documento.addEventListener("keypress", numeros)
telefono.addEventListener("keypress", numeros)
nombre.addEventListener("keypress", letras)
apellidos.addEventListener("keypress", letras)