const isGmail = (event,elemento) =>{
    let expresion = /[\w._+-]+@[\w.-]+(\.[a-zA-Z]{2,3}){1,2}/;
        console.log(expresion, elemento.value);
        console.log(expresion.test(elemento.value));
        if (expresion.test(elemento.value)) {
            alert("Si funciona");
            elemento.classList.add("correcto")
            elemento.classList.remove("error")
        } else{
            alert("No funciona")
            elemento.classList.add("error")
            elemento.classList.remove("correcto")
        }   
    }
export default isGmail;
