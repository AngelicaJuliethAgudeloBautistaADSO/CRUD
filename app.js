import isGmail from "./module/isGmail.js";
import is_number from "./module/is_number.js";
import letras from "./module/letras.js";
import remover from "./module/remover.js"
import is_valid from "./module/is_valid.js";
import solicitud, { enviar } from "./module/ajaxs.js";
import { URL } from "./module/config.js";

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
const tp_users = document.querySelector("#tp_users").content;
const fragmento = document.createDocumentFragment();
const tbody = document.querySelector("tbody");

console.log(tp_users)
const cantidad = (elemento) => {
    let valor = elemento.value.length === 10;
    if (valor) {
        alert("correcto")
        elemento.classList.add("correcto")
    }
}

const documentos= ()=>{
    const fragmento = document.createDocumentFragment();
    fetch(`${URL}/documents`)
    .then((response) => response.json())
    .then((data) => {
        let opcion = document.createElement("option");
        opcion.textContent = "seleccione..";
        opcion.value = "";
        fragmento.appendChild(opcion);
        data.forEach(element => {
            let option = document.createElement("option");
            option.value = element.id;
            option.textContent = element.name;
            fragmento.appendChild(option)
        });
        tipo.appendChild(fragmento);
    });
}

const listar = async () => {
    const data = await solicitud("users");
    const documentos = await solicitud ("documents");

    console.log(documentos);
    
    
    
    data.forEach(element => {
        let nombre= documentos.find((documento)=> documento.id === element.type_id);
        console.log(nombre);
        

        tp_users.querySelector(".nombre").textContent = element.first_name
        tp_users.querySelector(".apellido").textContent = element.last_name
        tp_users.querySelector(".telefono").textContent = element.phone
        tp_users.querySelector(".direccion").textContent = element.address
        tp_users.querySelector(".tipo").textContent = nombre
        tp_users.querySelector(".documento").textContent = element.document
        tp_users.querySelector(".email").textContent = element.email

        tp_users.querySelector(".modificar").setAttribute("data-id", element.id)
        tp_users.querySelector(".eliminar").setAttribute("data-id", element.id)

        const clone = document.importNode(tp_users, true);
        fragmento.appendChild(clone);
    })
    tbody.appendChild(fragmento);
}
const createRow = (data) => {
    const tr = tbody.insertRow(-1);

    const tdNombre = tr.insertCell(0);
    const tdApellido = tr.insertCell(1);
    const tdTelefono = tr.insertCell(2);
    const tdDireccion = tr.insertCell(3);
    const tdTipo = tr.insertCell(4);
    const tdDocumento = tr.insertCell(5);
    const tdEmail = tr.insertCell(6);

    tdNombre.textContent = data.first_name;
    tdApellido.textContent = data.last_name_name;
    tdTelefono.textContent = data.phone;
    tdDireccion.textContent = data.address;
    tdTipo.textContent = data.type_id;
    tdDocumento.textContent = data.document;
    tdEmail.textContent = data.email;

    tdNombre.textContent = data.first_name;
    tdApellido.textContent = data.last_name;
}
const buscar =(element)=>{
    console.log(element.dataset.id)
    enviar(`users/$(element.dataset.id)`,{
        method: 'PACTH',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

addEventListener("DOMContentLoaded", (event)=>{
    documentos()
    listar()
    if (!politicas.checked) {
        boton.setAttribute("disable","");
    }
});
document.addEventListener("click", (event)=>{
    if(event.target.matches(".modificar")){
        buscar(event.target)
        
    }
})
politicas.addEventListener("change", function(e){
    console.log(e.target.checked);
    if (e.target.checked) {
        boton.removeAttribute("disabled")
        buscar
    }
});

const vaciar_campos = () => {
    nombre.value = "";
    apellidos.value = "";
    telefono.value = "";
    direccion.value = "";
    tipo.value = "";
    documento.value = "";
    correo.value = "";

    nombre.classList.remove("correcto");
    apellidos.classList.remove("correcto");
    telefono.classList.remove("correcto");
    direccion.classList.remove("correcto");
    tipo.classList.remove("correcto");
    documento.classList.remove("correcto");
    correo.classList.remove("correcto");
}

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
        URL
        fetch(`${URL}/users`,{
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((json) => {
            vaciar_campos();
            createRow();
        });
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

