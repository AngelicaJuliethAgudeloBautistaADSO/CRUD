import isGmail from "./module/isGmail.js";
import is_number from "./module/is_number.js";
import letras from "./module/letras.js";
import remover from "./module/remover.js"
import is_valid from "./module/is_valid.js";
import solicitud from "./module/ajaxs.js";

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


const cantidad = (elemento) => {
    let valor = elemento.value.length === 10;
    if (valor) {
        alert("correcto")
        elemento.classList.add("correcto")
    }
}

const documentos= ()=>{
    const fragmento = document.createDocumentFragment();
    fetch('http://localhost:3000/documents')
    .then((response) => response.json())
    .then((data) => {
        data.forEach(element => {
            let option = document.createElement("option");
            option.value = element.id;
            option.textContent = element.name;
            fragmento.appendChild(option)
        });
        tipo.appendChild(fragmento);
    });
}

const listar = () => {
    let data = solicitud("users");
    console.log(data);
}

addEventListener("DOMContentLoaded", (event)=>{
    documentos()
    listar()
    if (!politicas.checked) {
        boton.setAttribute("disable","");
    }
});
politicas.addEventListener("change", function(e){
    console.log(e.target.checked);
    if (e.target.checked) {
        boton.removeAttribute("disabled")
    }
});
$formulario.addEventListener("submit" , (event)=>{
    let response = is_valid(event, "form [required]");
    if (response) {
        const data ={
            first_name: nombre.value,
            last_name: tipo.value,
            address: direccion.value,
            type_id: tipo.value,
            email: correo.value,
            phone: telefono.value,
            document: documento.value,
        }
        fetch('http://localhost:3000/users',{
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((json) => console.log(json));
    }else{
        alert("campos nulos")
    }
});
nombre.addEventListener("keypress", (event) => {
    remover(event, nombre);
});
apellidos.addEventListener("blur", (event) => {
    remover(event, apellidos);
});
tipo.addEventListener("change", (event) => {
    remover(event, tipo);
});
telefono.addEventListener("blur", (event) => {
    remover(event, telefono);
});

documento.addEventListener("keypress", is_number);
telefono.addEventListener("keypress", is_number);

nombre.addEventListener("keypress", letras );
apellidos.addEventListener("keypress", (event) => {
    letras(event, apellidos);
});
correo.addEventListener("blur", (event) => {
    isGmail(event, correo);
});
direccion.addEventListener("blur", (event) => {
    remover(event, direccion);
});
documento.addEventListener("blur", (event)=> {
    remover(event, documento);
});