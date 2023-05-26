const formularioRegistroPsicologo = document.getElementById('formularioRegistroPsicologo');
const inputs = document.querySelectorAll('#formularioRegistroPsicologo input');
const generoSelect = document.querySelector('select[name="Sexo"]')

var genero = document.getElementsByName("Sexo")[0]

const expReg = {
    nombre: /^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñÑ']+(\s+[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñÑ']+)*$/,
    apellidos: /^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñÑ']+(\s+[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñÑ']+)?(\s+[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñÑ']+)$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    edad: /^([1-9][8-9]|[2-9][0-9])$/,
    nombreUsuario: /^[a-zA-Z0-9_]{4,20}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()+,-./:;<=>?@^_`{|}~])[A-Za-z\dÑñ!"#$%&'()+,-./:;<=>?@\[\]^_`{|}~]{8,35}$/
}

const campos = {
    nombre: false,
    apellidos: false,
    email: false,
    edad: false,
    genero: false,
    nombreUsuario: false,
    password: false 
}

function actualizarErrorgenero() {
    const grupo = document.querySelector("#grupo_genero");
    const error = grupo.querySelector(".form_input_error");
    if (this.value !== "") {
      error.classList.remove("form_input_error-activo");
      campos.genero = true;
    } else {
      error.classList.add("form_input_error-activo");
      campos.genero = false;
    }
  }

generoSelect.addEventListener('change', actualizarErrorgenero);
  
  const validarFormulario = (e) => {
    switch (e.target.name) {
      case "Nombre":
        if (expReg.nombre.test(e.target.value)) {
          document
            .querySelector("#grupo_nombre .form_input_error")
            .classList.remove("form_input_error-activo");
          campos.nombre = true;
        } else if (e.target.value === "") {
          document
            .querySelector("#grupo_nombre .form_input_error")
            .classList.remove("form_input_error-activo");
          campos.nombre = false;
        } else {
          document
            .querySelector("#grupo_nombre .form_input_error")
            .classList.add("form_input_error-activo");
          campos.nombre = false;
        }
        break;
      case "Apellidos":
        if (expReg.apellidos.test(e.target.value)) {
          document
            .querySelector("#grupo_apellidos .form_input_error")
            .classList.remove("form_input_error-activo");
          campos.apellidos = true;
        } else if (e.target.value === "") {
          document
            .querySelector("#grupo_apellidos .form_input_error")
            .classList.remove("form_input_error-activo");
          campos.apellidos = false;
        } else {
          document
            .querySelector("#grupo_apellidos .form_input_error")
            .classList.add("form_input_error-activo");
          campos.apellidos = false;
        }
        break;
      case "Correo":
        if (expReg.email.test(e.target.value)) {
          document
            .querySelector("#grupo_email .form_input_error")
            .classList.remove("form_input_error-activo");
          campos.email = true;
        } else if (e.target.value === "") {
          document
            .querySelector("#grupo_email .form_input_error")
            .classList.remove("form_input_error-activo");
          campos.email = false;
        } else {
          document
            .querySelector("#grupo_email .form_input_error")
            .classList.add("form_input_error-activo");
          campos.email = false;
        }
        break;
      case "Edad":
        if (expReg.edad.test(e.target.value)) {
          document
            .querySelector("#grupo_edad .form_input_error")
            .classList.remove("form_input_error-activo");
          campos.edad = true;
        } else if (e.target.value === "") {
          document
            .querySelector("#grupo_edad .form_input_error")
            .classList.remove("form_input_error-activo");
          campos.edad = false;
        } else {
          document
            .querySelector("#grupo_edad .form_input_error")
            .classList.add("form_input_error-activo");
          campos.edad = false;
        }
        break;
      case "Usuario":
        if (expReg.nombreUsuario.test(e.target.value)) {
          document
            .querySelector("#grupo_nomUsuario .form_input_error")
            .classList.remove("form_input_error-activo");
          campos.nombreUsuario = true;
        } else if (e.target.value === "") {
          document
            .querySelector("#grupo_nomUsuario .form_input_error")
            .classList.remove("form_input_error-activo");
          campos.nombreUsuario = false;
        } else {
          document
            .querySelector("#grupo_nomUsuario .form_input_error")
            .classList.add("form_input_error-activo");
          campos.nombreUsuario = false;
        }
        break;
      case "Pass":
        if (expReg.password.test(e.target.value)) {
          document
            .querySelector("#grupo_password .form_input_error")
            .classList.remove("form_input_error-activo");
          campos.password = true;
        } else if (e.target.value === "") {
          document
            .querySelector("#grupo_password .form_input_error")
            .classList.remove("form_input_error-activo");
          campos.password = false;
        } else {
          document
            .querySelector("#grupo_password .form_input_error")
            .classList.add("form_input_error-activo");
          campos.password = false;
        }
        break;
    }
  };

  inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
  });
  
  formularioRegistroPsicologo.addEventListener("submit", (e) => {
    if (
      campos.nombre &&
      campos.apellidos &&
      campos.email &&
      campos.edad &&
      campos.nombreUsuario &&
      campos.genero &&
      campos.password
    ) {
      console.log(`esta bien`);
    } else {
      e.preventDefault();
      swal({
        icon: "error",
        title: "Error",
        text: "Debes completar todos los campos correctamente"
      })
    }
  });
