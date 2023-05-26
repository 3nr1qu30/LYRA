const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expReg = {
    nomUsu: /^[a-zA-Z0-9_]{4,20}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()+,-./:;<=>?@^_`{|}~])[A-Za-z\dÑñ!"#$%&'()+,-./:;<=>?@\[\]^_`{|}~]{8,35}$/
}

const campos = {
    nomUsu: false,
    password: false
}

const validarFormulario = (e) => {
    switch (e.target.name){
        case "Usuario":
            if (expReg.nomUsu.test(e.target.value) === true){
                document.querySelector('#grupo_nomUsu .form_input_error').classList.remove('form_input_error-activo');
                campos.nomUsu = true;
            }
            if (!(expReg.nomUsu.test(e.target.value) === true)){
                document.querySelector('#grupo_nomUsu .form_input_error').classList.add('form_input_error-activo');
                campos.nomUsu = false;
            }
            if (e.target.value === ""){
                document.querySelector('#grupo_nomUsu .form_input_error').classList.remove('form_input_error-activo');
                campos.nomUsu = false;
            }
        break;
        case "Pass":
            if (expReg.password.test(e.target.value) === true){
                document.querySelector('#grupo_pass .form_input_error').classList.remove('form_input_error-activo');
                campos.password = true;
            }
            if (!(expReg.password.test(e.target.value) === true)){
                document.querySelector('#grupo_pass .form_input_error').classList.add('form_input_error-activo');
                campos.password = false;
            }
            if (e.target.value === ""){
                document.querySelector('#grupo_pass .form_input_error').classList.remove('form_input_error-activo');
                campos.password = false;
            }
        break;
        
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
})

formulario.addEventListener('submit', (e) => {
    if (campos.nomUsu && campos.password) {

    } else {
        e.preventDefault();
        swal({
            icon: "error",
            title: "Error",
            text: "Debes completar los campos correctamente"
          })
    }
});
