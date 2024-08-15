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
const id = document.querySelector('#user');

const cantidad = (elemento) => {
    let valor = elemento.value.length === 10;
    if (valor) {
        alert("correcto")
        } else {
            elemento.classList.remover("correcto")
            elemento.classList.add("error")
        }           
}

// const documentos= ()=>{
//     const fragmento = document.createDocumentFragment();
//     fetch(`${URL}/documents`)
//     .then((response) => response.json())
//     .then((data) => {
//         let opcion = document.createElement("option");
//         opcion.textContent = "seleccione..";
//         opcion.value = "";
//         fragmento.appendChild(opcion);
//         data.forEach(element => {
//             let option = document.createElement("option");
//             option.value = element.id;
//             option.textContent = element.name;
//             fragmento.appendChild(option)
//         });
//         tipo.appendChild(fragmento);
//     });
// }
const documentos= ()=>{
    const fragmento = document.createDocumentFragment();
    solicitud("documents")
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
    
    data.forEach((element) => {
        let nombr;
        documentos.forEach((elem)=>{
            if (element.type_id == elem.id) {
                console.log(elem.name);
                nombr = elem.name
            }
        })
        tp_users.querySelector(".nombre").textContent = element.first_name;
        tp_users.querySelector(".apellido").textContent = element.last_name;
        tp_users.querySelector(".telefono").textContent = element.phone;
        tp_users.querySelector(".direccion").textContent = element.address;
        tp_users.querySelector(".tipo").textContent = nombr;
        tp_users.querySelector(".documento").textContent = element.document;
        tp_users.querySelector(".email").textContent = element.email;

        tp_users.querySelector(".modificar").setAttribute("data-id", element.id)
        tp_users.querySelector(".eliminar").setAttribute("data-id", element.id)

        const clone = document.importNode(tp_users, true);
        fragmento.appendChild(clone);
    })
    tbody.appendChild(fragmento);
    //tp_users
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
    tdApellido.textContent = data.last_name;
    // tdTelefono.textContent = data.phone;
    // tdDireccion.textContent = data.address;
    // tdTipo.textContent = data.type_id;
    // tdDocumento.textContent = data.document;
    // tdEmail.textContent = data.email;
}
//METODO BUSCAR 
const buscar = async (element)=>{
    let id= element.dataset.id
    
    const data = await enviar(`users/${id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        }
    });
    loadForm(data);
}
const save = (event) =>{
    let response = is_valid(event, "form [requiered]");
    const data ={
        first_name: nombre.value,
        last_name: apellidos.value,
        address: direccion.value,
        type_id: tipo.value,
        email: correo.value,
        phone: telefono.value,
        document: documento.value
    }
    if (response) {
        if (user.value === "") {
            guardar(data)
        }else{
            actualiza(data)
        }
    }
}

const guardar = (data) => {
    console.log(data);
    return
    fetch(`${URL}/users`,{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    })
    .then(response => response.json())
    .then((json) =>{

        limpiarForm()



        createRow(json)
    });
}

const actualiza = async (data) => {
    const response = await enviar (`users/${user.value}`,{
        method: 'PUT',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json; charset=UTF-8',
        },
    });
    //limpiar form
    nombre.value="";

    console.log(response)
}

const limpiarForm = () => {
    nombre.value = "";
    nombre.value = "";
    nombre.value = "";
    nombre.value = "";
    nombre.value = "";
}

const loadForm =(data)=>{
    const {
        id,
        first_name,
        last_name,
        phone,
        address,
        type_id,
        document,
        email
    }=data;

    user.value=id;
    nombre.value= first_name;
    apellidos.value= last_name;
    telefono.value= phone;
    direccion.value= address;
    tipo.value= type_id;
    documento.value= document;
    correo.value= email;
    politicas.checked=true;
    boton.removeAttribute("disable")
}

addEventListener("DOMContentLoaded", (event)=>{
    documentos()
    listar()
    if (!politicas.checked) {
        boton.setAttribute("disable","");
    }
});

document.addEventListener("click", (e)=>{
    if(e.target.matches(".modificar")){
        buscar(e.target);
    }
});

politicas.addEventListener("change", function(e){
    if (e.target.checked) {
        boton.removeAttribute("disabled")
    }
});

$formulario.addEventListener("submit",save);

nombre.addEventListener("keypress", (event) => {
    remover(event, nombre);
});
apellidos.addEventListener("blur", (event) => {
    remover(event, apellidos);
});
tipo.addEventListener("change", (event) => {
    remover(event, apellidos);
});
// telefono.addEventListener("blur", (event) => {
//     remover(event, telefono);
// });


documento.addEventListener("keypress", is_number);
telefono.addEventListener("keypress", is_number);

telefono.addEventListener("blur",()=>{
    cantidad(telefono)
})

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
documento.addEventListener("keydown", function(event){
    // console.log("keydown", event);
});
documento.addEventListener("keyup", function (event) {
    // console.log("keyup", event);
});

