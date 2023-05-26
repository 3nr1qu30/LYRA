const form1 = document.getElementById("form1");
const inputs = document.querySelectorAll("#form1 input");

const expReg = {
  pregunta: /^.{5,1000}$/,
  solucion: /^.{5,1000}$/
};

const campos = {
  pregunta: false,
  solucion: false
};

const validarReporte = (e) => {
  switch (e.target.name) {
    case "Pregunta":
      if (expReg.pregunta.test(e.target.value)) {
        campos.pregunta = true;
      } else {
        campos.pregunta = false;
      }
      break;
    case "Respuesta":
      if (expReg.solucion.test(e.target.value)) {
        campos.solucion = true;
      } else {
        campos.solucion = false;
      }
      break;
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", validarReporte);
  input.addEventListener("blur", validarReporte);
});

form1.addEventListener("submit", (e) => {
  if (!campos.pregunta || !campos.solucion) {
    e.preventDefault();
    swal({
      icon: "error",
      title: "Error",
      text: "Los campos no pueden ser menores a cinco caracteres ni exceder mil caracteres",
    });
  }
});