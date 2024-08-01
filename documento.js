import is_valid from "./module/is_valid.js";
import letras from "./module/letras.js";

const $formulario = document.querySelector("form");
const nombre = document.querySelector("#nombre");
const boton = document.querySelector("#boton")

nombre.addEventListener("keypress", letras);

$formulario.addEventListener("submit" , (event)=>{
    let response = is_valid(event, "form [required]");
    const data ={
        name: nombre.value
        }
    if (response) {

        boton.setAttribute("disabled", "")

        fetch('http://localhost:3000/documents',{
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((json) => {
            nombre.value = "";
            boton.removeAttribute("disabled");
        });
    }
});