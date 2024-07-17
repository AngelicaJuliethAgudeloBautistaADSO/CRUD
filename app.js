const $formulario = document.querySelector("form");

const nombre = document.querySelector("#nombre");
const apellidos = document.querySelector("#apellidos");
const telefono = document.querySelector("#telefono");
const direccion = document.querySelector("#direccion");
const tipo = document.querySelector("#tipo");
const documento = document.querySelector("#documento");

const checkbox  = document.querySelector("#politicas");
const summitBtn  = document.querySelector("#summit");

nombre.addEventListener("blur", validarNombre);
apellidos.addEventListener("blur", validarApellidos);

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
        input.classList.remove("error")
        input.classList.add("correcto")
    }
}
$formulario.addEventListener("submit" , validar);

nombre.addEventListener("blur", (event)=>{
    remover(event, nombre)
})
apellidos.addEventListener("blur", (event)=>{
    remover(event, apellidos)
})
telefono.addEventListener("blur", (event)=>{
    remover(event, telefono)
})
direccion.addEventListener("blur", (event)=>{
    remover(event, direccion)
})
tipo.addEventListener("blur", (event)=>{
    remover(event, tipo)
})
documento.addEventListener("blur", (event)=>{
    remover(event, documento)
})
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



function validarNombre() {
    const valorNombre = nombre.value.trim();
    if (valorNombre === "" || valorNombre.length < 3 || !esTexto(valorNombre)) {
      nombre.classList.add("error");
      return false;
    } else {
      nombre.classList.remove("error");
      return true;
    }
  }
  
  function validarApellidos() {
    const valorApellidos = apellidos.value.trim();
    if (valorApellidos === "" || valorApellidos.length < 3 || !esTexto(valorApellidos)) {
      apellidos.classList.add("error");
      return false;
    } else {
      apellidos.classList.remove("error");
      return true;
    }
  }
  
  function esTexto(valor) {
    const soloTexto = /^[a-zA-Z\s]+$/;
    return soloTexto.test(valor);
  }

politicas.addEventListener("change", () => {
    summitBtn .disabled = !checkbox.checked;
});

summitBtn .disabled = true;