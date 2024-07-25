import isGmail from "./isGmail";
import is_number from "./is_number";
import letras from "./letras";
import remover from "../remover"

const $formulario = document.querySelector("form");
const nombre = document.querySelector("#nombre");
const apellidos = document.querySelector("#apellidos");
const telefono = document.querySelector("#telefono");
const direccion = document.querySelector("#direccion");
const tipo = document.querySelector("#tipo");
const documento = document.querySelector("#documento");
const politicas = document.querySelector("#politicas");
const correo = document.querySelector("#email");
const boton = document.querySelector("#boton");


const validar = (event) => {
    event.preventDefault()
    // console.log($formulario)
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

    console.log(correo.value)
    if (correo.value === "") {
        // alert("el campo documento es obligatorio")
        correo.focus()
        correo.classList.add("error")
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
correo.addEventListener("blur", (event) => {
    remover(event, correo);
});

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

// //que solo resivan letras y caracteres especiales el nombre y apellido
// const letras = (event, elemento) =>{
//     let letras =/^[a-zA-ZáéíóúÁÉÍÓÚ\s]*$/;
//     // console.log(letras.test(elemento.value))
//     if (letras.test(event.key)) {
//         console.log("si")
//     }else{
//         console.log("#no")
//     }
// }

//BOTON enviar hasta que se acepten las politicas
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


documento.addEventListener("keypress",(event) =>{
    is_number(event,documento);  
})
telefono.addEventListener("keypress", (event) =>{
    is_number(event, telefono)
})
nombre.addEventListener("keypress", (event) =>{
    letras(event, nombre)
})
apellidos.addEventListener("keypress", (event) =>{
    letras(event, apellidos)
})
correo.addEventListener("blur", (event) => {
    isGmail(event, correo);
})