const formularioEditarPerfil = document.getElementById("formularioEditarPerfil");
const formularioEditarPassword = document.getElementById("formularioEditarPassword");
const inputs = document.querySelectorAll("#formularioEditarPerfil input");
const inputs2 = document.querySelectorAll("#formularioEditarPassword input");
const Nombre = document.querySelector('input[name="Nombre"]').value;
const Apellidos = document.querySelector('input[name="Apellidos"]').value;
const Edad = document.querySelector('input[name="Edad"]').value;
const Correo = document.querySelector('input[name="Correo"]').value;
const Pass = document.querySelector('input[name="Pass"]').value;

const expReg = {
  nombre: /^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñÑ']+(\s+[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñÑ']+)*$/,
  apellidos:/^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñÑ']+(\s+[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñÑ']+)?(\s+[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñÑ']+)$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  edad: /^([1-9][8-9]|[2-9][0-9])$/,
  password:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()+,-./:;<=>?@^_`{|}~])[A-Za-z\dÑñ!"#$%&'()+,-./:;<=>?@\[\]^_`{|}~]{8,35}$/
};

const campos = {
  nombre: false,
  apellidos: false,
  email: false,
  edad: false,
  password: false,
};

if (Nombre === Nombre) {
  campos.nombre = true;
} else {
  validarFormulario(e);
}

if (Apellidos === Apellidos) {
  campos.apellidos = true;
} else {
  validarFormulario(e);
}

if (Edad === Edad) {
  campos.edad = true;
} else {
  validarFormulario(e);
}

if (Correo === Correo) {
  campos.email = true;
} else {
  validarFormulario(e);
}

if (Pass === Pass) {
  campos.password = true;
} else {
  validarFormulario(e);
}

const validarFormularioCuenta = (e) => {
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
          .classList.add("form_input_error-activo");
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
          .classList.add("form_input_error-activo");
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
          .classList.add("form_input_error-activo");
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
          .classList.add("form_input_error-activo");
        campos.edad = false;
      } else {
        document
          .querySelector("#grupo_edad .form_input_error")
          .classList.add("form_input_error-activo");
        campos.edad = false;
      }
      break;
  }
};

const validarNuevaPassword = (e) => {
  switch (e.target.name) {
    case "Pass":
      if (expReg.password.test(e.target.value)) {
        document
          .querySelector("#grupo_password .form_input_error")
          .classList.remove("form_input_error-activo");
        campos.password = true;
      } else if (e.target.value === "") {
        document
          .querySelector("#grupo_password .form_input_error")
          .classList.add("form_input_error-activo");
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
  input.addEventListener("keyup", validarFormularioCuenta);
  input.addEventListener("blur", validarFormularioCuenta);
});
inputs2.forEach((input) => {
  input.addEventListener("keyup", validarNuevaPassword);
  input.addEventListener("blur", validarNuevaPassword);
});

formularioEditarPerfil.addEventListener("submit", (e) => {
  e.preventDefault();
  if (campos.nombre && campos.apellidos && campos.email && campos.edad) {
    swal({
      icon: "warning",
      title: "Modificación de datos",
      text: "¿Estás seguro de que deseas modificar los datos?",
      buttons: ["Cancelar", "Modificar"],
    }).then((modificacionConfirmada) => {
      if (modificacionConfirmada) {
        formularioEditarPerfil.submit();
      } else {
        swal({
          icon: "warning",
          title: "Modificación cancelada",
        });
      }
    });
  } else {
    e.preventDefault();
    swal({
      icon: "error",
      title: "Datos incorrectos",
      text: "Por favor, verifica que los datos ingresados cumplen el formato establecido",
    });
  }
});

formularioEditarPassword.addEventListener("submit", (e) => {
  e.preventDefault();
  if (campos.password) {
    swal({
      icon: "warning",
      title: "Cambio de contraseña",
      text: "¿Estás seguro de que deseas cambiar la contraseña?",
      buttons: ["Cancelar", "Cambiar"],
    }).then((modificacionConfirmada) => {
      if (modificacionConfirmada) {
        formularioEditarPassword.submit();
      } else {
        swal({
          icon: "warning",
          title: "Cambio de contraseña cancelado",
        });
      }
    });
  } else {
    e.preventDefault();
    swal({
      icon: "error",
      title: "Contraseña no válida",
      text: "Por favor, verifica que la contraseña ingresada cumple el formato establecido",
    });
  }
});
