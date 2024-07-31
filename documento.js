import is_valid from "./module/is_valid";
import letras from "./module/letras";

const $formulario = document.querySelector("form");
const nombre = document.querySelector("#nombre");

nombre.addEventListener("keypress", letras);

$formulario.addEventListener("submit" , (event)=>{
    let response = is_valid(event, "form [required]")
    
    const data ={
            name: nombre.value
        }
    if (response) {
        fetch('http://localhost:3000/users',{
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }
});