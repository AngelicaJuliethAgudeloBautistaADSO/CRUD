const letras = (event) =>{
    // if (event.keyCode < 97 || event.keyCode > 122 && event.keyCode === [250, 243, 237, 233, 225].includes(charCode)){
    //     event.preventDefault();
    let is_letras =/a-zA-Z/;
    if (is_letras.test) {
        console.log("si")
    }else{
        console.log("#no")
    }
}
export default letras;